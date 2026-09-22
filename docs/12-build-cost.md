# 12 — What the Build Costs

Running cost is settled in [11](11-platform.md): **£19/month** (Shopify Basic, annual billing) plus **2% + 25p** per sale. This document is the **one-off cost to get the store built and live**.

UK, 2026. Ranges are market rates from the sources linked; the specific figures for this project are estimates and marked as such.

---

## The number that reframes everything

**The design is the expensive part of a Shopify build, and for Hikari it is already done.**

UK agencies quote **£3,000–£10,000 for the design phase alone** — wireframes, visual design, responsive comps across templates ([Frooition](https://www.frooition.com/blog/custom-shopify-website-design-cost-2026/)). That is substantially the work already sitting in this repo and the three prototypes: palette with measured contrast ([08](08-brand.md)), lockup spec ([10](10-logo.md)), homepage layout and scale ladder ([04](04-site-ia.md)), product-page anatomy, grain and scroll-colour systems, working code for all of it.

So you are buying **build**, not design. Quote the job that way and the number should come in well under the headline bands below. Anyone quoting you a full design phase has not looked at what exists.

---

## Four routes

### A · Build it here, you configure — **£0 labour**
Convert the prototypes to a Liquid theme: sections and templates, settings schema, metafields for grade / measurements / maker's mark / provenance, cart and product templates, the Record collection, notification templates.

*Estimate: 2–4 weeks part-time.* Cash cost is the platform only.
**Risk:** no one to call at 9pm when checkout breaks on a drop night. You own maintenance.

### B · Freelancer converting the existing design — **£2,000–£6,000**
UK freelance Shopify developers run **£40–£150/hour**, day rates **£250–£600** ([Charle](https://www.charle.co.uk/articles/what-is-a-shopify-developer/), [5MS](https://5ms.co.uk/shopify-developers-cost-hiring-red-flags-2026-guide/)). Custom theme development is quoted at **£1,000–£5,000+** ([Trisec](https://trisec.io/shopify-development-cost-uk/)).

*Estimate for this job from a finished design: 8–15 days.* At ~£400/day that is **£3,200–£6,000**; a competent mid-level freelancer could land nearer £2,500.

### C · Agency — **£8,000–£20,000**
The UK agency band for a properly scoped Shopify project is **£3,000–£12,000**, with custom-*designed* stores at **£8,000–£20,000** ([Trisec](https://trisec.io/shopify-development-cost-uk/), [Frooition](https://www.frooition.com/blog/custom-shopify-website-design-cost-2026/)). Agency rates £80–£200/hour.

**Not justified here.** Agencies earn their fee on discovery, design and integrations. You have the first two and no integrations.

### D · Premium theme + customisation — **£1,600–£8,300** · *worst fit*
Theme £80–£320 one-off, customisation **£1,500–£8,000**.

Cheap on paper, wrong in practice: a premium theme is built around a component system that will actively fight the grain overlay, the scroll-driven colour and the asymmetric featured composition. **You would be paying to break something in order to rebuild it.** Starting from a blank theme is less work than defeating someone else's.

---

## Everything else in the launch budget

The website is not the whole bill. Estimates — verify each.

| Item | Cost | Note |
|---|---|---|
| Shopify, year 1 | **£228** | £19/mo annual. First 3 months often £1/mo on promo. |
| Domain | **£10–15/yr** | |
| Theme | **£0** | Built from scratch |
| Apps | **£0–30/mo** | Ship with none. Reviews can wait; email is included ([11](11-platform.md)) |
| UK trademark, 2 classes | **~£220** | ~£170 first class + £50 additional, filed online. **Verify with the IPO.** [99](99-open-questions.md) #4 |
| IP solicitor review | **£300–800** | One to two hours on trademark use ([04](04-site-ia.md)) |
| Accountant — VAT and imports | **£150–300** | The blocking hour ([06](06-unit-economics.md)). Highest-return spend available |
| Photography setup | **£100–200** | Tripod, backdrop paper, a reflector. Daylight is free ([08](08-brand.md)) |
| Packaging, first run | **£150–400** | Boxes, tissue, cards, tape |

### The line people underestimate

**Photography, if outsourced, will cost more than the website.** At £15–40 per piece and 60–100 pieces for an opening catalogue, that is **£900–£4,000** — and it recurs with every batch forever. Shooting it yourself is 45–60 minutes per piece ([06](06-unit-economics.md)), which is the real constraint on the whole business. Neither is cheap. It is worth deciding deliberately rather than discovering it.

---

## Totals to launch

| Scenario | Build | Everything else | **Total** |
|---|---|---|---|
| **Lean** — built here, you configure | £0 | £900–1,900 | **£900–1,900** |
| **Lean + safety net** — plus a freelancer retained to review and harden | £800–1,500 | £900–1,900 | **£1,700–3,400** |
| **Outsourced build** | £2,500–6,000 | £900–1,900 | **£3,400–7,900** |
| **Agency** | £8,000–20,000 | £900–1,900 | **£8,900–21,900** |

All exclude inventory.

---

## The comparison that should decide it

Phase 0 inventory is budgeted at **£1,500–2,500** for 20–30 pieces ([07](07-roadmap.md)). At a landed cost around £80 a piece:

> **Every £1,000 spent on the website is roughly 12 pieces of stock not bought.**

An agency build at £10,000 is **125 pieces** — more than a full opening catalogue, spent before a single customer has proved they will pay £185 to a stranger.

The moat is stock and access, not the storefront ([02](02-positioning.md)). The storefront has to be good; it does not have to be expensive, and it is the one part of this business that can be rebuilt later for a fraction of what it costs to buy inventory twice.

## Recommendation

**Lean + safety net: roughly £1,700–3,400 to launch.**

Build the theme here from the prototypes. Hold **£800–1,500** for a UK Shopify freelancer to review the finished theme before launch, fix what they find, and stay available on a day rate afterwards. You get an original storefront, a professional's eyes on the checkout path, and someone to call — for a quarter of an agency quote and without spending the opening catalogue.

Then revisit at scale. A £5,000 rebuild is easy to justify against proven revenue and impossible to justify against a hypothesis.

## Open

- Freelance scoping is an estimate until someone quotes the actual job. Brief them as **conversion of a finished design**, and send them [08](08-brand.md), [04](04-site-ia.md) and the prototypes.
- Trademark fees, and whether two classes or one.
- Photography: in-house or outsourced. Logged as [99](99-open-questions.md) #34.
