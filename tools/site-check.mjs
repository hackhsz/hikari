#!/usr/bin/env node
/* Site checks: every page that matters on karinekovtg.com, in every language, in a fresh browser.

  node tools/site-check.mjs live              the published theme
  node tools/site-check.mjs staging           the draft theme (branch staging), through its preview link
  node tools/site-check.mjs approve staging   the last staging run's screenshots become the approved ones
  node tools/site-check.mjs lint              the theme files alone (also part of every run): before a push

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
/* a part of a page: photographs at half size on a phone glitter differently from run to run (1.0% on the
   banner's jewellery, 2026-11-04); a changed line of text or a moved block is well over this */
const PART_CHANGED = 0.02;

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
    /* the search data (JSON-LD): what each block says it is, and a piece's essentials */
    ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => {
      try {
        const j = JSON.parse(s.textContent), nodes = [].concat(j["@graph"] || j);
        const p = nodes.find(n => n["@type"] === "Product");
        return { ok: true, types: nodes.map(n => n["@type"]), product: p && { name: !!p.name, image: [].concat(p.image || []).length, brand: !!(p.brand && p.brand.name),
          offer: p.offers ? { price: p.offers.price !== undefined && p.offers.price !== "", currency: !!p.offers.priceCurrency, availability: !!p.offers.availability } : null } };
      } catch (e) { return { ok: false, error: e.message }; }
    }),
    text: document.body.innerText.split("\n").map(t => t.trim()).filter(Boolean),
    /* how many lines each Shopify section shows (lines, not characters, so Chinese compares fairly) */
    sections: Object.fromEntries([...document.querySelectorAll("[id^='shopify-section-']")]
      .map(s => [s.id.replace(/^shopify-section-[^_]*__/, ""), s.innerText.split("\n").filter(t => t.trim()).length])),
    links: [...new Set([...document.querySelectorAll("a[href]")].map(a => a.href.split("#")[0])
      .filter(h => h.startsWith(location.origin)))],
    /* each part of the page (a Shopify section) at this size: how tall, a fingerprint of its words
       (the same words in a different height is a layout change), and what runs off the screen inside
       it, which the page can hide (overflow) without scrolling sideways. A part that scrolls on purpose
       (a rail) or clips on purpose clips its own content, so only overflow nothing inside clips counts. */
    layout: [...document.querySelectorAll("[id^='shopify-section-']")].map(sec => {
      const r = sec.getBoundingClientRect();
      if (!r.height || !r.width) return null;
      let hash = 5381; for (const c of sec.innerText) hash = (hash * 33 + c.charCodeAt(0)) >>> 0;
      const out = b => b.right > innerWidth + 1 || b.left < -1;
      const spill = [...sec.querySelectorAll("*")].filter(e => {
        const b = e.getBoundingClientRect();
        if (!b.width || !b.height || !out(b)) return false;
        for (let a = e; a && a !== sec.parentElement; a = a.parentElement) {
          const cs = getComputedStyle(a);
          if (cs.position === "fixed" || cs.visibility === "hidden" || cs.opacity === "0" || (a !== e && cs.overflowX !== "visible")) return false;
        }
        return ![...e.children].some(c => { const q = c.getBoundingClientRect(); return q.width && out(q); });
      }).slice(0, 3).map(e => `<${e.tagName.toLowerCase()}${typeof e.className === "string" && e.className.trim() ? ` class="${e.className.trim()}"` : ""}> ${(e.textContent || "").trim().slice(0, 40)}`);
      return { name: sec.id.replace(/^shopify-section-(?:[^_]*__)?/, ""), h: Math.round(r.height), words: hash, spill };
    }).filter(Boolean),
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
    /* Core Web Vitals as this browser saw them: when the largest thing appeared, and how much the
       page jumped while loading. A lab figure on a fast connection, so only the poor end is flagged. */
    page.vitals = (await s("Runtime.evaluate", { awaitPromise: true, returnByValue: true, expression: `new Promise(r => {
      let lcp = 0, cls = 0;
      try {
        new PerformanceObserver(l => { for (const e of l.getEntries()) lcp = Math.max(lcp, e.startTime); }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value; }).observe({ type: "layout-shift", buffered: true });
      } catch (e) {}
      setTimeout(() => r({ lcp: Math.round(lcp), cls: Math.round(cls * 1000) / 1000 }), 300);
    })` })).result.value;
    if (shot) {
      /* A picture worth comparing: the photographs on screen loaded, and Shopify's own layers left out of
         it, the cookie banner (half of every first visit) and the draft theme's preview bar, which comes
         and goes from one run to the next. The checks above still saw the page with them. */
      await s("Runtime.evaluate", { awaitPromise: true, expression: `(async () => {
        document.head.insertAdjacentHTML("beforeend", "<style>#shopify-pc__banner,#PBarNextFrameWrapper,#preview-bar-iframe{display:none!important}</style>");
        const on = [...document.images].filter(i => { const r = i.getBoundingClientRect(); return r.width && r.bottom > 0 && r.top < innerHeight; });
        on.forEach(i => { i.loading = "eager"; });
        await Promise.race([Promise.all(on.map(i => i.decode().catch(() => {}))), new Promise(r => setTimeout(r, 8000))]);
      })()` });
      await sleep(400);
      page.shot = (await s("Page.captureScreenshot", { format: "jpeg", quality: 80 })).data;
      /* Then every part of the page, top to bottom, one picture each: what the first screen doesn't
         show (the story, the trust lines, the footer). Every photograph loaded first; the header is
         hidden while the parts are taken, as it would sit on top of each one; each part is scrolled to
         the top of the screen first, so the page's scroll colour is the same each run. */
      const js = async e => (await s("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true })).result.value;
      const names = await js(`(async () => {
        document.querySelectorAll("img").forEach(i => { i.loading = "eager"; });
        for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
        await Promise.race([Promise.all([...document.images].map(i => i.decode().catch(() => {}))), new Promise(r => setTimeout(r, 8000))]);
        document.head.insertAdjacentHTML("beforeend", "<style>#shopify-section-header{visibility:hidden!important}</style>");
        return [...document.querySelectorAll("[id^='shopify-section-']")].filter(e => e.id !== "shopify-section-header" && e.offsetHeight && e.offsetWidth && getComputedStyle(e).position !== "fixed").map(e => e.id);
      })()`);
      page.parts = [];
      for (const id of names || []) {
        const box = await js(`(async () => { const e = document.getElementById(${JSON.stringify(id)}); scrollTo(0, e.getBoundingClientRect().top + scrollY);
          await new Promise(r => setTimeout(r, 250)); const r = e.getBoundingClientRect(); return { y: r.top + scrollY, h: r.height }; })()`);
        if (!box || box.h < 2) continue;
        const clip = { x: 0, y: box.y, width: size.width, height: Math.min(box.h, 6000), scale: 1 / (size.deviceScaleFactor || 1) };
        const data = (await s("Page.captureScreenshot", { format: "jpeg", quality: 70, clip, captureBeyondViewport: true })).data;
        page.parts.push({ name: id.replace(/^shopify-section-(?:[^_]*__)?/, ""), h: Math.round(box.h), shot: data });
      }
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
    for (const b of d.ld || []) if (!b.ok) flag("FAIL", lang, name, "search data (JSON-LD) doesn't parse", b.error);
    const ld = (d.ld || []).filter(b => b.ok), types = ld.flatMap(b => b.types), prod = ld.map(b => b.product).find(Boolean);
    if (d.status === 200 && !types.includes("Organization")) flag("FAIL", lang, name, "no search data for the shop (Organization)");
    if (name === "product") {
      if (!prod) flag("FAIL", lang, name, "no search data for the piece (Product)");
      else {
        if (!prod.name || !prod.image || !prod.brand) flag("FAIL", lang, name, "the piece's search data lacks its name, photographs or house");
        if (prod.offer && !(prod.offer.price && prod.offer.currency && prod.offer.availability)) flag("WARN", lang, name, "the price in the search data lacks the amount, currency or availability");
      }
    }
    if (["shop all", "category", "Dior", "Chanel"].includes(name) && !types.includes("CollectionPage")) flag("WARN", lang, name, "no search data listing the collection's pieces");
    if (lang === "en") for (const [size, v] of [["desktop", d], ["phone", ph]]) if (v.vitals) {
      if (v.vitals.lcp > 4000) flag("WARN", lang, name, `slow to show its main content on ${size}: ${(v.vitals.lcp / 1000).toFixed(1)}s (poor is over 4s)`);
      if (v.vitals.cls > 0.25) flag("WARN", lang, name, `the page jumps while loading on ${size}: layout shift ${v.vitals.cls} (poor is over 0.25)`);
    }
    for (const [size, v] of [["desktop", d], ["phone", ph]]) for (const part of v.layout || []) if (part.spill.length)
      flag("WARN", lang, name, `something in a part runs off the screen on ${size}`, `${part.name}\n${part.spill.join("\n")}`);
  }
  /* A section that says much more in a translation than in English: a field cleared in English keeps
     its old translation, which Shopify goes on showing (the banner's text and links, 2026-11-04). */
  for (const p of pages.filter(p => p.lang !== "en" && p.desktop.sections)) {
    const en = pages.find(e => e.lang === "en" && e.name === p.name)?.desktop.sections || {};
    for (const [id, n] of Object.entries(p.desktop.sections))
      if (id in en && n >= en[id] * 2 && n >= en[id] + 3)
        flag("WARN", p.lang, p.name, `a section shows more than in English (${n} lines to ${en[id]}): an old translation of a cleared field?`, id);
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

/* A page as plain fetch sees it, waiting out Shopify's rate limit, which answers 429, or 200 with the
   body "local_rate_limited", or drops the connection (status 0). */
async function get(u) {
  for (let tries = 0; ; tries++) {
    const r = await fetch(u, { redirect: "follow" }).catch(e => ({ status: 0, err: e.message }));
    const body = r.text ? await r.text().catch(() => "") : "";
    const limited = r.status === 429 || r.status === 0 || body.startsWith("local_rate_limited");
    if (!limited || tries === 4) return { status: r.status === 0 ? 0 : limited ? 429 : r.status, err: r.err, body };
    await sleep(3000 * (tries + 1));
  }
}

/* Every link on the pages, once each. found: link → the first page it was on. */
async function checkLinks(found, problems) {
  let n = 0;
  await pool([...found], 4, async ([u, p]) => {
    const r = await get(u);
    n++;
    /* turned away or no answer after five tries: Shopify's rate limit, not a dead page (a real outage
       fails the pages themselves, which Chrome loads) */
    if (r.status === 429 || r.status === 0) problems.push({ level: "WARN", lang: p.lang, page: p.name, what: "a link went unchecked: Shopify was turning requests away (rate limit)", detail: u });
    else if (r.status >= 400) problems.push({ level: "FAIL", lang: p.lang, page: p.name, what: `a link answers ${r.status}`, detail: u });
  });
  return n;
}

/* ── the report ──────────────────────────────────────── */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function report({ target, theme, started, pages, problems, shots, parts = [], links }) {
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
${partsReport(parts, target)}
</body></html>`;
}

/* Every part of the photographed pages: their heights in English at both sizes, how much the most
   changed language moved, and the pictures of the parts that changed. */
function partsReport(parts, target) {
  if (!parts.length) return "";
  const rows = new Map();
  for (const s of parts) {
    const k = `${s.name}\n${s.part}`, r = rows.get(k) || { page: s.name, part: s.part, h: {}, most: undefined };
    if (s.lang === "en") r.h[s.size] = s.h;
    if (s.share !== undefined) r.most = Math.max(r.most ?? 0, s.share);
    rows.set(k, r);
  }
  const changed = parts.filter(s => s.share > PART_CHANGED), fresh = parts.filter(s => s.share === undefined).length;
  return `<h2>Parts</h2><p class="meta">Every part of these pages (each Shopify section), photographed in ${Object.keys(LANGS).length} languages on a desktop and a phone and compared with its approved picture.${fresh ? ` ${fresh} have no approved picture yet: <code>node tools/site-check.mjs approve ${esc(target)}</code>.` : ""}</p>
<table><tr><th>page</th><th>part</th><th>desktop</th><th>phone</th><th>most changed</th></tr>
${[...rows.values()].map(r => `<tr><td>${esc(r.page)}</td><td>${esc(r.part)}</td><td>${r.h.desktop ?? ""}px</td><td>${r.h.phone ?? ""}px</td><td class="${r.most > PART_CHANGED ? "warn" : "ok"}">${r.most === undefined ? "–" : `${(r.most * 100).toFixed(1)}%`}</td></tr>`).join("\n")}</table>
${changed.length ? `<h3>Parts that changed</h3>${changed.map(s => `<h3>${esc(s.lang)} · ${esc(s.name)} · ${esc(s.part)} · ${s.size} · ${(s.share * 100).toFixed(1)}% changed</h3>
<div class="shots"><figure><img loading="lazy" src="${s.approved}"><figcaption>approved</figcaption></figure>
<figure><img loading="lazy" src="${s.file}"><figcaption>this run</figcaption></figure>
<figure>${s.diff ? `<img loading="lazy" src="${s.diff}">` : ""}<figcaption>changed</figcaption></figure></div>`).join("\n")}` : ""}`;
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

    const problems = [...lint(), ...judge(pages),
      ...await tracking(cdp, [["home", pageUrl("en", "/", theme), ["view_item_list"]], ["product", pageUrl("en", product, theme), ["view_item"]]])];
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

    /* Every part of the photographed pages, compared with its approved picture. */
    const parts = [];
    mkdirSync(join(dir, "shots", "parts"), { recursive: true });
    for (const p of pages.filter(p => SHOTS.includes(p.name))) for (const size of ["desktop", "phone"]) for (const part of p[size].parts || []) {
      const base = `${p.lang}-${p.name}-${size}-${part.name}`.replace(/[^\w-]+/g, "-"), file = `shots/parts/${base}.jpg`;
      writeFileSync(join(dir, file), Buffer.from(part.shot, "base64"));
      const s = { lang: p.lang, name: p.name, size, part: part.name, h: part.h, file }, old = join(approved, "parts", `${base}.jpg`);
      if (existsSync(old)) {
        s.approved = `../approved/${target}/parts/${base}.jpg`;
        const c = await compare(cdp, readFileSync(old).toString("base64"), part.shot);
        s.share = c.share;
        if (c.image) { s.diff = `shots/parts/${base}-changed.jpg`; writeFileSync(join(dir, s.diff), Buffer.from(c.image, "base64")); }
        if (c.share > PART_CHANGED) problems.push({ level: "WARN", lang: p.lang, page: p.name, what: `a part looks different from its approved picture (${size}, ${(c.share * 100).toFixed(1)}%)`, detail: part.name });
      }
      delete part.shot;
      parts.push(s);
    }
    /* The same words in a part taking much more or less room than when it was approved: a layout change
       (2026-11-04: the trust lines, squeezed into columns, took 119px on a phone for three short lines).
       New words (a new piece, a new text) are expected to change the height, so they don't count. */
    const was = existsSync(join(approved, "layout.json")) ? JSON.parse(readFileSync(join(approved, "layout.json"), "utf8")) : {};
    for (const p of pages) for (const size of ["desktop", "phone"]) for (const part of p[size]?.layout || []) {
      const o = was[`${p.lang}|${p.name}|${size}`]?.[part.name];
      if (o && o.words === part.words && Math.abs(part.h - o.h) > Math.max(40, o.h * 0.15))
        problems.push({ level: "WARN", lang: p.lang, page: p.name, what: `the same words take ${part.h > o.h ? "more" : "less"} room than approved on ${size} (${o.h}px → ${part.h}px)`, detail: part.name });
    }

    for (const p of pages) for (const size of ["desktop", "phone"]) if (p[size]) delete p[size].shot;
    writeFileSync(join(dir, "results.json"), JSON.stringify({ target, theme, started, problems, pages }, null, 1));
    writeFileSync(join(dir, "report.html"), report({ target, theme, started, pages, problems, shots, parts, links }));
    const fails = problems.filter(p => p.level === "FAIL").length, warns = problems.length - fails;
    console.log(`${target}: ${pages.length} pages, ${links} links. ${fails ? `${fails} FAIL` : "passed"}${warns ? `, ${warns} WARN` : ""}`);
    console.log(join(dir, "report.html"));
    return fails ? 1 : 0;
  } finally {
    await cdp.quit();
  }
}

/* Tracking, on the home page and a piece in English, in a fresh browser: nothing may reach Google or
   Clarity, or set an analytics cookie, before the visitor allows analytics (UK GDPR, PECR; until
   2026-11-04 Google's tag loaded at once). Then analytics is allowed through Shopify's own consent
   API, as the banner's Accept does, and Google's tag has to start and send the page's events. The
   sending itself is blocked, so a check never counts as a visit. */
const BEACONS = ["*google-analytics.com/g/collect*", "*analytics.google.com/g/collect*", "*doubleclick.net/*", "*clarity.ms/collect*"];
async function tracking(cdp, urls) {
  const problems = [], flag = (level, page, what, detail) => problems.push({ level, lang: "en", page, what, detail });
  for (const [name, url, expect] of urls) {
    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
    const s = (m, p) => cdp.send(m, p, sessionId), sent = [];
    const off = cdp.on(({ method, params: p, sessionId: id }) => { if (id === sessionId && method === "Network.requestWillBeSent") sent.push(p.request.url); });
    try {
      await s("Network.enable"); await s("Page.enable");
      await s("Network.clearBrowserCookies");  // a first visit each time: the consent given on the last page is a cookie
      await s("Network.setBlockedURLs", { urls: BEACONS });
      await s("Page.navigate", { url }); await sleep(7000);
      const ours = u => /googletagmanager\.com\/gtag|google-analytics\.com|analytics\.google\.com|doubleclick\.net|clarity\.ms/.test(u);
      const early = sent.filter(ours);
      if (early.length) flag("FAIL", name, "analytics loads before the visitor has allowed it", early.slice(0, 3).map(u => u.slice(0, 120)).join("\n"));
      const { cookies } = await s("Network.getCookies", { urls: [SITE] });
      const crumbs = cookies.map(c => c.name).filter(n => /^_ga|^_gid|^_cl[cs]k?$|^_clck|^_clsk/.test(n));
      if (crumbs.length) flag("FAIL", name, `analytics cookies set before consent: ${crumbs.join(", ")}`);
      const queued = (await s("Runtime.evaluate", { returnByValue: true, expression: `(window.dataLayer||[]).filter(a => a && a[0] === "event").map(a => a[1])` })).result.value || [];
      for (const ev of expect) if (!queued.includes(ev)) flag("WARN", name, `no "${ev}" event on this page`, `queued: ${queued.join(", ") || "nothing"}`);
      const before = sent.length;
      const ok = (await s("Runtime.evaluate", { awaitPromise: true, returnByValue: true, expression: `new Promise(r => {
        const go = () => window.Shopify.customerPrivacy.setTrackingConsent({ analytics: true, marketing: false, preferences: true, sale_of_data: false }, () => r(true));
        if (window.Shopify && Shopify.customerPrivacy) go();
        else if (window.Shopify && Shopify.loadFeatures) Shopify.loadFeatures([{ name: "consent-tracking-api", version: "0.1" }], e => e ? r(false) : go());
        else r(false);
        setTimeout(() => r(false), 8000);
      })` })).result.value;
      if (!ok) { flag("WARN", name, "couldn't give consent through Shopify's privacy API, so analytics after consent went unchecked"); continue; }
      if (early.length) continue;  // already running before consent: the FAIL above says it all
      await sleep(7000);
      const after = sent.slice(before);
      if (!after.some(u => /googletagmanager\.com\/gtag\/js/.test(u))) flag("FAIL", name, "Google Analytics doesn't start once analytics is allowed");
      else if (!after.some(u => /\/g\/collect/.test(u))) flag("FAIL", name, "Google Analytics started but sent nothing after consent");
      else {
        const evs = new Set(after.filter(u => /\/g\/collect/.test(u)).flatMap(u => [...u.matchAll(/[?&]en=([^&]+)/g)].map(m => decodeURIComponent(m[1]))));
        for (const ev of ["page_view", ...expect]) if (!evs.has(ev)) flag("WARN", name, `"${ev}" didn't reach Google Analytics after consent`, `sent: ${[...evs].join(", ") || "nothing"}`);
      }
    } finally {
      off();
      await cdp.send("Target.closeTarget", { targetId }).catch(() => {});
    }
  }
  return problems;
}

/* The theme files themselves, before Shopify sees them. Shopify refuses a file it can't parse and
   keeps serving the old one without a word on the site (2026-11-04: a filter inside render's
   arguments left the About page on its old version), and a key missing from a language file shows
   English there. Reads this checkout, which is what was pushed. */
function lint() {
  const problems = [], flag = (level, file, what, detail) => problems.push({ level, lang: "", page: file, what, detail });
  const files = d => existsSync(join(ROOT, d)) ? readdirSync(join(ROOT, d)).filter(f => !f.startsWith(".")).map(f => `${d}/${f}`) : [];
  const json = (file, text) => { try { return JSON.parse(text.replace(/^\s*\/\*[\s\S]*?\*\//, "")); } catch (e) { flag("FAIL", file, "Shopify would refuse this file: it isn't valid JSON", e.message); } };
  const liquid = ["sections", "snippets", "layout", "templates"].flatMap(files).filter(f => f.endsWith(".liquid"));
  const used = new Map();  // translation key -> first file that uses it
  for (const file of liquid) {
    const text = readFileSync(join(ROOT, file), "utf8");
    for (const m of text.matchAll(/\{%-?\s*(render|include)\s+((?:'[^']*'|"[^"]*"|[^%'"])*)-?%\}/g))
      if (m[2].replace(/'[^']*'|"[^"]*"/g, "").includes("|"))
        flag("FAIL", file, `Shopify would refuse this file: a filter inside ${m[1]}'s arguments (work the value out first)`, m[0].slice(0, 140));
    const plain = text.replace(/\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}/g, "").replace(/\{%-?\s*raw\s*-?%\}[\s\S]*?\{%-?\s*endraw\s*-?%\}/g, "");
    for (const tag of ["if", "unless", "for", "case", "capture", "form", "paginate", "schema", "style", "javascript", "stylesheet"]) {
      const open = (plain.match(new RegExp(`\\{%-?\\s*${tag}\\b`, "g")) || []).length, close = (plain.match(new RegExp(`\\{%-?\\s*end${tag}\\b`, "g")) || []).length;
      if (open !== close) flag("FAIL", file, `Shopify would refuse this file: ${open} "${tag}" and ${close} "end${tag}"`);
    }
    const schema = plain.match(/\{%-?\s*schema\s*-?%\}([\s\S]*?)\{%-?\s*endschema\s*-?%\}/);
    if (schema) json(file, schema[1]);
    for (const m of plain.matchAll(/['"]([a-z0-9_]+(?:\.[a-z0-9_]+)+)['"]\s*\|\s*t\b/g)) if (!used.has(m[1])) used.set(m[1], file);
  }
  for (const file of [...files("templates"), ...files("config")].filter(f => f.endsWith(".json"))) json(file, readFileSync(join(ROOT, file), "utf8"));
  const locales = Object.fromEntries(files("locales").filter(f => f.endsWith(".json") && !f.includes(".schema."))
    .map(f => [f.replace(/^locales\/|\.json$/g, ""), json(f, readFileSync(join(ROOT, f), "utf8"))]).filter(([, j]) => j));
  const has = (j, key) => key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), j) !== undefined;
  const base = Object.keys(locales).find(l => l.endsWith(".default"));
  for (const [key, file] of used) {
    if (key.startsWith("shopify.")) continue;  // Shopify's own strings, it translates them
    if (base && !has(locales[base], key)) { flag("FAIL", file, `"${key}" isn't in the English language file: the page says "translation missing"`); continue; }
    const missing = Object.keys(locales).filter(l => l !== base && !has(locales[l], key));
    if (missing.length) flag("WARN", file, `"${key}" has no translation in ${missing.join(", ")}: those pages show it in English`);
  }
  return problems;
}

function approve(target) {
  const runs = existsSync(OUT) ? readdirSync(OUT).filter(d => d.endsWith(`-${target}`)).sort() : [];
  if (!runs.length) throw new Error(`no ${target} run yet`);
  const from = join(OUT, runs.at(-1), "shots"), to = join(OUT, "approved", target);
  mkdirSync(join(to, "parts"), { recursive: true });
  const pictures = d => existsSync(d) ? readdirSync(d).filter(f => f.endsWith(".jpg") && !f.endsWith("-changed.jpg")) : [];
  const shots = pictures(from), parts = pictures(join(from, "parts"));
  for (const f of shots) copyFileSync(join(from, f), join(to, f));
  for (const f of parts) copyFileSync(join(from, "parts", f), join(to, "parts", f));
  /* every part's height and words on every page, for the next run to compare with */
  const results = join(OUT, runs.at(-1), "results.json");
  if (existsSync(results)) {
    const layout = {};
    for (const p of JSON.parse(readFileSync(results, "utf8")).pages) for (const size of ["desktop", "phone"])
      if (p[size]?.layout) layout[`${p.lang}|${p.name}|${size}`] = Object.fromEntries(p[size].layout.map(l => [l.name, { h: l.h, words: l.words }]));
    writeFileSync(join(to, "layout.json"), JSON.stringify(layout));
  }
  console.log(`${shots.length} screenshots and ${parts.length} parts from ${runs.at(-1)} are now the approved ${target} ones`);
  return 0;
}

export { launch, visit, SIZES, pageUrl, tracking };

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [cmd, arg] = process.argv.slice(2);
  try {
    if (cmd === "lint") {  // the theme files alone, in a second: run it before a push
      const found = lint();
      for (const p of found) console.log(`${p.level}  ${p.page}: ${p.what}${p.detail ? `\n      ${p.detail}` : ""}`);
      const fails = found.filter(p => p.level === "FAIL").length;
      console.log(`lint: ${fails ? `${fails} FAIL` : "passed"}${found.length - fails ? `, ${found.length - fails} WARN` : ""}`);
      process.exitCode = fails ? 1 : 0;
    } else process.exitCode = cmd === "approve" ? approve(arg) : await run(cmd || "live");
  } catch (e) {
    console.error(e.message);
    process.exitCode = 2;
  }
}
