# 11 — Platform & Checkout

> **The question:** build checkout on Stripe, use Shopify, or go another route?

## Recommendation

**Shopify Basic + Shopify Payments + a custom-built theme.**

The question dissolves once you know one fact: **Shopify Payments is powered by Stripe** ([source](https://shopify.ecom-store.pro/blog/shopify-payments/)). "Build it on Stripe" is not an alternative to Shopify — it is what Shopify Payments already is, with the commerce layer supplied.

And there is a trap worth naming immediately: **using Stripe as a third-party gateway on Shopify is the worst available option.** You pay Stripe's rate *and* Shopify's third-party penalty. Never do that.

---

## The numbers

UK, 2026. **Verify before committing — these move.**

**Plans** (annual billing; annual saves ~25%) — Basic **£19/mo**, Grow **£49/mo**, Advanced **£259/mo**, Plus from **£1,800/mo** ([Charle](https://www.charle.co.uk/articles/shopify-pricing/)).

**Shopify Payments card rates (UK)** — Basic **2% + 25p** · Grow **1.7% + 25p** · Advanced **1.5% + 25p**.

**Third-party gateway penalty**, charged *on top of* that gateway's own fees, waived entirely if you use Shopify Payments — Basic **2%** · Grow **1%** · Advanced **~0.5–0.6%** (sources differ slightly) ([Shopify Help](https://help.shopify.com/en/manual/your-account/manage-billing/billing-charges/types-of-charges/third-party-charges/third-party-transaction-fees)).

**Stripe direct (UK)** — **1.5% + 20p** standard UK cards · 1.9% + 20p premium UK · 2.5% + 20p EEA · 3.25% + 20p international · **+2%** if Stripe converts currency ([Stripe fees UK](https://www.wearefounders.uk/stripe-fees-uk-2026/)). Stripe Tax, if used, is a further **0.5%** of taxed volume.

### On a £180 sale

| Route | Per sale | Note |
|---|---|---|
| **Shopify Basic + Shopify Payments** | **£3.85** | 2% + 25p |
| Stripe direct, custom build | **£2.90** | 1.5% + 20p |
| Shopify Basic + Stripe as a gateway | **£6.50** | £2.90 + £3.60 penalty. **Never.** |

At 30 sales a month: Shopify **£134.50/mo** all-in (fees + plan) against a custom Stripe build at **£87/mo**.

**The difference is about £47 a month. £565 a year.**

---

## What that £565 a year would have to buy

Going custom means building and then maintaining, forever: cart and checkout, one-of-one inventory with correct sold-out behaviour, order management, shipping labels and tracking, returns and refunds, transactional email, discount codes, abandoned-cart recovery, UK VAT configuration, GDPR and cookie consent, PCI scope, fraud screening, analytics, a CMS for the editorial pages, search, and the sold-piece archive that [04](04-site-ia.md) calls The Record.

That is months of build and a permanent maintenance tax, to save £565 a year. It is not close.

And the constraint people usually go custom to escape **does not apply here**. Shopify's checkout is non-negotiable below Plus — and going headless with Hydrogen *still uses Shopify's checkout* ([Weaverse](https://weaverse.io/blogs/shopify-headless-checkout)). So the headless route does not answer the Stripe question at all; it only changes how the storefront is built.

## Design freedom is not the constraint

Worth stating plainly, because it is the usual reason to reach for a custom build: **a custom Liquid theme gives you full control of every page except checkout.**

Everything in the prototypes — the grain overlay, the scroll-driven colour interpolation, the asymmetric 12-column featured composition, the canvas plates, the lockup in a difference-blend masthead — is ordinary front-end work inside a Shopify theme. Nothing about it needs Hydrogen and nothing about it needs a bespoke platform. Build the theme from scratch rather than buying one; that is where the design budget goes.

The checkout itself can carry the logo, colours and typefaces. It cannot be rebuilt below Plus, and it does not need to be: a conventional checkout at the end of a highly art-directed site is *reassuring* at £180 from an unknown seller — which is the argument in [03](03-customer.md).

---

## Two things that need attention early

**Shopify Payments approval.** Requires the UK company and business bank account ([07](07-roadmap.md) Phase 1). Do not leave it to launch week.

**Branded resale is a category payment processors watch.** Selling goods carrying Dior, Chanel and YSL marks can attract counterfeit-risk review, holds, or reserves. The mitigation is the acquisition record already required for the trademark exhaustion defence in [04](04-site-ia.md) — invoice, lot number, seller, date, photographs on arrival, for every piece. One process, now three purposes: margin scheme, exhaustion defence, processor review. Build it into intake from piece number one.

## Also considered

- **Shopify Starter** (buy buttons and payment links, no storefront) — genuinely fits [07](07-roadmap.md) **Phase 0**, where the point is to sell 20 pieces with no website. Cheap way to take card payments off Instagram. *Verify current price.*
- **Squarespace / Webflow commerce** — fine sites, weaker commerce, and less control than a hand-built Liquid theme for this specific design.
- **Medusa, Swell, self-hosted** — all the custom-build costs above, plus hosting.
- **Marketplaces only** — rejected at [D1](DECISIONS.md).

## When to revisit

- **Basic → Grow at roughly £10,000/month revenue.** The rate drops 0.3% (2% → 1.7%) while the plan rises £30/mo, so the crossover is £30 ÷ 0.003 = **£10,000/month**. Below that, Basic wins; above it, Grow does. Set the review at £8,000.
- **Grow → Advanced** at roughly £105,000/month. Not a year-one question.
- **Headless** only if the storefront genuinely outgrows Liquid. It costs the theme editor — every content change starts needing a developer ([Weaverse](https://weaverse.io/blogs/is-shopify-hydrogen-actually-headless-2026-architecture-debate)) — which is a bad trade for a business publishing a new Edition every Thursday.
- **Stripe direct** only if leaving Shopify altogether, which means rebuilding everything above. Not foreseeable.

## Note on VAT

Per [D4](DECISIONS.md) and [09](09-payments-and-tax.md), the recommendation is card checkout with **no VAT registration while under the threshold**. Shopify must therefore be configured **not to charge VAT** — a settings change there, and one more thing to get right by hand on a custom build. Revisit at £75k rolling turnover.
