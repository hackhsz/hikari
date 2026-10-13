#!/usr/bin/env python3
"""Validate scout/markets.yaml and render the generated tables in scout/REPORT.md.

    python3 scout/check.py                       # validate only
    python3 scout/check.py --render              # validate, then rewrite the tables in REPORT.md
    python3 scout/check.py --today 2026-10-13    # pretend today is another date (testing)

Errors (bad schema, duplicate ids, unknown values) exit 1 and block --render.
Warnings (passed deadlines, stale checks) are printed for the weekly run to act on.
"""

import argparse
import datetime as dt
import math
import re
import sys
from pathlib import Path

import yaml

HERE = Path(__file__).resolve().parent
MARKETS = HERE / "markets.yaml"
REPORT = HERE / "REPORT.md"
START, END = "<!-- generated:start -->", "<!-- generated:end -->"

# Contribution per piece: £180 retail, £80 landed, unregistered for VAT — docs/DECISIONS.md D14.
CONTRIBUTION_GBP = 84
# Outposts list at a 10–15% premium over the own-site price — docs/07-roadmap.md Phase 2.
OUTPOST_PRICE_GBP = 200

TYPES = {"fair", "market", "arcade", "popup", "marketplace"}
STATUSES = {"open", "rolling", "opens-later", "closed", "invite-only", "unknown"}
# Agent sets "new"; everything after that is ours to set.
DECISIONS = {"new", "shortlist", "applied", "accepted", "rejected", "passed"}
PIPELINE = ("shortlist", "applied", "accepted")
REQUIRED = ("id", "name", "type", "city", "url", "apply", "fit", "why", "checked", "decision")
OPTIONAL = ("where", "organiser", "apply_url", "dates", "next_date", "window", "fee_gbp", "cost",
            "commission_pct", "requires", "watch_out", "sources", "our_notes")
STALE_DAYS = 21
DEADLINE_HORIZON_DAYS = 60
SLUG = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")


def as_date(value):
    if value is None or isinstance(value, dt.date):
        return value
    return dt.date.fromisoformat(str(value))


def load():
    data = yaml.safe_load(MARKETS.read_text()) or {}
    return data.get("markets") or []


def validate(markets, today):
    errors, warnings = [], []
    seen = set()
    for i, m in enumerate(markets):
        where = f"#{i} {m.get('id', '?')}"
        for key in REQUIRED:
            if m.get(key) in (None, ""):
                errors.append(f"{where}: missing {key}")
        for key in m:
            if key not in REQUIRED and key not in OPTIONAL:
                errors.append(f"{where}: unknown key {key!r}")
        mid = m.get("id", "")
        if not SLUG.match(str(mid)):
            errors.append(f"{where}: id must be a lowercase slug")
        if mid in seen:
            errors.append(f"{where}: duplicate id")
        seen.add(mid)
        if m.get("type") not in TYPES:
            errors.append(f"{where}: type must be one of {sorted(TYPES)}")
        if m.get("decision") not in DECISIONS:
            errors.append(f"{where}: decision must be one of {sorted(DECISIONS)}")
        if not isinstance(m.get("fit"), int) or not 1 <= m["fit"] <= 5:
            errors.append(f"{where}: fit must be an integer 1–5")
        if not str(m.get("url", "")).startswith("http"):
            errors.append(f"{where}: url must be http(s)")
        if (m.get("type") == "marketplace") != (m.get("city") == "Online"):
            warnings.append(f"{where}: marketplaces are city 'Online', and only marketplaces are")
        apply = m.get("apply") or {}
        if not isinstance(apply, dict) or apply.get("status") not in STATUSES:
            errors.append(f"{where}: apply.status must be one of {sorted(STATUSES)}")
            apply = {}
        try:
            for key in ("checked", "next_date"):
                m[key] = as_date(m.get(key))
            for key in ("deadline", "opens"):
                apply[key] = as_date(apply.get(key))
        except ValueError as e:
            errors.append(f"{where}: bad date ({e})")
            continue

        live = m.get("decision") not in ("passed", "rejected") and m.get("fit", 0) >= 3
        deadline = apply.get("deadline")
        if deadline and deadline < today and apply.get("status") in ("open", "rolling"):
            warnings.append(f"{mid}: deadline {deadline} has passed but status is {apply['status']}")
        if m.get("next_date") and m["next_date"] < today and live:
            warnings.append(f"{mid}: next_date {m['next_date']} has passed — find the next date or set null")
        if m.get("checked") and live and (today - m["checked"]).days > STALE_DAYS:
            warnings.append(f"{mid}: last checked {m['checked']} — re-verify")
        if m.get("decision") == "shortlist" and not (HERE / "drafts" / f"{mid}.md").exists():
            warnings.append(f"{mid}: shortlisted but no drafts/{mid}.md yet")
    return errors, warnings


def cell(value):
    if value is None or value == "":
        return "—"
    return str(value).replace("|", "\\|").replace("\n", " ")


def link(m):
    return f"[{cell(m['name'])}]({m['url']})"


def apply_text(m):
    a = m["apply"]
    text = a["status"]
    if a.get("deadline"):
        text += f" · closes {a['deadline']:%d %b %Y}"
    elif a.get("opens"):
        text += f" · opens {a['opens']:%d %b %Y}"
    return text


def next_text(m):
    return f"{m['next_date']:%d %b %Y}" if m.get("next_date") else cell(m.get("dates"))


def break_even(m):
    fee = m.get("fee_gbp")
    return f"{math.ceil(fee / CONTRIBUTION_GBP)} pc" if isinstance(fee, (int, float)) and fee > 0 else "—"


def table(header, rows):
    out = ["| " + " | ".join(header) + " |", "|" + "---|" * len(header)]
    out += ["| " + " | ".join(r) + " |" for r in rows]
    return out if rows else ["_None._"]


def render(markets, today):
    out_of_play = {"passed", "rejected"}
    active = [m for m in markets if m["fit"] >= 2 and m["decision"] not in out_of_play]
    by_rank = lambda m: (-m["fit"], m.get("next_date") or dt.date.max, m["name"])  # noqa: E731

    horizon = today + dt.timedelta(days=DEADLINE_HORIZON_DAYS)
    deadlines = sorted(
        (m for m in active if m["apply"].get("deadline") and today <= m["apply"]["deadline"] <= horizon),
        key=lambda m: m["apply"]["deadline"],
    )
    pipeline = sorted((m for m in markets if m["decision"] in PIPELINE),
                      key=lambda m: (PIPELINE.index(m["decision"]), m["name"]))
    physical = sorted((m for m in active if m["type"] != "marketplace"), key=by_rank)
    online = sorted((m for m in active if m["type"] == "marketplace"), key=by_rank)
    out = sorted((m for m in markets if m["fit"] < 2 or m["decision"] in out_of_play), key=lambda m: m["name"])

    lines = [START, f"_Tables generated from [`markets.yaml`](markets.yaml) on {today:%d %b %Y}. "
             f"{len(markets)} tracked._", ""]
    lines += [f"## Deadlines in the next {DEADLINE_HORIZON_DAYS} days", ""]
    lines += table(["Closes", "Name", "City", "Event", "Fit", "Decision"], [
        [f"**{m['apply']['deadline']:%d %b}**", link(m), m["city"], next_text(m), str(m["fit"]), m["decision"]]
        for m in deadlines])
    lines += ["", "## Our pipeline", ""]
    lines += table(["Decision", "Name", "City", "Apply", "Next", "Our notes"], [
        [m["decision"], link(m), m["city"], apply_text(m), next_text(m), cell(m.get("our_notes"))]
        for m in pipeline])
    lines += ["", "## Fairs, markets and spaces", "",
              f"Break-even is pitch fee ÷ £{CONTRIBUTION_GBP} contribution per piece (D14).", ""]
    lines += table(["Fit", "Name", "Type", "City", "Next", "Apply", "Cost", "Break-even"], [
        [str(m["fit"]), link(m), m["type"], m["city"], next_text(m), apply_text(m), cell(m.get("cost")),
         break_even(m)]
        for m in physical])
    lines += ["", "## Online marketplaces", "",
              f"Commission shown on a £{OUTPOST_PRICE_GBP} listing — the own-site £180 plus the outpost premium.", ""]
    lines += table(["Fit", "Name", "Apply", "Commission", f"On £{OUTPOST_PRICE_GBP}", "Cost"], [
        [str(m["fit"]), link(m), apply_text(m),
         f"{m['commission_pct']}%" if m.get("commission_pct") is not None else "—",
         f"£{OUTPOST_PRICE_GBP * m['commission_pct'] / 100:.0f}" if m.get("commission_pct") is not None else "—",
         cell(m.get("cost"))]
        for m in online])
    lines += ["", "## Ruled out", "", "Kept so the weekly run doesn't rediscover them.", ""]
    lines += [f"- {link(m)} ({m['city']}) — {cell(m.get('watch_out') or m['why'])}" for m in out] or ["_None._"]
    lines += ["", END]

    text = REPORT.read_text()
    if START not in text or END not in text:
        sys.exit(f"{REPORT.name} is missing the {START} / {END} markers")
    head, rest = text.split(START, 1)
    tail = rest.split(END, 1)[1]
    REPORT.write_text(head + "\n".join(lines) + tail)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--render", action="store_true")
    parser.add_argument("--today", type=dt.date.fromisoformat, default=dt.date.today())
    args = parser.parse_args()

    markets = load()
    errors, warnings = validate(markets, args.today)
    for w in warnings:
        print(f"warn  {w}")
    for e in errors:
        print(f"ERROR {e}")
    if errors:
        sys.exit(1)
    print(f"ok    {len(markets)} entries")
    if args.render:
        render(markets, args.today)
        print(f"ok    rendered {REPORT.relative_to(HERE.parent)}")


if __name__ == "__main__":
    main()
