# Hikari — Shopify theme

Custom Liquid theme built from the prototypes. Palette B ([`brand/tokens.css`](../brand/tokens.css)), lockup per [`docs/10-logo.md`](../docs/10-logo.md), layout per [`docs/04-site-ia.md`](../docs/04-site-ia.md).

## Getting it live today — free, no card

1. **Create a free development store.** [partners.shopify.com](https://partners.shopify.com) → Stores → Add store → **Development store**. Free, unlimited time, no payment details.
2. **Upload the theme.** Zip the contents of this `theme/` directory (the zip must contain `layout/`, `sections/` … at the top level, *not* a `theme/` wrapper), then Online Store → Themes → Add theme → Upload zip.
3. **Or connect this repo** — Online Store → Themes → Add theme → **Connect from GitHub**, pick this repository and branch. **Every push then deploys.** This is the "agent" answer: the repo is the agent.

Preferred is (3), so changes here go live without a manual step.

## Brand image (top of the home page)

Theme editor → Home page → **Brand image**. Choose a landscape picture at least 2400px wide, and optionally a portrait one for phones. Without a phone picture, the landscape one is cropped to 4:5 around its focal point, so set the focal point on the image (Content → Files, or the image's Edit menu). Type sits below the picture, never on it (D16). Until a picture is chosen, the section shows a plain daylight study.

## The bag and checkout

Add to bag opens the bag drawer (`sections/bag-drawer.liquid`) instead of leaving the page. The drawer is re-rendered by Shopify after every change, through the Section Rendering API, so the bag has one template. Without JavaScript everything still works through the plain `/cart` page, which uses the same lines and footer (`snippets/bag-line`, `snippets/bag-foot`). See D17.

Checkout is Shopify's own. What to set in the admin so it matches the store:

1. **Settings → Payments.** Turn on Shopify Payments, then Apple Pay, Google Pay and Shop Pay. Their express buttons and the card marks appear in the bag on their own; nothing to change in the theme.
2. **Settings → Checkout → Customize.** Add the lockup (`brand/logo/hikari-lockup-ink-1200.png`, on the `claude/busy-mccarthy-wbjzvh` branch) and set the colours to paper `#EFF0EC`, sumi `#14171A` and ai `#2E4B6B` for buttons.
3. **Guest checkout.** Make sure customers are not required to sign in (Settings → Customer accounts).
4. **Settings → Shipping and delivery.** Make UK delivery free over £100, so the total in the bag is what checkout charges (D12, D17).

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
