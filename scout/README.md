# Market scout

A weekly agent that finds fairs, markets, pop-up spaces and vetted online marketplaces we could apply to, keeps their dates and deadlines current, and drafts the applications we shortlist. **It never applies on our behalf.**

**Start at [REPORT.md](REPORT.md).** It opens with what changed this week, then shows deadlines, our pipeline, and everything ranked by fit.

| File | What it is |
|---|---|
| [REPORT.md](REPORT.md) | The latest run: this week's changes, then generated tables |
| [markets.yaml](markets.yaml) | The tracker, and the source of truth |
| [AGENT.md](AGENT.md) | The standing brief the weekly run follows: scope, fit scoring, steps, rules |
| [sources.md](sources.md) | Organisers, listing sites and queries worth re-checking every week |
| [check.py](check.py) | Validates the tracker and renders the tables in the report |
| `drafts/` | Application drafts for anything we shortlist, plus [`PROFILE.md`](drafts/PROFILE.md): the facts every application draws on |

## How it runs

A scheduled Claude Routine fires every **Monday at 08:47 UK time**. It re-verifies live entries against the organisers' own pages, searches for new ones, updates `markets.yaml`, re-renders the report, commits, and replies with a short summary.

To run it by hand, ask Claude in the session: *"run the market scout"*.

## How we use it

The `decision` field on each entry is ours. The agent only ever sets `new`.

| `decision` | Means | What the agent does next |
|---|---|---|
| `new` | Found, not yet reviewed | Keeps it verified |
| `shortlist` | We want to apply | Drafts the application in `drafts/<id>.md` (plus a Gmail draft, never sent, where the route is email) and watches the deadline |
| `applied` | Submitted | Watches for the event date and outcome |
| `accepted` · `rejected` | The outcome | Keeps the dates current |
| `passed` | We've decided against it | Drops it from the ranked tables and won't raise it again |

Edit `markets.yaml` directly, or tell Claude *"shortlist frock-me-chelsea"*. Put anything we want to remember in `our_notes`.

## What most applications ask for

Worth sorting out once, before the first application:

- **Public liability insurance.** Most markets require it, often at £5m cover. Market-trader policies are inexpensive.
- **Photos of the stock and of a stall set-up.** The four-frame photography in [08](../docs/08-brand.md) covers the stock. A stall photo needs a trial layout.
- **A website or Instagram** that shows the range and the price point.
- **A trading name and address.** The name is **Karineko Vintage** ([profile](drafts/PROFILE.md)). A correspondence address is still needed: the site doesn't publish one.
- **A card reader.** Shopify POS or a SumUp-type reader. It counts towards the [D14](../docs/DECISIONS.md) VAT turnover like any other sale.

## Checks

```
python3 scout/check.py            # validate the tracker
python3 scout/check.py --render   # validate and regenerate the report tables
```

Requires PyYAML (`pip install pyyaml`).
