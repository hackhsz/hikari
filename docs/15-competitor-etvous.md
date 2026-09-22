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
