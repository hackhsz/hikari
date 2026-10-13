# Working in this repo

Hikari (光) buys vintage designer costume jewellery in Japan and sells it to UK buyers at £100–300, through its own Shopify store, Instagram and fairs. Every piece is one of one. The business is run by two people, and either may write in English or Chinese. Reply in the language you are written to in.

The repo is organised as **six threads**. Each Claude session works in one thread.

| Thread | Folder | What it covers |
|---|---|---|
| 1 · Shop | [`1-shop/`](1-shop/README.md) + `theme/` + `scripts/` | The Shopify channel and site |
| 2 · Photos | [`2-photos/`](2-photos/README.md) | From source photo to AI-edited image |
| 3 · Copy | [`3-copy/`](3-copy/README.md) | Listings, pages, captions, emails |
| 4 · Markets | [`4-markets/`](4-markets/README.md) | Fair applications and stalls |
| 5 · Social | [`5-social/`](5-social/README.md) | Instagram, 小红书, TikTok, Pinterest, the list |
| 6 · Inspiration | [`6-inspiration/`](6-inspiration/README.md) | References, and what we take from them |

The shared folders belong to no single thread:
- [`0-plan/`](0-plan/): brief, customer, money, tax, the name, **DECISIONS** and **open questions**.
- [`brand/`](brand/): palette, type, logo.
- [`archive/`](archive/): merged-in material.

## At the start of a session

1. `git fetch origin main` and start from the latest `main`.
2. Read your thread's `README.md`, then [`0-plan/00-brief.md`](0-plan/00-brief.md).
3. Check the end of [`0-plan/DECISIONS.md`](0-plan/DECISIONS.md) for anything newer than your thread's README.

## While working

- **Stay in your thread's folder.** If another thread's file needs changing, say so and propose the change; don't make it quietly.
- **Decisions go in [`0-plan/DECISIONS.md`](0-plan/DECISIONS.md).** Append only, dated, with a status. **Open questions go in [`0-plan/99-open-questions.md`](0-plan/99-open-questions.md).** Keep your thread README's "Where it stands" current.
- **Numbers are global and permanent.** Docs (`NN-name.md`), decisions (`Dnn`) and questions (`#nn`) are referenced everywhere by number. The next free numbers are listed at the end of `99-open-questions.md`. Pull `main` before taking one, so two threads don't take the same number. That is how the September split happened.
- **Match the house style.** British English and £. Short declarative sentences. Bold the conclusion first. End each doc with an **Open** section. Link to other docs by their number, e.g. `[03](../0-plan/03-customer.md)`.

## At the end of a session

**Get the work onto `main`.** Merge the latest `main` into your branch, then open a pull request into `main`, or merge it if the user says to. Work left on a side branch is invisible to the other five threads. In September that split the repo into two lines numbered against each other; it took a full merge on 13 Oct to rejoin them.

## Things that are easy to break

- **`theme/` must stay at the repo root.** [`scripts/sync-theme.sh`](scripts/sync-theme.sh) splits it into the `shopify` branch, which the store reads. `shopify-preview` is the preview theme. Never commit to either by hand.
- **Run `scripts/verify/run.sh` before pushing anything in `theme/`.** It stops at the first failure ([scripts/verify](scripts/verify/README.md)).
- **Never hard-code the brand name** in the theme. It is a setting, because the name may change ([`0-plan/18-name-clearance.md`](0-plan/18-name-clearance.md), #57).
- **The repo is public.** No photographs of other people's work, no customer data, no keys. Piece photos live in a private Drive folder ([`2-photos/`](2-photos/README.md), stage 7).
- **Frames 2 and 4 are evidence.** No AI, no grain, ever ([D10](0-plan/DECISIONS.md)).
