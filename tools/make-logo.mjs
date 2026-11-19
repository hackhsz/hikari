/* Makes the logo masks (snippets/lockup) with KARINEKO set in Aboreto (owner, 2026-11-19): the cat is the
   owner's drawing, kept as it was; the drawn letters beside or under it are replaced by the word in
   Aboreto, in the same place, the same height and the same width, so the header and footer don't move.
   Sources (tools/logo-source): the two drawn masks as they were before (cat + drawn letters), and
   Aboreto-Regular.ttf (SIL Open Font License, OFL.txt beside it).
   Writes assets/logo-karineko.png (cat over the word, 723 × 496) and assets/logo-karineko-row.png
   (cat beside the word, 843 × 183): black ink on transparent, used as a CSS mask in the text colour.
   Run:  node tools/make-logo.mjs        (needs Google Chrome); previews go to a temporary folder. */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "tools", "logo-source");
const b64 = (f) => readFileSync(join(SRC, f)).toString("base64");
const JOBS = [
  { out: "logo-karineko.png", src: b64("logo-karineko-drawn.png"), stacked: true },
  { out: "logo-karineko-row.png", src: b64("logo-karineko-row-drawn.png"), stacked: false },
];
const font = b64("Aboreto-Regular.ttf");

const html = `<!doctype html><html><body><pre id="out"></pre><script>
const WORD = "KARINEKO";
const load = (src) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = "data:image/png;base64," + src; });
(async () => {
  const face = new FontFace("Aboreto", "url(data:font/ttf;base64,${font})");
  document.fonts.add(await face.load());
  const res = {};
  for (const job of ${JSON.stringify(JOBS)}) {
    const img = await load(job.src), W = img.width, H = img.height;
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, W, H).data, ink = (k, y) => d[(y * W + k) * 4 + 3] > 40;
    // Where the drawn letters are.
    let lx0 = W, lx1 = -1, ly0 = H, ly1 = -1;
    if (job.stacked) {
      // under the cat, after the first run of 6+ empty rows
      let y = 0, gap = 0, seen = false;
      for (; y < H; y++) { let any = false; for (let k = 0; k < W; k++) if (ink(k, y)) { any = true; break; }
        if (any) { if (seen && gap >= 6) break; seen = true; gap = 0; } else if (seen) gap++; }
      for (let yy = y; yy < H; yy++) for (let k = 0; k < W; k++) if (ink(k, yy)) { lx0 = Math.min(lx0, k); lx1 = Math.max(lx1, k); ly0 = Math.min(ly0, yy); ly1 = Math.max(ly1, yy); }
    } else {
      // the letters' rows, from the right half (no cat there); the cat is whatever rises above them
      for (let y = 0; y < H; y++) for (let k = W >> 1; k < W; k++) if (ink(k, y)) { ly0 = Math.min(ly0, y); ly1 = Math.max(ly1, y); }
      let cx1 = -1; for (let k = 0; k < W; k++) for (let y = 0; y < ly0 - 3; y++) if (ink(k, y)) { cx1 = Math.max(cx1, k); break; }
      // the cat's body is wider low down than up top: carry on through every column with ink until the gap
      const col = (k) => { for (let y = 0; y < H; y++) if (ink(k, y)) return true; return false; };
      while (cx1 + 1 < W && col(cx1 + 1)) cx1++;
      for (let k = cx1 + 1; k < W; k++) for (let y = ly0; y <= ly1; y++) if (ink(k, y)) { lx0 = Math.min(lx0, k); lx1 = Math.max(lx1, k); }
    }
    const bw = lx1 - lx0 + 1, bh = ly1 - ly0 + 1;
    x.clearRect(lx0 - 2, ly0 - 2, bw + 4, bh + 4);
    // Aboreto at the drawn letters' cap height, spaced out to their width.
    const capOf = (px) => { x.font = px + "px Aboreto"; x.letterSpacing = "0px"; return x.measureText("K").actualBoundingBoxAscent; };
    const size = 200 * bh / capOf(200);
    x.font = size + "px Aboreto"; x.letterSpacing = "0px";
    const bare = x.measureText(WORD), inkW = bare.actualBoundingBoxLeft + bare.actualBoundingBoxRight;
    const spacing = (bw - inkW) / (WORD.length - 1);
    x.letterSpacing = spacing + "px";
    const m = x.measureText(WORD);
    x.fillStyle = "#000"; x.textBaseline = "alphabetic";
    x.fillText(WORD, lx0 + m.actualBoundingBoxLeft, ly0 + m.actualBoundingBoxAscent);
    res[job.out] = { png: c.toDataURL("image/png"), box: [lx0, ly0, bw, bh], size: +size.toFixed(1), spacing: +spacing.toFixed(1),
      spacingEm: +(spacing / size).toFixed(3) };
  }
  document.getElementById("out").textContent = JSON.stringify(res);
})();
</script></body></html>`;

const dir = mkdtempSync(join(tmpdir(), "karineko-logo-"));
const page = join(dir, "make.html");
writeFileSync(page, html);
const dom = execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--virtual-time-budget=8000", "--dump-dom", `file://${page}`],
  { encoding: "utf8", maxBuffer: 64 << 20, stdio: ["ignore", "pipe", "ignore"] });
const json = dom.match(/<pre id="out">([^<]+)<\/pre>/);
if (!json) throw new Error("Chrome drew nothing");
const res = JSON.parse(json[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
for (const [name, r] of Object.entries(res)) {
  writeFileSync(join(ROOT, "assets", name), Buffer.from(r.png.split(",")[1], "base64"));
  console.log(`assets/${name}: word at ${r.box.join(", ")} (x, y, w, h), Aboreto ${r.size}px, spacing ${r.spacing}px (${r.spacingEm} em)`);
}
