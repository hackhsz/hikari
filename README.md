# Hikari — Shopify theme

Custom Liquid theme built from the prototypes. Palette B ([`brand/tokens.css`](../brand/tokens.css)), lockup per [`brand/10-logo.md`](../brand/10-logo.md), layout per [`1-shop/04-site-ia.md`](../1-shop/04-site-ia.md).

## Getting it live today — free, no card

1. **Create a free development store.** [partners.shopify.com](https://partners.shopify.com) → Stores → Add store → **Development store**. Free, unlimited time, no payment details.
2. **Upload the theme.** Zip the contents of this `theme/` directory (the zip must contain `layout/`, `sections/` … at the top level, *not* a `theme/` wrapper), then Online Store → Themes → Add theme → Upload zip.
3. **Or connect this repo** — Online Store → Themes → Add theme → **Connect from GitHub**, pick this repository and branch. **Every push then deploys.** This is the "agent" answer: the repo is the agent.

Preferred is (3), so changes here go live without a manual step.

## Brand image (top of the home page)

Theme editor → Home page → **Brand image**. Choose a landscape picture at least 2400px wide, and optionally a portrait one for phones. Without a phone picture, the landscape one is cropped to 4:5 around its focal point, so set the focal point on the image (Content → Files, or the image's Edit menu). Type sits below the picture, never on it (D16). Until a picture is chosen, the section shows a plain daylight study.

## The bag and checkout

Add to bag opens the bag drawer (`sections/bag-drawer.liquid`) instead of leaving the page. The drawer is re-rendered by Shopify after every change, through the Section Rendering API, so the bag has one template. Without JavaScript everything still works through the plain `/cart` page, which uses the same lines and footer (`snippets/bag-line`, `snippets/bag-foot`). See D17 and D23.

What the bag does, beyond the lines and the total:
- **A piece that sold while in the bag** shows *Sold since you added it*. It leaves the total, and Checkout waits until it's removed. The bag asks Shopify again each time it opens, and when someone comes back from checkout.
- **Delivery line.** Free at or over **Theme settings → Bag & checkout → Free UK delivery from** (default £100). Below it: *Added at checkout*, and the total becomes a subtotal. **Keep that number equal to the free rate in Settings → Shipping and delivery.**
- **Gift note.** It reaches the order as cart attributes `Gift` and `Gift note`, under Additional details. The promise shown under it is a setting. **Only promise what's done at packing.**
- **Bag notice.** One line above the total, for delivery cut-offs. Empty hides it.

Checkout itself is Shopify's own. Every admin setting it needs, in order, and the test script are in [21 — Checkout](../1-shop/21-checkout.md).

## House pages

One page per designer at `/collections/vintage-{house}-jewellery`, per [04](../1-shop/04-site-ia.md) and D22. Template `collection.house`: the house set large, a lede, the pieces in the shop, notes on the house, a *Reading the mark* table, this house's sold pieces from the Record, the other houses and the trade mark disclaimer. All the words live on the collection, so a new house needs no deploy.

**Once, under Settings → Custom data → Collections**, namespace **`hikari`**:

| Key | Type | What it is |
|---|---|---|
| `lede` | Multi-line text | One or two sentences under the name |
| `marks` | Multi-line text | One mark per line: `Period \| Mark as it reads \| Note`. The note is optional |
| `house` | Single line text | Optional. The name to set large, if it should differ from the Vendor |

**Per house**, Products → Collections → Create collection:
1. **Title:** *Vintage Christian Dior jewellery*. **Description:** the 200–400 words of editorial, from [Thread 3](../3-copy/README.md).
2. **Automated**, condition **Product vendor is equal to Christian Dior**, sorted **newest first**. Sold pieces stay in it; the page splits them into the shop and the Record.
3. **Theme template:** `collection.house`.
4. **Search engine listing → URL handle:** `vintage-christian-dior-jewellery`. The homepage *Shop by house* band, the product page's House row and *More from this house* all find the page by this handle. Until it exists they link to Shopify's vendor listing, so no house link is ever dead.

`/collections` then lists only the houses.

## Name is not hard-coded — on purpose

Per [`0-plan/18-name-clearance.md`](../0-plan/18-name-clearance.md), the name may have to change. It is a single theme setting:

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

- **Settings → Taxes: charge no VAT.** Charging or displaying VAT while unregistered is an offence ([`0-plan/16-vat.md`](../0-plan/16-vat.md)). The store will add a tax line on defaults — turn it off and check it again after any settings change.
- **Theme settings → Legal:** company name, number and registered office. Required by the Companies Act and the E-Commerce Regulations 2002.
- Inventory: **quantity 1**, "continue selling when out of stock" **off**. One of one means one.

## Photography — it works before you have any

Any product without an image renders a drawn daylight study at the right tonality and aspect, so the store is presentable from day one. Real photographs replace them automatically.

**Frames 2 and 4 are labelled "Unretouched" and carry no grain** — the maker's-mark macro and the condition frame are evidence ([D6](../0-plan/DECISIONS.md), [D10](../0-plan/DECISIONS.md)).

## Settings worth knowing

Grain strength and animation, and the scroll-driven colour, are all theme settings — dial the grain down if it fights the photography once real images land ([`brand/08-brand.md`](../brand/08-brand.md)).

## Not yet built

Customer account templates, gift cards, pagination on collection, predictive search, the authentication and condition-grade content pages, and the house pages' words (Thread 3). None blocks a preview.
