# 99 — Open Questions

Everything unresolved, ordered by how much damage it does if left unanswered.

## Blocking

| # | Question | Why it matters | Where |
|---|---|---|---|
| 1 | **Can imported second-hand goods use the VAT margin scheme?** | Imported goods are generally excluded, with narrow exceptions. If the exclusion applies, roughly 20% of the sale price is tax rather than roughly 1/6 of the margin — this moves the whole model. **Answer in week one.** | [06](06-unit-economics.md) |
| 2 | Register for VAT voluntarily from day one? | Unregistered means import VAT is unrecoverable cost. Depends on (1). | [06](06-unit-economics.md) |
| 3 | Correct 10-digit commodity code, and whether UK–Japan CEPA preference applies | Almost certainly *not* — French-origin goods routed through Japan. Wrong code = overpayment or penalty. | [06](06-unit-economics.md) |
| 4 | Is "Hikari" clear in UK Class 14 and 35, with domain and handle available? | Cheap to check, expensive to get wrong after brand design. | [00](00-brief.md) |

## Important

| # | Question | Where |
|---|---|---|
| 5 | Real landed cost per piece — every `[ASSUMED]` in the model | [06](06-unit-economics.md) |
| 6 | Does the Japan sourcing story move a UK buyer, or is it founder-romance? A/B it in Phase 0 | [02](02-positioning.md), [07](07-roadmap.md) |
| 7 | How much Chanel to carry, given it is the most litigious rights-holder in the category | [04](04-site-ia.md) |
| 8 | Founder-forward or brand-anonymous? Converts better; a real personal commitment | [05](05-social.md) |
| 9 | Does "Japanese editorial" read as premium to a UK audience, or as under-designed? | [02](02-positioning.md) |
| 10 | Serve the collector segment properly? Higher AOV, cheapest acquisition, real ongoing scholarship cost | [03](03-customer.md) |
| 11 | UK REACH nickel-release limits on vintage earrings — a genuine grey area | [04](04-site-ia.md) |
| 12 | Hallmarking exposure on unmarked Japanese sterling silver | [04](04-site-ia.md) |

## Later

| # | Question | Where |
|---|---|---|
| 13 | Brand Off B2B verification requirements and timeline | [06](06-unit-economics.md) |
| 14 | Current BNPL/FCA requirements before switching Klarna on | [03](03-customer.md) |
| 15 | Current marketplace fee rates (they change) before modelling the marketplace channel | [01](01-landscape.md) |
| 16 | JPY exposure — at what volume is hedging worth the complexity? | [06](06-unit-economics.md) |
| 17 | First Japan buying trip before or after launch? | [05](05-social.md) |

---

## Things asserted here that have **not** been verified

Stated plainly so they are not mistaken for findings:

- All tax and customs treatment is reasoned from general sources, not from advice. **Confirm before relying on any of it.**
- The customer segment split (55/25/20) is a planning estimate, not a finding.
- All unit-economics figures are illustrative placeholders.
- Competitor prices were observed on a single date and will have moved.
- The comparison-set brands (Missoma, Monica Vinader, Astrid & Miyu, Otiumberg) were named from general knowledge, not from a live price check.
- Nothing here has been tested against a single real customer.

---

## Update · 2026-09-21

### Resolved
- **#9 — aesthetic direction.** Decided: Japanese editorial ([D2](DECISIONS.md), specified in [08](08-brand.md)). The *sub*-question — does it read as premium to a UK audience, or as under-designed? — stays open and is still worth a two-variant landing-page test before the full build.
- **Physical retail sequencing.** Decided: prove the website first ([D3](DECISIONS.md)). Signal to move is ≥60% 90-day sell-through over two quarters.
- **Naming.** Decided: the home is Hikari; the rituals carry the names ([D5](DECISIONS.md)).

### Newly open

| # | Question | Where |
|---|---|---|
| 18 | **Payment rails — confirm card checkout over peer-to-peer.** Recommendation is unambiguous; awaiting your call. Blocks the Shopify build. | [09](09-payments-and-tax.md), [D4](DECISIONS.md) |
| 19 | Set the rolling-turnover alert at £75k and decide who watches it monthly | [09](09-payments-and-tax.md) |
| 20 | Licensed type (Canela + Suisse) vs. free (Newsreader + Inter). Free can launch. | [08](08-brand.md) |
| 21 | Define Grades I–IV precisely, and write the published condition scale | [08](08-brand.md), [04](04-site-ia.md) |
| 22 | Which day and hour is Edition night? Once chosen, never move it. | [05](05-social.md) |

### Note on #1

Margin-scheme eligibility is **still the blocking question**, and the payment-rail discussion did not touch it. It is unaffected by how money is collected and remains the single highest-return hour available. Book the accountant.

## Update · 2026-09-22

| # | Question | Where |
|---|---|---|
| 23 | **Palette A, B, or C.** B (cool grey + indigo) recommended; C = B's grounds with persimmon kept as the single accent. Specimen published. | [08](08-brand.md) |

**#20 narrowed:** free type pairing is **Newsreader + Instrument Sans** (Instrument Sans replaces Inter — see [08](08-brand.md)). Licensed upgrade path unchanged: Canela + Suisse Int'l.

**Contrast corrections applied** to both palettes; the values originally in [08](08-brand.md) failed WCAG AA at body size. Canonical tokens now in [`brand/tokens.css`](../brand/tokens.css).

## Update · 2026-09-22 (ii)

| # | Question | Where |
|---|---|---|
| 24 | **What "用画" means** — imagery at large scale (assumed), or actual paintings/artworks as backdrops? The latter is public-domain-only and is its own cliché in vintage retail. | [08](08-brand.md) |
| 25 | Confirm the hard rule: grain on frames 1 and 3, never on 2 (maker's mark) and 4 (condition). Grain hides exactly what [03](03-customer.md) says must be visible. | [08](08-brand.md) |
| 26 | Scroll-colour and full-page blend-mode need testing on a real mid-range Android before Phase 1 commits to them | [08](08-brand.md), [07](07-roadmap.md) |

## Update · 2026-09-22 (iii)

### Resolved
- **#18 — payment rails.** Card checkout confirmed, via Shopify Payments ([D7](DECISIONS.md), [11](11-platform.md)).
- **#23 — palette.** Treating **B (銀鼠)** as adopted: the supplied lockup specimen is built on palette B's tokens throughout. **Confirm explicitly** — it is currently inferred, not stated.
- **#20 — type.** Newsreader for Latin, **Noto Serif JP** for the kanji ([10](10-logo.md)). Instrument Sans remains the UI face.

### Newly open

| # | Question | Where |
|---|---|---|
| 27 | **Mincho or gothic for the kanji** — a voice decision, not a weight one. Mincho reads *written* and editorial; gothic reads *neutral* and Muji-like, which is closer to what [02](02-positioning.md) argues for. If gothic wins, the Latin must go gothic too. | [10](10-logo.md) |
| 28 | Verify Shopify Starter's current price for Phase 0 payment links | [11](11-platform.md) |
| 29 | Shopify Payments approval needs the UK company and business bank account — start it before launch week | [11](11-platform.md), [07](07-roadmap.md) |
| 30 | Branded resale can attract processor counterfeit-risk review, holds or reserves. Mitigation is the per-piece acquisition record already required for the exhaustion defence — now serving three purposes. | [11](11-platform.md), [04](04-site-ia.md) |

## Update · 2026-09-22 (iv)

**#18 re-confirmed on better grounds** ([D7a](DECISIONS.md)). The inventory argument is withdrawn; the decision now rests on order-lifecycle email, the included 10k/month send allowance that makes the Edition free to run, shipping labels, and cost-neutrality once the email stack is priced.

| # | Question | Where |
|---|---|---|
| 31 | If a custom card form is ever wanted for design reasons, note it moves you from SAQ A to owning PCI DSS 6.4.3 and 11.6.1 (client-side script integrity). Hosted Checkout avoids it. | [11](11-platform.md) |
| 32 | Returns: negotiated carrier rates don't cover return labels. Decide who pays return postage and how the label is issued — a Consumer Contracts Regulations question as much as a logistics one. | [11](11-platform.md), [03](03-customer.md) |
| 33 | Don't switch on Stripe Tax (0.5% of taxed volume) while unregistered — it's a cost with no obligation behind it | [11](11-platform.md), [09](09-payments-and-tax.md) |

## Update · 2026-09-22 (v)

| # | Question | Where |
|---|---|---|
| 34 | **Photography in-house or outsourced.** At £15–40/piece outsourced it costs more than the website and recurs with every batch; in-house it is 45–60 min/piece, the real constraint on the business. Neither is cheap — decide deliberately. | [12](12-build-cost.md), [06](06-unit-economics.md) |
| 35 | Get one freelance quote briefed as *conversion of a finished design*, not a design project, to test the £2,500–6,000 estimate | [12](12-build-cost.md) |
| 36 | Confirm UK IPO trademark fees and whether Class 14 alone or 14 + 35 | [12](12-build-cost.md), [00](00-brief.md) |

## Update · 2026-09-22 (vi)

### Resolved
- **#34 — photography.** In-house capture, AI post-production ([D10](DECISIONS.md), [13](13-photography-pipeline.md)). Outsourcing at £15–40/piece avoided; the base capture of the real object, flaws included, stays in-house.
- **Support model** — email only ([D9](DECISIONS.md)).

### Newly open

| # | Question | Where |
|---|---|---|
| 37 | Which AI tool, after trialling two on real stock. Jewellery is hard for AI — it refracts, and cheap engines make stones look plastic. Reject plastic. | [13](13-photography-pipeline.md) |
| 38 | Landing-page sign-up conversion (assumed 15–25%). The whole paid model scales off it — measure in month one. | [14](14-marketing.md) |
| 39 | Should hero frames be AI-worked at all, or is straight photography truer to the grain-and-daylight argument in [08](08-brand.md)? Instinct: straight. | [13](13-photography-pipeline.md) |
| 40 | Write and publish the retouching policy page — a trust asset nobody else in the category has | [13](13-photography-pipeline.md), [04](04-site-ia.md) |
| 41 | Spend harder in Q2–Q3 to build the list cheaply ahead of Q4's 60% fashion CPM rise? | [14](14-marketing.md) |

## Update · 2026-09-22 (vii)

| # | Question | Where |
|---|---|---|
| 42 | Re-check et vous's fee behaviour across several products, baskets and destinations — one screenshot of one item is thin evidence for a pattern | [15](15-competitor-etvous.md) |
| 43 | Confirm with the accountant how our own all-in price is composed while unregistered: landed cost includes irrecoverable import VAT ([09](09-payments-and-tax.md)), so it sits inside the retail number rather than beside it. Make sure the product page says so. | [15](15-competitor-etvous.md), [06](06-unit-economics.md) |
| 44 | Find more of this third pole. If several UK-facing cross-border sellers are running the same 20%-at-checkout model, the all-in pricing line is worth leading with rather than mentioning. | [01](01-landscape.md), [15](15-competitor-etvous.md) |

## Update · 2026-09-22 (viii)

| # | Question | Where |
|---|---|---|
| 45 | **Model a pre-1926 line.** Antiques over 100 years old import at 5% VAT instead of 20% — a 15-point swing on landed cost. Different buying skill, different authentication, and it serves segment B who has the higher AOV. Worth costing before dismissing. | [06](06-unit-economics.md), [03](03-customer.md) |
| 46 | Does Japan's tax-free scheme cover buying for commercial resale abroad, or only personal export? The Nov 2026 reform is aimed at resale abuse — ask a Japanese tax adviser rather than assume. ~10% of purchase cost rides on it. | [06](06-unit-economics.md) |
| 47 | Add **postponed VAT accounting** to the accountant's brief — import VAT never leaves the bank account if registered. Most small importers don't know it exists. | [06](06-unit-economics.md), [09](09-payments-and-tax.md) |

## Update · 2026-09-22 (ix)

### Reprioritised
- **#1 — margin scheme.** No longer blocking, and no longer "the biggest lever" ([D14](DECISIONS.md), [16](16-vat.md) §6). It is neutral against standard accounting on imported stock. Still ask, but the accountant brief is now: registration timing, postponed VAT accounting, global accounting, and the precious-metals exclusion.
- **#45 — the pre-1926 line is now the highest-value open question in the plan.** Antiques over 100 years old collect *both* the 5% import rate and margin-scheme eligibility, which imported second-hand goods otherwise lack: £96 a piece against £84.

### Newly open

| # | Question | Where |
|---|---|---|
| 48 | **Does sterling silver stock fall outside the margin scheme?** HMRC's second-hand definition excludes precious metals and precious stones. Base-metal costume jewellery is fine; Japanese-sourced silver may not be. | [16](16-vat.md) |
| 49 | Reverse charge on overseas services once registered — sourcing agents, overseas SaaS. Easy to miss, and it is our liability, not theirs. | [16](16-vat.md) |
| 50 | Model flat rate (7.5%, or 6.5% in year one) against standard accounting before any registration | [16](16-vat.md) |
| 51 | **Should we source UK stock as well as Japanese?** The margin scheme is worth £13.33 a piece on VAT-free UK purchases and nothing on imports. Changes the sourcing strategy, not just the accounting. | [16](16-vat.md), [06](06-unit-economics.md) |
