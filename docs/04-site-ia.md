# 04 — Site & Information Architecture

> **The request:** "the origins are from Japan, mostly Dior and Chanel — I want those to be clickable as well."

Yes. Brand should be a **first-class navigation axis**, and this is settled practice rather than an open question — every credible competitor does it. It also has to be built in a specific shape, because Chanel in particular has litigated this exact thing.

---

## Navigation: three axes

Every piece is tagged on all three. This mirrors how the category already works and, more importantly, how the three customer segments in [03](03-customer.md) actually search.

```
DESIGNER          TYPE              ERA
  Christian Dior    Earrings          1960s
  Chanel            Necklaces         1970s
  Givenchy          Brooches          1980s   ← the volume decade
  Yves Saint Laurent Bracelets        1990s
  Nina Ricci        Rings             Y2K
  Grosse
  Attwood & Sawyer
  Trifari
  …
```

Plus two commercial collections that do disproportionate work: **New In** (the weekly drop — the most visited page on a one-of-one site) and **Under £150** (the entry price point, and segment C's landing page).

**Precedent:** Jagged Metal splits on exactly these three axes plus an under-£100 collection. Bujor Japan puts around twenty brand names directly in the top navigation. Susan Caplan runs "Shop by Designer" as a primary item. Vestiaire offers designer as a core filter. There is no dissent in the category.

### Designer pages are landing pages, not filters

The single highest-leverage SEO decision in this business. `/collections/vintage-christian-dior-jewellery` should be a real page with 200–400 words of genuine editorial — the house's costume jewellery history, how to identify the signature marks by period, what to look for in condition — above or beside the product grid.

The money keywords are **"vintage Dior earrings UK"**, **"vintage Chanel jewellery UK"** and their siblings. [Jagged Metal](https://www.jaggedmetal.com/collections/uk-vintage-jewelry-vintage-dior-jewellery) and [Modern Vintage Style](https://www.modernvintagestyle.co.uk/christian-dior-jewellery-uk) already compete for them. Beating them is a content problem, not a technical one.

### Keep sold pieces live

On one-of-one stock, a sold-out listing is not a dead end — it is proof of demand, an accumulating SEO asset, and scarcity made visible. Jagged Metal leaves theirs up. Mark clearly as sold, offer "notify me of similar", never delete.

---

## The legal shape — read before designing anything

Using a brand's name to sell genuine secondhand goods is lawful, but the boundary is real and Chanel in particular polices it. Get this right at the design stage; retrofitting it is expensive.

### What protects you

**Exhaustion of rights.** Once a trademarked item has been put on the market by or with the trademark owner's consent, the owner cannot control subsequent resale ([Dennemeyer](https://www.dennemeyer.com/blog/posts/trademark-exhaustion-and-resale-markets)). You may truthfully describe what you are selling. "Vintage Christian Dior clip earrings, 1987" is descriptive use.

### Where it stops

The exhaustion defence fails where goods have been **materially changed or impaired**, or where further commercialisation does **significant damage to the mark's reputation** — established for luxury goods in *Christian Dior v. Evora* (CJEU), which is why luxury houses can object to presentation that cheapens them ([The Fashion Law](https://www.thefashionlaw.com/resale-trademark-exhaustion-in-the-eu-a-guide-for-brand-owners/)).

### The case that matters most

**Chanel v. Crepslocker**, High Court of England and Wales. Chanel sued a UK secondhand reseller over its **use of the Chanel name and logo**. Crepslocker argued exhaustion; the case settled ([The Fashion Law](https://www.thefashionlaw.com/chanel-settles-trademark-suit-against-crepslocker-over-resale-offerings/), [Lawyer Monthly](https://www.lawyer-monthly.com/2021/06/how-chanel-v-crepslocker-could-change-british-trademark-law/)). Note what was at issue: not that they sold Chanel goods, but *how they used the marks around them*. Note also that post-Brexit the UK's future exhaustion regime remains unsettled ([The Fashion Law](https://www.thefashionlaw.com/the-future-of-trademark-exhaustion-is-still-unclear-for-brands-post-brexit/)).

### The working rule

**A brand name is metadata. It is never identity.**

| Do | Don't |
|---|---|
| Brand as a filter, tag, collection name, page title | Brand logo anywhere in site chrome, nav, or as a collection tile |
| Plain text set in *your* typeface | The brand's own wordmark, lettering or typography |
| Your own photography of the actual item | The brand's campaign, lookbook or press imagery |
| "Vintage Christian Dior earrings" | "Dior at Hikari", "Official", "Authorised", "Stockist" |
| Your own domain and handles | A brand name in the domain, handle, or as an email sender name |
| Name the brand in the ad's body text | Bidding on brand names in paid search, or brand-led ad creative |

Plus:

- **Disclaimer in the footer and on every designer page.** Something to the effect of: *"Hikari is an independent reseller of pre-owned items. We are not affiliated with, authorised by, endorsed by, or connected to any of the brands featured. All trademarks are the property of their respective owners."* Have it checked; do not lift this wording verbatim.
- **Keep the acquisition record for every single piece.** Invoice, lot number, seller, date, photographs on arrival. This paper trail *is* your exhaustion defence. Without it you cannot show the goods were legitimately placed on the market. This is also the single cheapest insurance policy in the business — build it into the intake process from piece number one, not later.
- **Never sell a fake, even unknowingly.** Exhaustion protects genuine goods only. A counterfeit turns a trademark question into an infringement claim with no defence.
- **Chanel is the most aggressive rights-holder in this space.** Given that, consider whether Chanel should be a *smaller* part of the mix than Dior, Givenchy, YSL, Nina Ricci and Grosse — which are commercially comparable, aesthetically at least as strong, and carry materially less legal heat. This is a real strategic choice, not a compliance footnote.

**None of this is legal advice.** Before launch, an hour with a UK IP solicitor to review the site's use of marks is a small, well-spent cost. Logged in [99](99-open-questions.md).

---

## Product page anatomy

The product page is where a £180 decision is made. Everything else on the site exists to deliver traffic to it.

1. **Four photographs** — composed, macro of the signature mark, on-body for scale, honest condition. See [02](02-positioning.md).
2. **Title** — `Vintage Christian Dior Crystal Clip Earrings, c.1987`
3. **Price** and `One of one — when it's gone, it's gone`
4. **Condition grade** from a published scale, plus a written note on specific wear
5. **Measurements in mm**, and weight. Statement vintage earrings are usually far larger than expected; this field prevents returns.
6. **Signature / maker's mark** — what it reads, where it is, what it dates the piece to. Segment B reads this first.
7. **Provenance line** — *Sourced in Tokyo, March 2026.* The differentiator, stated on every piece.
8. **Trust block** — authenticated · duty paid, no customs charges · UK next-day · 14-day returns
9. **Designer / Era / Type** as clickable tags into the three axes
10. **"More from this house"** — the only genuinely useful cross-sell on one-of-one stock

## Stack

**Shopify.** Jagged Metal runs on it; so does most of the category. One-of-one inventory is exactly what Shopify's single-quantity variant handling is built for, and Klarna, Royal Mail, the Instagram/TikTok catalogue and email all connect without custom work. Revisit only if the catalogue exceeds a few thousand pieces or the editorial ambition outgrows the theme — neither is a year-one problem.

**Resist the urge to build a custom storefront.** This repository should hold the plan, the brand system, the content and possibly a custom theme — not a bespoke e-commerce platform. Engineering effort spent on checkout is effort not spent on sourcing, which is the actual moat.

## Compliance odds and ends

Flagged, not resolved — each needs confirming with someone qualified:

- **Hallmarking.** The Hallmarking Act applies to items described as precious metal above weight thresholds (broadly 7.78g for silver, 1g for gold). Most costume jewellery is unaffected, but Japanese-sourced sterling pieces are common and frequently carry no UK hallmark. **Do not describe anything as "silver" or "gold" without checking the rule.** "Silver-tone" and "gold-plated" are the safe descriptors for plated costume pieces, and are also simply more accurate.
- **Nickel release limits** under UK REACH apply to items in prolonged skin contact — earrings above all. Vintage costume jewellery is a genuine grey area here. Worth a specific answer rather than an assumption.
- **Distance selling** — 14-day cancellation rights, per [03](03-customer.md).
- **Online Dispute Resolution / consumer terms** — standard, but must actually exist on the site at launch.
