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

*Rationale:* [02](02-positioning.md), specified in [08](08-brand.md). Every competitor in the category runs some version of French luxury restraint; nobody uses a Japanese visual identity despite Japan being where the supply comes from. It is the open position and it's honest to the sourcing.

---

### D3 · Prove it online before any physical retail
**2026-09-21 · Decided**

The website carries the whole trust burden first. Physical space — pop-ups, fairs, and eventually a room — comes only after the site demonstrably converts at £100–300.

*Rationale:* trust is the barrier, not price ([03](03-customer.md)). A physical space is a fixed cost that answers a question the website has to answer first: will a stranger pay £180. Moving offline early spends capital on presence instead of on inventory, which is where the moat is. Confirms [07](07-roadmap.md) Phase 3 sequencing.

**Signal to move:** ≥60% 90-day sell-through sustained over two quarters, and a mailing list that reliably clears the strongest pieces on Edition night. Not before.

Reserved name: **The Room** ([08](08-brand.md)).

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

*Rationale:* [08](08-brand.md). A brand that nicknames its own storefront is usually compensating. Naming the rituals is what turns a shop into a habit — and calling marketplaces "outposts" in internal language keeps effort pointed at the home, which is the whole of D1.

---

### D6 · Texture and motion — grain, scale, scroll-driven colour
**2026-09-22 · Decided in direction, open in detail**

Heavy film grain over the whole page (image and type alike), imagery at full width with nothing competing, background colour interpolating through the palette as a function of scroll position, and piece information always below the image rather than over it.

*Prototype:* https://claude.ai/artifact/3VLz1B1qzQ7P5tnbYnnWtb · *Specification:* [08](08-brand.md).

**Carries one hard constraint.** Grain applies to the composed and on-body frames only. The maker's-mark macro and the condition frame are evidence and stay clean — grain hides precisely the wear that [03](03-customer.md) and [04](04-site-ia.md) require the buyer to see. Texture on the seduction, never on the proof.

*Open:* whether "用画" meant large imagery or actual paintings ([99](99-open-questions.md) #24), and mid-range Android performance before Phase 1 commits ([99](99-open-questions.md) #26).

---

### D7 · Platform — Shopify Basic, Shopify Payments, custom theme
**2026-09-22 · Decided**

Not a bespoke Stripe build, and specifically **not** Stripe as a third-party gateway on Shopify — that combination pays Stripe's rate *and* Shopify's penalty (~£6.50 on a £180 sale against £3.85).

*Rationale:* [11](11-platform.md). Shopify Payments is powered by Stripe, so "build it on Stripe" is what Shopify Payments already is, with the commerce layer supplied. A custom build saves roughly £565 a year and costs cart, inventory, orders, shipping, returns, email, tax, PCI scope, fraud, CMS and search — built and then maintained forever. Design freedom is not the constraint: a hand-built Liquid theme controls every page except checkout, and everything in the prototypes is ordinary theme work.

*Review triggers:* Basic → Grow at ~£10,000/month revenue (set the review at £8,000). Headless only if the storefront outgrows Liquid — and it would not change the checkout anyway.

---

### D8 · Homepage layout — the scale ladder
**2026-09-22 · Decided**

One piece at full width, three composed asymmetrically, then four, then six. Density is earned. Featured pieces sit at different grid spans and vertical offsets rather than in an even row. House names are a display-type section rather than a filter menu. Information below the image at every scale.

*Rationale:* [04](04-site-ia.md). Resolves the tension between the tokonoma principle and the fact that a shop has to show stock.

*Prototype:* https://claude.ai/artifact/SSwHryr1Tu735AVHKxdo5s

---

### D7a · Platform — reasoning revised, conclusion unchanged
**2026-09-22 · Amends D7**

The inventory-management argument in D7 was weak and is withdrawn: with 60–100 hand-listed one-of-one pieces and no 3PL, Shopify's inventory engine decides nothing. Re-argued in [11](11-platform.md) on better grounds:

1. **Order-lifecycle email.** Stripe sends a payment receipt and nothing else. Shopify ships confirmation, dispatch-with-tracking, delivery, cancellation, refund and abandoned checkout, all editable. The dispatch email is where a £185 customer stops worrying — trust architecture, not an operational nicety.
2. **The Edition is free to run.** 10,000 emails a month included on Basic. At 1,000 subscribers × 4 Editions that is 4,000 sends at no cost — the highest-leverage ritual in [05](05-social.md), costing nothing.
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

*Rationale:* [13](13-photography-pipeline.md). Commercial before legal — a piece that looks better on screen than in the hand produces a return, a review and sometimes a chargeback, and at 50% margin a returned order costs more than the next one earns. Legally, CAP's guidance is explicit that a disclosure does not rescue a misleading image.

**Turn it into an asset:** publish the retouching policy. Nobody in the category does, and it converts the biggest objection in [03](03-customer.md) into a reason to buy.

---

### D11 · Paid media — optimise for the list, not for sales
**2026-09-22 · Decided**

Ads point at the sourcing story and the Edition sign-up, never at individual pieces.

*Rationale:* [14](14-marketing.md). On one-of-one stock an ad for a sold piece is wasted spend, and every winning creative dies when its subject sells — you can never scale an ad whose product no longer exists. The brand and the sourcing story never sell out. Paid spend then builds an owned asset instead of renting attention.

**Channels:** Meta primary (fashion has the platform's lowest CPCs; Reels 20–35% cheaper than feed), **Pinterest alongside it from the start** — CPMs run roughly a quarter of Meta's and pins last years. TikTok organic only for now. Google Ads on generic terms only.

**Budget:** £10–15/day Meta + £5/day Pinterest ≈ £450–600/month, and not until the weekly Edition works organically ([05](05-social.md)). Max £30 CAC on a first order. Measure **cost per subscriber**, not cost per sale.

**Refines [04](04-site-ia.md):** its blanket "never bid on brand names" was too crude. Google permits reseller use of marks as keywords and in ad text where the landing page genuinely sells those goods and the advertiser is clearly identified, with the UK applying a stricter identity standard. It is *permitted rather than safe*, and the risk is asymmetric — so generic terms only until the business is worth defending, and never Chanel.

---

### D12 · All-in pricing — the price shown is the price paid
**2026-09-22 · Decided**

No handling fee, no service fee, no tax line appearing at checkout, no price that varies by payment rail. Duty and any tax are inside the number on the product page, and that number is what the customer pays.

*Rationale:* [15](15-competitor-etvous.md). It is a legal requirement — the DMCC Act 2024 has banned drip pricing since 6 April 2025, with CMA fines up to the higher of £300,000 or 10% of global turnover — and it is simultaneously the sharpest competitive line available. The nearest direct competitor adds a 20% "Handling Fee" at checkout, so their £228 ring is really £273.60. Against that, an all-in £185 is a different proposition, not a small discount.

**Accepted cost, stated so nobody is surprised:** all-in pricing looks *more expensive* in a side-by-side ad or a Google Shopping row. That is precisely why drip pricing exists. We answer with brand, trust and the Edition list ([D11](DECISIONS.md)), not with a price race we would lose.

**Also decided:** never publish a comparison accusing a named competitor of a tax or pricing offence. Defamation and malicious-falsehood risk, and not how we compete. The finding informs our pricing; it never becomes our copy.

---

### D13 · Not reporting the competitor — for now
**2026-09-22 · Decided, revisitable**

Lawful to report; not doing it yet. **Never** the tax allegation — a 20% line labelled "Handling Fee" is equally consistent with lawful DDP import-VAT collection, and we cannot see their registration, shipping origin or books. Reporting that would be wrong on the facts.

The drip-pricing point *is* supportable, but three things outweigh it: winning gains us no customers (the CMA is already enforcing this sector); a competitor complaint on one screenshot is weighted as interested and rarely moves anything; and — decisively — **the retaliation risk is currently asymmetric.** We have not cleared the trademark, settled the VAT position, had the IP review, or published our policies. We are the less-prepared party.

**Action instead:** archive dated evidence to preserve the option, and compete on it — *"The price you see is the price you pay"* in the headline, on the product page and at checkout. A claim about us, not an accusation about them.

**Revisit if:** our own compliance is complete, or we see consumer harm at scale rather than one screenshot.

*Reasoning:* [15](15-competitor-etvous.md). Publication, social posts, contacting their customers and press briefings stay ruled out under [D12](DECISIONS.md).
