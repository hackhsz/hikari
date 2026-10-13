# Thread 1 · Shop — the Shopify channel and the site

Everything a customer touches on the owned site: the theme, the store's settings, products, checkout and deployment.

**Owns:** this folder, plus [`theme/`](../theme/) and [`scripts/`](../scripts/), which stay at the repo root because the Shopify sync reads `theme/` from there.
**Read first:**
- [04 Site & IA](04-site-ia.md)
- [11 Platform](11-platform.md)
- [21 Checkout](21-checkout.md)
- [theme/README](../theme/README.md)
- D7, D8, D16, D17, D22 and D23 in [DECISIONS](../0-plan/DECISIONS.md)

---

## Where it stands · 13 Oct 2026

**Decided and built.** Shopify Basic, Shopify Payments and a hand-built Liquid theme ([D7](../0-plan/DECISIONS.md)). Checkout is Shopify's own. What's in the theme:

- **Homepage:** a brand image first ([D16](../0-plan/DECISIONS.md)), then the Alcove, three featured pieces, houses set as display type, the story, recent pieces and the Record ([D8](../0-plan/DECISIONS.md)).
- **Product page:** the four frames, with frames 2 and 4 labelled *Unretouched* ([D10](../0-plan/DECISIONS.md)). The information sits beside the image, never on it.
- **Bag drawer** ([D17](../0-plan/DECISIONS.md)): one of one, so no quantity controls, and a piece is never shown as held. Since 13 Oct ([D23](../0-plan/DECISIONS.md), [21](21-checkout.md)) it also shows a piece that sold while in the bag, a delivery line, a gift note and a cut-off notice.
- **House pages** ([D22](../0-plan/DECISIONS.md)): one per designer at `/collections/vintage-{house}-jewellery`, with the pieces in stock, notes on the house, the marks by period, the house's Record and the disclaimer. The homepage band and the product page link to them, and *More from this house* sits under every piece. The words wait on [Thread 3](../3-copy/README.md).
- **Phone menu.**
- **Grain and scroll-driven colour,** both adjustable in theme settings.
- **No hard-coded brand name.** The name is a theme setting, because it may change ([18](../0-plan/18-name-clearance.md)).
- **Pictures before photography.** A product without photographs shows a drawn daylight study, so the store looks finished before photography exists.

**Deployment.** The store reads the theme from a branch, not from `main`:

| Branch | What it holds | State |
|---|---|---|
| `shopify` | `theme/` from 22 Sept | **No bag drawer, brand image or phone menu yet** |
| `shopify-preview` | `theme/` as of 12 Oct | **Behind the trunk:** no house pages or D23 bag changes yet |

[`scripts/sync-theme.sh`](../scripts/sync-theme.sh) splits `theme/` out into the `shopify` branch. It merges first if Shopify has saved Customize changes back to that branch. As of today it hasn't, so nothing has been lost.

**Not built yet:**
- Customer account templates
- Gift cards
- Collection pagination
- Predictive search
- The three trust pages: authentication, condition grades and the retouching policy. These wait on copy from [Thread 3](../3-copy/README.md).

## Before the first real sale

| | Item | Ref |
|---|---|---|
| ☐ | Settings → Taxes: **charge no VAT**. A store left on defaults adds a VAT line, and showing VAT while unregistered is an offence | [#55](../0-plan/99-open-questions.md) |
| ☐ | Legal details in theme settings: registered name, company number, registered office | [#56](../0-plan/99-open-questions.md) |
| ☐ | Shopify Payments approval. It needs the UK company and a business bank account, so start it before launch week | [#29](../0-plan/99-open-questions.md), [#53](../0-plan/99-open-questions.md) |
| ☐ | Every product: quantity **1**, and "continue selling when out of stock" **off** | [theme/README](../theme/README.md) |
| ☐ | Who pays return postage, and how the label is issued | [#32](../0-plan/99-open-questions.md) |
| ☐ | Klarna / Clearpay only after checking the current FCA rules | [#14](../0-plan/99-open-questions.md) |
| ☐ | The three trust pages are live | [Thread 3](../3-copy/README.md) |

## Open

- **The name ([#57](../0-plan/99-open-questions.md)).** It blocks the domain ([#60](../0-plan/99-open-questions.md)), not the build. The theme renames with two settings.
- **Scroll colour and full-page blend modes on a mid-range Android** ([#26](../0-plan/99-open-questions.md)). Test before relying on them.
- **Branded resale can trigger payment-processor review or reserves** ([#30](../0-plan/99-open-questions.md)). The per-piece acquisition record is the mitigation ([2-photos](../2-photos/README.md), stage 0).

## Next

1. **Put the trunk on preview and try it on the store:** the house pages and the D23 bag. Then decide whether it all goes live; if yes, run `scripts/sync-theme.sh` from `main`.
2. **Work through [21 Checkout](21-checkout.md):** the admin settings in order, then the test script on the development store with Bogus Gateway.
3. **Create the house collections** ([theme/README](../theme/README.md), *House pages*), and ask Thread 3 for the first house's words: Christian Dior.
4. **Load the first real pieces** once [Thread 2](../2-photos/README.md) has shot them, using the metafields in [theme/README](../theme/README.md): piece, grade, condition, size, mark, era, provenance.
5. **Build the three trust pages** as soon as [Thread 3](../3-copy/README.md) has the text.
6. **Card payments at market stalls.** Shopify POS with a card reader, if [Thread 4](../4-markets/README.md) books a stall.

## Start a session for this thread

```
This is the Hikari shop thread (Thread 1: the Shopify channel and site).
Read CLAUDE.md, then 1-shop/README.md, then theme/README.md.
Tell me where the thread stands in five lines and propose the next three
actions. Don't change anything until I pick one. Work from the latest main.
```
