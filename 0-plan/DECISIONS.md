# Decision Log

Dated record of what has been settled, what is proposed, and what was reversed. Append; don't rewrite history.

---

### D1 · Positioning — independent-curated, owned storefront
**2026-09-21 · Decided**

Own site is the home. Marketplaces are a discovery and liquidation channel, never the primary surface. Target mix by month 12: ~70% owned / ~20% outposts / ~10% wholesale and events.

*Rationale:* [02](02-positioning.md). Marketplace commission consumes the margin, the discount frame is wrong for one-of-one stock, the supply-side moat has no surface on a marketplace listing, and every upside path (wholesale, retailers, a physical room) requires a brand.

---

### D2 · Aesthetic — Japanese editorial
**2026-09-21 · Decided**

*Kinfolk* / Muji / Ginza rather than faux-Parisian. Warm paper, ink, persimmon accent, real daylight photography. Governed by the tokonoma principle: one object at a time, rotated on the Edition rhythm.

*Rationale:* [02](02-positioning.md), specified in [08](../brand/08-brand.md). Every competitor in the category runs some version of French luxury restraint; nobody uses a Japanese visual identity despite Japan being where the supply comes from. It is the open position and it's honest to the sourcing.

---

### D3 · Prove it online before any physical retail
**2026-09-21 · Decided**

The website carries the whole trust burden first. Physical space — pop-ups, fairs, and eventually a room — comes only after the site demonstrably converts at £100–300.

*Rationale:* trust is the barrier, not price ([03](03-customer.md)). A physical space is a fixed cost that answers a question the website has to answer first: will a stranger pay £180. Moving offline early spends capital on presence instead of on inventory, which is where the moat is. Confirms [07](07-roadmap.md) Phase 3 sequencing.

**Signal to move:** ≥60% 90-day sell-through sustained over two quarters, and a mailing list that reliably clears the strongest pieces on Edition night. Not before.

Reserved name: **The Room** ([08](../brand/08-brand.md)).

---

### D4 · Payment rails — peer-to-peer to avoid VAT registration
**2026-09-21 · Proposed — recommend reversing**

Proposal: take payment peer-to-peer, with the website as catalogue only, to avoid VAT registration.

**The mechanism doesn't achieve the goal.** VAT registration is triggered by turnover, not payment method. At the roadmap's own month-9 target (25–35 sales/month × ~£180 = £54–76k/yr) the business is **already under the £90,000 threshold** — nothing needs structuring. And import VAT is charged at the border regardless of registration, so staying unregistered doesn't avoid VAT; it guarantees the *unrecoverable* kind on every piece.

**It also costs the thing D3 is built on.** Asking a first-time customer to bank-transfer £180 for a secondhand object is the most recognised scam pattern in UK online retail. No chargeback rights, no Klarna, and consumer law obligations are unchanged anyway. D3 and D4 are in direct contradiction; D3 is the right one.

**Recommended instead:** card checkout (~£3 on a £180 sale against ~£90 gross margin), no VAT registration while under threshold, alert at £75k rolling turnover, and answer the margin-scheme question — which is the real lever.

**Peer-to-peer is fine once trust exists** — repeat collectors, reserved pieces, wholesale. It cannot be the mechanism that establishes trust.

*Full reasoning:* [09](09-payments-and-tax.md). **Awaiting your call.**

---

### D5 · Naming — the home is just Hikari
**2026-09-21 · Decided**

No nickname for the owned storefront. The naming work goes into the rituals instead: **Editions** (numbered drops), **The Alcove** (the rotating homepage feature), **The Record** (sold pieces kept live), **Outposts** (marketplace listings), **Grades I–IV** (condition).

*Rationale:* [08](../brand/08-brand.md). A brand that nicknames its own storefront is usually compensating. Naming the rituals is what turns a shop into a habit — and calling marketplaces "outposts" in internal language keeps effort pointed at the home, which is the whole of D1.

---

### D6 · Texture and motion — grain, scale, scroll-driven colour
**2026-09-22 · Decided in direction, open in detail**

Heavy film grain over the whole page (image and type alike), imagery at full width with nothing competing, background colour interpolating through the palette as a function of scroll position, and piece information always below the image rather than over it.

*Prototype:* https://claude.ai/artifact/3VLz1B1qzQ7P5tnbYnnWtb · *Specification:* [08](../brand/08-brand.md).

**Carries one hard constraint.** Grain applies to the composed and on-body frames only. The maker's-mark macro and the condition frame are evidence and stay clean — grain hides precisely the wear that [03](03-customer.md) and [04](../1-shop/04-site-ia.md) require the buyer to see. Texture on the seduction, never on the proof.

*Open:* whether "用画" meant large imagery or actual paintings ([99](99-open-questions.md) #24), and mid-range Android performance before Phase 1 commits ([99](99-open-questions.md) #26).

---

### D7 · Platform — Shopify Basic, Shopify Payments, custom theme
**2026-09-22 · Decided**

Not a bespoke Stripe build, and specifically **not** Stripe as a third-party gateway on Shopify — that combination pays Stripe's rate *and* Shopify's penalty (~£6.50 on a £180 sale against £3.85).

*Rationale:* [11](../1-shop/11-platform.md). Shopify Payments is powered by Stripe, so "build it on Stripe" is what Shopify Payments already is, with the commerce layer supplied. A custom build saves roughly £565 a year and costs cart, inventory, orders, shipping, returns, email, tax, PCI scope, fraud, CMS and search — built and then maintained forever. Design freedom is not the constraint: a hand-built Liquid theme controls every page except checkout, and everything in the prototypes is ordinary theme work.

*Review triggers:* Basic → Grow at ~£10,000/month revenue (set the review at £8,000). Headless only if the storefront outgrows Liquid — and it would not change the checkout anyway.

---

### D8 · Homepage layout — the scale ladder
**2026-09-22 · Decided**

One piece at full width, three composed asymmetrically, then four, then six. Density is earned. Featured pieces sit at different grid spans and vertical offsets rather than in an even row. House names are a display-type section rather than a filter menu. Information below the image at every scale.

*Rationale:* [04](../1-shop/04-site-ia.md). Resolves the tension between the tokonoma principle and the fact that a shop has to show stock.

*Prototype:* https://claude.ai/artifact/SSwHryr1Tu735AVHKxdo5s

---

### D7a · Platform — reasoning revised, conclusion unchanged
**2026-09-22 · Amends D7**

The inventory-management argument in D7 was weak and is withdrawn: with 60–100 hand-listed one-of-one pieces and no 3PL, Shopify's inventory engine decides nothing. Re-argued in [11](../1-shop/11-platform.md) on better grounds:

1. **Order-lifecycle email.** Stripe sends a payment receipt and nothing else. Shopify ships confirmation, dispatch-with-tracking, delivery, cancellation, refund and abandoned checkout, all editable. The dispatch email is where a £185 customer stops worrying — trust architecture, not an operational nicety.
2. **The Edition is free to run.** 10,000 emails a month included on Basic. At 1,000 subscribers × 4 Editions that is 4,000 sends at no cost — the highest-leverage ritual in [05](../5-social/05-social.md), costing nothing.
3. **The saving was an artefact.** Priced with a transactional provider and an ESP, a custom Stripe build lands at £107–162/month against Shopify's £134.50 at 30 sales. Cost-neutral, plausibly worse.
4. **Shipping labels** at Shopify's negotiated Royal Mail/Evri/DPD rates.
5. **Compliance splits cleanly.** Stripe covers PCI (SAQ A on hosted Checkout) and SCA/3DS properly. Neither platform covers what actually bites a UK distance seller — Consumer Contracts Regulations, Consumer Rights Act, UK GDPR/PECR. Shopify supplies the furniture those regulations assume; a custom build writes it.

**Amended:** **Stripe Payment Links are the right tool for Phase 0** — no fee, no website, `limit payments = 1` prevents a double sale, SAQ A. Better than what [07](07-roadmap.md) currently specifies. Updated there.

**Also recorded:** Shopify → custom later is easy; custom → Shopify means rebuilding the front end. Shopify is the reversible choice.

---

### D9 · Support — email only
**2026-09-22 · Decided**

No live chat, no phone, no helpdesk software. An inbox and a stated response time. At 30 orders a month the volume does not justify anything more, and a slow reply from a named human beats a fast one from a widget. Revisit if order volume passes ~100/month or if pre-purchase questions start costing sales.

---

### D10 · AI photography pipeline — yes, with the evidence frames ring-fenced
**2026-09-22 · Decided**

AI for background replacement, colour correction, shadow synthesis, crop and upscale, and — highest value — **on-model generation for scale**, which is otherwise impossible on one-of-one stock at 45–60 minutes a piece.

**Never** for plating loss, scratches, chips, missing or replaced stones, repairs, or patina.

**One policy covering grain and AI together**, extending [D6](DECISIONS.md): frames 1 and 3 may be grained and AI-worked; **frames 2 and 4 — the maker's-mark macro and the condition frame — are evidence, stay unretouched, and are labelled as such.**

*Rationale:* [13](../2-photos/13-photography-pipeline.md). Commercial before legal — a piece that looks better on screen than in the hand produces a return, a review and sometimes a chargeback, and at 50% margin a returned order costs more than the next one earns. Legally, CAP's guidance is explicit that a disclosure does not rescue a misleading image.

**Turn it into an asset:** publish the retouching policy. Nobody in the category does, and it converts the biggest objection in [03](03-customer.md) into a reason to buy.

---

### D11 · Paid media — optimise for the list, not for sales
**2026-09-22 · Decided**

Ads point at the sourcing story and the Edition sign-up, never at individual pieces.

*Rationale:* [14](../5-social/14-marketing.md). On one-of-one stock an ad for a sold piece is wasted spend, and every winning creative dies when its subject sells — you can never scale an ad whose product no longer exists. The brand and the sourcing story never sell out. Paid spend then builds an owned asset instead of renting attention.

**Channels:** Meta primary (fashion has the platform's lowest CPCs; Reels 20–35% cheaper than feed), **Pinterest alongside it from the start** — CPMs run roughly a quarter of Meta's and pins last years. TikTok organic only for now. Google Ads on generic terms only.

**Budget:** £10–15/day Meta + £5/day Pinterest ≈ £450–600/month, and not until the weekly Edition works organically ([05](../5-social/05-social.md)). Max £30 CAC on a first order. Measure **cost per subscriber**, not cost per sale.

**Refines [04](../1-shop/04-site-ia.md):** its blanket "never bid on brand names" was too crude. Google permits reseller use of marks as keywords and in ad text where the landing page genuinely sells those goods and the advertiser is clearly identified, with the UK applying a stricter identity standard. It is *permitted rather than safe*, and the risk is asymmetric — so generic terms only until the business is worth defending, and never Chanel.

---

### D12 · All-in pricing — the price shown is the price paid
**2026-09-22 · Decided**

No handling fee, no service fee, no tax line appearing at checkout, no price that varies by payment rail. Duty and any tax are inside the number on the product page, and that number is what the customer pays.

*Rationale:* [15](../6-inspiration/15-competitor-etvous.md). It is a legal requirement — the DMCC Act 2024 has banned drip pricing since 6 April 2025, with CMA fines up to the higher of £300,000 or 10% of global turnover — and it is simultaneously the sharpest competitive line available. The nearest direct competitor adds a 20% "Handling Fee" at checkout, so their £228 ring is really £273.60. Against that, an all-in £185 is a different proposition, not a small discount.

**Accepted cost, stated so nobody is surprised:** all-in pricing looks *more expensive* in a side-by-side ad or a Google Shopping row. That is precisely why drip pricing exists. We answer with brand, trust and the Edition list ([D11](DECISIONS.md)), not with a price race we would lose.

**Also decided:** never publish a comparison accusing a named competitor of a tax or pricing offence. Defamation and malicious-falsehood risk, and not how we compete. The finding informs our pricing; it never becomes our copy.

---

### D13 · Not reporting the competitor — for now
**2026-09-22 · Decided, revisitable**

Lawful to report; not doing it yet. **Never** the tax allegation — a 20% line labelled "Handling Fee" is equally consistent with lawful DDP import-VAT collection, and we cannot see their registration, shipping origin or books. Reporting that would be wrong on the facts.

The drip-pricing point *is* supportable, but three things outweigh it: winning gains us no customers (the CMA is already enforcing this sector); a competitor complaint on one screenshot is weighted as interested and rarely moves anything; and — decisively — **the retaliation risk is currently asymmetric.** We have not cleared the trademark, settled the VAT position, had the IP review, or published our policies. We are the less-prepared party.

**Action instead:** archive dated evidence to preserve the option, and compete on it — *"The price you see is the price you pay"* in the headline, on the product page and at checkout. A claim about us, not an accusation about them.

**Revisit if:** our own compliance is complete, or we see consumer harm at scale rather than one screenshot.

*Reasoning:* [15](../6-inspiration/15-competitor-etvous.md). Publication, social posts, contacting their customers and press briefings stay ruled out under [D12](DECISIONS.md).

---

### D14 · VAT — stay unregistered, and treat £90,000 as a planned cliff
**2026-09-22 · Decided**

Remain unregistered while under the threshold. Watch rolling 12-month turnover monthly, alert at £75,000, decide before £90,000 rather than at it.

*Rationale:* [16](16-vat.md) §6. At £80 cost and £180 retail, unregistered yields **£84** a piece against **£70** registered — **£14, or 7.8% of revenue**. Crossing the threshold costs roughly **£7,000 a year** unless prices rise about 20%, which costs demand instead.

**Supersedes the claim in [06](06-unit-economics.md) and [09](09-payments-and-tax.md) that margin-scheme eligibility was the biggest lever.** It is not, for imported stock: where import VAT is recoverable, margin and standard accounting give the same result. The margin scheme pays on stock bought **VAT-free** — £13.33 a piece on UK private-seller purchases — which makes it an argument for **UK sourcing**, not for imports.

**Two strategic consequences worth carrying forward:**
1. **UK-sourced stock has a tax advantage the Japan supply does not.** House clearances, fairs and private sellers are now economically interesting alongside the import line.
2. **Pre-1926 antiques collect both reliefs** — 5% import VAT *and* margin-scheme eligibility, which ordinary imported second-hand goods lack. £96 a piece against £84. [99](99-open-questions.md) #45 is now the highest-value open question in the plan.

**When the threshold nears:** stay under deliberately, or register and reprice, or change the stock mix so the reliefs apply. Decide on numbers, not at the last minute.

**Amended 2026-09-22 (iii) — the threshold in units, and when we actually hit it.**

£90,000 is **turnover**, not profit, and it counts **every channel** — Shopify, marketplaces, offline, any rail — plus shipping income. It is a **rolling 12-month** test checked monthly, not a financial year, plus a forward test if the next 30 days alone would exceed it.

| AOV | Threshold £90,000 | Alert £75,000 |
|---|---|---|
| £150 | 600/yr = **50/month** | 42/month |
| £180 | 500/yr = **42/month** | 35/month |
| £220 | 409/yr = **34/month** | 28/month |

**Our own Phase 2 target reaches it.** 25–35 pieces a month at £180 is **£54,000–£75,600** — the top of the target range lands exactly on the alert line. And if AOV drifts to £220, which the £100–300 band makes likely, **35/month is £92,400 — over the threshold.**

So this is not a distant problem. It arrives the moment [07](07-roadmap.md) Phase 2 succeeds. Since break-even is only a 9.3% price rise, **treat it as a pricing test to run a year early rather than a cliff to hit.**

Note also that "small business" is not a status: there is nothing to register for in order to stay outside VAT. The business itself still registers — Self Assessment or Companies House ([17](17-entity-and-tax.md)) — which is unrelated.

**Amended 2026-09-22 (ii):** the "~20% price rise" in this entry overstates it. **Break-even is 9.3% — £180 to £196.80** — because registration also recovers the £16 import VAT. Passing the full 20% on (£216) leaves us **£16 a piece better than today**. So the real question at the threshold is whether the market takes 9.3%, which is a cheap pricing test to run early rather than a cliff to fear. Working in [16](16-vat.md).

---

### D15 · Customs and sales records — importer of record, true value, no shared clearance
**2026-09-22 · Decided**

We are always the **importer of record** on our own stock, we always declare the **true transaction value**, and we keep the seller's invoice for every piece. All sales are recorded, in every channel.

*Rationale:* [16](16-vat.md) §9. This is a liability boundary rather than a statement of principle: **if we are the importer of record but another party entered the value, the liability is ours.** Hence three operational rules — do not share a freight agent or customs broker with another seller, do not consolidate consignments with anyone, and do not buy stock from a business whose import valuations we cannot see.

**Competitive consequence, recorded so it is not relitigated later:** a seller under-declaring customs value and recording only online sales has a cost base roughly 20% of landed cost plus 20% of their offline channel below ours. **We do not match it.** Never benchmark our price against theirs — their price carries an unpaid liability, assessable for twenty years where behaviour is deliberate, with penalties up to 100% of the tax. We compete on [D11](DECISIONS.md) and [D12](DECISIONS.md) instead.

The per-piece acquisition record from [04](../1-shop/04-site-ia.md) now serves five purposes: margin-scheme evidence, trademark exhaustion defence, payment-processor review, retrospective input tax on registration, and proof of customs value.

**Addendum — "but everyone in this niche does it."** Probably true, and recorded here so it is not relitigated each time a competitor's price looks better than ours.

1. **Survivorship bias.** The ones who were caught are not in the competitor list — they closed or reopened under another name. The observable sample is, by definition, those not yet caught. Enforcement is probabilistic and small cash operators sit below the attention threshold; the threshold moves, and the assessment window does not shrink.
2. **Their tax model is a product of their growth model, and it is incompatible with ours.** They optimise for *not being found*: no brand narrative, no SEO, products named to be unsearchable, payment pushed to private rails. We optimise for *being found*: house names for search, press coverage, a published authentication policy, a brand that could one day wholesale into a department store. **A high-visibility brand cannot run on a low-visibility tax structure.** The press coverage we want is simultaneously a public record of prices, volume and claims.
3. **The timing is inverted.** Exposure grows with revenue; detection risk grows faster — payment data, platform reporting, Companies House, a lease, staff, an accountant who resigns. The structure is cheapest when there is least to lose and most expensive when there is most.
4. **Being clean costs us almost nothing at current scale.** Unregistered and under £90,000, the entire cost of compliance is **£16 a piece of import VAT**. There is no output VAT to avoid because we are not registered. £16 on £180, plus one accountant's hour. The "everyone does it" advantage is mostly an advantage *at scale* — which is also when it ends businesses.
5. **The cost we do accept, honestly:** our price will look higher in a side-by-side. That is real, it is already accepted at [D12](DECISIONS.md), and it is why all-in pricing has to be stated as a *claim about us* rather than left for the customer to discover.

---

### D16 · The homepage opens on a brand image, then the Alcove
**2026-10-12 · Decided**

A full width brand image now sits above the Alcove (`theme/sections/brand-hero.liquid`). This amends [08](../brand/08-brand.md) "the homepage shows one piece, large, above everything else" and the scale ladder in [04](../1-shop/04-site-ia.md): the Alcove is now second, still the first piece anyone sees.

What does not change: type sits below the image, never on it, so there is still no scrim anywhere. The brand image is our own photography. Until it exists the section shows a plain daylight study with no object in it, so it can never be mistaken for a product.

---

### D17 · Bag drawer, then Shopify's checkout
**2026-10-12 · Decided**

Add to bag opens a drawer instead of leaving the page (`theme/sections/bag-drawer.liquid`). Checkout stays Shopify's own, per [11](../1-shop/11-platform.md).

The drawer carries the trust block, the accepted payment marks, express checkout buttons and the VAT line, per the 2026-09-21 update in [04](../1-shop/04-site-ia.md). One of one shapes it: no quantity controls, adding a piece already in the bag says so, a piece that sells while someone is looking turns to Sold, and the bag states that a piece in it is not held. Shopify does not reserve stock in a cart, so the copy must never suggest it does.

The total in the bag is the price paid ([D12](DECISIONS.md)). That holds only while UK delivery is free on every order, which "UK next day over £100" implies for stock at £110 and up. If a delivery charge is ever added, the bag needs a delivery line.

---

### Merge note · 2026-10-13

The logo, social and imagery decisions were logged on a separate line as D7–D9, the same numbers as the platform, homepage and support decisions above. They follow as **D18–D20**, unchanged except for the number. D18 was D7 (the mark), D19 was D8 (social accounts), D20 was D9 (imagery).

---

### D18 · The mark — a wordmark for the screen, a struck punch for everything else
**2026-09-22 · Proposed — and gated on [99](99-open-questions.md) #4**

Primary logo is the `HIKARI` wordmark, tracked uppercase, governed by a size *rule* rather than a size spec: never larger than the piece on the page. The compact mark is a struck punch — a closed contour with something struck inside it — which exists to do the four jobs the wordmark provably fails: favicon, avatar, the stamp on the mailer, the seal on the care card. The abstract "alcove" direction is dropped; the idea already lives as the homepage feature.

*Specimen:* https://claude.ai/artifact/2fopZe4vn7LYhmL6JTJxtS · *Full argument:* [10](../brand/10-logo.md).

**Why a mark at all, when no competitor has one.** Susan Caplan, Jagged Metal and ReSee are all wordmark-only. That makes a wordmark alone incapable of differentiating — it is the baseline, not a position. The punch differentiates in the artefact the customer physically holds rather than in a header they scroll past, and it speaks the grammar the business already trades in: the sponsor's mark on the back of English silver, the 落款印 that authenticates a painting, the 家紋 enclosure Mitsubishi and Kikkoman still use. Frame 2 of the photography spec is a weekly macro of somebody else's maker's mark ([08](../brand/08-brand.md)); the house should have one.

**Two constraints it inherits from [D6](DECISIONS.md), both of which narrow the field more than taste does.** Scroll-driven colour means one colour only — no gradient, no two-tone, no white knockout, legible on all four grounds. Full-page grain means minimum stroke weight is a specification, not a preference. Together they are the decisive argument against the abstract direction, which also fails a third test: offices refuse overly simple or abstract devices for want of distinctive character, so the weakest drawing is also the least defensible.

**Hard legal rule, carried forward.** Hallmarking Act 1973 — the mark is struck into paper, never into metal, and its outline avoids the shield and lozenge shapes of the 1973 punch regulations.

**Not decided here:** what goes inside the punch (光, `H`, or nothing — [99](99-open-questions.md) #61), and whether the wordmark is serif or grotesque (#62).

**Blocked by #4.** [00](00-brief.md) commits to clearing the name in UK Classes 14 and 35 before any spend on brand design. It has not been done, `@hikari` is confirmed gone, and no designer should be briefed until it closes. **Awaiting your call on both #4 and this recommendation.**

**Amended 2026-09-22 (ii) — the interior is settled in principle.** The punch contains **光**, constructed rather than set: drawn monolinear, one stroke weight, flat terminals, feet on one baseline, the three ticks sharing a single angle. Two states, cameo and intaglio, borrowed from the sponsor's-mark vocabulary. This also rescues the alcove idea dropped above — a reduced 光 *is* light falling on a horizontal surface, now in a form that can be stamped.

Open at the level below: step 02 vs step 03 of the abstraction ladder ([99](99-open-questions.md) #65), and the tick angle (#66). Carries one prohibition that must survive every later design review: **never radial, never from a disc, never more rays than strokes** — a rayed sun is the 旭日旗.

*Studies:* https://claude.ai/artifact/PWCZnohGDgay5YfruvPKvj · *Argument:* [10](../brand/10-logo.md).

**#4 still gates all of it.** None of this is artwork, and no designer is briefed, until the name clears UK Classes 14 and 35.

**Amended 2026-09-22 (iii) — the two dots become drops.** The two top strokes of 光 are replaced by drop-shaped stones. The move works because a mincho 点 already swells toward its tail, so the teardrop exaggerates the stroke rather than decorating it. Mirroring the pair so both hang turns them into earrings — the hero product — at the cost of the right stroke's calligraphic identity; **setting B (converging) recommended**, C (splaying) as the fallback ([99](99-open-questions.md) #67).

Carries a second standing prohibition, alongside the 旭日旗 one: **no facets, no sparkle, no third stone.** The drops survive the jewellery-logo cliché only because they substitute for strokes the character already had and read as a pair rather than a solitaire.

Holding the font body untouched is right for deciding the idea and wrong for shipping it — it leaves two drops as the only distinctive element in a Class 14 mark. Once the pair is chosen, the constructed 光 takes the same drops.

*Studies:* https://claude.ai/artifact/QV1zYGkdp8aGd4TyPWKCLg

**Amended 2026-09-22 (iv) — the simpler answer, and the Japanese signature.** The mark is the **constructed 光 with the drop pair replacing the two top strokes**: four parts, no font, entirely ours. Simpler than the mincho hybrid and more specific than the plain constructed 光 — the drops are the one simplification that also adds meaning, and they are the only element that is about jewellery rather than about Japan.

**Reduced monogram:** the drop pair alone, for embroidery, hot foil and anything below 16px.

**Japanese-facing signature: ヒカリ set vertically.** Katakana because it is the script built to be arranged and reads as light and contemporary; vertical because a column is composition, not decoration. It also solves a real problem — **光 alone does not reliably read as "Hikari"** (コウ, ひかる, みつ, てる are all available), so anywhere the Japanese side must say the name, kana does it.

Considered and dropped: ひかり and ひ ([99](99-open-questions.md), 2026-09-22 (vi)).

*Studies:* https://claude.ai/artifact/43BGDvL4z4U983z4gnZWJg

**Amended 2026-09-22 (v) — the glyph form, and the simplest construction.** Japanese writes 光 with the same character (U+5149, six strokes, no separate simplified form), but the **drawn proportions differ by region and the difference is on the two top strokes**: the Japanese 明朝 convention draws them short with air above the bar, Chinese conventions draw them long. **The brief must name the Japanese form**; setting the Chinese proportions on a Japanese-sourcing brand is the kind of error a Tokyo dealer sees and a London customer never does. The Japanese convention is also the one that leaves room for the drops.

**Proposed as the identity construction: "the shared rule."** The character's horizontal *is* the page's own hairline rule — the mark supplies five short strokes and the layout supplies the sixth. It is the only construction that gets simpler by giving a stroke away, it suits a brand already built on hairlines and horizontal division, and it is **a behaviour rather than a shape**, so it cannot be copied by tracing. Where no rule exists — favicon, stamp — it falls back to the intaglio square already specified for the punch. Logged as [99](99-open-questions.md) #71.

**Rejected outright: hairline weight.** It reads as restraint and fails grain, stamping, embroidery and 16px at once.

*Studies:* https://claude.ai/artifact/PXwnTn8fCqeoie3cew9pdM

**Amended 2026-09-22 (vi) — the divided lockup, and a branch that now needs choosing.** A horizontal lockup is specified: `光` · hairline rule · `Hikari`, with every proportion stated against cap height (kanji 1.30 C, optical centre to cap centre, 0.55 C either side of the rule, rule at 1.00 C from cap line to baseline and no heavier than the Latin's thinnest stroke, Latin tracked 0.28 em). Compact mark: 光 alone, free-standing, in the punch, and struck in — **drawn at a heavier weight than the lockup's kanji**, because alone it has nothing to be lighter than and still has to survive 16px and the grain.

**Diagnosis of the supplied reference, and the rule it produced.** Its kanji is a *gothic* paired with a *serif* Latin — a font-substitution mismatch — and that mismatch is why it reads calm: a kanji carries six strokes in one Latin letter's area, so at equal nominal weight it always reads heavier. **Match apparent stroke weight, not nominal weight; set the kanji one to two steps lighter; and pair a serif Latin with a light mincho, never a gothic.**

**New branch, and it now sits above the open detail questions: set, or drawn?** The lockup keeps 光 as a character; the constructed mark of the earlier studies draws it. A house can carry both, but only one can be registered and stamped. Logged as [99](99-open-questions.md) #73.

*Studies:* https://claude.ai/artifact/Xq1SCfUQnyXwrBoBnXtE2r

**Amended 2026-09-22 (vii) — the lockup's weights, and the question underneath them.** Kanji in **Noto Serif JP 200** against **Newsreader 300** at hero scale; **300/400** at body scale and in print. The pairing is recorded as a **ratio — the kanji exactly one step below the Latin, both moving together with size** — not as fixed numbers, because fixed hero weights leave the small sizes to fall apart. Divider drops to `1.1` at C=40: a light pair needs a lighter rule or the divider becomes the heaviest thing in the lockup. Compact mark stays heavier — **400** standalone, **300** in the punch.

**What this resolved and what it exposed.** Light mincho recovers the calm of the supplied reference, so the weight problem is solved. But it changes the *voice*: light mincho reads written and editorial; the gothic read neutral and industrial, and the reference was gothic **by accident**. That is now a live brand question ([99](99-open-questions.md) #27), and it is not independent of the Latin pairing (#62) — the two sides have to agree. **If the answer is gothic, the Latin goes gothic too.**

*Studies:* https://claude.ai/artifact/AkmvRHXTwTUfFvw2JBN9jn

### D19 · Social accounts — European subject, Japanese frame
**2026-09-22 · Proposed**

Launch Instagram (primary) and 小红书 (secondary) on a single rule: **the objects are European, the eye is Japanese.** The stock already *is* European — Dior, Givenchy, YSL and Nina Ricci are Paris houses, Grosse is Pforzheim — so a European style reference is not in conflict with [D2](DECISIONS.md) provided it supplies the *subject* and never the *frame*. Composition, ground, type and light stay as specified in [08](../brand/08-brand.md).

Two structural proposals attached:

- **Instagram grid as a catalogue.** One Edition = exactly three posts in fixed order, which locks each column to one frame type (composed / maker's-mark macro / on-body). The condition frame stays off-grid — it is evidence, and it belongs on the product page and in Stories.
- **小红书 as a knowledge and diaspora channel**, run at pillar-3 weight for UK/EU Chinese-speaking buyers and evergreen search. Not a second storefront, not a translated Instagram feed, not a route to mainland customers.

The platform's cover-title convention collides with [08](../brand/08-brand.md)'s rule that the photograph never carries text. **Resolved in favour of the rule:** a plain `--paper-deep` type plate takes ~22% of the 3:4 cover, the photograph below it stays untouched. A plate, not an overlay — the same logic as information-below-the-image on the site.

*Full reasoning:* [05](../5-social/05-social.md). *Open:* the 小红书 remit is unconfirmed ([99](99-open-questions.md) #76). **Awaiting your call.**

**Amended 2026-09-22** — the reference account has now been reviewed (#75 resolved). It supplies the *frame*, so it is not adopted. Two amendments follow from it:

- **The split is a channel rule, not just a frame rule.** *Instagram is the seduction surface; the product page is the evidence surface.* Frame 4 need never appear on Instagram at all. This supersedes nothing in [D6](DECISIONS.md) — it governs the feed, D6 governs the site — but it is the cleaner statement of the same principle.
- **The grid needs atmosphere the four-frame spec does not produce.** Launch at three posts per Edition with atmosphere in Stories and Reels; revisit a six-post Edition at the [07](07-roadmap.md) month-9 run rate (#80). Hikari's atmosphere is pillar 2 — the Japan sourcing, shot documentary — not borrowed interiors.

**One hard line added:** products are **never composited onto images the business did not make.** The reference does this with a classical painting and with a black-and-white fashion photograph; the second is almost certainly still in copyright, and both destroy scale and condition information that [08](../brand/08-brand.md)'s frame 3 exists to supply. Paintings as backdrops are viable only as verified public-domain works, sourced deliberately and recorded per asset ([99](99-open-questions.md) #79).

---

### D20 · Imagery — the look is kept, the borrowing is not
**2026-09-22 · Decided in principle, open in production detail**

The painterly / old-photograph register of the reference account ([05](../5-social/05-social.md)) is **adopted**. The method by which the reference achieves it is **rejected**, and two shortcuts around it are rejected with it.

**Rejected — posting borrowed imagery on Instagram only.** The infringing act is the communication to the public and it happens in full on Instagram. The UK has fair dealing on a closed list of purposes, none of which covers "it suited the feed". The decisive risk is not being sued: it is **notice, strike, and losing the account** — and with it the primary channel, the archive and the handle, uninsurably.

**Rejected — AI-generated backdrops.** They remove the third-party copyright problem and add three: output that may carry no copyright anyone can enforce, prompts that can land back on a protected work, and CAP Code exposure wherever the product itself is misrepresented. The decisive objection is internal — [03](03-customer.md) makes trust the barrier and [08](../brand/08-brand.md) has already moved the palette off a look it identified as AI-signature. A synthetic atmosphere argues against a product whose whole claim is *real object, real age, found in Tokyo*.

**Adopted — four routes, all of which produce imagery Hikari owns outright:**

- **A · Verified public-domain paintings, shot physically, never composited.** Sourced from open-access museum programmes where the licence is stated on the record. Print it, light it, photograph the piece against it in one real exposure. Recommended.
- **B · Commission the painting**, work-for-hire with copyright assigned in writing. Unrepeatable by any competitor.
- **C · Shoot the "old photograph" rather than borrow one.** Grainy black-and-white profile, piece in colour — mechanically identical to the reference's strongest image, and it doubles as frame 3 done properly.
- **D · The Tokyo frame.** The reference borrows European interiors because it has no real world of its own. Pillar 2 is Hikari's, documentary and uncopyable. Strategically the best of the four. **Not** a licence to use ukiyo-e or Japanese motif as backdrop — [08](../brand/08-brand.md)'s costume rule still holds.

*Full reasoning:* [20](../2-photos/20-imagery-rights.md). **The hard line from [D19](DECISIONS.md) is unchanged:** never composite a piece onto an image the business did not make. Route A complies with it rather than excepting it, because the photograph is Hikari's own.

*Open:* who owns public-domain verification and per-asset licence records ([99](99-open-questions.md) #79), a model release template before the first on-body shoot (#81), and folding imagery into the pre-launch IP solicitor hour (#82). **None of this is legal advice** — the reasoning in [20](../2-photos/20-imagery-rights.md) carries the same caveat as the tax work in [09](09-payments-and-tax.md).

**Amended 2026-09-22 · owner's call — generated backdrops adopted, in a narrowed form.**

The recommendation above was against, and the reasoning is unchanged and worth re-reading before this scales. What was chosen is narrower than what was rejected:

> **The backdrop is generated. The piece is always a real photograph.**

This satisfies [D19](DECISIONS.md)'s evidence line — true scale and condition survive, because the piece in frame is the piece being sold — and it leaves the *"real object, real age, found in Tokyo"* claim intact, since a painted setting no more contradicts it than a studio sweep does. A synthetic *piece* would; that is not what is being made.

**The ownership objection is not resolved by the narrowing and stands in full.** Generated output may carry no copyright anyone can enforce. Commercial use is generally permitted by the generating service's terms (#84 — verify per service), but **exclusivity is a separate question and the answer may be that there is none.** Proceed accepting that a competitor may copy the feed with no claim available.

Production spec in [20](../2-photos/20-imagery-rights.md); prompts in [`2-photos/prompts.md`](../2-photos/prompts.md). One rule is load-bearing rather than stylistic: **generate the sitter with a bare ear, never generate the earring.** Open: recurring sitter or a new face each time ([99](99-open-questions.md) #83).

---

### D21 · Work structure — six threads on one trunk
**2026-10-13 · Decided**

The work runs as six threads, each with its own folder and its own Claude session:
1. Shop
2. Photos
3. Copy
4. Markets
5. Social
6. Inspiration

The plan, decisions and open questions sit in `0-plan/`; the brand system sits in `brand/`. `main` is the single trunk. Every thread starts from it and returns its work to it. The Cecilia project, the same business, is merged in under `archive/cecilia/`.

*Rationale:* by October the repo had split into two lines that numbered decisions, questions and docs independently. D7–D9, #27–#50 and doc 11 each meant two different things. The 13 Oct merge rejoined them without dropping anything. The rules that stop it happening again are in [CLAUDE.md](../CLAUDE.md).

*Doc numbers are permanent IDs.* Only folders changed. `11-imagery-rights` became `20-imagery-rights` to clear the collision with 11 Platform.
