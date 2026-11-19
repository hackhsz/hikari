/* Makes the shop's browser-tab icon (favicon) from the cat in assets/logo-karineko.png: the cat alone
   (not the KARINEKO letters), centred on the paper colour of the site (#FAF8F3), drawn by headless Chrome
   at each size the browsers and Google ask for. A line drawing turns to grey mush at tab size, so the
   tab and search-result icons (32, 96, 192) are the same cat filled in as a solid ink silhouette (the
   drawing's outline is closed, the outside flood-filled, the rest is cat, whiskers trimmed); the phone home-screen icon
   (180), shown large, keeps the line drawing.
   Writes assets/favicon-32.png, favicon-96.png, favicon-192.png and apple-touch-icon.png
   (96 and 192 are multiples of 48, which Google wants for the icon beside a search result).
   Run:  node tools/make-favicon.mjs        (needs Google Chrome) */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = { 32: "favicon-32.png", 96: "favicon-96.png", 192: "favicon-192.png", 180: "apple-touch-icon.png" };
const PAPER = "#FAF8F3";
const logo = readFileSync(join(ROOT, "assets", "logo-karineko.png")).toString("base64");

const html = `<!doctype html><html><body><pre id="out"></pre><script>
const img = new Image();
img.onload = () => {
  // Find the cat: everything drawn above the band of letters at the bottom.
  const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
  const x = c.getContext("2d"); x.drawImage(img, 0, 0);
  const d = x.getImageData(0, 0, c.width, c.height).data;
  const ink = (i) => d[i + 3] > 40 && d[i] < 200;
  const rows = []; for (let y = 0; y < c.height; y++) { let n = 0; for (let k = 0; k < c.width; k++) if (ink((y * c.width + k) * 4)) n++; rows.push(n); }
  // The letters start after the first run of 6+ empty rows below the cat.
  let y1 = 0, gap = 0, seen = false;
  for (let y = 0; y < c.height; y++) { if (rows[y]) { seen = true; gap = 0; y1 = y; } else if (seen && ++gap >= 6) break; }
  let x0 = c.width, x1 = 0, y0 = c.height;
  for (let y = 0; y <= y1; y++) for (let k = 0; k < c.width; k++) if (ink((y * c.width + k) * 4)) { x0 = Math.min(x0, k); x1 = Math.max(x1, k); y0 = Math.min(y0, y); }
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1, res = { box: [x0, y0, bw, bh] };
  // Silhouette: thicken the lines by R (closes the gaps in the outline), flood-fill the outside from a
  // border of P empty pixels, then everything not outside, shrunk back by R, is the cat.
  const R = 7, P = R + 2, W = bw + 2 * P, H = bh + 2 * P;
  const line = new Uint8Array(W * H);
  // Only solid ink counts here: the whiskers are faint hairlines and would clump into a blob by the nose.
  const solid = (i) => d[i + 3] > 230 && d[i] < 70;
  for (let y = 0; y < bh; y++) for (let k = 0; k < bw; k++) if (solid(((y + y0) * c.width + k + x0) * 4)) line[(y + P) * W + k + P] = 1;
  const grow = (a, r, v) => { const b = a.slice(); for (let y = 0; y < H; y++) for (let k = 0; k < W; k++) if (a[y * W + k] === v)
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { if (dx * dx + dy * dy > r * r) continue; const yy = y + dy, kk = k + dx;
      if (yy >= 0 && yy < H && kk >= 0 && kk < W) b[yy * W + kk] = v; } return b; };
  const fat = grow(line, R, 1), out = new Uint8Array(W * H), st = [0];
  out[0] = 1; while (st.length) { const i = st.pop(), y = (i / W) | 0, k = i % W;
    for (const j of [k > 0 && i - 1, k < W - 1 && i + 1, y > 0 && i - W, y < H - 1 && i + W]) if (j !== false && !out[j] && !fat[j]) { out[j] = 1; st.push(j); } }
  const back = grow(out, R, 1); // the outside, grown back by R: what is left is the cat at its true size
  // Then trim thin bits that stick out (whiskers, the ribbon's tails): shrink the cat by T and grow it back.
  const T = 5, body = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) body[i] = back[i] ? 0 : 1;
  const thin = grow(body, T, 0), kept = grow(thin, T, 1), cat = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) cat[i] = kept[i] ? 0 : 1; // 0 = cat, as below
  const sil = document.createElement("canvas"); sil.width = bw; sil.height = bh;
  const sg = sil.getContext("2d"), sd = sg.createImageData(bw, bh);
  for (let y = 0; y < bh; y++) for (let k = 0; k < bw; k++) { const q = (y * bw + k) * 4;
    if (!cat[(y + P) * W + k + P]) { sd.data[q] = 0x1C; sd.data[q + 1] = 0x1B; sd.data[q + 2] = 0x18; sd.data[q + 3] = 255; } }
  sg.putImageData(sd, 0, 0);
  for (const s of ${JSON.stringify(Object.keys(OUT).map(Number))}) {
    const o = document.createElement("canvas"); o.width = o.height = s;
    const g = o.getContext("2d"); g.fillStyle = "${PAPER}"; g.fillRect(0, 0, s, s);
    g.imageSmoothingEnabled = true; g.imageSmoothingQuality = "high";
    const h = s * (s <= 32 ? 0.9 : 0.84), w = h * bw / bh, ox = (s - w) / 2, oy = (s - h) / 2;
    g.drawImage(s === 180 ? img : sil, s === 180 ? x0 : 0, s === 180 ? y0 : 0, bw, bh, ox, oy, w, h);
    res[s] = o.toDataURL("image/png");
  }
  document.getElementById("out").textContent = JSON.stringify(res);
};
img.src = "data:image/png;base64,${logo}";
</script></body></html>`;

const dir = mkdtempSync(join(tmpdir(), "karineko-favicon-"));
const page = join(dir, "make.html");
writeFileSync(page, html);
const dom = execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--virtual-time-budget=5000", "--dump-dom", `file://${page}`], { encoding: "utf8", maxBuffer: 64 << 20, stdio: ["ignore", "pipe", "ignore"] });
const json = dom.match(/<pre id="out">([^<]+)<\/pre>/);
if (!json) throw new Error("Chrome drew nothing");
const res = JSON.parse(json[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
for (const [s, name] of Object.entries(OUT)) {
  writeFileSync(join(ROOT, "assets", name), Buffer.from(res[s].split(",")[1], "base64"));
  console.log(`assets/${name}  ${s}×${s}`);
}
console.log("cat found at", res.box.join(", "), "in logo-karineko.png");
