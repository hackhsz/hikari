# 17 — Entity, Checkout Tax and Income Tax

Answers three things [16](16-vat.md) does not: what the customer is charged at checkout while we are unregistered, what we owe on the profit regardless of VAT, and whether Shopify needs a company.

**Not tax advice.** Figures are 2026/27 and should be checked.

---

## 1 · What the customer pays at checkout — unregistered

**Nothing beyond the price and shipping. No tax line at all.**

The UK has no sales tax below VAT — no state or local sales tax equivalent. So an unregistered seller's checkout is simply: **item + shipping**. Which happens to be exactly the all-in structure [D12](DECISIONS.md) commits to, so the compliant answer and the strategic answer are the same one.

### And we must not charge or show VAT

This is a rule, not a preference. **Charging or displaying VAT while unregistered is an offence** under the VAT Act 1994 — HMRC can recover the full amount purportedly charged and penalise on top. Concretely:

- No "VAT" line at checkout or on the receipt
- No VAT number anywhere on the site, emails or invoices
- Do not split the price into "net + VAT"
- Do not describe prices as "inc. VAT"

**Shopify configuration is an action item, not a default.** Taxes must be explicitly set to zero / VAT collection switched off. A store left on defaults will start adding a tax line by itself. Check it before the first sale and again after any settings change.

### Wording for the site

> Prices include UK duty. We are not currently VAT registered, so no VAT is charged.

Plain, accurate, and it doubles as reassurance — it tells the customer there is no second number coming.

---

## 2 · What we owe on the profit — VAT is not the only tax

**Not registering for VAT does not mean not paying tax.** VAT is one tax among several, and the ones below apply from the first pound of profit.

### As a sole trader

| | 2026/27 |
|---|---|
| Personal allowance | £12,570 at 0% |
| Basic rate | 20% to £50,270 |
| Higher rate | 40% to £125,140 |
| Additional rate | 45% above |
| **Class 4 NI** | **6%** on profits £12,570–£50,270, **2%** above |
| Class 2 NI | Abolished for most since April 2024; treated as paid above £7,105 so the year still counts for State Pension |
| Filing | Self Assessment, file and pay by **31 January** after the tax year |
| Trading allowance | £1,000 — below that, no need to report |

*Sources: [FreeAgent](https://www.freeagent.com/rates/national-insurance-class-4/), [Sole Trader Tax](https://soletradertaxcalculator.co.uk/blog/sole-trader-tax-explained-2026-27).*

### As a limited company

- **Corporation tax**: **19%** on profits to £50,000, **25%** above £250,000, marginal relief between — so an effective rate between the two.
- **Getting the money out is a second tax event**: salary through PAYE, or dividends. The dividend allowance is **£500** for 2026/27. **Dividend rates have changed recently — check current figures.**
- Annual accounts to Companies House plus a corporation tax return.

### The point most easily missed

**If you have a day job, this profit stacks on top of it at your marginal rate.**

Worked at roughly Phase 2 scale — 30 sales a month at £180, so £64,800 turnover, ~£34,560 cost of goods, ~£8,000 overheads, **profit ≈ £22,000**:

| Situation | Tax |
|---|---|
| Sole trader, no other income | ~£1,886 income tax + ~£566 Class 4 NI ≈ **£2,450** |
| Sole trader, employment income already above £50,270 | £22,000 at 40% ≈ £8,800 + ~£566 Class 4 ≈ **£9,366** |

**Nearly four times the tax on identical trading profit.** Worth knowing before pricing decisions are made, and a reason to take the entity question to an accountant in the same hour as the VAT question ([06](06-unit-economics.md)).

### Also possible later

Business rates if a physical space is taken ([D3](DECISIONS.md)); PAYE and employer NI on any staff.

---

## 3 · Does Shopify need a company?

**No. A sole trader can open and run a Shopify store.** Shopify does not require a company registration number.

**Shopify Payments** runs KYC on an individual perfectly well: name, address, date of birth, National Insurance number or passport/driving licence, and a UK bank account. A personal account is technically accepted, though a business account is strongly preferable for record-keeping.

### But incorporate anyway — and not for Shopify's sake

**1 · Limited liability.** We are reselling goods carrying Dior, Chanel and YSL marks ([04](04-site-ia.md)). The trademark risk is real and Chanel in particular litigates. **As a sole trader, personal assets are exposed to it.** A company contains it. For this business specifically, this is the argument that decides it.

**2 · Your home address, published.** The Consumer Contracts Regulations require a trader's identity and **geographic address** to be disclosed to consumers. **A sole trader publishes their home address on the website.** A company uses a registered office service instead. This is not a small point for a consumer-facing brand run from a flat.

**3 · The wholesale channel needs it.** Brand Off's B2B programme requires verification as a registered business ([06](06-unit-economics.md)) — the only channel that supports volume.

**4 · Payment-processor risk appetite.** Branded resale attracts counterfeit-risk review ([11](11-platform.md)). A registered company with filed accounts clears it more easily.

**5 · Credibility at £185.** A company number and registered office in the footer is a trust signal on a purchase from an unknown seller ([03](03-customer.md)).

**6 · Later: wholesale contracts, investment, and selling the business** all assume a company.

### Cost

**Companies House incorporation is £100 for digital filings from 1 February 2026** — doubled from £50 ([ICAEW](https://www.icaew.com/insights/viewpoints-on-the-news/2025/nov-2025/significant-hikes-to-companies-house-fees-in-2026)). Accountant, roughly £600–1,500 a year for accounts and the return. Against the exposure in point 1, that is cheap.

**Sequencing note:** a company is also the prerequisite for a business bank account, which is the prerequisite for Shopify Payments approval ([11](11-platform.md)). Start it early in Phase 1, not in launch week.

## Open

- Current dividend tax rates — they have moved recently ([99](99-open-questions.md) #52)
- Sole trader vs limited for year one, given expected profit and whether there is other employment income ([99](99-open-questions.md) #53)
- Registered office / service address provider if incorporating ([99](99-open-questions.md) #54)
