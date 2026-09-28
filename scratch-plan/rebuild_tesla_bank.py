"""Rebuild the Session 2 (Tesla) quiz bank for 1yr-02 and 2yr-02 from verified
sources only, replacing the published bank whose detached key was scrambled.

Sources, in order:
 1. The v9 exploration page's 15 questions (identical in both course folders):
    each item carries its own answer and explanation, so nothing can misalign.
 2. The 9 questions from 'Quiz Questions Sec A & Sec B.docx' whose rationale
    was recovered decisively AND self-consistently (recover_tesla_key.py).
 3. 'Session 2 Quiz Questions and Answers (A, B, C and D).docx' (2-Year folder):
    60 questions, each with its answer printed under its own options.
The 21 questions from source 2 whose key could not be recovered are left out.

Option order is rotated so the correct answer cycles through A-D (sources 2 and
3 were overwhelmingly keyed 'B'); the correct text is asserted after rotation.
"""
import io, json, re
from collections import Counter

v9 = json.load(io.open("scratch-plan/s2/quiz.json", encoding="utf-8"))
rec = [r for r in json.load(io.open("scratch-plan/tesla_key_recovery.json", encoding="utf-8")) if r["accepted"]]
qa = json.load(io.open("scratch-plan/tesla_qa_60.json", encoding="utf-8"))
SECTION = {"A": "Strategy & industry structure", "B": "Operations & manufacturing",
           "C": "Financial analysis", "D": "Governance & leadership"}

items = []
for q in v9:
    items.append({"stem": q["q"], "opts": q["o"], "correct": q["o"][q["a"]], "explanation": q["e"],
                  "lo": "Porter's frameworks", "src": "v9"})
for r in rec:
    letters = sorted(r["opts"])
    items.append({"stem": r["stem"], "opts": [r["opts"][k] for k in letters], "correct": r["opts"][r["letter"]],
                  "explanation": r["rationale"], "lo": r["principle"], "src": "recovered"})
# Source 2b: questions whose rationale could not be re-matched, published ONLY where the
# document's own key letter for that slot agrees with the unambiguous content answer.
# (Read question by question; every one has a single Porter-consistent option against
# plainly wrong distractors.) A2, A5 and A11 disagree and stay withheld for review.
CONTENT = {"A1": "B", "A2": "B", "A3": "B", "A4": "B", "A5": "B", "A6": "B", "A7": "B", "A8": "B",
           "A9": "B", "A11": "B", "A12": "B", "A13": "B", "A14": "B", "A15": "B", "B1": "B", "B5": "B",
           "B8": "A", "B11": "B", "B13": "B", "B14": "B", "B15": "B"}
OWN_RATIONALE_FITS = {"B8"}   # checked by reading: its own-slot rationale is about its own question
withheld = []
for r in json.load(io.open("scratch-plan/tesla_key_recovery.json", encoding="utf-8")):
    if r["accepted"]:
        continue
    slot = f"{r['sec']}{r['n']}"
    if CONTENT[slot] != r["own_letter"]:
        withheld.append((slot, r["own_letter"], CONTENT[slot], r["title"]))
        continue
    letters = sorted(r["opts"])
    items.append({"stem": r["stem"], "opts": [r["opts"][k] for k in letters], "correct": r["opts"][r["own_letter"]],
                  "explanation": r["own_rationale"] if slot in OWN_RATIONALE_FITS else "",
                  "lo": r["own_principle"] if slot in OWN_RATIONALE_FITS else r["title"], "src": "key-agrees"})

for q in qa:
    letters = sorted(q["options"])
    items.append({"stem": q["stem"], "opts": [q["options"][k] for k in letters], "correct": q["options"][q["answer"]],
                  "explanation": "", "lo": SECTION[q["set"]], "src": "qa60"})

# ---- de-duplicate across sources on content, keeping the richer (explained) copy ----
def sig(s):
    return set(w for w in re.findall(r"[a-z]{4,}", s.lower()))
kept, dropped = [], []
for it in items:
    s = sig(it["stem"] + " " + it["correct"])
    dup = None
    for k in kept:
        t = sig(k["stem"] + " " + k["correct"])
        if len(s & t) / max(1, len(s | t)) >= 0.6:
            dup = k; break
    if dup:
        dropped.append((it["src"], it["stem"][:70], dup["src"], dup["stem"][:70]))
    else:
        kept.append(it)

# ---- rotate each question so the correct answer cycles through A-D ----
questions = []
for n, it in enumerate(kept):
    opts, correct = it["opts"], it["correct"]
    a = opts.index(correct)
    target = n % len(opts)
    k = (a - target) % len(opts)
    rot = opts[k:] + opts[:k]
    assert rot[target] == correct, it["stem"][:40]
    letters = "ABCD"[:len(rot)]
    questions.append({"set": None, "stem": it["stem"], "options": dict(zip(letters, rot)),
                      "answer": letters[target], "explanation": it["explanation"] or "",
                      "lo": it["lo"], "n": n + 1})

# integrity: every published answer must be the source's correct text
for q, it in zip(questions, kept):
    assert q["options"][q["answer"]] == it["correct"]

print("withheld (document key disagrees with the content answer):")
for w in withheld: print(f"   {w[0]}: key says {w[1]}, content says {w[2]} — {w[3]}")
json.dump(withheld, io.open("scratch-plan/tesla_withheld.json", "w", encoding="utf-8"), ensure_ascii=False)
print("sources:", dict(Counter(i["src"] for i in items)))
print("near-duplicates dropped:", len(dropped))
for d in dropped: print(f"   dropped [{d[0]}] {d[1]}  ==  [{d[2]}] {d[3]}")
print("published:", len(questions), "| with explanations:", sum(1 for q in questions if q["explanation"]))
print("answer positions:", dict(sorted(Counter(q["answer"] for q in questions).items())))

for sid, course, num, title in [("1yr-02", "1-year-mba", 2, "Tesla Case Study"),
                                ("2yr-02", "2-year-mba", 2, None)]:
    path = f"content/quizzes/{sid}.json"
    old = json.load(io.open(path, encoding="utf-8"))
    bank = {"sessionId": sid, "course": old["course"], "sessionNumber": old["sessionNumber"],
            "title": old["title"], "questionCount": len(questions), "questions": questions}
    io.open(path, "w", encoding="utf-8").write(json.dumps(bank, ensure_ascii=False, indent=1) + "\n")
    print("wrote", path, "| title kept:", old["title"])

m = json.load(io.open("content/quizzes/manifest.json", encoding="utf-8"))
for e in m:
    if e["sessionId"] in ("1yr-02", "2yr-02"):
        e["questionCount"] = len(questions)
        e["withExplanations"] = sum(1 for q in questions if q["explanation"])
io.open("content/quizzes/manifest.json", "w", encoding="utf-8").write(json.dumps(m, ensure_ascii=False, indent=1) + "\n")
print("manifest updated")
