# 10 — Logo

Captured from the supplied specimen, which was produced in a separate session and is not otherwise in this branch. The specimen is preserved verbatim at [`brand/lockup-light.html`](../brand/lockup-light.html) — open it in a browser; it has live ground and grain toggles.

**Prototype using it:** https://claude.ai/artifact/SSwHryr1Tu735AVHKxdo5s

## The lockup

光 · hairline rule · **Hikari**

- **Kanji** — Noto Serif JP (明朝 / mincho), set at **1.30 × cap height**, optical centre aligned to cap centre.
- **Rule** — vertical hairline, **1.00 × cap height**, with **0.55 C** clear either side.
- **Latin** — Newsreader, tracked **0.28 em**.

## The weight pair is a ratio, not two numbers

The kanji sits **exactly one step below** the Latin, and both move together as size changes. Specify it this way or a designer will lock the hero weights and the small sizes will fall apart.

| Scale | Kanji | Latin | Rule |
|---|---|---|---|
| Hero | Noto Serif JP **200** | Newsreader **300** | 1.1 at C=40 |
| Body, print, signage | Noto Serif JP **300** | Newsreader **400** | 1.3 at C=40 |

A light pair needs a lighter rule — at 1.4 the divider becomes the heaviest thing in the lockup.

## The compact mark does not follow the lockup

光 alone, **drawn at 400**; **300** inside the rounded-square punch. Two drawn weights of one glyph, never one weight scaled.

The reasoning is sound and worth preserving: the lockup's kanji is light *because it has a Latin to be lighter than*. Standing alone it has nothing to defer to, and at 16px a 200-weight mincho with grain over it is a smudge. Mincho's thin strokes are genuinely thinner than a gothic's at the same apparent weight, because the contrast is real — the horizontals go first.

## The open question the specimen raises

**Mincho or gothic — a voice decision, not a weight one.** Light mincho reads *written*: editorial, warm, closer to ReSee and to the category's existing register. Light gothic reads *neutral*: Muji, Ginza retail — closer to what [02](02-positioning.md) actually argues for.

Unresolved. If the answer turns out to be gothic, take the Latin gothic too — a gothic kanji beside a serif Latin is the incoherence the whole study started from. Logged as [99](99-open-questions.md) #27.

## Applied in the prototype

- Masthead at ~30px: the **body pair** (kanji 300 / Newsreader 400, rule 1.3), because the mark is small there.
- Footer at ~42px: the **hero pair** (kanji 200 / Newsreader 300, rule 1.1).
- Both set in `currentColor` inside a `mix-blend-mode: difference` bar, so the lockup stays legible as the scroll-driven ground moves from 白練 through 藍 to 濡羽色 without needing a second colourway.

## Still outstanding

Name clearance in UK Classes 14 and 35, plus domain and handle ([99](99-open-questions.md) #4). Nothing above should be sent to a designer for final artwork until that clears.
