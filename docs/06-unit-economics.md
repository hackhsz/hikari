# 06 — Unit Economics

> ⚠️ **This document contains a model, not findings.** Every input marked `[ASSUMED]` is a placeholder to be replaced with a real number from a real purchase. The structure is right; the figures are not yet true. Tax treatment in particular must be confirmed with a UK accountant before it is relied on.

---

## Sourcing channels, in order of accessibility

**1. Proxy-buying from Yahoo! Auctions Japan** — *start here*
Yahoo Auctions is the largest secondhand auction market in Japan and is domestic-only: it requires a Japanese account, address and usually a Japanese payment method. Proxy services bridge this — [Buyee](https://buyee.jp/yahoo/auction?lang=en), [Jauce](https://www.jauce.com/), [Remambo](https://www.remambo.jp/japanese-online-stores/yahoo-auctions-japan), [Japan Rabbit](https://japanrabbit.com/shops/yahoo-auctions-japan/), [FromJapan](https://en.wikipedia.org/wiki/From_Japan). They bid, receive, consolidate and forward.
*Pros:* immediate access, no minimum, the deepest and cheapest supply. *Cons:* proxy fees, no physical inspection before bidding, auction timing, consolidation delays.

**2. Mercari Japan and domestic C2C** — same proxy route, fixed prices, frequently mispriced by sellers who do not know what they have. High effort per unit, occasionally excellent margin.

**3. The reuse chains** — [Komehyo](https://komehyo.jp/?wovn=en) (Japan's largest pre-owned luxury reseller, founded 1947), Brand-Off, Allu, Ragtag. Authenticated, more expensive, far lower risk. Good for establishing a baseline of what "correct" looks like before trusting your own eye at auction.

**4. B2B wholesale** — *the scale unlock*
[Brand Off's buying club](https://brandoffbuyingclub.com/pages/about-brand-off-online-buying-club) runs an explicit B2B programme for resellers: bulk pricing, priority releases, a monthly-rotating collection covering bags, wallets, watches, jewellery and apparel. **It requires verification as a genuine reseller with a registered business.** [Komehyo Brand Off Asia](https://www.dnb.com/business-directory/company-profiles.komehyo_brand_off_asia_limited.158be110251934f5b9e49a71fa1967ec.html) operates from Hong Kong as the international arm.
**Register the UK company early** — verification takes time and is the gate to the only channel that supports volume.

**5. Buying trips** — Tokyo and Osaka in person: [Amore](https://amorevintagejapan.com/), [Qoo](https://qoo-online.com/en), [Atlantis](https://atlantisvintagetokyo.com/), Hedy Daikanyama, Brand-Off, Allu, Komehyo. Best pieces, physical inspection, relationships — and the content. A sourcing trip is simultaneously inventory acquisition and a month of social media (see [05](05-social.md)). Model it as both.

**6. The closed trade auctions** — the Japanese B2B auction houses where the reuse chains themselves buy. Membership-gated, usually requiring a Japanese entity or a sponsor. Not accessible at launch; worth understanding as the eventual destination, because it is where the real margin lives.

---

## Landed cost model

Worked example for one piece. **Replace every `[ASSUMED]` before using this for decisions.**

| Line | Example | Notes |
|---|---|---|
| Hammer / purchase price | ¥12,000 `[ASSUMED]` | Typical for signed vintage Dior earrings — **verify against live listings** |
| FX | `[ASSUMED — use live rate]` | A real and unhedged risk. JPY moves materially; a 10% swing moves gross margin by several points. |
| ≈ GBP | ~£62 `[ASSUMED]` | |
| Proxy commission | ~5–10% | Varies by service |
| Domestic JP shipping + consolidation | £3–6 per piece consolidated | Consolidation is essential — never ship singles |
| Freight JP→UK | £4–10 per piece | Only at consolidated volume |
| **Customs duty** | ~2.5–4% | See below |
| **Import VAT** | 20% | On goods + freight + duty. See below. |
| Payment / FX fees | ~2% | |
| **Landed cost** | **~£80–95** | |
| **Retail** | **£180** | |
| **Gross margin** | **~47–55%** | *Before* photography time, packaging, returns, marketing |

**Target: landed cost ≤ 35% of retail.** At a 3× markup the business absorbs returns, unsold stock and marketing and still works. At 2× it does not — a single unsold piece wipes out the margin on two sold ones.

### Duty — the nuance that generic guides miss

Generic sources say "the UK has a free trade agreement with Japan, so most goods are 0%". **This is probably not true for your goods.** UK–Japan CEPA preferential rates depend on *rules of origin*, and a French-made 1985 Dior earring that merely passed through Japan is **not of Japanese origin**. Expect to pay the standard MFN rate.

Indicatively: imitation/costume jewellery (HS 7117) attracts roughly 4%; articles of precious metal (HS 7113) around 2.5% ([UK–Japan calculators](https://dutiable.io/import-duties/from-japan-to-uk), [Japan Handbook](https://japanhandbook.com/buying-from-japan-to-the-uk-customs-and-vat-explained/)). **Confirm the exact 10-digit commodity code against the official UK Trade Tariff.** A wrong code is either overpayment forever or a penalty later.

### VAT — the biggest single lever, and genuinely unresolved

Three interacting questions, all for an accountant:

1. **Registration.** Below the VAT threshold (**currently £90,000 — verify**) registration is optional. Unregistered, you pay import VAT and *cannot reclaim it* — it becomes pure cost. Registered, you reclaim import VAT but must charge output VAT on sales. **At these margins, voluntary early registration may well be correct. Model it both ways before deciding.**

2. **The second-hand margin scheme.** The VAT margin scheme for second-hand goods charges VAT on the *margin* rather than the full selling price — on a £180 sale with £90 cost, roughly £15 instead of £30. On a £100–300 resale business this is the difference between viable and marginal. **However: goods imported from outside the UK are generally excluded from the margin scheme**, with narrow exceptions for works of art, antiques and collectors' items. If that exclusion applies, the entire model changes. **This is the single most important open question in the business and it should be answered in week one.**

3. **Antiques relief** does not help — it requires goods over 100 years old. 1980s Dior does not qualify.

> **Action:** one paid hour with a VAT specialist who knows second-hand goods and imports, before the first commercial order. It is the highest-return spend available right now.

---

## Sell-through, which matters more than margin

On one-of-one inventory, **sell-through rate is the health metric.** Margin on a piece that never sells is zero, and cash tied up in dead stock is the way small resale businesses die.

- Target **60%+ sold within 90 days**
- Anything unsold at 90 days → marketplace liquidation at a reduced price ([02](02-positioning.md))
- Track sell-through **by designer, by type, by era, and by price band** from the very first order. This is the feedback loop that makes buying better, and it is worth more than any market report.
- Do not buy what you love. Buy what sold.

## Break-even sketch

At £180 average order value and ~50% gross margin, contribution is ~£90 per sale. Against `[ASSUMED]` fixed costs of ~£500/month (Shopify, apps, domain, insurance, accounting, minimal ads), break-even is roughly **6 sales a month** — before paying anyone, including yourself. A part-time founder's income needs roughly 25–35 sales a month.

**The binding constraint is not demand. It is sourcing throughput and the hours per piece** — photography, measurement, research, writing. Budget 45–60 minutes per piece end to end and be honest that this is the real ceiling on growth.

## Open

- Every `[ASSUMED]` figure.
- Margin scheme eligibility on imported goods — **blocking**.
- Correct commodity code.
- Whether to register for VAT voluntarily from day one.
- FX exposure: at what monthly volume does hedging become worth the complexity?

---

## Update · 2026-09-21 — payment rails do not change the VAT position

A proposal to take payment peer-to-peer in order to avoid VAT registration is analysed in full in [09 — Payments & Tax](09-payments-and-tax.md). Three points belong here, in the economics:

1. **Registration is triggered by turnover, not payment method.** Below the threshold (currently £90,000 — verify) registration is optional regardless of how money is taken; above it, mandatory regardless.
2. **At the roadmap's own month-9 target** — 25–35 sales/month at ~£180, i.e. **£54–76k/year** — the business is already under the threshold. Nothing needs structuring.
3. **Import VAT is charged at the border either way.** Unregistered means paying it and being unable to reclaim it: permanent, unrecoverable cost on every piece. This runs opposite to the intuition and is the most important correction in this document.

The genuine lever remains **margin-scheme eligibility for imported second-hand goods** — still [99](99-open-questions.md) #1, still blocking, still worth one paid hour of a specialist's time. Card processing at ~1.5–2% (~£3 on a £180 sale against ~£90 gross margin) is a rounding error against it.

---

## Update · 2026-09-22 (ii) — import VAT: what is and isn't available

### The principle

**VAT is a destination tax.** Where the goods were bought is irrelevant. Bringing goods into the UK *for resale* is an import, and UK import VAT applies on the customs value — whether they arrived by courier, by freight, or in a suitcase.

There is **no traveller allowance for goods you intend to sell**. The £390 personal allowance explicitly excludes them; Border Force can question commercial intent and seize the goods. Carrying stock in undeclared, whatever the value, is smuggling rather than a loophole, and it is not a route this business will use.

**Hand-carry is a perfectly good *route*, though** — it just doesn't avoid tax. **Merchandise in Baggage**: commercial goods under **£2,500** and **1,000kg** can be declared through a simplified online service, filed in the five days before arrival ([GOV.UK](https://www.gov.uk/guidance/bringing-commercial-goods-into-great-britainin-your-baggage)). That saves freight and courier handling on a buying trip. It does not save duty or VAT.

### The levers that do exist

**1 · The 100-year rule — the largest, and a genuine sourcing input.**

The UK applies a **5% effective import VAT rate** to antiques (commodity heading **9706**, goods over 100 years old), collectors' items (9704, 9705) and works of art. Everything else is 20% ([BADA](https://www.bada.org/advice/imports-and-exports/importing-antiques-uk), [Plutos](https://plutos.org.uk/importing-art-antiques-to-uk-vat-licences/)).

**In 2026 the cutoff is 1926.** Victorian, Edwardian, Art Nouveau and pre-1926 Art Deco pieces land at **5% rather than 20% — a 15-point swing on landed cost.** On a piece landing at £150, that is ~£22 a unit, permanently.

Requirements: documentary evidence that the item was manufactured in its current form more than 100 years before import. If customs is not satisfied, a **BADA member can issue a certificate of age**.

**1980s Dior does not qualify**, so this is not a saving on the current plan — it is an argument for whether to run a **pre-1926 line at all**. That is a different buying skill, a different authentication problem, and a different customer: segment B, the collector ([03](03-customer.md)), who has the higher AOV and the cheapest acquisition. Worth modelling before dismissing. Logged as [99](99-open-questions.md) #45.

**2 · Japan-side: the consumption tax refund.**

Japan charges 10% consumption tax. Non-residents can recover it on goods exported from Japan — a legitimate saving on the *Japanese* side of the trade, and roughly 10% of purchase cost.

**The scheme changes on 1 November 2026, with no transition period.** It moves to a **refund method**: you pay the full tax-inclusive price in store, and the refund is issued after customs confirms at departure that the goods are leaving Japan ([Japan Guide](https://www.japan-guide.com/news/tax-free-shopping.html), [Japan Travel](https://en.japantravel.com/article/tax-free-shopping-in-japan-2026-changes/72305)). Eligibility covers foreign visitors within six months of entry.

**Verify before relying on it:** the scheme is framed around non-residents taking goods out of Japan, and the 2026 reform is explicitly aimed at resale abuse (domestic diversion). Whether purchasing for commercial resale abroad falls inside or outside it is a question for a Japanese tax adviser, not an assumption. Also note many small vintage shops are not tax-free registered, though the large reuse chains are. Logged as [99](99-open-questions.md) #46.

**3 · Registration and postponed VAT accounting.**

If VAT-registered, import VAT becomes **recoverable input tax** — and under **postponed VAT accounting** it is not paid at the border at all, but accounted for on the return, so it never leaves the bank account. Most small importers do not know this exists.

This is the structural answer to import VAT, and it is the same trade already framed at [09](09-payments-and-tax.md): recover import VAT, charge output VAT on sales. Still turns on the margin-scheme question at [99](99-open-questions.md) #1, still blocking, still one paid hour.

**4 · Returned Goods Relief — sounds like it should work, doesn't.**

A French-made Dior earring returning to Europe feels like it should qualify. It does not: RGR requires goods exported *from the UK*, returning within **three years**, unaltered, by the same person. A 1980s piece exported from France to Japan forty years ago fails every limb. Noted so nobody rediscovers it hopefully.

### Where this leaves our own pricing

While unregistered, import VAT is **irrecoverable and sits inside landed cost** — so it is inside the £185 on the page, not a line beside it. The tax exists either way. The only question is whether the customer meets it in the headline price or at the checkout screen ([D12](DECISIONS.md)).

---

## Correction · 2026-09-22 (iii) — the margin scheme is not the lever this document claimed

The section above calls margin-scheme eligibility "the single most important open question in the business". **That is wrong for an import-based model.** Full working in [16](16-vat.md) §6.

Where import VAT is **recoverable**, the margin scheme and standard accounting give **the same answer** — £70 gross profit per piece either way at £80 cost / £180 retail. The margin scheme's advantage comes from buying with no input VAT to reclaim. If you can already reclaim it, there is nothing left to save.

**The real lever is whether to register at all.** Unregistered yields **£84** a piece against £70 registered — **£14, or 7.8% of revenue**. Crossing £90,000 turnover costs roughly **£7,000 a year** unless prices rise ~20%.

Two things this changes:

1. **The margin scheme is an argument for buying in the UK, not for importing.** On stock bought VAT-free from private sellers it is worth **£13.33** a piece (£83.33 against £70). That makes UK sourcing — house clearances, fairs, private sellers — economically interesting in a way it was not before, alongside the Japan supply.
2. **Pre-1926 antiques collect both reliefs**: 5% import VAT *and* margin-scheme eligibility, which imported second-hand goods otherwise lack. £96 a piece unregistered against £84 for ordinary stock. [99](99-open-questions.md) #45 is now the most valuable open question in this document.

The accountant hour is still worth booking — but the brief changes. Ask about **registration timing, postponed VAT accounting, global accounting and the precious-metals exclusion**, not only the margin scheme.
