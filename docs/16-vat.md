# 16 — VAT: A Working Reference

Everything in one place. **Not tax advice** — this is the map you take to an accountant so the hour costs less and covers more. Figures are UK, 2026; verify before relying on any of them.

---

## 1 · Who pays VAT

Two different answers, and confusing them causes most of the errors:

- **Legally liable:** the VAT-registered business. It collects VAT on sales and accounts to HMRC.
- **Economically bearing it:** the final consumer, who cannot reclaim it.

Every business in the chain charges **output VAT** on sales, reclaims **input VAT** on purchases, and remits the difference. VAT is only a real cost to whoever cannot reclaim — the consumer, and any business that isn't registered.

**If you are not registered:** you charge no VAT on anything, and you reclaim nothing. You still *pay* VAT on your own purchases and at the border. It just becomes cost.

**Import VAT** is paid by the importer of record regardless of registration status. Registration is what determines whether you get it back.

**VAT does not depend on how the customer pays, or through which channel.** Cash, card, bank transfer, WeChat, in-store, online, marketplace — if you are registered, output VAT is due on the supply; if you are not, none is due anywhere. There is no "pay in person, no tax" rule in UK VAT. *(Flagged because it matters below.)*

---

## 2 · Registration — who must, who may, how

### Compulsory

- **Taxable turnover above £90,000** in any rolling 12-month period, or expected to exceed it in the next 30 days. Threshold unchanged since April 2024 and holding for 2025/26 and 2026/27 ([Xero](https://www.xero.com/uk/guides/vat-registration-thresholds/)).
- It is a **rolling** test, not a financial year. Check monthly.
- Register within 30 days of the end of the month you went over. *Confirm the exact deadline.*
- **Zero-rated sales still count** toward the threshold. Exempt ones do not.

### Zero threshold — the one that catches overseas sellers

**A business with no UK establishment (a "non-established taxable person", NETP) has a registration threshold of zero** — it must register from its *first* UK sale ([AVASK](https://avask.com/blog/uk-vat-threshold-2026/)). This catches overseas sellers holding UK stock, and it is relevant to §8 below.

### Voluntary

Anyone making taxable supplies may register below the threshold. Useful when your customers are businesses, or your input VAT exceeds your output VAT. **At our economics it is expensive — see §6.**

### Deregistration

Permitted once turnover falls below **£88,000**.

### How

Online via Government Gateway. You need company details, UTR, bank details and a turnover estimate; the VAT number usually takes a few weeks. Once registered you are inside **Making Tax Digital** — digital records and filing through compatible software, normally quarterly returns.

---

## 3 · What is relieved — four categories people constantly confuse

| Category | Rate | Can you reclaim input VAT? |
|---|---|---|
| **Standard** | 20% | Yes |
| **Reduced** | 5% | Yes |
| **Zero-rated** | 0% | **Yes** — it is still a taxable supply |
| **Exempt** | none | **No** |
| **Outside scope** | none | Depends |

**Zero-rated and exempt are not the same thing, and the difference is money.** Zero-rated is a taxable supply at 0%, so you still recover input VAT. Exempt blocks recovery entirely.

### What is actually relieved for us

**Nothing on the sale. Jewellery is standard-rated at 20%, and second-hand does not change the rate.**

The one relief that reaches this business is on the **import** side: **antiques over 100 years old (heading 9706), collectors' items and works of art import at an effective 5%** instead of 20% ([06](06-unit-economics.md)). That is a border relief, not a sales relief.

---

## 4 · What can be transferred

- **A VAT registration number** — form **VAT68**, when a business transfers as a going concern and both parties agree. You inherit its history, including any liabilities. Rarely worth it.
- **A business, VAT-free** — a **transfer of a going concern (TOGC)** is outside the scope of VAT, so no VAT on the sale of the business itself, if the conditions are met. Relevant only at exit.
- **The liability itself — the reverse charge.** VAT accounting shifts from supplier to customer. **This will apply to us**: services bought from overseas suppliers — a Japanese sourcing agent, overseas SaaS — are generally reverse-charged, meaning *you* account for the VAT once registered. Easy to miss.
- **Import VAT, from the border to the return — postponed VAT accounting.** Registered importers account for import VAT on the VAT return instead of paying it at the frontier, so it never leaves the bank account. The single most useful mechanic for a registered importer.
- **Between companies — group registration.** One VAT number across a group; supplies within it are disregarded. Not relevant yet.
- **Back from HMRC — bad debt relief.** Reclaim VAT on invoices unpaid after six months. Barely relevant on card-paid retail.

---

## 5 · The schemes

### Second-hand margin scheme
VAT on the **margin** rather than the full selling price, at **1/6 of the margin**.

**Eligibility traps that matter to us:**
- HMRC's definition of second-hand goods excludes **precious metals and precious stones**. **Vintage costume jewellery — base metal, glass, paste — is fine. Sterling silver and gem-set pieces may not be.** Ask specifically.
- **Imported goods subject to VAT on their full value are normally *not* eligible** ([HMRC VATMARG07000](https://gov.uk/hmrc-internal-manuals/vat-margin-schemes/vatmarg07000)).
- **But there is a real exception:** *works of art, antiques and collectors' items imported from third countries* **can** be sold under the margin scheme, even though import VAT was charged — provided they are **imported directly by the business**. This pairs with the 5% border rate in §3.
- You must keep a **stock book** with a purchase and sale record for every item.

### Global accounting scheme
A simplified margin scheme: pool total purchases against total sales for the period instead of tracking every item. **Only for items bought at £500 or less each** ([Croner](https://library.croneri.co.uk/cch_uk/bvr/48-685)).

**Our stock buys at £70–150, so every piece qualifies on value** — and the admin saving over an item-by-item stock book is large for a one-of-one business. Same import restriction applies, so it inherits the question above.

### Flat rate scheme
Pay a fixed percentage of **VAT-inclusive turnover** and do not reclaim input VAT. Join below **£150,000** expected turnover. *"Retailing not listed elsewhere"* is **7.5%**, reduced by 1 point in the first year of registration.

**The limited-cost-trader trap doesn't catch us**: that 16.5% penalty rate applies where goods spend is under 2% of turnover. A reseller spending ~45% of turnover on goods is nowhere near it.

### Cash accounting
Account for VAT when money moves, not when invoiced. Under £1.35m turnover. Little benefit for card-paid retail.

### Annual accounting
One return a year with interim payments. Under £1.35m. Reduces admin, weakens visibility.

### Retail schemes
For shops that cannot record VAT per sale. Not needed — the platform records everything.

---

## 6 · The numbers, on our actual economics

Modelled at **£80 cost** before import VAT and **£180 retail**:

| Position | Gross profit per piece | |
|---|---|---|
| **Unregistered** | **£84.00** | Import VAT £16 irrecoverable, no output VAT |
| Registered — standard | £70.00 | Output £30, reclaim £16, net £14 |
| Registered — margin scheme *(imported stock)* | £70.00 | Margin £84, VAT £14, import VAT not reclaimable |
| Registered — flat rate 7.5% | £70.50 | Pay £13.50, no input reclaim |
| Registered — flat rate, first year 6.5% | £72.30 | |

### Correction to what this repo said earlier

[06](06-unit-economics.md) and [09](09-payments-and-tax.md) called margin-scheme eligibility "the single most important open question" and "the real lever". **That was wrong for a pure-import model, and the table above shows why.**

Where import VAT is **recoverable**, the margin scheme and standard accounting produce **the same result** — £70 either way. The margin scheme's advantage comes from buying with *no input VAT to reclaim*; if you can already reclaim it, there is nothing left to save.

**Where it genuinely pays — stock bought VAT-free, e.g. from UK private sellers, house clearances, fairs:**

| Registered — standard | £70.00 | Output £30, nothing to reclaim |
|---|---|---|
| **Registered — margin** | **£83.33** | Margin £100, VAT £16.67 |

**£13.33 a piece.** So the margin scheme is an argument for *buying in the UK*, not for importing. That is a strategic finding, not an accounting footnote.

### The real lever is whether to register at all

**Staying unregistered is worth £14 a piece — 7.8% of revenue.**

**Crossing £90,000 turnover costs about £7,000 a year** unless prices rise ~20% to absorb it, which costs demand instead. The threshold is a genuine cliff in this business, and it should be planned for rather than discovered.

### And pre-1926 antiques get both reliefs

| Antique, pre-1926 | Gross profit |
|---|---|
| **Unregistered** | **£96.00** — import VAT only £4 at 5% |
| Registered — margin scheme | £80.00 — eligible despite being imported |
| Registered — standard | £70.00 |

**£96 against £84 on identical retail.** A 5% border rate plus margin-scheme eligibility is the only combination in this document that improves the economics in both registered and unregistered states. It strengthens [99](99-open-questions.md) #45 considerably.

---

## 7 · The decision tree

**Now — under £90,000, unregistered.** Charge no VAT. Import VAT sits in landed cost, inside the £185 ([D12](DECISIONS.md)). Simplest and most profitable. Watch rolling 12-month turnover monthly; alert at £75,000.

**Approaching the threshold — three options, in order:**
1. **Stay under deliberately.** Legitimate, and worth ~£7,000 a year. It caps the business, which is a real strategic cost.
2. **Register and raise prices ~20%.** Tests what the market bears.
3. **Change the stock mix.** More UK-sourced stock makes the margin scheme worth £13.33 a piece; a pre-1926 line collects both reliefs.

**Once registered, day one:** turn on **postponed VAT accounting**, check **global accounting** eligibility, and model **flat rate** against standard for the first year, when it is 6.5%.

## 8 · On the competitor hypothesis

Your theory is that they hold UK stock, sell it in person off the books, and only add tax online. That is a **different and more serious allegation** than the drip pricing we actually observed, and we still have no evidence for it. But the VAT logic above does make one thing clear:

**A fee that can be waived is not a cost being passed on.** If £45.60 were genuine import VAT, it was paid at the border on goods now sitting in the UK. You cannot un-pay it because a customer turns up in person. A charge that disappears by payment method is not recovering an import cost.

And on the sale itself: **VAT does not vary by channel.** Registered means VAT on every sale — cash, WeChat, in-store, online. Unregistered means none anywhere, and a 20% "handling fee" online would then not be VAT at all.

**Channel-dependent VAT is consistent with neither lawful position.** That is a genuine logical observation, and it is *still* not proof — we have not seen their books, their registration, or their stock. If they are established outside the UK, note their threshold would be **zero** (§2), so "too small to register" would not be available to them either.

**[D13](DECISIONS.md) stands unchanged.** The asymmetry argument does not improve because the suspicion got sharper: our own trademark, VAT and IP positions are still open, and we are still the less-prepared party.

## Open

- Everything in §6 assumes £80 cost and £180 retail. Re-run with real Phase 0 numbers.
- Precious-metal exclusion: does sterling silver stock fall outside the margin scheme? ([99](99-open-questions.md) #48)
- Reverse charge on overseas services once registered ([99](99-open-questions.md) #49)
- Flat rate against standard in year one ([99](99-open-questions.md) #50)

---

## Refinement · 2026-09-22 (ii) — the threshold cliff is smaller than stated

§6 and [D14](DECISIONS.md) say crossing £90,000 costs ~£7,000 a year "unless prices rise ~20%". The 20% figure is wrong — it overstates what has to be passed on.

**Break-even is a 9.3% rise: £180 → £196.80.**

Because registration also *recovers* the £16 of import VAT, only part of the output VAT has to reach the customer:

| At £80 cost | Price | Profit |
|---|---|---|
| Unregistered | £180 | **£84.00** |
| Registered, price held | £180 | £70.00 |
| Registered, break-even | **£196.80** | £84.00 |
| Registered, full 20% passed on | £216 | **£100.00** |

Passing the full 20% on leaves us **£16 a piece better off than today** — exactly the import VAT recovered.

**So the question at the threshold is not "register or not". It is "will the market take 9.3%?"** If yes, registration costs nothing. If no, it costs £14 a piece. That is a pricing test worth running long before the threshold arrives — and it is cheap to run, since it is one price change on a few pieces.

### Two practical points for the plain-language version

**Pre-registration input tax.** VAT on **goods still held at the registration date** can be reclaimed up to **4 years back** (services: 6 months). Import VAT on unsold stock bought while unregistered is therefore recoverable later — **but only with the paperwork.** Another reason the per-piece acquisition record from [04](04-site-ia.md) earns its keep: margin scheme, exhaustion defence, processor review, and now retrospective input tax.

**Japanese consumption tax is not reclaimable in the UK.** It is not UK VAT and HMRC will not repay it. The only route back is Japan's own refund scheme ([06](06-unit-economics.md)). Easy to assume otherwise.

**Reverse charge nets to zero but must still be filed.** Overseas services — a Japanese sourcing agent, non-UK SaaS — are self-accounted: declare the output, reclaim the same amount as input. Net nil, commonly missed, and it is our liability rather than the supplier's.

---

## 9 · The line, and the control that keeps us on the right side of it

Two practices have come up as hypotheses about how a competitor operates. Recorded here because they are **not grey areas, and because one of them creates a liability for *us* if we are careless about logistics.**

### Under-declaring customs value

The customs value is, in law, the **transaction value** — what was actually paid. Declaring a lower figure is a false declaration, not an estimate. CEMA 1979 s.167 makes it an offence to declare falsely, knowingly or recklessly ([LexisNexis](https://www.lexisnexis.com/en-gb/legal/guidance/creating-or-providing-false-documents-or-information)). Consequences: assessment for the duty and import VAT plus interest, a **civil evasion penalty** aimed specifically at dishonest behaviour, seizure and forfeiture of goods, and criminal exposure in serious cases ([Customs Notice 301](https://www.gov.uk/guidance/civil-penalties-for-contraventions-of-customs-law-customs-notice-301)).

It also has a self-defeating quality worth noting: **a public retail price is evidence against a low declared value.** Customs valuation audits start by comparing declarations against the seller's own published prices.

### Recording VAT on online sales only

VAT does not vary by channel. Registered means output VAT on every supply — cash, transfer, in person, online. Recording only part of them is under-declared VAT and under-declared turnover.

- Deliberate behaviour attracts penalties of **30%–100% of the unpaid tax**.
- HMRC normally assesses four years back; **for deliberate evasion, twenty** ([TaxDebts](https://taxdebts.co.uk/hmrc-cop8-cop9-investigations-director-risks/)).
- HMRC runs a standing campaign on exactly this pattern — **Electronic Sales Suppression**, with one-to-many letters already going out ([CIOT](https://www.tax.org.uk/hmrc-one-to-many-letter-electronic-sales-suppression-2025)).
- **The £90,000 threshold test uses real turnover, not declared turnover.** Suppressing sales to stay "under" it is itself the fraud, and it converts the assessment window to twenty years.

### The control we adopt

Not a statement of virtue — a liability boundary:

**Always be the importer of record ourselves. Always declare the true transaction value. Always keep the Japanese seller's invoice.**

The reason is specific: **if we are the importer of record but someone else entered the value, the liability is ours, not theirs.** So: do not share a freight agent or customs broker with another seller, do not consolidate consignments with anyone, and do not buy stock from a business whose import valuations we cannot see.

This runs on the acquisition record already in place ([04](04-site-ia.md)). That one process now serves five purposes: margin-scheme evidence, trademark exhaustion defence, payment-processor review, retrospective input tax on registration, and proof of customs value.

### Competitive read

If a competitor is operating this way, their cost base is lower by roughly 20% of landed cost plus 20% of the offline channel. **We cannot match that and will not try.** Two consequences:

1. **Never benchmark our price against theirs.** Their price carries a liability that has not been paid yet.
2. **It is not an advantage so much as deferred exposure.** Twenty years of assessment plus penalties of up to 100% is enough to end a business this size, and it grows with every sale.

Our answer is unchanged: brand, trust, and the Edition list ([D11](DECISIONS.md)), with all-in pricing ([D12](DECISIONS.md)). And [D13](DECISIONS.md) still stands — a sharper hypothesis does not change the asymmetry, because our own trademark, VAT and IP positions are still open.
