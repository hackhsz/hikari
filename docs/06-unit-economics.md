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
