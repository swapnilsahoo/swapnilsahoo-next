"""Faithful extraction of 'Session 2 Quiz Questions and Answers (A, B, C and D).docx'
(2-Year course, Session 2 folder). Each question carries its own '*Answer: X*' line
directly under its options, so there is no detached key to misalign."""
import io, re, json
from collections import Counter
import docx

SRC = (r"C:/Users/swapn/OneDrive - greatlakes.edu.in/Prof.Swapnil Sahoo/Strategy/Strategy Sessions/"
       r"2 Year Course/Session 2_Strategy of Disruption/Session 2 Quiz Questions and Answers ( A,B, C and D).docx")

def clean(s):
    s = s.replace("**", "").replace("*", "")
    return re.sub(r"\s+", " ", s).strip()

paras = [p.text.strip() for p in docx.Document(SRC).paragraphs if p.text.strip()]
out, cur, sec, problems = [], None, None, []
for ln in paras:
    m = re.match(r"^#+\s*Section\s+([A-D])\s*:\s*(.*)$", ln, re.I)
    if m:
        sec = m.group(1).upper(); continue
    m = re.match(r"^(\d{1,2})\.\s+(.+)$", ln)
    if m and not re.match(r"^[A-D]\.", ln):
        if cur: out.append(cur)
        cur = {"set": sec, "num": int(m.group(1)), "stem": clean(m.group(2)), "options": {}, "answer": None}
        continue
    m = re.match(r"^([A-D])\.\s+(.+)$", ln)
    if m and cur is not None and cur["answer"] is None:
        cur["options"][m.group(1)] = clean(m.group(2)); continue
    m = re.match(r"^\*?\s*Answer\s*[:\-]\s*([A-D])\b", ln.replace("*", "").strip() and ln.replace("*", ""), re.I)
    if m and cur is not None:
        cur["answer"] = m.group(1).upper(); continue
if cur: out.append(cur)

for q in out:
    if len(q["options"]) != 4: problems.append((q["set"], q["num"], f"{len(q['options'])} options"))
    if q["answer"] not in ("A", "B", "C", "D"): problems.append((q["set"], q["num"], "no answer"))
seen = Counter(q["stem"].lower() for q in out)
dups = [s for s, c in seen.items() if c > 1]

print("questions:", len(out), "| by set:", dict(Counter(q["set"] for q in out)))
print("problems:", problems or "none")
print("duplicate stems:", len(dups))
print("answer distribution:", dict(sorted(Counter(q["answer"] for q in out).items())))
json.dump(out, io.open("scratch-plan/tesla_qa_60.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
for q in out[::12]:
    print(f"\n[{q['set']}{q['num']}] {q['stem'][:110]}")
    for k, v in q["options"].items(): print(f"    {k}. {v[:100]}{'   <== ANSWER' if k == q['answer'] else ''}")
