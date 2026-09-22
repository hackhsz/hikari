# 15 — Competitor Teardown: et vous vintage

[etvous.uk](https://etvous.uk/) — closest direct competitor found so far: UK-facing, Chinese-community-oriented, selling vintage designer jewellery and accessories in and around our band.

Evidence below is from the live site and a checkout screenshot dated 2026-09-22. Anything inferred is marked as inference.

---

## Platform: SHOPLINE, confirmed

Not Shopify, not a Stripe build.

- `robots.txt` states it outright: **`#we use Shopline as our ecommerce platform`**
- Assets served from **`img-va.myshopline.com`** (SHOPLINE's CDN), store ID `1743853975834`
- Cloudflare in front; `/products.json` and `/cart.js` return 403, which also rules out a stock Shopify storefront

SHOPLINE is a Shopify-equivalent SaaS built for Greater China cross-border sellers. The checkout is a close copy of Shopify's, and the tells are small English slips: **"Coupon code"** where Shopify says "Discount code", title-case **"Continue to Shipping"** where Shopify uses sentence case, **"Receive exclusive offers and marketing updates"** where Shopify says "Email me with news and offers", and a default blue CTA.

**Worth noticing commercially:** those slips read, faintly, as *not a UK brand*. On a £274 purchase from an unknown seller, where the entire barrier is trust ([03](03-customer.md)), small wrongness in the checkout copy is not cosmetic. It is the last screen before the money moves.

---

## The "Handling Fee" is VAT

| | |
|---|---|
| Subtotal | £228.00 |
| Handling Fee | £45.60 |
| **Total** | **£273.60** *(before shipping)* |

**£45.60 ÷ £228.00 = exactly 20.0000%.** And £45.60 ÷ £273.60 = 16.667% — precisely 1/6, the VAT fraction of a VAT-inclusive price.

That is not a coincidence and it is not a handling cost. It is a 20% tax line wearing a different name.

### Three readings, and I can't tell which from outside

1. **DDP import VAT pass-through.** If goods ship direct from Japan, Hong Kong or China, anything over £135 attracts 20% import VAT at the UK border. Collecting it upfront so the courier doesn't ambush the customer is *legitimate practice* — but the correct label is "Duties & taxes", not "Handling Fee".
2. **UK VAT charged without VAT registration.** You cannot lawfully charge something called VAT if you are not registered, so it gets renamed. This is the reading the label most invites.
3. **A platform limitation worked around.** SHOPLINE's UK tax configuration may not fit their setup, so it was bolted on as a fee line.

**I am not in a position to say which, and neither is anyone else looking from outside.** What is observable is only this: the amount is exactly 20%, the label does not describe a 20%-of-value cost, and it appears only at checkout.

### What *is* clear-cut, regardless of intent

**This is drip pricing, and it has been unlawful in the UK since 6 April 2025.**

The DMCC Act 2024 bans presenting a headline price that excludes mandatory fixed charges. The CMA's final price transparency guidance requires **all mandatory charges — VAT and fees alike — to be in the upfront price**, with equal prominence and an explanation of how they are calculated ([CMS](https://cms.law/en/gbr/legal-updates/no-hidden-charges-clamping-down-on-drip-pricing), [Osborne Clarke](https://www.osborneclarke.com/insights/uk-cma-provides-further-guidance-drip-pricing-provisions-dmcca), [Reed Smith](https://www.reedsmith.com/articles/full-price-no-surprises-cma-s-final-price-transparency-guidance-arrives/)).

A compulsory, fixed-percentage charge revealed at checkout step one is the textbook case the rules were written for. CMA enforcement now runs to **the higher of £300,000 or 10% of global turnover** — direct fining powers, no court required.

*(The CMA has consulted further on the genuinely uncertain edges of the drip-pricing rules. A mandatory fixed charge missing from the headline price is not one of the uncertain edges.)*

---

## The other finding: "Avoid 5% platform fees by paying via WeChat"

On the site, in the merchant's own words.

Two things follow.

**One — it validates the peer-to-peer instinct and shows its shape.** This is the model considered and set aside at [D4](DECISIONS.md): the site as catalogue, payment pushed to a direct rail. Somebody in this exact niche is doing it, which is worth knowing. Note *why*: SHOPLINE charges them a platform fee steep enough to be worth a public workaround. **Shopify Basic has no 5% platform fee** — 2% + 25p through Shopify Payments ([11](11-platform.md)) — so the pressure that produced this behaviour does not exist for us.

**Two — it is another disclosure problem**, since the price now depends on the rail the customer picks, which cuts against the same transparency rules.

---

## The product naming tell

The item is listed as **"C Camellia Acrylic Ring"** — *C*, and the camellia, which is Chanel's flower. The house is never named.

Inference, not fact: this reads as either caution about trademark exposure, or caution about platform takedowns, or an item whose attribution won't bear naming.

**Either way it is an own goal.** Nobody searches for "C Camellia". They search for *vintage Chanel ring UK*. That naming choice forfeits the entire organic channel — the one Jagged Metal and Modern Vintage Style are already winning ([01](01-landscape.md)).

**Our approach is both more honest and better business:** name the house plainly, keep the acquisition record, carry the disclaimer, and rely on exhaustion of rights ([04](04-site-ia.md)). Referential use of a mark to describe genuine secondhand goods is lawful. Hiding it helps nobody and costs the search traffic.

---

## What this means for us

**1. Their real price is £273.60, not £228.** Against that, an all-in £185 with nothing added at checkout is not a small difference. It is a different proposition.

**2. "Duty paid. The price you see is the price you pay." is now a legal requirement *and* a weapon** — pointed at this competitor specifically. The line already in [02](02-positioning.md) lands harder than when it was written. Put the all-in price in the headline, say so on the product page, and say so again at checkout.

**3. They are losing sales at the final screen.** A 20% surprise at checkout step one is among the most reliable causes of cart abandonment there is. We win those customers by not doing it.

**4. Name the honest cost of honesty.** All-in pricing looks *more expensive* in a side-by-side ad or a Google Shopping row — that is exactly why drip pricing exists. Our answer is brand, trust and the Edition list ([D11](DECISIONS.md)), not a race we would lose anyway. Worth stating plainly so nobody is surprised by the comparison later.

**5. SHOPLINE is not for us.** A capable platform, built for Greater China cross-border. For a UK-facing brand, Shopify's UK ecosystem — Royal Mail and Evri labels, Klarna, UK tax configuration, native-sounding English — is worth more than anything SHOPLINE adds. [D7](DECISIONS.md) stands.

## Caveats

- Screenshot is a single moment on one item; fee behaviour may vary by product, destination or basket size. **Re-check before relying on it.**
- I cannot see their VAT registration, their shipping origin, or their books. The 20% arithmetic is a fact; every explanation for it above is inference, including the innocent one.
- Nothing here is legal advice, and none of it should appear in our marketing as a claim about a named competitor. It is competitive intelligence for our own decisions. **Never publish a comparison accusing a named business of a tax or pricing offence** — that is a defamation and malicious-falsehood risk, and it is not how we want to compete.

---

## Reporting them — the analysis

Lawful to do. Recommended **not yet**, and never on the tax point. Reasoning below so the decision can be revisited with the argument intact.

### Separate the two allegations — they are not equally supported

| | Evidence | Verdict |
|---|---|---|
| **Drip pricing** | A mandatory 20% charge absent from the headline price and revealed at checkout. Directly observed, arithmetically exact, screenshot-dated. | **Supportable** |
| **Tax evasion** | A 20% line labelled "Handling Fee". | **Not supported.** Equally consistent with lawful DDP import-VAT collection on goods over £135 shipped from outside the UK. |

We cannot see their VAT registration, their shipping origin, or their books. **Reporting a business for tax fraud on evidence that is equally consistent with lawful behaviour is wrong on the facts, not merely unwise.** HMRC's reward scheme requires collections of at least £1.5m to pay out, which is also a useful indication of the scale mismatch here.

### The channels, for the record

- **Drip pricing** → the **Citizens Advice consumer service**, which routes to **Trading Standards**; or the **CMA**. The CMA has been actively enforcing since April 2025 — investigations opened into eight companies, sector reviews covering fashion, and refunds already ordered over hidden fees ([HSF Kramer](https://www.hsfkramer.com/notes/crt/2026-07/cma-launches-three-further-drip-pricing-investigations-under-the-dmcc-act-consumer-protection-regime), [Baker Botts](https://www.bakerbotts.com/thought-leadership/publications/2025/november/cma-launches-consumer-protection-drive)).
- **Advertising** → the **ASA**, but only if their *ads* show the pre-fee price.
- **Tax** → HMRC online form or 0800 788 887, anonymous. **Not applicable here** for the reason above.

### Why not now

**1. Winning gains us nothing.** Best case they add 20% to the headline and their ring lists at £274. That makes our £185 look better — and brings us zero customers. The CMA is already running this sector. If the model is non-compliant it will be found without us.

**2. The retaliation risk is real and currently asymmetric.** As of today Hikari has **not** cleared the trademark ([99](99-open-questions.md) #4), **not** settled the VAT and margin-scheme position ([99](99-open-questions.md) #1), **not** had an IP solicitor review our use of the Dior and Chanel marks ([04](04-site-ia.md)), and **not** published policies, returns terms or condition grades. A competitor who feels attacked can file a report as easily as we can — and right now **we are the less-prepared party.** This is the argument that decides it.

**3. A competitor complaint is weighted as interested.** Regulators know. It does not invalidate a report, but a single competitor complaint about one screenshot rarely moves anything. A real customer surprised by 20% at checkout is a far stronger complainant — and if one of ours arrives from their site, telling them their rights is legitimate and costs us nothing.

**4. The community is small.** UK vintage resale, and the Chinese-UK corner of it, is a small world that talks. Being known as the shop that reported a rival is a durable reputational cost against a speculative gain.

### If it is done anyway

- **Drip pricing only.** Never the tax allegation.
- Citizens Advice → Trading Standards is the correct route.
- Supply the URL, dated screenshots of product page against checkout total, and the arithmetic.
- **Say you are a competitor if asked.** Concealing it and being found out destroys the report's credibility and ours.
- Do it **after** our own house is in order, not before.

### Never

Publishing it, posting about it, contacting their customers, or briefing press. That is where the legal risk lands on **us** — defamation and malicious falsehood — and it is already ruled out at [D12](DECISIONS.md).

### What to do instead, today

**Preserve the option and compete on it.** Archive dated evidence — it costs nothing and keeps the door open. Then put *"The price you see is the price you pay"* in the headline, on the product page and at checkout. That captures the same customers, immediately, at no risk, and it is a claim about **us** rather than an accusation about them.

---

## What the fee reveals about their operating model

The fee sits **above** shipping in the summary, and shipping is still "calculated in the next step" — so it is not a freight recovery. That strengthens the import-VAT reading considerably.

If it is import VAT, their model is legible: **no UK stock. Each order ships direct from Asia, the customer is the consignee, and they front the 20% as DDP so no courier invoice lands at the door.**

| | et vous | Hikari |
|---|---|---|
| Stock location | None held in UK; ships per order from Asia | Bought in bulk, landed once, held in London |
| Delivery | 1–3 weeks, every order a customs event | Next day |
| Capital | **Light — no inventory funded** | Heavy — stock is the balance sheet |
| Returns | Back to Asia, or absorbed. The 14-day right applies regardless | UK address, trivial |
| Customs | Per order, repeatedly | Once per batch |
| Price the customer sees | £228, then £273.60 | £185, and £185 |

**Their model has a real advantage and we should be honest about it:** it is capital-light. They are not funding inventory, which is the single largest cost and risk in our plan ([06](06-unit-economics.md)). That is not nothing.

**But it costs them exactly what we sell.** No stock in the UK means no next-day delivery, painful returns, a customs event on every order, and a 20% surprise at the final screen. The "duty paid, next day, one price" line in [02](02-positioning.md) is not rhetoric against this competitor — it is a structural consequence of holding stock that they cannot match without changing their whole model.

That is the trade: they keep the cash, we keep the experience. At £100–300 on a trust purchase from an unknown seller ([03](03-customer.md)), the experience is the thing that converts.

---

## Update · 2026-09-22 (ii) — there is a UK entity

Companies House, searched 2026-09-22:

| | |
|---|---|
| **ETVOUS LTD** | company number **16401166** |
| Status | **Active**, no overdue filings |
| Incorporated | **23 April 2025** |
| Type | Private limited company |
| Registered office | 3rd Floor, 86–90 Paul Street, London EC2A 4NE |
| First accounts due | 23 January 2027 (to 30 April 2026) |
| Next confirmation statement | 6 May 2027 |

**SIC codes match the business almost exactly:** 47770 (retail of watches and jewellery), 47799 (retail of other second-hand goods, not antiques), 47910 (mail order / internet retail). Effectively conclusive that this is the operator, though the register does not prove it.

**86–90 Paul Street EC2A 4NE is a very widely used registered-office service address** — thousands of companies sit there. Entirely normal and lawful; it simply means it is not a trading address and tells us nothing about where stock is held.

### This corrects an earlier inference

[16](16-vat.md) §8 raised the possibility that they are a **non-established taxable person** with a zero VAT threshold. **If ETVOUS LTD is the seller of record, that does not apply** — it is a UK company and the ordinary £90,000 threshold governs it. Corrected so the wrong version is not carried forward.

### The reported Singapore entity

A Singapore entity said to be registered in March 2026 could not be verified from here. Reasoning about the shape rather than the specifics:

**A Singapore or Hong Kong entity is an ordinary, legitimate structure for Asian sourcing** — it buys in Japan, holds the supplier relationships, and sells on to the UK company, which sells to consumers. Nothing irregular in that by itself. The tax questions it raises are the standard ones: whether the transfer price between the two is arm's length, and where the profit properly sits.

Three rules that apply if an overseas entity does more than that:

1. **Stock held in the UK at the point of sale by an overseas seller triggers UK VAT registration from the first sale, with no threshold.** This is the rule that catches overseas Amazon FBA sellers. It is directly relevant to the hypothesis that they hold UK inventory.
2. **A fixed place of business in the UK** — an office, a shop, a warehouse with staff — must be registered with Companies House on **form OS IN01 within one month** of opening ([Companies House](https://assets.publishing.service.gov.uk/media/69135e462017198896ad7fdc/OS_IN01_v9.0-FINAL.pdf)).
3. That same fixed place is generally a **permanent establishment**, bringing UK corporation tax on the profits attributable to UK activity ([UK Property Accountants](https://www.ukpropertyaccountants.co.uk/overseas-companies-with-a-uk-establishment-legal-requirements-compliance-and-tax-obligations/)).

And regardless of where the seller sits: **selling to UK consumers means UK consumer law applies.**

### One thing that *is* directly observable

**The website displays no company details at all.** No company name, no registration number, no registered office, no email address on the pages checked.

A UK company trading online must display its registered name, company number, place of registration and registered office address, and the E-Commerce Regulations 2002 additionally require an email address. The Consumer Contracts Regulations separately require the trader's identity and geographic address before a consumer is bound.

Unlike everything else in this document, this needs no inference — it is a plainly visible gap, and it is the kind of thing that gets noticed first.

### For us

**Display it properly from day one:** registered company name, company number, registered office, and a working email in the footer and in the terms. It costs nothing, it is legally required, and on a £185 purchase from an unknown seller it is a trust signal ([03](03-customer.md)) that this competitor is currently leaving on the table.
