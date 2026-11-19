/* Records the home page's first seconds (the banner's opening) as an MP4, on a laptop and on a phone, in a
   fresh browser so it plays as a first visit does.
   Run:  node tools/record-banner.mjs staging|live [seconds]     (needs Google Chrome and ffmpeg)
   Writes previews/banner-<target>-desktop.mp4 and -phone.mp4 and prints where. */
import { spawn, execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = process.argv[2] || "staging", secs = +(process.argv[3] || 6);
const url = "https://karinekovtg.com/" + (target === "staging" ? "?preview_theme_id=203044847951" : "");
const sleep = ms => new Promise(r => setTimeout(r, ms));

function connect(wsUrl) {
  const ws = new WebSocket(wsUrl), calls = new Map(), subs = new Set(); let n = 0;
  ws.onmessage = e => { const m = JSON.parse(e.data); if (!m.id) { for (const f of subs) f(m); return; }
    const c = calls.get(m.id); calls.delete(m.id); m.error ? c.no(new Error(`${c.method}: ${m.error.message}`)) : c.ok(m.result); };
  const send = (method, params = {}, sessionId) => new Promise((ok, no) => { calls.set(++n, { ok, no, method }); ws.send(JSON.stringify({ id: n, method, params, sessionId })); });
  return new Promise((ok, no) => { ws.onopen = () => ok({ send, on: f => subs.add(f), close: () => ws.close() }); ws.onerror = () => no(new Error("couldn't reach Chrome")); });
}

async function record(name, width, height, mobile) {
  const profile = mkdtempSync(join(tmpdir(), "banner-rec-"));
  const proc = spawn(CHROME, ["--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "--no-first-run",
    "--hide-scrollbars", "--mute-audio", "about:blank"], { stdio: ["ignore", "ignore", "pipe"] });
  const wsUrl = await new Promise((ok, no) => { let err = ""; proc.stderr.on("data", d => { err += d; const m = err.match(/ws:\/\/\S+/); if (m) ok(m[0]); });
    setTimeout(() => no(new Error("Chrome didn't start")), 20000); });
  const cdp = await connect(wsUrl);
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  const s = (m, p) => cdp.send(m, p, sessionId);
  await s("Page.enable");
  await s("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: mobile ? 2 : 1, mobile });
  // REDUCED=1: as someone who has turned animations off sees it (and as the site check's screenshots do)
  if (process.env.REDUCED) await s("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  const dir = mkdtempSync(join(tmpdir(), "banner-frames-")); const frames = [];
  cdp.on(m => { if (m.method === "Page.screencastFrame" && m.sessionId === sessionId) {
    frames.push({ t: m.params.metadata.timestamp, data: m.params.data }); s("Page.screencastFrameAck", { sessionId: m.params.sessionId }); } });
  await s("Page.startScreencast", { format: "jpeg", quality: 85, everyNthFrame: 1 });
  await s("Page.navigate", { url });
  await sleep(secs * 1000);
  await s("Page.stopScreencast");
  cdp.close(); proc.kill(); await sleep(300); rmSync(profile, { recursive: true, force: true });
  // Constant 25 fps from the timestamped frames (the screencast only sends a frame when something changes).
  const t0 = frames[0].t, list = [];
  frames.forEach((f, i) => { const file = join(dir, `f${String(i).padStart(4, "0")}.jpg`); writeFileSync(file, Buffer.from(f.data, "base64"));
    const next = frames[i + 1] ? frames[i + 1].t : f.t + 0.5; list.push(`file '${file}'\nduration ${Math.max(0.01, next - f.t).toFixed(3)}`); });
  writeFileSync(join(dir, "list.txt"), list.join("\n") + `\nfile '${join(dir, `f${String(frames.length - 1).padStart(4, "0")}.jpg`)}'\n`);
  mkdirSync(join(ROOT, "previews"), { recursive: true });
  const out = join(ROOT, "previews", `banner-${target}-${name}${process.env.REDUCED ? "-still" : ""}.mp4`);
  execFileSync("ffmpeg", ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", join(dir, "list.txt"), "-vf", "fps=25,scale=trunc(iw/2)*2:trunc(ih/2)*2",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", out]);
  rmSync(dir, { recursive: true, force: true });
  console.log(`${out}  (${frames.length} frames over ${(frames.at(-1).t - t0).toFixed(1)}s)`);
}

await record("desktop", 1280, 800, false);
await record("phone", 390, 844, true);
