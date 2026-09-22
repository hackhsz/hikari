# Logo — PNG exports

Generated 2026-09-22 from the specification in [`../../docs/10-logo.md`](../../docs/10-logo.md).
Source of truth is that document, not these files. **Regenerate rather than edit.**

Kanji: Noto Serif JP 200 (lockup) / 400 (standalone) / 500 (≤32px).
Latin: Newsreader 300, tracked 0.28 em. Divider: 1.1 at cap height 40.

| File | Use |
|---|---|
| `hikari-lockup-ink-2400.png` | **Primary.** Horizontal lockup, 濡羽色 `#14171A`, transparent ground |
| `hikari-lockup-ink-1200.png` | Same at web scale |
| `hikari-lockup-reverse-2400.png` | Reversed — 白練 `#EFF0EC` ink, for dark grounds |
| `hikari-lockup-on-paper-2400.png` | Baked onto `#EFF0EC` with clear space. For slides and anything that cannot take alpha |
| `hikari-mark-ink-1024.png` | Compact mark, 光 alone, weight 400 |
| `hikari-mark-ink-512.png` | Same, smaller |
| `hikari-mark-reverse-1024.png` | Compact mark reversed |
| `hikari-punch-ink-1024.png` | The struck-in punch — solid square, glyph knocked out to transparent. **The stamp and seal artwork.** On a dark ground use the reversed mark instead; the ink square vanishes |
| `hikari-favicon-180.png` | Apple touch icon |
| `hikari-favicon-32.png` · `-16.png` | Favicons. Weight 500 — the standalone mark gains weight as it shrinks, per the spec |

## Rules these files already encode

- **One colour only.** No gradient, no two-tone. Every file is a single ink on alpha.
- **The kanji is lighter in the lockup than standalone.** It has a Latin to be lighter *than*; alone it does not. Do not scale one file to cover both.
- **Clear space:** one cap height on every side. The transparent exports carry ~3% padding only — add the rest in layout.
- **Never** re-colour to gold, add a gradient, outline, or set the lockup without the divider.

## Regenerating

These are rendered from HTML through headless Chromium; the generator lives in the session scratchpad rather than the repo. To rebuild, re-render the artwork in [`../lockup-light.html`](../lockup-light.html) at the required sizes — the geometry there is the same as here.

## Status

**Not final artwork.** The kanji is a licensed open font (Noto Serif JP, OFL) set to spec, not a drawn logotype, and the direction is still open on two counts — set versus drawn, and mincho versus gothic (see [`../../docs/99-open-questions.md`](../../docs/99-open-questions.md) #39 and #41). Use these for mockups and internal work. **Do not print them on anything, register them, or put them in front of a customer** until the name clears UK Classes 14 and 35 (#4).
