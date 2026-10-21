# Verification loop

**Run `bash scripts/verify/run.sh` after any change to `theme/`, before pushing.** It stops at the first failure and ends with a summary. Screenshots land in `scripts/verify/out/`, which git ignores.

| Step | What it checks | Needs |
|---|---|---|
| **1 · Theme Check** | Shopify's own linter. Fails on errors, not warnings | Nothing |
| **2a · Liquid** (`local/liquid.mjs`) | What our templates decide, rendered against sample carts and collections. Sold lines, totals, the delivery line, the gift note, house pages, the Record, house links | Nothing |
| **2b · Browser** (`local/browser.mjs`) | `assets/hikari.js` in Chromium against our own markup, with Shopify's cart mocked. The gift note saving, the bag refreshing, a piece selling between page load and opening the bag. House page screenshots at desktop and phone width, with no sideways scroll | Nothing |
| **2c · Features** (`local/features.mjs`) | The 21 Oct features in Chromium on a made-up origin, so storage works as on the store: badges, the countdown, quick view through to the bag, full-screen photographs keeping the *Unretouched* label, the 360° viewer by drag and by key, the pop-up's timing and rest, the WeChat dialog. Screenshots of the home page, a product page, quick view and the pop-up, at desktop and phone width | Nothing |
| **3 · Deploy** (`store/deploy.sh`) | Pushes `theme/` to a theme that exists only for this, so step 4 tests this exact commit | Store, Theme Access password, theme id |
| **4 · Store** (`store/store.spec.mjs`) | The theme on the real store, at desktop and phone width. The right theme is served; the house page; add to bag; gift attributes reach the cart; the hand-off to checkout; **no tax line at checkout** (D12, #55); the bag page without JavaScript | Store address, and a storefront password on a development store |

Steps 1 and 2 run anywhere, with no store. Steps 3 and 4 run when their settings exist, and are skipped, with the reason, when they don't.

**Proved, 21 Oct 2026:** steps 1 and 2 pass (Theme Check clean; 54 + 16 + 28 checks). 13 Oct: 27 + 16. Breaking the sold-piece logic in `bag-foot.liquid` on purpose fails three checks and stops the loop. **Steps 3 and 4 are written but have never run against a store.** Expect a first round of fixes the first time they do.

## What it needs

Store these as environment variables: in the cloud environment's settings for a Claude session, or in your shell. **Never in the repo, which is public, and never pasted into a chat.**

| To | Set up | Variable |
|---|---|---|
| Test the store (step 4) | The store's address | `HIKARI_STORE`, e.g. `hikari-dev.myshopify.com` |
| | The storefront password, if the store has one (development stores do): Online Store → Preferences | `HIKARI_STOREFRONT_PASSWORD` |
| | The theme to test. Its id is the number after `preview_theme_id=` in its preview link. Leave unset to test the live theme | `HIKARI_THEME_ID` |
| Deploy every change first (step 3) | Install **Theme Access**, Shopify's free app, and create a password. It can push themes and nothing else | `SHOPIFY_CLI_THEME_TOKEN` |
| | A theme only for this. Run `bash scripts/verify/store/deploy.sh` once without `HIKARI_THEME_ID`: it creates the unpublished theme *Hikari · verify* and prints its id | `HIKARI_THEME_ID` |
| Test a piece selling while in the bag on the store, and set up collections and test products | Admin access: the Shopify connector in claude.ai, or an Admin API token | Not built yet |

Optional: `HIKARI_HOUSE_HANDLE` (default `vintage-christian-dior-jewellery`), `HIKARI_FREE_OVER` (default `100`, matching the theme setting), `CHROMIUM_PATH`.

**On the store itself:** import `scripts/test-products.csv` so there is something to add to the bag, and create the Dior house collection for the house test (theme/README, *House pages*). Bogus Gateway isn't needed; the tests never pay.

## Rules

- **`HIKARI_THEME_ID` is never the live theme, and never a GitHub-connected one** (`shopify`, `shopify-preview`). Shopify commits pushes to a connected theme back to its branch. The CLI refuses a live push without `--allow-live`, and `deploy.sh` never passes it.
- **Point it at a development store.** The tests make carts and open checkout. They never pay, and never enter an email address, so no abandoned-checkout email can go out.

## Running it elsewhere

```
cd scripts/verify
npm ci
npx playwright install chromium   # not needed in a Claude cloud session, which has Chromium
bash run.sh
```

## Open

- The store step for a piece that sells while in the bag needs admin access (`test.fixme` until then). It's covered locally in the meantime.
- A GitHub Action could run steps 1 and 2 on every push with no secrets at all. Not added yet.
