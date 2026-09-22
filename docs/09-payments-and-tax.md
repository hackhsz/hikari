# 09 — Payments & Tax

> **This document exists because of a proposal to take payment peer-to-peer (bank transfer / direct arrangement) rather than through a card checkout, in order to avoid VAT registration.** The intent is sound — VAT is the largest single cost lever in this business ([06](06-unit-economics.md)). The mechanism does not work, and it costs the thing that matters most. What follows is the reasoning, and the route that gets the same outcome legitimately.
>
> **Not tax advice.** Confirm all of it with a UK accountant.

---

## The proposal doesn't do what it's meant to do

### 1. VAT registration is triggered by turnover, not by payment method

Registration is required once **taxable turnover** passes the threshold (**currently £90,000** on a rolling 12-month basis — verify) or is expected to within 30 days. Turnover is turnover whether it arrives by card, bank transfer, PayPal, or cash in an envelope. HMRC's test for whether you are trading is the nature of the activity — buying goods with the intention of reselling them at a profit — not the rail the money travels on.

So peer-to-peer payment changes nothing about *whether* you must register. Below the threshold you needn't register regardless of how you take payment. Above it you must, regardless.

### 2. You are already under the threshold anyway

This is the part that makes the whole question moot.

The roadmap target for month 9 is 25–35 sales a month at roughly £180 ([07](07-roadmap.md)). That is **£54,000–75,600 a year.** Comfortably below £90,000.

**You don't need a clever structure. At your own planned volume you're simply under the threshold.** Peer-to-peer buys you nothing you don't already have.

### 3. Import VAT is unavoidable either way — and staying unregistered makes it worse

This is the most likely source of the confusion, and it runs the opposite way to the intuition.

**Import VAT (20%) is charged at the UK border on every consignment from Japan regardless of registration status.** It is not a sales tax you can route around; it is a condition of the goods entering the country.

- **Not registered:** you pay import VAT and **cannot reclaim it.** It is pure, permanent cost on every single piece.
- **Registered:** you reclaim import VAT as input tax (and can use postponed VAT accounting for cash flow), but you charge output VAT on sales.

So "avoiding VAT registration" does not avoid VAT. It guarantees you pay the unrecoverable kind. Whether that is better or worse than registering is a genuine arithmetic question — and it turns entirely on the **second-hand margin scheme** question in [06](06-unit-economics.md), which remains the actual blocking item. Peer-to-peer payment is not an input to that calculation at all.

### 4. Income tax and corporation tax are untouched by any of this

Profit from trading is taxable from the first pound (above the £1,000 trading allowance for individuals, which is irrelevant at this scale). VAT is one tax; it is not the tax. Restructuring payment rails does not change the income position, and shouldn't be reasoned about as though it might.

---

## What it costs — and it costs the one thing you just said matters most

Your own point stands directly against this: *"I'm building trust... we need to prove ourselves on the website."* Correct, and it's the central finding of [03](03-customer.md) — **at £100–300 the barrier is trust, not price.**

Peer-to-peer payment attacks exactly that.

| | Card checkout | Peer-to-peer |
|---|---|---|
| **What it looks like** | A shop | A stranger asking a first-time customer to bank-transfer £180 for a secondhand object. **This is the single most-recognised scam pattern in UK online retail.** Consumers are actively trained by their banks to refuse it. |
| **Buyer protection** | Chargeback rights. She can buy without trusting you yet. | None. She must trust you *before* paying — which is the thing she has no basis to do. |
| **Klarna / Clearpay** | Available. Does real work in the £150–300 band ([03](03-customer.md)) | Impossible |
| **Conversion** | Normal | A large majority of first-time visitors will not complete. There is no version of this that converts at scale. |
| **Consumer law** | Same obligations | **Same obligations.** Taking a bank transfer does not make a trader a private individual. Consumer Contracts Regulations and the Consumer Rights Act still apply in full. |
| **Upside path** | Wholesale, retailers, a physical room | None of it. Nobody wholesales into Harvey Nichols off bank transfers. |

Two further practical traps:

- **PayPal "friends and family" for commercial sales breaches PayPal's terms**, removes buyer protection, and is a common cause of frozen accounts and held balances.
- **It caps the business permanently.** A structure chosen to stay small will keep it small. That may be an acceptable choice — but it should be made deliberately, not as a side effect of a payments decision.

---

## The route that gets you what you actually want

You want: no VAT registration burden, maximum margin retained, trust intact. All three are available at once.

1. **Take normal card payments.** Shopify Payments, ~1.5–2% + 20p on UK cards. On a £180 sale that is roughly £3 — against a gross margin around £90. **The trust it buys is worth many multiples of the fee.** This is not a close call.
2. **Add Klarna/Clearpay** once live (confirm current FCA requirements — [99](99-open-questions.md) #14).
3. **Don't register for VAT** while under the threshold. Legitimate, requires no structuring, and is where your planned volume already sits.
4. **Track rolling 12-month turnover monthly.** Set an alert at £75,000 — that's the point to revisit, not £89,000.
5. **Answer the margin-scheme question now** ([06](06-unit-economics.md), [99](99-open-questions.md) #1). If imported second-hand goods *can* use it, voluntary registration may beat staying unregistered even at low volume, because import VAT becomes recoverable. **This is the real lever. It is worth one paid hour.**
6. **Keep the acquisition record for every piece** — required for the margin scheme if it applies, and separately your trademark exhaustion defence ([04](04-site-ia.md)). One process, two purposes.

---

## Where peer-to-peer does have a place

Not nothing — just not as the primary rail.

- **Repeat collectors (segment B).** A known customer who has bought three times and asks to pay by transfer for a £400 piece is a different situation entirely. Trust already exists; the rail is just convenience.
- **Pieces held or reserved** ahead of an Edition for a known buyer.
- **Wholesale and trade**, later — B2B invoicing is bank transfer by default and always has been.

The distinction is simple: **peer-to-peer is fine once trust exists. It cannot be the mechanism by which trust is established.**

## Decision needed

This is your call, and I'll build to whichever way you take it. But the recommendation is unambiguous: **card checkout, no VAT registration under the threshold.** It delivers the goal of the peer-to-peer proposal, in full, without spending the trust the whole strategy depends on.

Logged as **D4** in [DECISIONS](DECISIONS.md), currently marked *proposed — recommend reversing*.

---

## Correction · 2026-09-22 — "the biggest single lever" was the wrong call

This document describes the second-hand margin scheme as "the real lever" and "the biggest single lever in the business". Working in [16](16-vat.md) §6 shows otherwise: where import VAT is recoverable, margin and standard accounting land in the same place.

**The lever is registration itself.** Unregistered is worth **£14 a piece, 7.8% of revenue**, at our cost and price. The £90,000 threshold is a cliff costing about **£7,000 a year** to cross.

Which *strengthens* this document's main conclusion rather than weakening it: staying under the threshold is not a technicality to be relaxed about, it is worth real money, and it remains entirely legitimate. What changes is the brief for the accountant — see [16](16-vat.md) §7.
