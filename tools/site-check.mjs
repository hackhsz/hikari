#!/usr/bin/env node
/* Site checks: every page that matters on karinekovtg.com, in every language, in a fresh browser.

  node tools/site-check.mjs live              the published theme
  node tools/site-check.mjs staging           the draft theme (branch staging), through its preview link
  node tools/site-check.mjs approve staging   the last staging run's screenshots become the approved ones

Run it after every push to staging, and on staging again before any push live. FAIL means don't push;
WARN is for a person to look at. The report, its screenshots and results.json go to previews/site-check/,
and the command prints where. Exit code 1 when anything failed.

Needs Google Chrome and Node 22 or later, nothing else: it drives Chrome through its DevTools protocol. */
import { spawn } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, copyFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://karinekovtg.com";
const THEMES = { live: null, staging: "203044847951" };  // preview_theme_id; null is the published theme
const LANGS = { en: "", "zh-CN": "/zh", ja: "/ja", es: "/es", ar: "/ar" };  // <html lang> and its URL prefix
const PAGES = [  // name, path, the answer it should give
  ["home", "/"], ["shop all", "/collections/all"], ["category", "/collections/vintage-earrings"],
  ["Dior", "/collections/vintage-christian-dior-jewellery"], ["Chanel", "/collections/vintage-chanel-jewellery"],
  ["product", null],  // the first piece in Shop all, so the check outlives any one sale
  ["about", "/pages/about-us"], ["viewing", "/pages/private-viewing"], ["contact", "/pages/contact"],
  ["search", "/search?q=dior"], ["bag", "/cart"], ["missing page", "/pages/site-check-missing", 404],
];
const DESCRIBED = ["home", "shop all", "category", "Dior", "Chanel", "product"];  // need a search description
const SHOTS = ["home", "product"];  // photographed at both sizes and compared with the approved ones
const SIZES = { desktop: { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false },
                phone: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true } };
const BRAND = "Karineko Vintage";
/* What machine translation made of the name (2026-11-03). Never on a page. */
const BRAND_WRONG = ["Karineko 复古", "カリネコ ヴィンテージ", "كارينيكو فينتيج"];
/* The name in another script: right in the search data (alternateName), a question in the text. */
const BRAND_LOCAL = ["卡里内科", "カリネコ", "كارينيكو"];
const CHANGED = 0.01;  // share of a screenshot that may differ from the approved one before it's flagged

const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(ROOT, "previews", "site-check");
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ── Chrome ──────────────────────────────────────────── */
function connect(url) {
  const ws = new WebSocket(url), calls = new Map(), subs = new Set();
  let n = 0;
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (!m.id) { for (const f of subs) f(m); return; }
    const c = calls.get(m.id); calls.delete(m.id);
    m.error ? c.no(new Error(`${c.method}: ${m.error.message}`)) : c.ok(m.result);
  };
  const send = (method, params = {}, sessionId) => new Promise((ok, no) => {
    calls.set(++n, { ok, no, method });
    ws.send(JSON.stringify({ id: n, method, params, sessionId }));
  });
  return new Promise((ok, no) => {
    ws.onopen = () => ok({ send, on: f => (subs.add(f), () => subs.delete(f)), close: () => ws.close() });
    ws.onerror = () => no(new Error("couldn't reach Chrome"));
  });
}

async function launch() {
  const profile = mkdtempSync(join(tmpdir(), "site-check-"));  // a fresh profile: no cookies, no sign-in
  const proc = spawn(CHROME, ["--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`,
    "--no-first-run", "--no-default-browser-check", "--hide-scrollbars", "--mute-audio", "about:blank"],
    { stdio: ["ignore", "ignore", "pipe"] });
  const url = await new Promise((ok, no) => {
    let err = "";
    proc.stderr.on("data", d => { err += d; const m = err.match(/ws:\/\/\S+/); if (m) ok(m[0]); });
    proc.on("exit", c => no(new Error(`Chrome stopped (${c}): ${err.slice(-300)}`)));
    setTimeout(() => no(new Error("Chrome didn't start within 20s")), 20000);
  });
  const cdp = await connect(url);
  cdp.quit = async () => {
    cdp.close(); proc.kill();
    if (proc.exitCode === null) await new Promise(r => proc.once("exit", r));  // Chrome writes to the profile until it's gone
    rmSync(profile, { recursive: true, force: true, maxRetries: 3 });
  };
  return cdp;
}

/* Runs inside the page: everything the checks read, in one go. */
function readPage() {
  const html = document.documentElement, q = s => document.querySelector(s);
  const meta = n => (q(`meta[name="${n}"],meta[property="${n}"]`) || {}).content || "";
  return {
    lang: html.lang, dir: html.dir || "ltr", title: document.title,
    description: meta("description"), ogTitle: meta("og:title"),
    source: html.outerHTML.match(/Liquid (syntax )?error[^<]{0,80}|translation missing[^<"]{0,60}/g) || [],
    languages: [...new Set([...document.querySelectorAll('select[name="language_code"] option')].map(o => o.value))].sort(),
    logo: [...document.querySelectorAll(".lockup")].some(e => e.getBoundingClientRect().height > 0),
    sideways: html.scrollWidth - innerWidth,
    /* what starts on screen and runs past its right edge, innermost first, to say where a sideways
       scroll comes from; closed drawers sit wholly off screen and fixed layers don't scroll */
    wide: html.scrollWidth - innerWidth > 1 ? [...document.body.querySelectorAll("*")].filter(e => {
      const out = x => { const r = x.getBoundingClientRect(); return r.left < innerWidth && r.right > innerWidth + 1; };
      for (let a = e; a; a = a.parentElement) if (getComputedStyle(a).position === "fixed") return false;
      return out(e) && ![...e.children].some(out);
    }).slice(0, 3).map(e => `<${e.tagName.toLowerCase()}${e.className && typeof e.className === "string" ? ` class="${e.className.trim()}"` : ""}> ${(e.textContent || "").trim().slice(0, 40)}`) : [],
    images: [...document.images].filter(i => i.complete && i.currentSrc && !i.naturalWidth).map(i => i.currentSrc),
    text: document.body.innerText.split("\n").map(t => t.trim()).filter(Boolean),
    /* how much each Shopify section says, to compare a translation with the English page */
    sections: Object.fromEntries([...document.querySelectorAll("[id^='shopify-section-']")]
      .map(s => [s.id.replace(/^shopify-section-[^_]*__/, ""), s.innerText.trim().length])),
    links: [...new Set([...document.querySelectorAll("a[href]")].map(a => a.href.split("#")[0])
      .filter(h => h.startsWith(location.origin)))],
  };
}

/* One page at one size, in its own tab. shot: also take a screenshot, with motion stopped. */
async function visit(cdp, url, size, shot) {
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  const s = (m, p) => cdp.send(m, p, sessionId);
  const docs = new Map(), files = [], errors = [];
  let loaded;
  const load = new Promise(r => (loaded = r));
  const off = cdp.on(({ method, params: p, sessionId: id }) => {
    if (id !== sessionId) return;
    if (method === "Page.loadEventFired") loaded();
    if (method === "Network.responseReceived") {
      if (p.type === "Document") docs.set(p.requestId, p.response.status);
      /* the theme's own files and the shop's images; Shopify's and Google's scripts are theirs */
      else if (p.response.status >= 400 && p.response.url.startsWith(`${SITE}/cdn/shop/`))
        files.push(`${p.response.status} ${p.response.url}`);
    }
    if (method === "Runtime.exceptionThrown") {
      const d = p.exceptionDetails;
      /* ours: the theme's files and the scripts written into the page; Shopify's own live under /cdn/shopifycloud and /cdn/wpm */
      const ours = !d.url || (d.url.startsWith(SITE) && !/\/cdn\/(shopifycloud|wpm)\//.test(d.url));
      errors.push({ ours, what: (d.exception?.description || d.text).split("\n")[0], url: d.url });
    }
  });
  try {
    await Promise.all([s("Page.enable"), s("Network.enable"), s("Runtime.enable")]);
    await s("Emulation.setDeviceMetricsOverride", size);
    if (shot) await s("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
    const nav = await s("Page.navigate", { url });
    if (nav.errorText) return { status: 0, error: nav.errorText };
    await Promise.race([load, sleep(30000)]);
    await sleep(1500);  // fonts, lazy images, the scroll colour
    const { result } = await s("Runtime.evaluate", { expression: `(${readPage})()`, returnByValue: true });
    const page = { ...result.value, status: docs.get(nav.loaderId) || 0, files, errors };
    if (shot) {
      /* A picture worth comparing: the photographs on screen loaded, and Shopify's cookie banner, which
         covers half of every first visit, left out of it (the checks above still saw the page with it). */
      await s("Runtime.evaluate", { awaitPromise: true, expression: `(async () => {
        document.head.insertAdjacentHTML("beforeend", "<style>#shopify-pc__banner{display:none!important}</style>");
        const on = [...document.images].filter(i => { const r = i.getBoundingClientRect(); return r.width && r.bottom > 0 && r.top < innerHeight; });
        on.forEach(i => { i.loading = "eager"; });
        await Promise.race([Promise.all(on.map(i => i.decode().catch(() => {}))), new Promise(r => setTimeout(r, 8000))]);
      })()` });
      await sleep(400);
      page.shot = (await s("Page.captureScreenshot", { format: "jpeg", quality: 80 })).data;
    }
    return page;
  } finally {
    off();
    await cdp.send("Target.closeTarget", { targetId }).catch(() => {});
  }
}

/* How much of b differs from a, and b with the differences in red; drawn in a blank tab. */
async function compare(cdp, a, b) {
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  const diff = async (a, b) => {
    const img = src => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = "data:image/jpeg;base64," + src; });
    const [x, y] = await Promise.all([img(a), img(b)]);
    if (x.width !== y.width || x.height !== y.height) return { share: 1, image: null };
    const c = document.createElement("canvas"), g = c.getContext("2d");
    c.width = x.width; c.height = x.height;
    g.drawImage(x, 0, 0); const p = g.getImageData(0, 0, c.width, c.height).data;
    g.drawImage(y, 0, 0); const out = g.getImageData(0, 0, c.width, c.height), q = out.data;
    let n = 0;
    for (let i = 0; i < p.length; i += 4) {
      /* 60 over three channels: JPEG noise and the grain stay under it */
      if (Math.abs(p[i] - q[i]) + Math.abs(p[i + 1] - q[i + 1]) + Math.abs(p[i + 2] - q[i + 2]) > 60) { n++; q[i] = 225; q[i + 1] = 20; q[i + 2] = 60; }
      else { const v = 170 + (q[i] + q[i + 1] + q[i + 2]) / 9; q[i] = q[i + 1] = q[i + 2] = v; }
    }
    g.putImageData(out, 0, 0);
    return { share: n / (p.length / 4), image: c.toDataURL("image/jpeg", 0.7).split(",")[1] };
  };
  try {
    const { result } = await cdp.send("Runtime.evaluate", { expression: `(${diff})(${JSON.stringify(a)}, ${JSON.stringify(b)})`,
      awaitPromise: true, returnByValue: true }, sessionId);
    return result.value;
  } finally {
    await cdp.send("Target.closeTarget", { targetId }).catch(() => {});
  }
}

/* Runs jobs n at a time. */
async function pool(jobs, n, f) {
  const out = new Array(jobs.length);
  let next = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (next < jobs.length) { const i = next++; out[i] = await f(jobs[i], i); } }));
  return out;
}

/* ── the checks ──────────────────────────────────────── */
function withTheme(url, theme) { return theme ? `${url}${url.includes("?") ? "&" : "?"}preview_theme_id=${theme}` : url; }
function pageUrl(lang, path, theme) { return withTheme(SITE + ((LANGS[lang] + (path === "/" ? "" : path)) || "/"), theme); }
const words = t => (t.match(/[A-Za-z]{2,}/g) || []).length;

function judge(pages) {
  const problems = [], flag = (level, lang, page, what, detail) => problems.push({ level, lang, page, what, detail });
  for (const p of pages) {
    const { lang, name } = p, d = p.desktop;
    if (!d.status) { flag("FAIL", lang, name, `didn't load: ${d.error || "no answer"}`); continue; }
    if (!p.phone.status) flag("FAIL", lang, name, `didn't load on a phone: ${p.phone.error || "no answer"}`);
    const ph = p.phone.status ? p.phone : { images: [], files: [], errors: [], sideways: 0 };
    if (d.status !== p.expect) flag("FAIL", lang, name, `answered ${d.status}, should be ${p.expect}`);
    if (d.lang !== lang) flag("FAIL", lang, name, `page says its language is "${d.lang}"`);
    if ((d.dir === "rtl") !== (lang === "ar")) flag("FAIL", lang, name, `reads ${d.dir === "rtl" ? "right to left" : "left to right"}`);
    for (const e of d.source) flag("FAIL", lang, name, `theme error in the page: ${e}`);
    if (!d.title.includes(BRAND)) flag("FAIL", lang, name, `title doesn't say ${BRAND}`, d.title);
    if (DESCRIBED.includes(name) && !d.description) flag("WARN", lang, name, "no search description");
    const said = [d.title, d.ogTitle, d.description, ...d.text].join("\n");
    const wrong = BRAND_WRONG.filter(w => said.includes(w));
    for (const w of wrong) flag("FAIL", lang, name, `brand name translated as "${w}"`);
    for (const w of BRAND_LOCAL) if (!wrong.some(x => x.includes(w)) && said.includes(w))
      flag("WARN", lang, name, `"Karineko" written as "${w}"`, d.text.find(t => t.includes(w)) || d.title);
    if (d.languages.join() !== Object.keys(LANGS).sort().join()) flag("FAIL", lang, name, `language menu lists ${d.languages.join(", ") || "nothing"}`);
    if (!d.logo) flag("FAIL", lang, name, "no logo showing");
    for (const u of new Set([...d.images, ...ph.images])) flag("FAIL", lang, name, "image doesn't load", u);
    for (const f of new Set([...d.files, ...ph.files])) flag("FAIL", lang, name, "a theme file or image is missing", f);
    for (const e of [...d.errors, ...ph.errors]) flag(e.ours ? "FAIL" : "WARN", lang, name, `${e.ours ? "theme script" : "another script"} failed: ${e.what}`);
    for (const [size, v] of [["desktop", d], ["phone", ph]]) if (v.sideways > 1)
      flag("FAIL", lang, name, `scrolls sideways by ${v.sideways}px on ${size}`, (v.wide || []).join("\n"));
  }
  /* A section that says much more in a translation than in English: a field cleared in English keeps
     its old translation, which Shopify goes on showing (the banner's text and links, 2026-11-04). */
  for (const p of pages.filter(p => p.lang !== "en" && p.desktop.sections)) {
    const en = pages.find(e => e.lang === "en" && e.name === p.name)?.desktop.sections || {};
    for (const [id, n] of Object.entries(p.desktop.sections))
      if (id in en && n > en[id] * 3 + 60)
        flag("WARN", p.lang, p.name, `a section says much more than in English (${n} characters to ${en[id]}): an old translation of a cleared field?`, id);
  }
  /* Lines a translated page shows exactly as the English one does: probably never translated. */
  for (const lang of Object.keys(LANGS).filter(l => l !== "en")) {
    const left = new Map();
    for (const p of pages.filter(p => p.lang === lang && p.desktop.text)) {
      const en = new Set(pages.find(e => e.lang === "en" && e.name === p.name)?.desktop.text || []);
      for (const t of p.desktop.text) if (en.has(t) && words(t) >= 3 && !/@|https?:|www\./.test(t))
        left.set(t, [...(left.get(t) || []), p.name]);
    }
    if (left.size) flag("WARN", lang, "", `${left.size} line${left.size > 1 ? "s" : ""} still in English`,
      [...left].map(([t, on]) => `${t}  (${[...new Set(on)].join(", ")})`).join("\n"));
  }
  return problems;
}

/* A page as plain fetch sees it, waiting out Shopify's rate limit, which answers either 429 or
   200 with the body "local_rate_limited". */
async function get(u) {
  for (let tries = 0; ; tries++) {
    const r = await fetch(u, { redirect: "follow" }).catch(e => ({ status: 0, err: e.message }));
    const body = r.text ? await r.text() : "";
    const limited = r.status === 429 || body.startsWith("local_rate_limited");
    if (!limited || tries === 4) return { status: limited ? 429 : r.status, err: r.err, body };
    await sleep(3000 * (tries + 1));
  }
}

/* Every link on the pages, once each. found: link → the first page it was on. */
async function checkLinks(found, problems) {
  let n = 0;
  await pool([...found], 4, async ([u, p]) => {
    const r = await get(u);
    n++;
    if (r.status === 429) problems.push({ level: "WARN", lang: p.lang, page: p.name, what: "a link went unchecked: Shopify was turning requests away (rate limit)", detail: u });
    else if (r.status === 0 || r.status >= 400) problems.push({ level: "FAIL", lang: p.lang, page: p.name, what: `a link answers ${r.status || r.err}`, detail: u });
  });
  return n;
}

/* ── the report ──────────────────────────────────────── */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function report({ target, theme, started, pages, problems, shots, links }) {
  const fails = problems.filter(p => p.level === "FAIL"), warns = problems.filter(p => p.level === "WARN");
  const groups = new Map();  // the same problem on many pages is one line
  for (const p of [...fails, ...warns]) {
    const k = `${p.level}\n${p.what}\n${p.detail || ""}`;
    groups.set(k, [...(groups.get(k) || []), [p.lang, p.page].filter(Boolean).join(" ")]);
  }
  const cell = (lang, name) => {
    const here = problems.filter(p => p.lang === lang && p.page === name);
    const lv = here.some(p => p.level === "FAIL") ? "fail" : here.length ? "warn" : "ok";
    return `<td class="${lv}" title="${esc(here.map(p => p.what).join("\n"))}">${{ ok: "✓", warn: "!", fail: "✗" }[lv]}</td>`;
  };
  const langs = Object.keys(LANGS);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Site check · ${esc(target)}</title><style>
body{font:15px/1.5 -apple-system,system-ui,sans-serif;margin:0 auto;max-width:1100px;padding:24px 16px;color:#1b1b1b;background:#fafaf8}
h1{font-size:22px;margin:0 0 4px}h2{font-size:17px;margin:32px 0 8px}.meta{color:#666}
.verdict{font-size:18px;font-weight:600;margin:16px 0}.verdict.fail{color:#b3261e}.verdict.pass{color:#2f5b45}
table{border-collapse:collapse}td,th{padding:4px 10px;border-bottom:1px solid #e4e2dc;text-align:left}td.ok,td.warn,td.fail{text-align:center}
.ok{color:#2f5b45}.warn{color:#9a6700;font-weight:600}.fail{color:#b3261e;font-weight:700}
li{margin:6px 0}.where{color:#666;font-size:13px}pre{white-space:pre-wrap;background:#f0eee8;padding:8px;font-size:13px;margin:4px 0}
.shots{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;align-items:start}.shots img{width:100%;border:1px solid #ddd}
.shots figure{margin:0}figcaption{font-size:13px;color:#666}
</style></head><body>
<h1>Site check · ${esc(target)}</h1>
<div class="meta">${esc(started.toISOString().slice(0, 16).replace("T", " "))} UTC · ${theme ? `draft theme ${theme} (preview link)` : "published theme"} ·
${pages.length} pages in ${langs.length} languages at two sizes · ${links} links</div>
${theme ? `<p class="meta">Translations of the theme's own words (banner, announcement, section headings) belong to the published theme, so the draft shows them in English. They're back once this is pushed live; anything new still needs translating.</p>` : ""}
<div class="verdict ${fails.length ? "fail" : "pass"}">${fails.length ? `${fails.length} failed check${fails.length > 1 ? "s" : ""}: ${theme ? "don't push live" : "these are on the live site now"}` : "Passed"}${warns.length ? ` · ${warns.length} to look at` : ""}</div>
<h2>What to look at</h2>${groups.size ? `<ul>${[...groups].map(([k, where]) => {
    const [level, what] = k.split("\n"), rest = k.split("\n").slice(2).join("\n");
    return `<li><span class="${level.toLowerCase()}">${level}</span> ${esc(what)}${where.some(Boolean) ? ` <span class="where">${esc([...new Set(where)].join(" · "))}</span>` : ""}${rest ? `<pre>${esc(rest)}</pre>` : ""}</li>`;
  }).join("")}</ul>` : "<p>Nothing.</p>"}
<h2>Pages</h2><table><tr><th></th>${langs.map(l => `<th>${l}</th>`).join("")}</tr>
${PAGES.map(([name]) => `<tr><th>${esc(name)}</th>${langs.map(l => cell(l, name)).join("")}</tr>`).join("\n")}</table>
<h2>Screenshots</h2><p class="meta">Approved · this run · what changed, in red. Flagged when more than ${CHANGED * 100}% changed. <code>node tools/site-check.mjs approve ${esc(target)}</code> makes this run's the approved ones.</p>
${shots.map(s => `<h3>${esc(s.lang)} · ${esc(s.name)} · ${s.size}${s.share === undefined ? " · nothing approved yet" : ` · ${(s.share * 100).toFixed(1)}% changed`}</h3>
<div class="shots"><figure>${s.approved ? `<img loading="lazy" src="${s.approved}">` : ""}<figcaption>approved</figcaption></figure>
<figure><img loading="lazy" src="${s.file}"><figcaption>this run</figcaption></figure>
<figure>${s.diff ? `<img loading="lazy" src="${s.diff}">` : ""}<figcaption>changed</figcaption></figure></div>`).join("\n")}
</body></html>`;
}

/* ── run ─────────────────────────────────────────────── */
async function run(target) {
  if (!(target in THEMES)) throw new Error(`target is live or staging, not "${target}"`);
  const theme = THEMES[target], started = new Date();
  const dir = join(OUT, `${started.toISOString().slice(0, 16).replace(/[-:]/g, "").replace("T", "-")}-${target}`);
  const approved = join(OUT, "approved", target);
  mkdirSync(join(dir, "shots"), { recursive: true });

  const product = (await get(withTheme(`${SITE}/collections/all`, theme))).body.match(/href="(\/products\/[^"?#]+)/)?.[1];
  if (!product) throw new Error("no piece found in Shop all");
  const pages = Object.keys(LANGS).flatMap(lang => PAGES.map(([name, path, expect = 200]) =>
    ({ lang, name, expect, url: pageUrl(lang, path || product, theme) })));

  const cdp = await launch();
  try {
    const jobs = pages.flatMap(p => ["desktop", "phone"].map(size => ({ p, size })));
    let done = 0;
    await pool(jobs, 6, async ({ p, size }) => {
      p[size] = await visit(cdp, p.url, SIZES[size], SHOTS.includes(p.name)).catch(e => ({ status: 0, error: e.message }));
      if (process.stdout.isTTY) process.stdout.write(`\r${++done}/${jobs.length} pages`);
    });
    if (process.stdout.isTTY) process.stdout.write("\n");

    const problems = judge(pages);
    const found = new Map();  // the missing page links to itself, so its links don't count
    for (const p of pages.filter(p => p.expect === 200)) for (const u of p.desktop.links || [])
      if (!found.has(u) && !/\/(account|cart\/|checkout)/.test(u)) found.set(u, p);
    const links = await checkLinks(found, problems);

    const shots = [];
    for (const p of pages.filter(p => SHOTS.includes(p.name))) for (const size of ["desktop", "phone"]) {
      const shot = p[size].shot;
      if (!shot) continue;
      const base = `${p.lang}-${p.name}-${size}`.replace(/\s+/g, "-"), s = { lang: p.lang, name: p.name, size, file: `shots/${base}.jpg` };
      writeFileSync(join(dir, s.file), Buffer.from(shot, "base64"));
      const old = join(approved, `${base}.jpg`);
      if (existsSync(old)) {
        s.approved = `../approved/${target}/${base}.jpg`;
        const c = await compare(cdp, readFileSync(old).toString("base64"), shot);
        s.share = c.share;
        if (c.image) { s.diff = `shots/${base}-changed.jpg`; writeFileSync(join(dir, s.diff), Buffer.from(c.image, "base64")); }
        if (c.share > CHANGED) problems.push({ level: "WARN", lang: p.lang, page: p.name, what: `looks different from the approved screenshot (${size}, ${(c.share * 100).toFixed(1)}%)` });
      }
      shots.push(s);
    }

    for (const p of pages) for (const size of ["desktop", "phone"]) if (p[size]) delete p[size].shot;
    writeFileSync(join(dir, "results.json"), JSON.stringify({ target, theme, started, problems, pages }, null, 1));
    writeFileSync(join(dir, "report.html"), report({ target, theme, started, pages, problems, shots, links }));
    const fails = problems.filter(p => p.level === "FAIL").length, warns = problems.length - fails;
    console.log(`${target}: ${pages.length} pages, ${links} links. ${fails ? `${fails} FAIL` : "passed"}${warns ? `, ${warns} WARN` : ""}`);
    console.log(join(dir, "report.html"));
    return fails ? 1 : 0;
  } finally {
    await cdp.quit();
  }
}

function approve(target) {
  const runs = existsSync(OUT) ? readdirSync(OUT).filter(d => d.endsWith(`-${target}`)).sort() : [];
  if (!runs.length) throw new Error(`no ${target} run yet`);
  const from = join(OUT, runs.at(-1), "shots"), to = join(OUT, "approved", target);
  mkdirSync(to, { recursive: true });
  const shots = readdirSync(from).filter(f => !f.endsWith("-changed.jpg"));
  for (const f of shots) copyFileSync(join(from, f), join(to, f));
  console.log(`${shots.length} screenshots from ${runs.at(-1)} are now the approved ${target} ones`);
  return 0;
}

export { launch, visit, SIZES, pageUrl };

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [cmd, arg] = process.argv.slice(2);
  try {
    process.exitCode = cmd === "approve" ? approve(arg) : await run(cmd || "live");
  } catch (e) {
    console.error(e.message);
    process.exitCode = 2;
  }
}
