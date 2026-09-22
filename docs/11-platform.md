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

---

## Revision · 2026-09-22 (ii) — the inventory argument was weak

**Conceded.** With 60–100 hand-listed one-of-one pieces, no 3PL and no automation, Shopify's inventory engine is not a reason to choose it. That argument is withdrawn. Re-examined below on the grounds that do decide it.

### The one thing that *is* an inventory problem

Not managing stock — **preventing a double sale on a one-of-one piece at the drop.** Taking £185 from someone and then telling them the piece is gone is the worst outcome available, and it is most likely to happen at 19:00 on Thursday when everyone arrives at once.

**Stripe handles this cleanly in the no-code route:** Payment Links support *"limit the number of payments"*, and the link auto-deactivates at the limit with a message you can customise ([Stripe docs](https://docs.stripe.com/payment-links/customize)). Set it to 1 and the piece cannot be sold twice.

It is **not** automatic in a custom Stripe Checkout build — there you implement reservation yourself: create the session, hold the item, release it on expiry or abandonment. Ordinary work, and the classic race-condition bug, firing hardest at exactly the wrong moment.

---

## Compliance — what Stripe actually covers

### Stripe covers, properly

- **PCI DSS.** Hosted Checkout or Payment Links keep you at **SAQ A**, the simplest form — no card data touches your servers ([Stripe](https://stripe.com/guides/pci-compliance)). Note it reduces scope rather than removing the obligation: you still complete the SAQ yourself.
- **SCA / 3D Secure 2.** Required for UK online card payments under the Payment Services Regulations 2017. Stripe handles it with no integration work.
- **Tax calculation**, via Stripe Tax at 0.5% of taxed volume — **not needed** while unregistered under [D4](DECISIONS.md), and a cost to avoid switching on by reflex.

**One trap.** If you embed a custom card form (Stripe Elements) to keep the checkout on-brand, you take on **PCI DSS 6.4.3 and 11.6.1** — client-side script integrity monitoring, new in PCI DSS 4.0 ([analysis](https://cside.com/blog/can-you-use-stripe-for-pci-dss)). Use hosted Checkout and you stay at SAQ A. The design instinct is exactly the one that creates the obligation.

### Stripe does not cover — and this is the compliance that actually bites

None of the following is a payments problem, so no processor solves it:

- **Consumer Contracts Regulations 2013** — the 14-day right to cancel, the pre-contract information, the model cancellation form. Mandatory for UK distance selling ([03](03-customer.md)).
- **Consumer Rights Act 2015** — description accuracy, which for graded secondhand goods is the live risk.
- **UK GDPR and PECR** — you are the data controller in both architectures. Privacy policy, cookie consent, subject access requests, retention.
- **Accessibility**, and the **trademark disclaimer** in [04](04-site-ia.md).

Shopify does not magically supply consumer-law compliance either. What it supplies is the **furniture the regulations assume**: policy templates, a returns workflow, and the notification set below. On a custom build, each of those is a thing you write.

---

## Messaging and notifications — the real gap

**Stripe sends one email: the payment receipt.** Plus a refund notification. That is the whole set.

It does not send an order confirmation with the delivery address and estimate, a dispatch notification with tracking, a delivery notification, return or refund status updates, or abandoned-checkout recovery. At £185 from a seller she has never heard of, **the dispatch email with a tracking number is the moment the customer stops worrying** — it is part of the trust architecture in [03](03-customer.md), not an operational nicety.

**Shopify ships all of them**, editable in Liquid: order confirmation, shipping confirmation with tracking, out for delivery, delivered, cancellation, refund, abandoned checkout ([Shopify Help](https://help.shopify.com/en/manual/fulfillment/setup/notifications/customizing-notification-template)).

**And the marketing side, which decides the Edition strategy in [05](05-social.md):** Shopify Messaging gives **10,000 free emails per calendar month** on Basic and above, then ~$1 per 1,000; abandoned-checkout automations never count against it ([Shopify](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/shopify-email/shopify-email-cost)).

At 1,000 subscribers × 4 Editions a month = 4,000 sends. **Free.** The weekly drop — the single highest-leverage ritual in [05](05-social.md) — costs nothing to run.

On a Stripe build the same capability needs a transactional provider (Resend, Postmark), a marketing ESP (Klaviyo, Buttondown, Mailchimp), every template written from scratch, and SPF/DKIM/DMARC set up and monitored.

### What this does to the arithmetic

The £565/year saving does not survive it. At 30 sales a month (£5,400 revenue):

| | Monthly |
|---|---|
| **Shopify Basic + Shopify Payments** | £19 plan + £115.50 fees, 10k emails included = **£134.50** |
| **Custom Stripe** | £87 fees + hosting £0–20 + transactional £0–15 + ESP £20–40 = **£107–162** |

**Roughly cost-neutral, and plausibly worse.** The saving was an artefact of not pricing the email stack.

*(Note: £19 is the annual-billing rate; monthly billing is higher.)*

### Shipping labels, thrown in

Shopify buys Royal Mail, Evri and DPD labels at its own negotiated rates from a UK location — merchants report Tracked 48 at roughly half the Click & Drop price ([Shopify Help](https://help.shopify.com/en/manual/fulfillment/fulfilling-orders/shipping-labels/shipping-carriers/royal-mail)). On 30 parcels a month that is real money and, more to the point, real time. Caveats: the negotiated rates do not extend to return labels, and Evri is domestic only.

---

## Revised recommendation

**Unchanged in conclusion, changed in reasoning: Shopify Basic + Shopify Payments + a custom Liquid theme.** Not for inventory. For order-lifecycle email, shipping labels, a returns workflow, and the fact that it is cost-neutral once the email stack is priced honestly.

The deciding constraint is the one in [06](06-unit-economics.md): **the ceiling on this business is sourcing throughput and the 45–60 minutes per piece.** Platform work is time not spent on the only thing that compounds.

### Where Stripe is genuinely the right answer

**Phase 0, and it is a better fit than what [07](07-roadmap.md) currently says.** Stripe **Payment Links** for the first 20 pieces: no monthly fee, no website, links from Instagram, `limit payments = 1` per piece so nothing can be double-sold, receipts automatic, PCI at SAQ A. That *is* the no-website test. Use it.

Its limits are the reason it does not become the shop: **no cart** (two pieces means two checkouts and two shipping charges), no dispatch emails, no returns flow, and no customer list to build the Edition on.

### If you want the Stripe build anyway

It is defensible — not obviously wrong, just a different allocation of your time. The honest stack, so the decision is made with the bill visible:

1. Static site (Astro or Next) on Vercel — the design work is identical either way.
2. **Stripe hosted Checkout**, not Elements, to stay at SAQ A.
3. Reservation logic for one-of-one stock, written and tested against the drop spike.
4. Webhook handler → order record in a database.
5. Transactional email (Resend/Postmark) with templates written for confirmation, dispatch and delivery.
6. Marketing ESP for the Edition, with list sync.
7. Returns: a process and an address, since Stripe gives you a refunds API and nothing else.
8. Royal Mail Click & Drop, manually, at retail rates.
9. Policy pages, cookie consent, DSAR process.

At 30 orders a month, items 4–8 are perhaps an hour a week of manual work — survivable. At 60 they are not, and that is the same month the sourcing gets harder.

**A migration note that matters:** Shopify → custom later is easy (export orders and customers, keep the URLs). Custom → Shopify later means rebuilding the front end against Liquid. If you are unsure, the reversible choice is Shopify.
