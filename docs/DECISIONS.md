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

### D7 · Social accounts — European subject, Japanese frame
**2026-09-22 · Proposed**

Launch Instagram (primary) and 小红书 (secondary) on a single rule: **the objects are European, the eye is Japanese.** The stock already *is* European — Dior, Givenchy, YSL and Nina Ricci are Paris houses, Grosse is Pforzheim — so a European style reference is not in conflict with [D2](DECISIONS.md) provided it supplies the *subject* and never the *frame*. Composition, ground, type and light stay as specified in [08](08-brand.md).

Two structural proposals attached:

- **Instagram grid as a catalogue.** One Edition = exactly three posts in fixed order, which locks each column to one frame type (composed / maker's-mark macro / on-body). The condition frame stays off-grid — it is evidence, and it belongs on the product page and in Stories.
- **小红书 as a knowledge and diaspora channel**, run at pillar-3 weight for UK/EU Chinese-speaking buyers and evergreen search. Not a second storefront, not a translated Instagram feed, not a route to mainland customers.

The platform's cover-title convention collides with [08](08-brand.md)'s rule that the photograph never carries text. **Resolved in favour of the rule:** a plain `--paper-deep` type plate takes ~22% of the 3:4 cover, the photograph below it stays untouched. A plate, not an overlay — the same logic as information-below-the-image on the site.

*Full reasoning:* [05](05-social.md). *Open:* the 小红书 remit is unconfirmed ([99](99-open-questions.md) #28). **Awaiting your call.**

**Amended 2026-09-22** — the reference account has now been reviewed (#27 resolved). It supplies the *frame*, so it is not adopted. Two amendments follow from it:

- **The split is a channel rule, not just a frame rule.** *Instagram is the seduction surface; the product page is the evidence surface.* Frame 4 need never appear on Instagram at all. This supersedes nothing in [D6](DECISIONS.md) — it governs the feed, D6 governs the site — but it is the cleaner statement of the same principle.
- **The grid needs atmosphere the four-frame spec does not produce.** Launch at three posts per Edition with atmosphere in Stories and Reels; revisit a six-post Edition at the [07](07-roadmap.md) month-9 run rate (#32). Hikari's atmosphere is pillar 2 — the Japan sourcing, shot documentary — not borrowed interiors.

**One hard line added:** products are **never composited onto images the business did not make.** The reference does this with a classical painting and with a black-and-white fashion photograph; the second is almost certainly still in copyright, and both destroy scale and condition information that [08](08-brand.md)'s frame 3 exists to supply. Paintings as backdrops are viable only as verified public-domain works, sourced deliberately and recorded per asset ([99](99-open-questions.md) #31).

---

### D8 · Imagery — the look is kept, the borrowing is not
**2026-09-22 · Decided in principle, open in production detail**

The painterly / old-photograph register of the reference account ([05](05-social.md)) is **adopted**. The method by which the reference achieves it is **rejected**, and two shortcuts around it are rejected with it.

**Rejected — posting borrowed imagery on Instagram only.** The infringing act is the communication to the public and it happens in full on Instagram. The UK has fair dealing on a closed list of purposes, none of which covers "it suited the feed". The decisive risk is not being sued: it is **notice, strike, and losing the account** — and with it the primary channel, the archive and the handle, uninsurably.

**Rejected — AI-generated backdrops.** They remove the third-party copyright problem and add three: output that may carry no copyright anyone can enforce, prompts that can land back on a protected work, and CAP Code exposure wherever the product itself is misrepresented. The decisive objection is internal — [03](03-customer.md) makes trust the barrier and [08](08-brand.md) has already moved the palette off a look it identified as AI-signature. A synthetic atmosphere argues against a product whose whole claim is *real object, real age, found in Tokyo*.

**Adopted — four routes, all of which produce imagery Hikari owns outright:**

- **A · Verified public-domain paintings, shot physically, never composited.** Sourced from open-access museum programmes where the licence is stated on the record. Print it, light it, photograph the piece against it in one real exposure. Recommended.
- **B · Commission the painting**, work-for-hire with copyright assigned in writing. Unrepeatable by any competitor.
- **C · Shoot the "old photograph" rather than borrow one.** Grainy black-and-white profile, piece in colour — mechanically identical to the reference's strongest image, and it doubles as frame 3 done properly.
- **D · The Tokyo frame.** The reference borrows European interiors because it has no real world of its own. Pillar 2 is Hikari's, documentary and uncopyable. Strategically the best of the four. **Not** a licence to use ukiyo-e or Japanese motif as backdrop — [08](08-brand.md)'s costume rule still holds.

*Full reasoning:* [10](10-imagery-rights.md). **The hard line from [D7](DECISIONS.md) is unchanged:** never composite a piece onto an image the business did not make. Route A complies with it rather than excepting it, because the photograph is Hikari's own.

*Open:* who owns public-domain verification and per-asset licence records ([99](99-open-questions.md) #31), a model release template before the first on-body shoot (#33), and folding imagery into the pre-launch IP solicitor hour (#34). **None of this is legal advice** — the reasoning in [10](10-imagery-rights.md) carries the same caveat as the tax work in [09](09-payments-and-tax.md).

**Amended 2026-09-22 · owner's call — generated backdrops adopted, in a narrowed form.**

The recommendation above was against, and the reasoning is unchanged and worth re-reading before this scales. What was chosen is narrower than what was rejected:

> **The backdrop is generated. The piece is always a real photograph.**

This satisfies [D7](DECISIONS.md)'s evidence line — true scale and condition survive, because the piece in frame is the piece being sold — and it leaves the *"real object, real age, found in Tokyo"* claim intact, since a painted setting no more contradicts it than a studio sweep does. A synthetic *piece* would; that is not what is being made.

**The ownership objection is not resolved by the narrowing and stands in full.** Generated output may carry no copyright anyone can enforce. Commercial use is generally permitted by the generating service's terms (#36 — verify per service), but **exclusivity is a separate question and the answer may be that there is none.** Proceed accepting that a competitor may copy the feed with no claim available.

Production spec in [10](10-imagery-rights.md); prompts in [`brand/prompts.md`](../brand/prompts.md). One rule is load-bearing rather than stylistic: **generate the sitter with a bare ear, never generate the earring.** Open: recurring sitter or a new face each time ([99](99-open-questions.md) #35).
