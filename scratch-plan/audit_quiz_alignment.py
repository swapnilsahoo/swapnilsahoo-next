"""Audit every published quiz bank for key/explanation misalignment.

For each question we compare the explanation's vocabulary against (a) the
question as a whole and (b) each option. A correctly keyed question has an
explanation that talks about the question, and about the keyed option more
than the others. A scrambled key shows up as explanations that are about some
other question entirely.
"""
import io, json, glob, re, sys
from collections import Counter

STOP = set("""the a an and or of to in on for with by from as at is are was were be been being that this
these those which who whom its it their there than then so such not no into over under about across
between while because if when where how what why do does did can could should would may might must
will shall also only more most less least very much many any each every other same both all some own
firm firms company companies tesla strategy strategic""".split())

def toks(s):
    s = re.sub(r"\$\\?(?:text|mathbf)?\{?|\}|\$", " ", s or "")
    return {w for w in re.findall(r"[a-z][a-z\-]{3,}", s.lower()) if w not in STOP}

def opts_of(q):
    o = q.get("options") or q.get("o")
    if isinstance(o, dict):
        return [o[k] for k in sorted(o)], sorted(o)
    return list(o), [chr(65 + i) for i in range(len(o))]

def keyed_index(q, letters):
    a = q.get("answer", q.get("a"))
    if isinstance(a, int):
        return a
    return letters.index(str(a).strip().upper()[0])

report = {}
for f in sorted(glob.glob("content/quizzes/*.json")):
    if f.endswith("manifest.json"):
        continue
    d = json.load(io.open(f, encoding="utf-8"))
    qs = d["questions"]
    bad_topic, bad_key, rows = 0, 0, []
    for q in qs:
        texts, letters = opts_of(q)
        texts = [t if isinstance(t, str) else t.get("text", "") for t in texts]
        k = keyed_index(q, letters)
        raw = (q.get("explanation") or q.get("e") or "").strip()
        if not raw:
            continue                                  # no explanation to test: counted separately below
        e = toks(raw)
        stem = toks(q.get("stem") or q.get("q"))
        allq = stem.union(*[toks(t) for t in texts])
        topic = len(e & allq)
        ov = [len(e & toks(t)) for t in texts]
        best = max(ov)
        off_topic = topic <= 1                       # explanation shares ~nothing with the question
        wrong_key = best >= 2 and ov[k] + 1 < best   # another option matches the explanation clearly better
        bad_topic += off_topic
        bad_key += (wrong_key and not off_topic)
        if off_topic or wrong_key:
            rows.append((q.get("n"), "OFF-TOPIC" if off_topic else "KEY?", topic, ov, k,
                         (q.get("stem") or "")[:70], (q.get("explanation") or "")[:90]))
    empty = sum(1 for q in qs if not (q.get("explanation") or q.get("e") or "").strip())
    report[d["sessionId"]] = (len(qs), bad_topic, bad_key, rows, empty)

print(f"{'session':<8} {'Qs':>4} {'no expl':>8} {'off-topic':>10} {'key-doubt':>10}")
for sid, (n, t, kk, rows, empty) in report.items():
    tested = n - empty
    flag = "  <-- MISALIGNED" if tested and t >= max(3, tested // 5) else ""
    print(f"{sid:<8} {n:>4} {empty:>8} {t:>10} {kk:>10}{flag}")
if len(sys.argv) > 1:
    for sid in sys.argv[1:]:
        print(f"\n===== {sid} flagged rows =====")
        for r in report[sid][3][:40]:
            print(f"  Q{r[0]} {r[1]:<9} topic={r[2]} opt-overlap={r[3]} keyed={r[4]}")
            print(f"      stem: {r[5]}")
            print(f"      expl: {r[6]}")
