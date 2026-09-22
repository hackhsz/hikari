# Hikari — Shopify theme

Custom Liquid theme built from the prototypes. Palette B ([`brand/tokens.css`](../brand/tokens.css)), lockup per [`docs/10-logo.md`](../docs/10-logo.md), layout per [`docs/04-site-ia.md`](../docs/04-site-ia.md).

## Getting it live today — free, no card

1. **Create a free development store.** [partners.shopify.com](https://partners.shopify.com) → Stores → Add store → **Development store**. Free, unlimited time, no payment details.
2. **Upload the theme.** Zip the contents of this `theme/` directory (the zip must contain `layout/`, `sections/` … at the top level, *not* a `theme/` wrapper), then Online Store → Themes → Add theme → Upload zip.
3. **Or connect this repo** — Online Store → Themes → Add theme → **Connect from GitHub**, pick this repository and branch. **Every push then deploys.** This is the "agent" answer: the repo is the agent.

Preferred is (3), so changes here go live without a manual step.

## Name is not hard-coded — on purpose

Per [`docs/18-name-clearance.md`](../docs/18-name-clearance.md), the name may have to change. It is a single theme setting:

**Theme settings → Brand → Brand name / Kanji.** Change those two fields and the masthead, footer, lockup and legal text all follow. There is no `Hikari` string anywhere in the markup.

Product URLs are also brand-free (`/products/vintage-christian-dior-clip-earrings-1987`), so a rename carries the SEO across with a 301.

## Product metafields

Create these under Settings → Custom data → Products, namespace **`hikari`**:

| Key | Type | Example |
|---|---|---|
| `piece` | Single line text | Crystal-set clip earrings, c.1987 |
| `grade` | Single line text | II |
| `condition` | Single line text | Some loss to the plating at the clip |
| `size` | Single line text | 42 × 31 mm |
| `mark` | Single line text | Signed Chr. Dior, reverse |
| `era` | Single line text | 1980s |
| `provenance` | Single line text | Found in Tokyo, March 2026 |

Use **Vendor** for the house (Christian Dior, Givenchy). The cards and product page read it.

## Before the first sale

- **Settings → Taxes: charge no VAT.** Charging or displaying VAT while unregistered is an offence ([`docs/16-vat.md`](../docs/16-vat.md)). The store will add a tax line on defaults — turn it off and check it again after any settings change.
- **Theme settings → Legal:** company name, number and registered office. Required by the Companies Act and the E-Commerce Regulations 2002.
- Inventory: **quantity 1**, "continue selling when out of stock" **off**. One of one means one.

## Photography — it works before you have any

Any product without an image renders a drawn daylight study at the right tonality and aspect, so the store is presentable from day one. Real photographs replace them automatically.

**Frames 2 and 4 are labelled "Unretouched" and carry no grain** — the maker's-mark macro and the condition frame are evidence ([D6](../docs/DECISIONS.md), [D10](../docs/DECISIONS.md)).

## Settings worth knowing

Grain strength and animation, and the scroll-driven colour, are all theme settings — dial the grain down if it fights the photography once real images land ([`docs/08-brand.md`](../docs/08-brand.md)).

## Not yet built

Customer account templates, gift cards, pagination on collection, predictive search, the authentication and condition-grade content pages. None blocks a preview.
