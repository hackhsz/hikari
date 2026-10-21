# 22 — Creators, customers who share, and the agent that checks them

**The page and the forms are built. The checking is done by hand until the accounts exist. The agent below proposes and a person approves, so no code goes out without someone saying yes.** Decided in direction at [D28](../0-plan/DECISIONS.md). Rewards are open ([#92](../0-plan/99-open-questions.md)).

---

## The two programmes

| | Creators | Customers who share |
|---|---|---|
| Who | People who make vintage or fashion content, 5–50k followers, UK first ([14](../5-social/14-marketing.md), creator seeding) | Anyone who has bought a piece |
| They do | Apply on `/pages/creators` | Post a photograph wearing the piece, tag us, add #ad, then send the link and order number |
| We give (proposed) | A piece, chosen with them, to keep. Their own link and code. 10% of sales through it for 30 days | £10 towards their next piece, as a single-use code, once per order |
| What we get | Content with usage rights, asked for up front | Proof the piece is real and worn: the trust [03](../0-plan/03-customer.md) asks for |

**Both are adverts under the CAP Code.** Anything posted in return for a reward has to be labelled, so the page says #ad on both sides. A post without the label gets no reward until it is fixed. That rule protects us as much as them.

**Creators: use Shopify Collabs before building anything.** It is Shopify's own app for creator programmes: applications, links, codes, commission and payouts. Check it is available to a UK store. If it is, the creator side needs no agent at all beyond triage.

## What arrives now

Both forms are Shopify contact forms (`sections/main-creators.liquid`). Each submission is an email to the store's sender address, with every field. A `Programme` field says which form it came from:

- **Creator:** name, email, platform, handle, followers, a note
- **Share:** email, order number, post link, whether we may repost it

Until the agent runs, someone reads these, checks the post, creates the code in Shopify → Discounts, and replies.

## The agent

A scheduled Claude task, once a day. It reads the new submissions, does the checking, and **drafts** each decision for a person to approve. No customer data is written to this repo, which is public.

### For a share

1. **Read** the submission email (Gmail connector).
2. **Find the order** (Shopify Admin API, by order number). Check the email matches, the order is delivered, nothing is refunded, and the order has no `share-rewarded` tag.
3. **Check the post.**
   - *Instagram:* the media we are tagged in, through the Instagram Graph API on our Business account. Is the link one of them, is it public, and does the caption say #ad?
   - *小红书 and others:* no API. The agent marks these for a person to open.
4. **Check it is the piece.** Compare the post's photograph with the product's frame 1. Anything short of a clear match goes to a person.
5. **Draft.** A £10 single-use code for that customer, and a short reply in house voice ([Thread 3](../3-copy/README.md)).
6. **A person approves.** Then the agent creates the code, tags the order `share-rewarded`, and sends the reply.

### For a creator application

Summarise the application, look at the public profile where possible, and score it against the fit above: subject, audience, UK, size. Draft a yes or a no. A person decides. On a yes, invite them in Collabs, or create their code.

### What it needs

| Need | For | State |
|---|---|---|
| Gmail connector | Reading submissions, sending replies | Available in claude.ai |
| Shopify Admin API token, custom app with `read_orders`, `read_customers`, `write_discounts` | Orders, codes, tags | Not made. Store it as an environment secret, never in the repo |
| Instagram Business account, linked to a Facebook Page, and a Graph API token | Seeing posts we are tagged in | **Blocked on the name and the handle** ([#57](../0-plan/99-open-questions.md), [#59](../0-plan/99-open-questions.md)) |
| A log of decisions | So nobody is rewarded twice and every no has a reason | A private sheet, not this repo |

### Rules it keeps

- **Never sends a code or a refusal without approval.** Revisit after the first fifty, if its drafts are right.
- **One reward per order.** The order tag is the record.
- **No label, no reward.** Ask them to add #ad, then look again.
- **Never contacts anyone who did not write first.**

## Open

- Rewards: commission rate, £10 or more, store credit or code ([#92](../0-plan/99-open-questions.md)).
- Collabs or our own codes ([#92](../0-plan/99-open-questions.md)).
- Whether "an agent that markets automatically" means this, or posting each new piece, or the Friday email ([#96](../0-plan/99-open-questions.md)).
- Whether to repost customers' photographs on the product page as well as on Instagram. That needs their permission per post, which the form asks for.
