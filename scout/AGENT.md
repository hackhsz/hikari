# Market scout — standing brief

This is what the weekly run follows. One run every Monday morning, UK time. The run's job is to **find, verify and rank** places we could apply to sell, and to **prepare** applications we've shortlisted. It never applies.

---

## What we're looking for

**What we sell:** vintage designer costume jewellery — Dior, Chanel, Givenchy, YSL, Nina Ricci, Grosse, the better mid-century American makers. Sourced in Japan, held in London, one-of-one, **£100–300** a piece ([00](../docs/00-brief.md)).

**Who buys it:** design-aware women, 28–40, buying £120–220 pieces two to four times a year ([03](../docs/03-customer.md)). The brand is curated and Japanese-editorial, not bargain vintage ([D2](../docs/DECISIONS.md)).

**In scope:**

| Kind | `type` | Where |
|---|---|---|
| Vintage fashion fairs, antiques and collectables fairs | `fair` | London first, then Manchester, Bristol, Glasgow, Brighton |
| Recurring pitch markets (weekly antiques markets, curated design markets, Christmas markets that take resellers) | `market` | Same cities |
| Antiques centres and arcades renting cabinets or stands | `arcade` | Same cities |
| Short-let retail and pop-up programmes with an application route | `popup` | Same cities |
| Online marketplaces that vet or approve sellers | `marketplace` | Online, selling to UK buyers |

**Out of scope:** consignment (we keep the stock), wholesale and stockists (not asked for yet), anywhere outside the five cities unless it's a national-calibre event worth the travel.

## The gates

Track opportunities now, because fair applications open months ahead. But say plainly in the report when something conflicts with a decision on record:

- **Physical** — [D3](../docs/DECISIONS.md): fairs and pop-ups come after the website converts (≥60% 90-day sell-through over two quarters). If we're applying before that, it's a choice we're making, not the plan.
- **Online** — [D1](../docs/DECISIONS.md): marketplaces are outposts for discovery and clearing 90-day stock, listed at a 10–15% premium. Never where the best pieces go first.

## Fit, 1–5

| Fit | Means |
|---|---|
| **5** | Design-aware vintage or designer buyers paying £100–300. Curated or vetted. Resellers welcome. Jewellery is a recognised category. Being there says something about us. |
| **4** | Strong audience, one weakness — high cost, broad mix, slightly lower price frame, travel. |
| **3** | A plausible test. Mixed audience, or a clothing-led vintage event where jewellery is an add-on. |
| **2** | Weak. Bargain frame (kilo sales, car boots, flea), or a fee that needs more than ~4 sales a day to break even. |
| **1** | Ruled out. Handmade only, no resellers, no costume jewellery, closed to us. **Keep it in the tracker** with the reason, so the next run doesn't rediscover it. |

Break-even is the pitch fee divided by **£84** contribution per piece ([D14](../docs/DECISIONS.md)). The report computes it from `fee_gbp`. For marketplaces, the report shows commission on a £200 listing.

---

## Each run

### 1 · Sync
On the working branch, pull first. Read `markets.yaml`, `sources.md` and the last `REPORT.md` so you know what's already tracked and what changed last week.

### 2 · Re-verify what's live
For every entry that's live (fit ≥3 and `decision` not `passed` or `rejected`), re-check the primary source when any of these is true:
- `checked` is more than 14 days old
- the deadline or next event is within 60 days
- `decision` is `shortlist` or `applied`

Update dates, `apply.status`, fees and requirements, then set `checked` to today. When a fair's date passes, set `next_date` to the next edition, or `null` and `apply.status: closed` if none is announced. **Keep the entry.** Next year's application window is the thing worth knowing.

### 3 · Discover
Work through `sources.md`, then search beyond it. Good queries combine a city, a format and an application word: *"vintage fair" London "stallholder" 2027*, *"apply to trade" antiques market Bristol*, *Christmas market Glasgow "trader application" vintage*. Organisers usually announce next year's dates in autumn and open Christmas applications in early summer.

Before adding anything, check it isn't already tracked under a different name or id. That includes the fit-1 entries.

### 4 · Record
Add new entries with `decision: new` and the schema in `markets.yaml`. Rules:
- **Primary sources only** for dates, deadlines and fees: the organiser's own site or application page. Listing sites and social posts are leads, not facts. If you can't verify something, set it to `null` and say so in `why`.
- **Never edit `decision` or `our_notes`** on an existing entry. They're ours. The only exception: if a `decision: new` entry's opportunity has ended for good (the organiser has folded, or the space closed), set `fit: 1` and explain in `watch_out`.
- One entry per thing we'd apply to. A touring organiser that runs separate events in three cities gets three entries.
- Note what the application will ask for in `requires`. Public liability insurance, stock photos, a website or Instagram, and a business address are common.

### 5 · Draft shortlisted applications
For each `decision: shortlist` entry without a `drafts/<id>.md`, write one. Include:
- what the application form asks, field by field
- a draft answer for each field, written from [02](../docs/02-positioning.md), [08](../docs/08-brand.md) and the lexicon
- what we need to supply that doesn't exist yet: photos, insurance, a stall layout, a card reader
- the deadline

The trading name isn't settled ([18](../docs/18-name-clearance.md)), so write `{NAME}` wherever the name goes.

### 6 · Validate and render
```
python3 scout/check.py --render
```
Fix every error. Act on every warning or explain why not in the report. The script rewrites only the tables between the markers in `REPORT.md`.

### 7 · Write "This week"
Replace the **This week** section at the top of `REPORT.md` with no more than about ten lines:
- **Act now:** anything closing in the next 14 days, fit ≥3, not yet applied. Lead with this.
- **New:** new entries at fit ≥3, one line each with why.
- **Changed:** dates moved, fees changed, applications opened or closed, and anything on our pipeline that needs attention.
- **Gate:** one line if something at fit ≥4 conflicts with D1 or D3.

If nothing changed, say so in one line. Don't pad.

### 8 · Commit and report back
Commit `scout/` with a message like `Market scout 2026-10-19: 3 new, 2 closing soon`, then push. End with the **This week** text as your reply, since that's what we see in the notification.

---

## Never

- Submit an application, create an account, email or message an organiser, or pay anything. Find and prepare only.
- Invent a date, fee or deadline. `null` and a note beat a plausible guess.
- Delete an entry. Rule it out (`fit: 1`) instead.
- Change `decision` or `our_notes` on an existing entry.
- Spend the run on breadth at the expense of verification. Roughly 40 searches and fetches is plenty; re-verification comes first.
