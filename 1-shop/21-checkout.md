# 21 — Checkout

> **The request:** "the checkout flow."

**Checkout is Shopify's and stays Shopify's ([D7](../0-plan/DECISIONS.md), [D17](../0-plan/DECISIONS.md)). What we own is everything up to the Checkout button, and the settings behind the rest.** This doc covers the whole path from Add to bag to the parcel, who controls each step, the admin settings in the order to make them, and how to test it all before the first real sale.

---

## The path, and who controls each step

| | Step | Who controls it |
|---|---|---|
| 1 | **Add to bag.** The drawer opens. A piece already in the bag says so; a piece that has just sold turns to Sold. | Theme (`assets/hikari.js`) |
| 2 | **The bag.** Lines, gift note, delivery line, total, trust block, payment marks, express buttons. | Theme (`snippets/bag-line`, `snippets/bag-foot`) and **Theme settings → Bag & checkout** |
| 3 | **Checkout:** contact, delivery, payment. | Shopify. Our levers are **Settings → Checkout** and the checkout editor |
| 4 | **Thank-you and order status pages.** | Shopify. On Basic, app blocks only |
| 5 | **Emails:** confirmation, dispatch, delivery, abandoned checkout. | Shopify. Templates in **Settings → Notifications**; words from [Thread 3](../3-copy/README.md) |
| 6 | **The parcel:** gift note on a card, no price inside. | Us, at packing |

## What the bag now does · 13 Oct 2026

Logged as [D23](../0-plan/DECISIONS.md).

- **A piece that sells while it's in the bag says so.** Shopify holds nothing in a cart, so someone else can buy it first. The line then reads *Sold since you added it*. It drops out of the total, and Checkout waits until it's removed. Without this, the customer finds out on Shopify's stock-problem screen, mid-checkout. If everything in the bag has sold, the bag says so and points back to the shop.
- **The bag is fresh when it opens.** It asks Shopify again each time it's opened, and when someone comes back from checkout with the back button.
- **A delivery line.** *UK delivery · Free* at or over the threshold in theme settings (default £100). Below it, *Added at checkout*, and *Total* becomes *Subtotal*. [D17](../0-plan/DECISIONS.md) noted that the total is the price paid only while delivery is free; this keeps the bag honest if that changes ([D12](../0-plan/DECISIONS.md)).
- **A gift note, for segment C** ([03](../0-plan/03-customer.md)). Tick *This is a gift* and write a note. It reaches the order as two cart attributes, `Gift: Yes` and `Gift note`, shown under **Additional details** on the order. It's saved as it's typed, so it also survives Apple Pay and Shop Pay, which skip the bag's own form.
- **A one-line bag notice** for delivery cut-offs. Empty by default. *Order by Thursday 18 December for Christmas delivery* is the use.

## What Basic can and can't change in checkout

**Can:**
- Logo, colours, fonts from Shopify's list and corner style, through the checkout editor.
- Which fields checkout asks for (Settings → Checkout).
- Checkout's wording (Online Store → Themes → ⋯ → Edit default theme content).
- Policies, linked at the foot of every checkout page.

**Can't:** add our own content inside the contact, delivery and payment steps. That needs Shopify Plus. On Basic, only the thank-you and order status pages take app blocks. *Check this against the current admin before relying on it; Shopify moves this line from time to time.*

**The consequence.** [04](04-site-ia.md) asks for the trust block "repeated at checkout". On Basic the bag is the last surface we control, so the bag carries the trust block and the payment marks directly beneath the Checkout button. Logged as [#88](../0-plan/99-open-questions.md).

## Settings, in the order to make them

| | Where | Set | Why |
|---|---|---|---|
| ☐ | Settings → Taxes and duties | United Kingdom: **not collecting** | Charging or showing VAT while unregistered is an offence ([16](../0-plan/16-vat.md), [#55](../0-plan/99-open-questions.md)) |
| ☐ | Settings → Markets | **United Kingdom only** | UK first; other borders are Phase 3 ([07](../0-plan/07-roadmap.md)) |
| ☐ | Settings → Shipping and delivery | UK rate **"Next day, free"** on orders from £100. A paid rate below £100 | Must match **Theme settings → Bag & checkout → Free UK delivery from**. If they differ, the bag lies ([D12](../0-plan/DECISIONS.md)) |
| ☐ | Settings → Payments | Shopify Payments, then Apple Pay, Google Pay, Shop Pay. **Bogus Gateway while testing** | Express buttons and card marks then appear in the bag by themselves. Klarna waits on [#14](../0-plan/99-open-questions.md) |
| ☐ | Settings → Customer accounts | Accounts **optional, never required** | "No forced account creation. Guest checkout, always" ([04](04-site-ia.md)) |
| ☐ | Settings → Checkout | Contact by **email**. Company name **hidden**. Address line 2 and phone **optional** | Every extra field costs completions. A courier may use the phone number for delivery texts |
| ☐ | Settings → Checkout | Marketing sign-up box **shown, never pre-ticked** | A pre-ticked box isn't consent under PECR. Ticks join the same list as the Edition sign-up |
| ☐ | Settings → Checkout | Tipping **off**. Don't auto-fulfil | Each parcel is packed by hand |
| ☐ | Checkout editor (Settings → Checkout → Customize) | Logo `brand/logo/hikari-lockup-ink-1200.png`. Background paper `#EFF0EC`, text sumi `#14171A`, buttons ai `#2E4B6B` with paper text, errors kaki `#9E4730`. Small corners (the theme uses 2px). The nearest serif offered for headings if Newsreader isn't on Shopify's list | The checkout should look like the shop it came from. The logo is the one place the name is baked in, so swap it if the name changes ([#57](../0-plan/99-open-questions.md)) |
| ☐ | Settings → Policies | Refund, privacy, terms, shipping, contact | Shown at the foot of checkout. Shopify's templates are a start; the words come from [Thread 3](../3-copy/README.md), with return postage from [#32](../0-plan/99-open-questions.md) and the legal check from [#82](../0-plan/99-open-questions.md) |
| ☐ | Settings → Notifications | Order confirmation, shipping confirmation and abandoned checkout, in our voice | The dispatch email is "where a £185 customer stops worrying" ([D7a](../0-plan/DECISIONS.md)). The abandoned-checkout email must never say the piece is saved or waiting ([D17](../0-plan/DECISIONS.md), [#90](../0-plan/99-open-questions.md)) |
| ☐ | Theme settings → Bag & checkout | Delivery threshold, bag notice, gift note on or off, and the gift promise | See below |

## The gift note

- **How it travels:** `Gift: Yes` and `Gift note: …` reach the order as cart attributes, shown under **Additional details** in the admin.
- **The promise.** The bag says: *We write your note on a card and leave the price out of the parcel.* **That's a packing commitment.** For a gift order: don't put the default packing slip in the parcel, since it shows prices, or edit the packing slip template so it doesn't. Write the card by hand.
- **If nobody can do it,** change the promise in theme settings, or turn the gift note off. Never promise what isn't done at packing.
- **Exchanges.** Segment C is guessing, so they need an easy exchange ([03](../0-plan/03-customer.md)). Whether gifts bought for Christmas get a longer return window is [#89](../0-plan/99-open-questions.md). If so, it goes in the refund policy and the bag notice.

## Testing before the first real sale

Use the development store with **Bogus Gateway** (Settings → Payments). Card number `1` approves, `2` declines and `3` raises an error. Use any name, any future expiry and any CVV.

| | Case | Expect |
|---|---|---|
| ☐ | Buy one piece, end to end | Bag total = checkout total = order total. No VAT line. Delivery free |
| ☐ | **Sold while in the bag.** Browser A adds a piece; browser B buys it; A opens the bag | A sees *Sold since you added it*, Checkout disabled. After Remove, the bag is empty and says why |
| ☐ | A sold piece and a live piece in the bag | The total counts the live piece only |
| ☐ | Gift: tick, write a note, check out | The order shows `Gift: Yes` and the note under Additional details |
| ☐ | Gift, then untick | The order carries neither attribute |
| ☐ | Gift note, then Apple Pay or Shop Pay from the bag | The note still reaches the order |
| ☐ | Back button from checkout | The bag count and lines are right |
| ☐ | A test piece at £90 | The bag says *Added at checkout* and *Subtotal*; checkout adds the paid rate |
| ☐ | JavaScript off: add, remove, check out through `/cart` | All three work |
| ☐ | A phone at 375px wide, gift note open, keyboard up | Checkout is still reachable |

**Already checked in code, 13 Oct.** Theme Check passes with no errors. The two errors it found before, in `main-product.liquid`, are fixed. The bag and house templates were rendered against sample carts, covering sold, live, mixed, gift, under-threshold and all-sold. The drawer's script was driven in a browser through gift tick, typing, untick, refresh-while-typing, and a piece selling between page load and opening the bag. None of that replaces the cases above on a real store.

## Open

- [#88](../0-plan/99-open-questions.md): the trust block can't sit inside checkout on Basic. Accept the bag as its last place, or revisit at the D7 plan review.
- [#89](../0-plan/99-open-questions.md): a longer return window for Christmas gifts.
- [#90](../0-plan/99-open-questions.md): whether to send abandoned-checkout reminders on one-of-one stock at all.
- The price of UK delivery under £100. Nothing is priced under £100 yet, so it doesn't bite, but the paid rate still needs a number.
