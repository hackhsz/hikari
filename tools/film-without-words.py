"""The banner film without its words (owner, 2026-11-20: "get rid of the words on the video, then make
each line appear in sequence"; the page now sets the words itself, line by line).

The owner's film (tools/banner-source/film2/source-sdr-4k.mp4, 2160 x 3840, 84 frames) is a still
scene where only the light moves: a flash, a warm glow that builds and fades, and from frame 15 the
words "KARINEKO VINTAGE / Make vintage luxury accessible" fade in over the shell. Frame 6 has no words
and almost exactly the light of the last frame. So, for every frame from 15 on, inside the words (and a
small margin) the picture is frame 6 relit by that frame's own light: the light is measured as the
ratio of the frame to frame 6 around the letters, smoothed, and carried across them. Outside the words
the film is untouched.

Run (needs numpy and Pillow, and ffmpeg):
  python3 tools/film-without-words.py
Writes tools/banner-source/film2/source-clean-4k.mp4 (near-lossless, 45 MB, not kept in git) and a check
picture of the word area at four moments to tools/banner-source/film2/clean-check.jpg. Then the site's
two cuts, as for the film with words (2026-11-19), and the last frames for reduced motion:
  D=tools/banner-source/film2
  ffmpeg -i $D/source-clean-4k.mp4 -an -vf "scale=1440:2560:flags=lanczos" -c:v libx264 -preset slow -crf 20 \
    -profile:v high -pix_fmt yuv420p -g 30 -movflags +faststart assets/banner-film-phone.mp4
  ffmpeg -i $D/source-clean-4k.mp4 -an -vf "crop=2160:1215:0:1400,scale=2560:1440:flags=lanczos" -c:v libx264 \
    -preset slow -crf 20 -profile:v high -pix_fmt yuv420p -g 30 -movflags +faststart assets/banner-film-desktop.mp4
  (last frames: -sseof -0.05, scale 1080:1920 / crop as above then 1920:1080, JPEG quality 82 →
   assets/banner-video-phone-last.jpg, assets/banner-video-desktop-last.jpg)"""
import subprocess, sys, os
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(HERE, "banner-source", "film2")
SRC, OUT = os.path.join(D, "source-sdr-4k.mp4"), os.path.join(D, "source-clean-4k.mp4")
W, H, N = 2160, 3840, 84
FIRST_WORDS, PLATE = 15, 6        # first frame with any trace of the words; the clean frame with the end's light

def frames():
    p = subprocess.Popen(["ffmpeg", "-v", "error", "-i", SRC, "-vf", "scale=in_color_matrix=bt709:in_range=tv",
                          "-pix_fmt", "rgb24", "-f", "rawvideo", "-"], stdout=subprocess.PIPE)
    while True:
        b = p.stdout.read(W * H * 3)
        if len(b) < W * H * 3: break
        yield np.frombuffer(b, np.uint8).reshape(H, W, 3)
    p.wait()

def box(a, r, axis):
    c = np.cumsum(np.pad(a, [(r + 1, r) if i == axis else (0, 0) for i in range(a.ndim)], mode="edge"), axis=axis)
    hi = np.take(c, range(2 * r + 1, c.shape[axis]), axis=axis); lo = np.take(c, range(0, c.shape[axis] - 2 * r - 1), axis=axis)
    return (hi - lo) / (2 * r + 1)

def blur(a, r):          # three box passes each way: close to a Gaussian of sigma ~ r
    for _ in range(3): a = box(box(a, r, 0), r, 1)
    return a

def dilate(m, r):
    return blur(m.astype(np.float32), r) > 1e-3

# first pass: the clean frame and the last one (the film is read twice rather than held in memory)
count = 0
for n, f in enumerate(frames()):
    if n == PLATE: plate = f.astype(np.float32)
    last, count = f, n + 1
assert count == N, count
last = last.astype(np.float32)

# The letters: thin strokes much brighter in the last frame than in the clean one. The light differs between
# the two as well, but broadly, so a high-pass of the difference keeps the strokes (80-100) and drops the
# light and the shell's texture (under 20).
luma = lambda a: a @ np.array([0.2126, 0.7152, 0.0722], np.float32)
diff = luma(last) - luma(plate)
hp = diff - blur(diff, 10)
AREA = (1600, 2560, 420, 1760)                  # rows, columns where the words sit
zone = np.zeros_like(diff, bool); zone[AREA[0]:AREA[1], AREA[2]:AREA[3]] = True
strokes = (hp > 35) & (diff > 20) & (luma(last) > 190) & zone     # the letters are cream: bright, and new
ys, xs = np.where(strokes)
y0, y1, x0, x1 = max(0, ys.min() - 220), min(H, ys.max() + 220), max(0, xs.min() - 220), min(W, xs.max() + 220)
print(f"words found in rows {ys.min()}-{ys.max()}, columns {xs.min()}-{xs.max()}; working in {x0}-{x1} x {y0}-{y1}")
text = strokes[y0:y1, x0:x1]
keep_out = dilate(text, 12)                     # left out when measuring the light
mask = np.clip(blur(dilate(text, 7).astype(np.float32), 4) * 1.6, 0, 1)[..., None]   # what is replaced, soft-edged
pl = plate[y0:y1, x0:x1]
wgt = (~keep_out).astype(np.float32)[..., None]
den = blur(wgt, 34)
den_far = blur(wgt, 140)

enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", "30",
                        "-i", "-", "-vf", "scale=out_color_matrix=bt709:out_range=tv", "-c:v", "libx264", "-preset", "slow",
                        "-crf", "8", "-pix_fmt", "yuv420p", "-colorspace", "bt709", "-color_primaries", "bt709",
                        "-color_trc", "bt709", "-color_range", "tv", "-movflags", "+faststart", OUT], stdin=subprocess.PIPE)
checks = []
for n, f in enumerate(frames()):
    f = f.copy()
    if n >= FIRST_WORDS:
        cur = f[y0:y1, x0:x1].astype(np.float32)
        ratio = cur / np.maximum(pl, 1.0)
        # the frame's light, carried across the letters; where little is left to measure nearby (a busy patch
        # such as the snowflake earring) it leans on the light measured further out instead of on nothing
        far = blur(ratio * wgt, 140) / np.maximum(den_far, 1e-3)
        light = (blur(ratio * wgt, 34) + 0.03 * far) / (den + 0.03)
        clean = np.clip(pl * light, 0, 255)
        f[y0:y1, x0:x1] = np.clip(cur * (1 - mask) + clean * mask + 0.5, 0, 255).astype(np.uint8)
    if n in (0, 22, 40, N - 1): checks.append(f[y0:y1, x0:x1])
    enc.stdin.write(f.tobytes())
enc.stdin.close(); enc.wait()
strip = np.concatenate([np.asarray(Image.fromarray(c).resize(((x1 - x0) // 2, (y1 - y0) // 2))) for c in checks], axis=0)
Image.fromarray(strip).save(os.path.join(D, "clean-check.jpg"), quality=88)
print("wrote", OUT)
