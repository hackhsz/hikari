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

| # | Question | Where |
|---|---|---|
| 41 | **Which Instagram account is the style reference, and is it supplying subject or frame?** Not named and not reviewed — Instagram is login-walled. If it supplies the *frame* (dark ground, high-contrast serif, heavy grade) then adopting it reverses [D2](DECISIONS.md), and that should be a logged decision rather than a drift. Needs the handle or screenshots. | [05](05-social.md), [08](08-brand.md) |
| 42 | **What job does 小红书 do?** UK/EU Chinese-speaking buyers and evergreen search (recommended), or a mainland-China ambition (a different business — customs, payment rails, returns and consumer law all change, and none of it is modelled). | [05](05-social.md), [06](06-unit-economics.md) |
| 43 | What happens to the three-column grid in a week when only two pieces are ready? The columns only hold at exactly three posts per Edition. | [05](05-social.md) |

**#4 extended:** handle availability must be checked on **Instagram and 小红书** alongside the UK Class 14/35 clearance and the domain, and all four secured before design work is commissioned.

## Update · 2026-09-22 (iv)

### Resolved

- **#41 — the reference account.** [@thevisionnaire.studio](https://instagram.com/thevisionnaire.studio), reviewed in [05](05-social.md). It supplies the **frame**, so adopting it wholesale reverses [D2](DECISIONS.md). What is worth taking from it is the *atmosphere-to-product ratio* and the *two-surface split* (Instagram = seduction, product page = evidence) — neither of which is European.
- **#24 — what "用画" meant.** Answered by the reference: actual paintings, used as backdrops with the product composited on. Viable **only** with verified public-domain works. The reference also composites onto a black-and-white fashion photograph that is almost certainly still in copyright — do not follow it there.
- **#25 — the grain rule.** Restated more usefully as a *channel* rule rather than a per-frame one ([05](05-social.md)): frame 4 need never appear on Instagram at all. The per-frame rule in [D6](DECISIONS.md) still governs the site.

### Newly open

| # | Question | Where |
|---|---|---|
| 44 | **Is bridal a fourth segment?** The reference account sells it as a named line. UK weddings have a literal *something old* convention, intent is high, the timeline is fixed, and the budget is separate from discretionary spend. [03](03-customer.md) omits it — decision or oversight? | [03](03-customer.md), [05](05-social.md) |
| 45 | If paintings are used, who sources and verifies public-domain status, and is it recorded per asset? A wrong call here is a rights claim, not a design note. | [04](04-site-ia.md), [08](08-brand.md) |
| 46 | Does the Edition move to six posts at the [07](07-roadmap.md) month-9 run rate, to buy two atmosphere slots per row while keeping the columns locked? | [05](05-social.md) |

## Update · 2026-09-22 (v)

**#45 answered in method, still open in ownership.** [11](11-imagery-rights.md) sets out how to use paintings lawfully — open-access museum sources (Met, Rijksmuseum, Art Institute of Chicago, NGA, Getty, Smithsonian) where the licence is stated on the record, and **shot physically rather than composited**, so the resulting photograph is Hikari's own work. What remains open is *who owns the process* and whether the licence is recorded per asset at intake.

| # | Question | Where |
|---|---|---|
| 47 | **Model release for on-body frames.** Route C in [11](11-imagery-rights.md) needs a signed release before the first shoot, or the images cannot be used commercially later. Template needed. | [11](11-imagery-rights.md), [08](08-brand.md) |
| 48 | Extend the pre-launch IP solicitor hour ([04](04-site-ia.md)) to cover imagery: backdrop sourcing, model releases, and the disclaimer wording in one sitting. | [04](04-site-ia.md), [11](11-imagery-rights.md) |

### Settled by [11](11-imagery-rights.md)

- **Instagram-only posting does not reduce copyright exposure.** The infringing act is the communication to the public, which happens in full on Instagram; the UK has fair *dealing* on a closed list of purposes, not fair use. The operative risk is not litigation but **takedown and account loss** — the primary channel in [05](05-social.md) sits on rented land.
- **AI-generated backdrops are not adopted.** They solve third-party copyright and create three problems, the decisive one being that [03](03-customer.md) identifies trust as *the* barrier and [08](08-brand.md) has already moved the palette away from looking AI-generated. A synthetic atmosphere argues against the product.

## Update · 2026-09-22 (vi)

**AI backdrops — owner's call, adopted in narrowed form.** The recommendation in [11](11-imagery-rights.md) §3 was against; the owner chose to proceed with a hybrid in which **only the backdrop is generated and the piece is always a real photograph**. Recorded as [D9](DECISIONS.md) amended. The narrowing resolves the evidence objection ([D8](DECISIONS.md)) but **not** the ownership one — generated output may carry no enforceable copyright, so exclusivity cannot be assumed even where commercial use is permitted.

| # | Question | Where |
|---|---|---|
| 49 | **A recurring generated sitter, or a new face each time?** A fixed seed builds a brand asset over a year; it also sharpens the AI tell, since a face that recurs, never ages and never appears in Stories invites scrutiny. Suggested split: recurring in the painted register, one-off in the photographic one. | [11](11-imagery-rights.md), [08](08-brand.md) |
| 50 | Confirm the commercial-use terms of whichever generation service is actually used — they differ between services and they change. | [11](11-imagery-rights.md) |
