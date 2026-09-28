"""Publish the newly extracted, verified quiz banks. Options are rotated so the
correct answer cycles through A-D (several sources key almost everything 'A' or
'B'); the correct text is asserted after rotation, so no answer can change."""
import io, json
from collections import Counter

NEW = [  # sessionId, course, sessionNumber, title, source bank
    ("1yr-01", "1-year-mba", 1, "What is Strategy", "1yr-01"),
    ("2yr-01", "2-year-mba", 1, "What is Strategy", "1yr-01"),        # identical source files
    ("2yr-03", "2-year-mba", 3, "Chief Strategy Officer", "2yr-03"),
    ("2yr-04", "2-year-mba", 4, "Purpose Values Strategy Tesla", "2yr-04"),
    ("2yr-07", "2-year-mba", 7, "Managing Strategic Leadership and Strategy Process", "2yr-07"),
    ("2yr-08", "2-year-mba", 8, "Industry Structure and Firm Strategy", "2yr-08"),
    ("1yr-09", "1-year-mba", 9, "Corporate Strategy Strategic Alliances Mergers Acquisitions", "1yr-09"),
]

def rotate_bank(src):
    out = []
    for n, q in enumerate(src):
        letters = sorted(q["options"])
        opts = [q["options"][k] for k in letters]
        correct = q["options"][q["answer"]]
        a = opts.index(correct)
        target = n % len(opts)
        k = (a - target) % len(opts)
        rot = opts[k:] + opts[:k]
        assert rot[target] == correct
        new_letters = "ABCD"[:len(rot)]
        item = {"set": q.get("set"), "stem": q["stem"], "options": dict(zip(new_letters, rot)),
                "answer": new_letters[target], "explanation": q.get("explanation") or "",
                "lo": q.get("lo"), "n": n + 1}
        assert item["options"][item["answer"]] == correct
        out.append(item)
    return out

manifest = json.load(io.open("content/quizzes/manifest.json", encoding="utf-8"))
have = {e["sessionId"] for e in manifest}
for sid, course, num, title, src in NEW:
    bank_src = json.load(io.open(f"scratch-plan/newquiz/{src}.json", encoding="utf-8"))
    qs = rotate_bank(bank_src)
    bank = {"sessionId": sid, "course": course, "sessionNumber": num, "title": title,
            "questionCount": len(qs), "questions": qs}
    io.open(f"content/quizzes/{sid}.json", "w", encoding="utf-8").write(json.dumps(bank, ensure_ascii=False, indent=1) + "\n")
    entry = {"sessionId": sid, "course": course, "sessionNumber": num, "title": title,
             "questionCount": len(qs), "withExplanations": sum(1 for q in qs if q["explanation"])}
    if sid in have:
        manifest = [entry if e["sessionId"] == sid else e for e in manifest]
    else:
        manifest.append(entry)
    print(f"{sid}: {len(qs):>3} questions, {entry['withExplanations']:>3} explained, "
          f"answer positions {dict(sorted(Counter(q['answer'] for q in qs).items()))}")

manifest.sort(key=lambda e: (e["course"], e["sessionNumber"]))
io.open("content/quizzes/manifest.json", "w", encoding="utf-8").write(json.dumps(manifest, ensure_ascii=False, indent=1) + "\n")
print(f"\nmanifest: {len(manifest)} sessions, {sum(e['questionCount'] for e in manifest)} questions")
print("1-year:", [e["sessionNumber"] for e in manifest if e["course"] == "1-year-mba"])
print("2-year:", [e["sessionNumber"] for e in manifest if e["course"] == "2-year-mba"])
