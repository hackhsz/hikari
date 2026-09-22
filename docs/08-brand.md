# 08 — Brand & Aesthetic

**Status: decided (2026-09-21).** Japanese editorial, not French luxury. See [02](02-positioning.md) for why this is the competitive position and not just a taste preference.

---

## The principle: 床の間 — one object at a time

A *tokonoma* is the alcove in a Japanese room where a single beautiful object is displayed. Not a collection. One thing, chosen with care, rotated on a rhythm.

**This is precisely what one-of-one inventory is**, and it should govern the design rather than sit in a moodboard. Concretely:

- The homepage shows **one piece**, large, above everything else. Not a grid. The grid starts below the fold.
- That piece changes on the drop rhythm ([05](05-social.md)). The homepage is a ritual, not a shop window.
- Product pages give the object a whole page and a lot of empty space around it. Empty space is the luxury signal — not gold, not serif flourishes, not a dark theme.
- Density is *earned*: collection grids can be dense, the entrance never is.

This single principle ties the aesthetic to the information architecture to the inventory model. It is the reason the look isn't decoration.

## What we are not doing

Stated explicitly, because the category's gravity pulls this way:

- **No faux-Parisian.** No black-on-white high-contrast serif luxury. That's [Susan Caplan](https://susancaplan.co.uk/), Bujor, ReSee, Jagged Metal — all of them, already.
- **No "zen".** No brush lettering, no cherry blossom, no bamboo, no *wabi-sabi* in the copy. The reference set is *Kinfolk*, *Casa Brutus*, Muji's catalogues, Ginza department-store packaging — modern Japanese *editorial and retail* design. **The Japanese reference must never become costume.** It shows up as restraint and composition, never as motif.
- **No dark mode as identity.** The "glow" aesthetic — dark backgrounds, luminous accents — is the dominant 2026 trend in premium e-commerce. It is also the opposite of a brand called *light*.
- **No gold.** Gold is the category's reflex and it makes costume jewellery look like it's pretending to be fine jewellery.

## Palette

Warm paper, ink, one accent. Starting tokens — refine with a designer, but hold the logic.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F4F1EA` | Page background. Warm off-white, never `#FFF`. |
| `paper-deep` | `#EDE8DE` | Alternating sections, cards |
| `ink` | `#1A1A18` | Body text. Near-black, never pure black. |
| `stone` | `#6E6A62` | Secondary text, metadata, condition notes |
| `rule` | `#D8D2C6` | Hairlines, borders, dividers |
| `kaki` | `#C4553B` | **Accent.** Persimmon (柿色). Sold markers, sale badges, links on hover. Used sparingly — three or four appearances per page maximum. |
| `ai` | `#22384F` | Indigo (藍). Rare — the drop banner, the footer. |

The accent choice matters: persimmon and indigo are the two colours that read as Japanese without being decorative. Both are traditional dye colours, both are muted, and neither is in use by any competitor in this category.

## Typography

- **Display** — a restrained high-contrast serif for piece names, house names and prices. Licensed: *Canela*, *GT Sectra*, *Ogg*. Free fallback: **Newsreader**.
- **Interface** — a neutral grotesque for everything else. Licensed: *Suisse Int'l*, *Neue Haas Grotesk*. Free fallback: **Inter**.
- **Labels** — the grotesque, uppercase, ~11px, **wide letter-spacing (0.12em)**. This one detail does most of the Japanese-catalogue work: `CHRISTIAN DIOR · c.1987 · GRADE II`.
- **Set body type small and leading generous.** Japanese editorial design is confident about small type in a large field. Resist the UK e-commerce instinct to scale everything up.

## Photography — the specification

This matters more than the layout. At £100–300 on a secondhand object, photography *is* conversion.

**The rule: real daylight, always.** No softboxes, no ring lights, no clipping paths. The name is *light*; the craft and the concept are the same decision.

| Frame | Spec |
|---|---|
| **1 · Composed** | North-facing window, morning. Piece on `paper` ground. Let the shadow fall — don't fill it. This is the Instagram frame. |
| **2 · Macro** | The signature mark, clasp, setting. ~1:1. This is authentication evidence *and* the best-performing content format ([05](05-social.md)). |
| **3 · On-body** | Scale. ~50mm equivalent, same daylight. Statement vintage earrings are far larger than people expect; this frame prevents a meaningful share of returns. |
| **4 · Condition** | The wear, the plating loss, the missing stone — shown clearly and without apology. Counter-intuitively this *raises* conversion: it proves frames 1–3 aren't hiding anything. |

Consistency beats quality here. Four identical setups shot the same way every week is worth more than occasional brilliance.

## Voice

Short declarative sentences. Name the object, the house, the year, the condition.

- **No** "stunning", "gorgeous", "must-have", "obsessed", exclamation marks, or emoji in product copy.
- **Yes** to specifics: *"Gold-tone, crystal-set. Signed Chr. Dior on the reverse. Some loss to the plating at the clip. Found in Tokyo, March 2026."*
- Restraint reads as confidence, and confidence is what a £180 stranger-purchase needs.

## Motion

200–300ms, ease-out, opacity and small translations only. No parallax, no scroll-jacking, no reveal animations. A page that behaves calmly is part of the same argument as a page that looks calm.

---

## The lexicon

**On naming the home:** don't. A brand that nicknames its own storefront is usually compensating for something. **The home is Hikari.** Everything else is named in relation to it — and *that* is where the naming work pays off, because it's what turns a shop into a ritual.

| Thing | Call it | Why |
|---|---|---|
| The owned site | **Hikari** | The home needs no nickname. Marketplaces are the ones that need qualifying. |
| Marketplace listings | **Outposts** | Names them as secondary in the same breath as describing them. Internal language shapes where effort goes. |
| The weekly drop | **Edition No. 14** | Numbered, dated, archived. Editions are collectible; "drops" are disposable. |
| The homepage feature | **The Alcove** | The tokonoma. One piece, rotated each Edition. |
| Sold pieces, kept live | **The Record** | Sold-out listings are an SEO asset and proof of demand. Naming it stops anyone deleting it. |
| Condition scale | **Grade I – IV** | Published, defined, applied to every piece without exception |
| Provenance line | **Found in Tokyo, March 2026** | On every piece. The differentiator, stated as fact rather than marketing. |
| Physical space, later | **The Room** | Reserved. See [DECISIONS](DECISIONS.md) D3. |

If an internal codename for the shop section is ever wanted: **kura** (蔵) — the storehouse where a Japanese family keeps what it values. Good as a repo directory or a project name; too obscure to put in front of a UK customer.

## Open

- Licensed vs. free type. Newsreader + Inter is a genuinely good free pairing and can launch; Canela + Suisse is the upgrade when there's budget.
- Does "Japanese editorial" read as premium to a UK audience, or as under-designed? Two landing-page variants before the full build ([99](99-open-questions.md) #9).

---

## Update · 2026-09-22 — palette revised, and why

**Live specimen:** https://claude.ai/artifact/QoSDYMA9MnUJDPyeXTSsBE — both palettes shown in an Alcove and a trust strip, with measured contrast. Tokens live in [`brand/tokens.css`](../brand/tokens.css).

### The problem with the palette specified above

Warm cream `#F4F1EA` + a serif display + a terracotta accent — which is almost exactly what this document originally specified — is currently one of the most over-used combinations in design, and one of the recognisable signatures of AI-generated design.

That matters more here than it would elsewhere. The entire argument in [02](02-positioning.md) is that every competitor in this category already looks like every other competitor. Trading the French-luxury default for the current warm-neutral default wins nothing.

### Palette B · 銀鼠 gin-nezu — recommended

Cool paper, raven-black ink, **indigo as the primary accent**, persimmon demoted to a rare second. Named for the Edo convention of 四十八茶百鼠 — *"forty-eight browns, a hundred greys"* — the subtlety townspeople developed in muted colour when sumptuary law forbade bright dress. That is the actual root of the restraint this brand is borrowing, and it is a better story than "warm minimalism".

| Token | JP | Hex | Role | On paper | On deep |
|---|---|---|---|---|---|
| `--paper` | 白練 shironeri | `#EFF0EC` | Ground | — | — |
| `--paper-deep` | 銀鼠 gin-nezu | `#DFE1DC` | Surfaces | — | — |
| `--rule` | — | `#C9CCC6` | Hairlines | — | — |
| `--sumi` | 濡羽色 nureba-iro | `#14171A` | Body text | 15.72 | 13.66 |
| `--nezu` | 鼠色 nezumi-iro | `#5E625B` | Secondary | 5.44 | 4.72 |
| `--ai` | 藍 ai | `#2E4B6B` | **Primary accent** | 7.86 | 6.83 |
| `--kaki` | 柿渋 kakishibu | `#9E4730` | Rare second | 5.30 | 4.67 |

Three reasons beyond novelty:

1. **Indigo is more honest to the sourcing.** Indigo and grey are the actual colours of Japanese textile, Muji and Ginza packaging. Terracotta is Mediterranean in origin and reads that way.
2. **Cool grounds photograph better with gold-tone metal**, which is most of the stock. Warm paper under warm metal in warm daylight flattens; a cool ground separates the piece in every frame. This affects the four-frame spec above directly.
3. **Indigo clears AAA**, so the accent can carry links and body-size text. Persimmon cannot — it only ever clears AA.

### Contrast corrections (apply to either palette)

The originally specified values failed WCAG AA at body size:
- Persimmon `#C4553B` → **`#9E4730`** (was 4.22 on warm paper, below the 4.5 threshold)
- Secondary `#6E6A62` → **`#635F54`** (was 4.08 on the deeper ground)

### Still open

Which palette. **A third option is available:** B's cool grounds and greys with **persimmon** kept as the single accent instead of indigo — avoids the warm-cream cluster while keeping the more distinctive accent colour. Logged as [99](99-open-questions.md) #23.

### Type note

Recommending **Instrument Sans** over Inter as the free UI face. Inter is the current default-by-reflex in exactly the way `#F4F1EA` is — fine, but unconsidered. Instrument Sans sits closer to Suisse Int'l and takes the wide-tracked uppercase labels better. Newsreader remains the display serif.
