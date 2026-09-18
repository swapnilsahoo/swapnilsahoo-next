"""Merge every verified quiz source into one bank, then validate it hard.

Inputs (each produced by its own extractor, none overwriting another):
  quiz-bank-FINAL.json  the proven set - table keys, prose keys, 1-Year Q&A
  quiz-new.json         the F1 parser applied to previously unscanned sessions
  quiz-titled.json      the 'Question N: Title' + pipe-table-key layout

Every question is de-duplicated on its full text, then its options are shuffled
with a seed derived from the question itself, so the ordering is stable across
builds while the position of the correct answer is no longer a tell. The source
files place the correct option first in several sets; without this a student
could score well by always picking A.
"""
from __future__ import annotations

import json
import random
import re
import collections

SOURCES = [
    ("proven", "scratch-plan/quiz-bank-FINAL.json"),
    ("f1-extra", "scratch-plan/quiz-new.json"),
    ("titled", "scratch-plan/quiz-titled.json"),
    ("master-exam", "scratch-plan/quiz-master.json"),
]
OUT = "scratch-plan/quiz-bank-v2.json"


def norm(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "")).strip().lower()


def signature(q: dict) -> str:
    opts = q.get("options") or {}
    return norm(q.get("stem")) + "||" + "|".join(norm(opts.get(L)) for L in "ABCD")


def main() -> None:
    merged: dict[str, list[dict]] = {}
    provenance: dict[str, collections.Counter] = {}

    for label, path in SOURCES:
        try:
            data = json.load(open(path, encoding="utf-8"))
        except FileNotFoundError:
            print(f"  (skipped missing {path})")
            continue
        for sid, questions in data.items():
            for q in questions:
                merged.setdefault(sid, []).append(dict(q, _src=label))
                provenance.setdefault(sid, collections.Counter())[label] += 1

    final: dict[str, list[dict]] = {}
    dropped = collections.Counter()

    for sid, questions in merged.items():
        seen: set[str] = set()
        clean: list[dict] = []
        for q in questions:
            opts = q.get("options") or {}
            stem = re.sub(r"^\d+[\.\)]\s*", "", (q.get("stem") or "").strip())
            answer = q.get("answer")

            if len(opts) != 4:
                dropped["not four options"] += 1
                continue
            if not stem:
                dropped["empty stem"] += 1
                continue
            if answer not in opts:
                dropped["answer names no option"] += 1
                continue
            if any(not (opts[L] or "").strip() for L in "ABCD"):
                dropped["blank option"] += 1
                continue
            if len({norm(opts[L]) for L in "ABCD"}) != 4:
                dropped["duplicate options"] += 1
                continue

            sig = signature({"stem": stem, "options": opts})
            if sig in seen:
                dropped["duplicate question"] += 1
                continue
            seen.add(sig)

            correct_text = opts[answer]
            rnd = random.Random(f"{sid}|{sig}")
            items = [opts[L] for L in "ABCD"]
            rnd.shuffle(items)
            new_opts = {"ABCD"[i]: text for i, text in enumerate(items)}
            new_answer = next(L for L, text in new_opts.items() if text == correct_text)

            clean.append({
                "set": q.get("set"),
                "stem": stem,
                "options": new_opts,
                "answer": new_answer,
                "explanation": (q.get("explanation") or "").strip(),
                "lo": q.get("lo"),
            })
        if clean:
            clean.sort(key=lambda x: (x["set"] or "", x["stem"][:40]))
            for i, q in enumerate(clean, 1):
                q["n"] = i
            final[sid] = clean

    json.dump(final, open(OUT, "w", encoding="utf-8"), indent=1, ensure_ascii=False)

    total = sum(len(v) for v in final.values())
    with_exp = sum(1 for v in final.values() for q in v if q["explanation"])
    print("%-9s %-5s %-6s %-6s %s" % ("session", "n", "expl", "spread", "sources"))
    for sid in sorted(final):
        c = collections.Counter(q["answer"] for q in final[sid])
        e = sum(1 for q in final[sid] if q["explanation"])
        src = ",".join(f"{k}:{v}" for k, v in provenance.get(sid, {}).items())
        print("%-9s %-5d %-6d %-6s %s" % (
            sid, len(final[sid]), e, f"{c['A']}/{c['B']}/{c['C']}/{c['D']}", src))
    print(f"\n{total} questions, {with_exp} with explanations, {len(final)} sessions")
    if dropped:
        print("dropped:", dict(dropped))


if __name__ == "__main__":
    main()
