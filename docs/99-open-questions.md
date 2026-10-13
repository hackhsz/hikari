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

## Update · 2026-09-22 (x)

| # | Question | Where |
|---|---|---|
| 52 | Current dividend tax rates — they have moved recently; the £500 allowance is confirmed but the rates need checking | [17](17-entity-and-tax.md) |
| 53 | **Sole trader or limited company for year one.** Recommendation is limited, mainly for liability containment on trademark risk and to avoid publishing a home address. Confirm with the accountant in the same hour as the VAT question. | [17](17-entity-and-tax.md) |
| 54 | Registered office / service address provider, if incorporating | [17](17-entity-and-tax.md) |
| 55 | **Set Shopify taxes to zero explicitly before the first sale.** Charging or displaying VAT while unregistered is an offence, and a store left on defaults will add a tax line by itself. | [17](17-entity-and-tax.md), [11](11-platform.md) |

## Update · 2026-09-22 (xi)

| # | Question | Where |
|---|---|---|
| 56 | **Publish our own entity details from day one** — registered name, company number, registered office, working email, in the footer and the terms. Required by the Companies Act and the E-Commerce Regulations 2002; the Consumer Contracts Regulations separately require trader identity and geographic address. Also a trust signal the nearest competitor is currently leaving on the table. | [15](15-competitor-etvous.md), [17](17-entity-and-tax.md) |

## Update · 2026-09-22 (xii) — ⚠️ name clearance

**#4 is no longer a routine check. It is the blocking question in the plan.**

**UK00917478348 — "HIKARI" — Class 14 (jewellery) — Registered 20 Dec 2019 — D.C.K. CONCESSIONS LIMITED**, a UK company that is still active and trades in jewellery concessions. Class 14 is our goods class. Full detail at [18](18-name-clearance.md).

| # | Question | Where |
|---|---|---|
| 57 | **Attorney to read the Class 14 specification of UK00917478348, and the Class 35 wording of UK00908114902.** One hour. Decides whether the name survives. **Blocking — nothing else in the brand should be spent against until this is answered.** | [18](18-name-clearance.md) |
| 58 | ~~Alternative names~~ **Done — 22 screened, shortlist of five.** Recommendation **Enishi 縁**; second **Meguri 巡**. Pick two or three for the attorney hour. | [18](18-name-clearance.md) |
| 59 | Instagram / TikTok / Pinterest / Xiaohongshu handle checks, once a name clears. Cannot be automated — Instagram redirects bots. | [18](18-name-clearance.md), [05](05-social.md) |
| 60 | **Do not buy domains until #57 is answered.** `hikarivintage.com` and `.co.uk` are both free today, which is the best pair available, but a domain for an unusable name anchors the decision. | [18](18-name-clearance.md) |

---

## Merged 2026-10-13 — the brand line (logo, social, imagery)

The logo, social and imagery work ran on a separate line and numbered its questions #27–#50, the same numbers the website line used. They are renumbered **#61–#84** below, and every reference in the files that came from that line has been updated to match. Nothing else changed.


## Update · 2026-09-22 (iii)

Logo directions proposed in [10](10-logo.md). **Specimen:** https://claude.ai/artifact/2fopZe4vn7LYhmL6JTJxtS

**#4 is now the gate, not a background item.** [00](00-brief.md) says the trade-mark and handle check happens before any spend on brand design, and that spend is the next thing queued. It could not be resolved from public search: the UK IPO register needs a direct search. Known collisions sit outside Class 14 (Kyorin's Hikari fish food, Hikari Miso, NTT's フレッツ光); the closest in-class hit found is a "Hikari Pearls and Jewellery" trade-directory listing. **One hour, before a designer is briefed.**

**Part of #4 is answered and it is a no.** `@hikari` is held by Hikari Mori (森星), a Japanese model with ~1M followers — a fashion-adjacent namesake, so this is an association and SEO problem as well as a handle problem. The handle will carry a qualifier; the lockup has to survive one.

| # | Question | Where |
|---|---|---|
| 61 | **What goes inside the punch** — 光, `H`, or nothing. 光 performs best at small size and carries the costume risk [08](08-brand.md) warns about. Test alongside the #9 landing-page variants. | [10](10-logo.md) |
| 62 | Wordmark in Newsreader (serif, category) or Instrument Sans (grotesque, closer to the Japanese-retail reference) | [10](10-logo.md) |
| 63 | Register a trade mark at all, and when? A word mark plus a device in two classes competes directly with inventory in Phase 0 | [10](10-logo.md), [07](07-roadmap.md) |
| 64 | Which qualified handle, given `@hikari` is gone — and it should be settled before the lockup is drawn, not after | [10](10-logo.md), [05](05-social.md) |

**#12 gains a second half.** The hallmarking exposure logged there is about stock; the Hallmarking Act 1973 also constrains *the brand's own mark* — striking an article with a mark purporting to be an authorised sponsor's mark is an offence, and an assay office may obliterate marks likely to be confused with a hallmark. Rule established in [10](10-logo.md): the mark goes on paper, never into metal.

## Update · 2026-09-22 (iv)

**#61 narrows.** The punch's interior is **光** — drawn as a constructed mark, not set as a font glyph ([10](10-logo.md), studies: https://claude.ai/artifact/PWCZnohGDgay5YfruvPKvj). The remaining question is how far to abstract it, and it has a cheap answer.

| # | Question | Where |
|---|---|---|
| 65 | **Step 02 (constructed) or step 03 (reduced, four parts)?** Decided by a five-minute test: does a Japanese reader still see 光 without hesitating? Run it *before* briefing a designer — it is a constraint on the brief, not a review of the output. | [10](10-logo.md) |
| 66 | The angle of the three top ticks. It is where the whole personality of the mark sits, and it is the one thing worth real iteration. | [10](10-logo.md) |

**Prohibition, logged so it cannot be lost in a design review:** the mark is never radial, never emanates from a disc, and never has more rays than the character has strokes. A rayed sun is the 旭日旗 — a repeated and serious crisis for fashion brands, and a real risk for a business whose whole story is Japanese sourcing. 光's asymmetry is the safeguard.

## Update · 2026-09-22 (v)

The two top dots of 光 become drop-shaped stones ([10](10-logo.md), studies: https://claude.ai/artifact/QV1zYGkdp8aGd4TyPWKCLg).

**#65 changes shape.** The question was "how far to abstract the character". It is now "which pair setting, and then redraw the body to match" — the drops supply a reason to redraw that is specific to this business rather than generic tidying.

| # | Question | Where |
|---|---|---|
| 67 | **Pair setting: B (converging) or C (splaying)?** B is the smallest edit that produces a pair and leaves the left stroke as the font drew it; C is more visibly a pair of drop earrings and further from the character. Same reader test as #65. | [10](10-logo.md) |
| 68 | Drop profile — pear, briolette, or bezel-set cabochon. Solid silhouette only; a bezel outline will not survive 16px or the grain. | [10](10-logo.md) |

**Second prohibition, logged alongside the 旭日旗 one:** **no facets, no sparkle, no third stone.** A gem in a jewellery logo is the category's single most common move; what keeps this clear of it is that the drops *replace* strokes the character already had, and that they are a pair (earrings) rather than a solitaire. Add ornament and that defence is gone.

**Also noted:** the drops must be cut to the font's own contrast. The first pass drew them heavier than the character's own bar and legs, and the mismatch was visible — a text face's modulated strokes next to a geometric drop is how marks end up looking like clip art on type.

## Update · 2026-09-22 (vi)

Kana and simpler-mark options explored ([10](10-logo.md), studies: https://claude.ai/artifact/43BGDvL4z4U983z4gnZWJg).

**New fact, and it is load-bearing:** **光 alone does not reliably read as "Hikari"** — コウ *kō*, ひかる *hikaru*, みつ, てる and others are all available readings. The Latin wordmark carries the name so the mark need not, but anywhere the Japanese side must *say* the name (supplier invoices, a Tokyo card, packing slips to dealers) **that is kana's job, not 光's.**

**#67 and #68 stand.** #65 is effectively answered: the drops supply the abstraction.

| # | Question | Where |
|---|---|---|
| 69 | Adopt **ヒカリ set vertically** as the Japanese-facing signature for supplier-side and Tokyo-side material? Katakana is the script built to be arranged; a column is composition rather than decoration. | [10](10-logo.md) |
| 70 | Keep **the drop pair alone** as the reduced monogram for embroidery, hot foil and anything below 16px? | [10](10-logo.md) |

**Considered and dropped:** ひかり (soft, unambiguous, but three curves that will not compress — a second wordmark, not a mark) and ひ alone (one continuous stroke, the most beautiful form in the set, but it says *hi*, not *hikari*).

## Update · 2026-09-22 (vii)

Glyph question settled and five simpler constructions drawn ([10](10-logo.md), studies: https://claude.ai/artifact/PXwnTn8fCqeoie3cew9pdM).

**Settled:** Japanese uses the same character — U+5149, six strokes, no separate simplified form. **But the regional drawn proportions differ, and the difference is on the two top strokes:** the Japanese 明朝 convention draws them short with clear air above the bar; Chinese conventions draw them long, nearly closing the gap. Two consequences — the brief must **name the Japanese form** as a constraint, and the Japanese convention happens to be the one that leaves room for the drops.

| # | Question | Where |
|---|---|---|
| 71 | **Adopt "the shared rule" (03)?** The character's horizontal *is* the page's hairline rule; the layout completes the mark. The most genuinely simple option, and a behaviour rather than a shape — but it needs a fallback everywhere no rule exists, which is 02. | [10](10-logo.md), [04](04-site-ia.md) |
| 72 | Ring enclosure (01) — keep as an alternative to the rounded-square punch, or drop? Hairline ring only; a filled disc triggers the rayed-sun prohibition. | [10](10-logo.md) |

**Rejected:** hairline weight (05). It reads as restraint and fails grain, stamping, embroidery and 16px simultaneously. Logged so it does not return in a design review as "make it lighter".

## Update · 2026-09-22 (viii)

Divided lockup specified and the supplied reference glyph identified ([10](10-logo.md), studies: https://claude.ai/artifact/Xq1SCfUQnyXwrBoBnXtE2r).

**Finding worth keeping regardless of which direction wins:** the kanji in the supplied reference is a **gothic**, not a mincho, and the Latin beside it is a serif — a font-substitution mismatch. But it is *why the reference looks calm*: a kanji packs six strokes into one Latin letter's area, so at equal nominal weight it always reads heavier. **Match the kanji's apparent stroke weight to the Latin's stem weight; set the kanji one to two steps lighter.** And pair a serif Latin with a *light mincho*, never a gothic — that pairing is the one that happens by accident.

| # | Question | Where |
|---|---|---|
| 73 | **Set, or drawn?** The lockup keeps 光 as a character; the constructed mark draws it. Both are live and a house can carry both, but **only one can be the thing registered and stamped.** This now sits above #67/#71 in the order of decisions. | [10](10-logo.md) |
| 74 | Divider variant — A (cap height, recommended), B (kanji height), C (short centred tick) | [10](10-logo.md) |

**#62 restated in a sharper form:** serif title case `Hikari` versus grotesque uppercase `HIKARI` beside the kanji are **different brands, not different renderings.** Test them as such.

## Update · 2026-09-22 (ix)

| # | Question | Where |
|---|---|---|
| 75 | **Which Instagram account is the style reference, and is it supplying subject or frame?** Not named and not reviewed — Instagram is login-walled. If it supplies the *frame* (dark ground, high-contrast serif, heavy grade) then adopting it reverses [D2](DECISIONS.md), and that should be a logged decision rather than a drift. Needs the handle or screenshots. | [05](05-social.md), [08](08-brand.md) |
| 76 | **What job does 小红书 do?** UK/EU Chinese-speaking buyers and evergreen search (recommended), or a mainland-China ambition (a different business — customs, payment rails, returns and consumer law all change, and none of it is modelled). | [05](05-social.md), [06](06-unit-economics.md) |
| 77 | What happens to the three-column grid in a week when only two pieces are ready? The columns only hold at exactly three posts per Edition. | [05](05-social.md) |

**#4 extended:** handle availability must be checked on **Instagram and 小红书** alongside the UK Class 14/35 clearance and the domain, and all four secured before design work is commissioned.

## Update · 2026-09-22 (x)

### Resolved

- **#75 — the reference account.** [@thevisionnaire.studio](https://instagram.com/thevisionnaire.studio), reviewed in [05](05-social.md). It supplies the **frame**, so adopting it wholesale reverses [D2](DECISIONS.md). What is worth taking from it is the *atmosphere-to-product ratio* and the *two-surface split* (Instagram = seduction, product page = evidence) — neither of which is European.
- **#24 — what "用画" meant.** Answered by the reference: actual paintings, used as backdrops with the product composited on. Viable **only** with verified public-domain works. The reference also composites onto a black-and-white fashion photograph that is almost certainly still in copyright — do not follow it there.
- **#25 — the grain rule.** Restated more usefully as a *channel* rule rather than a per-frame one ([05](05-social.md)): frame 4 need never appear on Instagram at all. The per-frame rule in [D6](DECISIONS.md) still governs the site.

### Newly open

| # | Question | Where |
|---|---|---|
| 78 | **Is bridal a fourth segment?** The reference account sells it as a named line. UK weddings have a literal *something old* convention, intent is high, the timeline is fixed, and the budget is separate from discretionary spend. [03](03-customer.md) omits it — decision or oversight? | [03](03-customer.md), [05](05-social.md) |
| 79 | If paintings are used, who sources and verifies public-domain status, and is it recorded per asset? A wrong call here is a rights claim, not a design note. | [04](04-site-ia.md), [08](08-brand.md) |
| 80 | Does the Edition move to six posts at the [07](07-roadmap.md) month-9 run rate, to buy two atmosphere slots per row while keeping the columns locked? | [05](05-social.md) |

## Update · 2026-09-22 (xi)

**#79 answered in method, still open in ownership.** [20](20-imagery-rights.md) sets out how to use paintings lawfully — open-access museum sources (Met, Rijksmuseum, Art Institute of Chicago, NGA, Getty, Smithsonian) where the licence is stated on the record, and **shot physically rather than composited**, so the resulting photograph is Hikari's own work. What remains open is *who owns the process* and whether the licence is recorded per asset at intake.

| # | Question | Where |
|---|---|---|
| 81 | **Model release for on-body frames.** Route C in [20](20-imagery-rights.md) needs a signed release before the first shoot, or the images cannot be used commercially later. Template needed. | [20](20-imagery-rights.md), [08](08-brand.md) |
| 82 | Extend the pre-launch IP solicitor hour ([04](04-site-ia.md)) to cover imagery: backdrop sourcing, model releases, and the disclaimer wording in one sitting. | [04](04-site-ia.md), [20](20-imagery-rights.md) |

### Settled by [20](20-imagery-rights.md)

- **Instagram-only posting does not reduce copyright exposure.** The infringing act is the communication to the public, which happens in full on Instagram; the UK has fair *dealing* on a closed list of purposes, not fair use. The operative risk is not litigation but **takedown and account loss** — the primary channel in [05](05-social.md) sits on rented land.
- **AI-generated backdrops are not adopted.** They solve third-party copyright and create three problems, the decisive one being that [03](03-customer.md) identifies trust as *the* barrier and [08](08-brand.md) has already moved the palette away from looking AI-generated. A synthetic atmosphere argues against the product.

## Update · 2026-09-22 (xii)

**AI backdrops — owner's call, adopted in narrowed form.** The recommendation in [20](20-imagery-rights.md) §3 was against; the owner chose to proceed with a hybrid in which **only the backdrop is generated and the piece is always a real photograph**. Recorded as [D20](DECISIONS.md) amended. The narrowing resolves the evidence objection ([D19](DECISIONS.md)) but **not** the ownership one — generated output may carry no enforceable copyright, so exclusivity cannot be assumed even where commercial use is permitted.

| # | Question | Where |
|---|---|---|
| 83 | **A recurring generated sitter, or a new face each time?** A fixed seed builds a brand asset over a year; it also sharpens the AI tell, since a face that recurs, never ages and never appears in Stories invites scrutiny. Suggested split: recurring in the painted register, one-off in the photographic one. | [20](20-imagery-rights.md), [08](08-brand.md) |
| 84 | Confirm the commercial-use terms of whichever generation service is actually used — they differ between services and they change. | [20](20-imagery-rights.md) |

## Update · 2026-09-22 — lockup rebuilt in light mincho *(logo branch, merged 2026-10-13)*

Lockup rebuilt in light mincho ([10](10-logo.md), studies: https://claude.ai/artifact/AkmvRHXTwTUfFvw2JBN9jn).

**Resolved:** the weight problem. Mincho 200 against Newsreader 300 recovers the calm of the supplied reference. The pairing is specified as a **ratio** — kanji exactly one step below the Latin, both moving together with size (200/300 at hero, 300/400 at body and print) — because a designer given fixed hero weights will let the small sizes fall apart.

**#27, restated on the logo branch (where it was numbered #41):** **Mincho or gothic for the kanji?** Light mincho reads *written* — editorial, warm, close to ReSee and the category's existing register. Light gothic reads *neutral* — Muji, Ginza, closer to what [02](02-positioning.md) actually argues for. The supplied reference was gothic **by accident**. This is a brand decision, and it sits with #73 (set or drawn) above the detail questions. **If the answer is gothic, the Latin goes gothic too** — a gothic kanji beside a serif Latin is the accident, not a style. — [10](10-logo.md), [02](02-positioning.md)

**Note against #62.** That question was "serif or grotesque for the Latin". It is not independent of #27 — the two sides have to agree. Decide them together.
