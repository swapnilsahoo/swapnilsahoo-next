"""Faithful extraction of the quiz documents no earlier extractor could read.

Layouts handled
  P1  Session 1 'Q&A' docs      '1. stem' / 'a) opt' + numbered key 'N. Answer: x)' + 'Explanation:'
  P2  2yr-03 section docs        'Q1. Case Let: title' / case / question / 'A. opt' / 'Correct Answer: X' / 'Robust Explanation:'
      2yr-03 grand quiz          'Question 1.1: title' / 'Case Let: ...' / ... same answer lines
  P3  2yr-07                     'Q1. stem\nA. ..\nB. ..' paragraph + 'Answer: X.\nWhy: ...' paragraph
  P4  2yr-08                     'A1. stem\nA. ..\nD. ..\nCorrect: X' in one paragraph
  P5  2yr-04                     'N. stem A. .. B. .. C. .. D. ..' + compact key 'Set 1 ... C | 2. B | ...'
  P6  1yr-09                     'N. stem' / 'A. opt' + key lines 'X (short explanation)' per section

Nothing is authored. A detached key is joined only where it can be checked; a
question whose answer cannot be established is dropped and reported.
"""
import io, os, re, json
from collections import Counter
import docx

B = r"C:/Users/swapn/OneDrive - greatlakes.edu.in/Prof.Swapnil Sahoo/Strategy/Strategy Sessions/"
OUT = "scratch-plan/newquiz"
os.makedirs(OUT, exist_ok=True)

def paras(path):
    return [p.text for p in docx.Document(B + path).paragraphs if p.text.strip()]

def clean(s):
    s = s.replace("**", "").replace("\u00a0", " ")
    return re.sub(r"\s+", " ", s).strip()

def Q(set_, stem, opts, ans, expl="", lo=None):
    return {"set": set_, "stem": clean(stem), "options": {k: clean(v) for k, v in opts.items()},
            "answer": ans, "explanation": clean(expl), "lo": lo}

# ---------------------------------------------------------------- P1 Session 1
def p1(path, set_):
    L = [clean(x) for x in paras(path)]
    k = next(i for i, x in enumerate(L) if x.lower().startswith("answer key"))
    qs, cur = [], None
    for x in L[:k]:
        m = re.match(r"^(\d{1,2})[\.\)]\s+(.+)$", x)
        if m and not re.match(r"^[a-d]\)", x):
            cur = {"n": int(m.group(1)), "stem": m.group(2), "opts": {}}; qs.append(cur); continue
        m = re.match(r"^([a-d])\)\s+(.+)$", x)
        if m and cur:
            cur["opts"][m.group(1).upper()] = m.group(2)
    key, last = {}, None
    for x in L[k + 1:]:
        m = re.match(r"^(\d{1,2})\.\s*Answer\s*:\s*([a-d])\)", x, re.I)
        if m:
            last = int(m.group(1)); key[last] = [m.group(2).upper(), ""]; continue
        m = re.match(r"^Explanation\s*:\s*(.*)$", x, re.I)
        if m and last:
            key[last][1] = m.group(1)
    return [Q(set_, q["stem"], q["opts"], key[q["n"]][0], key[q["n"]][1], "Porter vs Mintzberg")
            for q in qs if q["n"] in key and len(q["opts"]) == 4]

# ---------------------------------------------------------------- P2 2yr-03
def p2(path, set_, lo):
    L = [clean(x) for x in paras(path)]
    out, cur = [], None
    for x in L:
        m = re.match(r"^(?:Q\d+\.|Question\s+\d+(?:\.\d+)?:)\s*(?:Case Let:\s*)?(.*)$", x)
        if m:
            cur = {"title": m.group(1), "text": [], "opts": {}, "ans": None, "exp": ""}; out.append(cur); continue
        if cur is None:
            continue
        m = re.match(r"^([A-D])\.\s+(.+)$", x)
        if m and cur["ans"] is None:
            cur["opts"][m.group(1)] = m.group(2); continue
        m = re.match(r"^Correct Answer\s*:\s*([A-D])", x)
        if m:
            cur["ans"] = m.group(1); continue
        m = re.match(r"^Robust Explanation\s*:\s*(.*)$", x)
        if m:
            cur["exp"] = m.group(1); continue
        if not cur["opts"]:
            cur["text"].append(re.sub(r"^Case Let:\s*", "", x))
    res = []
    for c in out:
        if len(c["opts"]) == 4 and c["ans"]:
            stem = " ".join(c["text"]) if c["text"] else c["title"]
            res.append(Q(set_, stem, c["opts"], c["ans"], c["exp"], lo if lo else c["title"]))
    return res

# ---------------------------------------------------------------- P3 2yr-07
def p3(path):
    raw = paras(path)
    out, set_, case = [], None, None
    for i, x in enumerate(raw):
        m = re.match(r"^SET\s+([A-D])\s*\(([^)]+)\)", x.strip())
        if m:
            set_, case = m.group(1), m.group(2).strip(); continue
        m = re.match(r"^Q\d+\.\s*(.+)", x.strip(), re.S)
        if m:
            body = m.group(1)
            parts = re.split(r"\n\s*([A-D])\.\s*", "\n" + body) if False else re.split(r"\n\s*([A-D])\.\s+", body)
            stem, opts = parts[0], {}
            for j in range(1, len(parts) - 1, 2):
                opts[parts[j]] = parts[j + 1]
            ans, why = None, ""
            for y in raw[i + 1:i + 4]:
                mm = re.match(r"^\s*Answer\s*:\s*([A-D])\.?(?:\s*Why\s*:\s*(.*))?", y, re.S)
                if mm:
                    ans, why = mm.group(1), (mm.group(2) or ""); break
                if re.match(r"^Q\d+\.", y.strip()):
                    break
            if ans and len(opts) == 4:
                out.append(Q(set_, stem, opts, ans, why, case))
    return out

# ---------------------------------------------------------------- P4 2yr-08
def p4(path):
    out = []
    for x in paras(path):
        m = re.match(r"^\s*([A-D])(\d{1,2})\.\s*(.+)$", x, re.S)
        if not m:
            continue
        set_, body = m.group(1), m.group(3)
        ans = re.search(r"Correct\s*:\s*([A-D])", body)
        body = re.sub(r"\n?\s*Correct\s*:\s*[A-D].*$", "", body, flags=re.S)
        parts = re.split(r"\n\s*([A-D])\.\s+", body)
        stem, opts = parts[0], {}
        for j in range(1, len(parts) - 1, 2):
            opts[parts[j]] = parts[j + 1]
        if ans and len(opts) == 4:
            out.append(Q(set_, stem, opts, ans.group(1), "", "Industry structure & firm strategy"))
    return out

# ---------------------------------------------------------------- P5 2yr-04
def p5(path):
    L = [clean(x) for x in paras(path)]
    kstart = next(i for i, x in enumerate(L) if re.match(r"^Set 1 \(Section", x))
    qs, set_ = [], None
    for x in L[:kstart]:
        m = re.match(r"^Set\s+(\d)\s*:", x)
        if m:
            set_ = m.group(1); continue
        m = re.match(r"^(\d{1,2})\.\s+(.+)$", x)
        if m:
            body = m.group(2)
            pos = [(mm.start(), mm.group(1)) for mm in re.finditer(r"(?:^|\s)([A-D])\.\s", body)]
            seq = [p for p in pos if p[1] in "ABCD"]
            # take the first A, then the first B after it, etc.
            picks, want, last = [], "ABCD", -1
            for letter in want:
                cand = next((p for p in seq if p[1] == letter and p[0] > last), None)
                if cand is None: break
                picks.append(cand); last = cand[0]
            if len(picks) == 4:
                stem = body[:picks[0][0]].strip()
                opts = {}
                for j, (p0, letter) in enumerate(picks):
                    end = picks[j + 1][0] if j + 1 < 4 else len(body)
                    opts[letter] = body[p0:end].strip()[2:].strip()
                qs.append({"set": set_, "n": int(m.group(1)), "stem": stem, "opts": opts})
    key, cur = {}, None
    for x in L[kstart:]:
        m = re.match(r"^Set\s+(\d)", x)
        if m:
            cur = m.group(1); key[cur] = []; continue
        if cur:
            toks = [t.strip() for t in x.split("|")]
            for t in toks:
                mm = re.match(r"^(?:\d{1,2}\.\s*)?([A-D])$", t)
                if mm: key[cur].append(mm.group(1))
    out = []
    for q in qs:
        letters = key.get(q["set"], [])
        if 1 <= q["n"] <= len(letters):
            out.append(Q(q["set"], q["stem"], q["opts"], letters[q["n"] - 1], "",
                         "Strategy development process" if q["set"] == "1" else "Strategy implementation"))
    return out, {s: len(v) for s, v in key.items()}, len(qs)

# ---------------------------------------------------------------- P6 1yr-09
def p6(path):
    L = [clean(x) for x in paras(path)]
    kstart = next(i for i, x in enumerate(L) if x.upper() == "ANSWER KEY")
    qs, sec, cur = [], None, None
    for x in L[:kstart]:
        m = re.match(r"^SECTION\s+([AB])\b", x)
        if m:
            sec = m.group(1); continue
        m = re.match(r"^(\d{1,2})\.\s+(.+)$", x)
        if m:
            cur = {"sec": sec, "n": int(m.group(1)), "stem": m.group(2), "opts": {}}; qs.append(cur); continue
        m = re.match(r"^([A-D])\.\s+(.+)$", x)
        if m and cur:
            cur["opts"][m.group(1)] = m.group(2)
    key, sec = {"A": [], "B": []}, None
    for x in L[kstart + 1:]:
        m = re.match(r"^SECTION\s+([AB])\b", x)
        if m:
            sec = m.group(1); continue
        m = re.match(r"^\**\s*([A-D])\s*(?:\((.*)\))?\s*$", x)
        if m and sec:
            key[sec].append((m.group(1), m.group(2) or ""))
    return qs, key

# ================================================================ run
results = {}
S1 = "1 Year Course/PGPM/Session 1_What is Strategy/Quiz/"
results["1yr-01"] = sum((p1(S1 + f"Session1_Section {s} Q&A.docx", s) for s in "ABCD"), [])

S3 = "2 Year Course/Session 3_Chief Strategy Ofiicer/Quiz/"
q3 = (p2(S3 + "Section_A_Fundamentals.docx", "A", "Fundamentals of strategy")
      + p2(S3 + "Section_B_Stakeholders_CSR.docx", "B", "Stakeholders & CSR")
      + p2(S3 + "Section_C_AFI_Framework.docx", "C", "The AFI framework")
      + p2(S3 + "Section_D_Grand_Master_Synthesis.docx", "D", "Grand master synthesis")
      + p2(S3 + "Strategic_Management_Assessment_Bank.md.docx", "C", "The AFI framework")
      + p2(S3 + "Strategic_Management_Grand_Quiz.docx", None, None))
results["2yr-03"] = q3

results["2yr-07"] = p3("2 Year Course/Session 7_ Managing Strategic Leadership and StrategyProcess/Quiz for Session 7.docx")
results["2yr-08"] = p4("2 Year Course/Session 8_Industry Structure and Firm Strategy/Session 8_Industry Structure and Firm Strategy_MCQ - 25 Quiz Questions.docx")
q4, k4, n4 = p5("2 Year Course/Session 4_Purpose_Values_Strategy_Tesla/Quiz Questions.docx")
results["2yr-04"] = q4
qs9, key9 = p6("1 Year Course/PGPM/Session 9 _Corporate Strategy_Strategic Alliances_Mergers_Acquisitions/Session 9_QUIZ_ Set A & B .docx")

print(f"2yr-04: {n4} questions parsed, key lengths {k4}")
print(f"1yr-09: {len(qs9)} questions parsed ({Counter(q['sec'] for q in qs9)}), key entries A={len(key9['A'])} B={len(key9['B'])}")
json.dump({"qs": qs9, "key": key9}, io.open(f"{OUT}/1yr-09-raw.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)

for sid, qs in results.items():
    # de-duplicate on full stem + options (the assessment bank repeats section C)
    seen, uniq = set(), []
    for q in qs:
        s = (q["stem"].lower(), tuple(sorted(q["options"].values())))
        if s in seen: continue
        seen.add(s); uniq.append(q)
    results[sid] = uniq
    bad = [q for q in uniq if q["answer"] not in "ABCD" or len(q["options"]) != 4]
    print(f"{sid}: {len(qs)} parsed, {len(uniq)} after de-dup, {sum(1 for q in uniq if q['explanation'])} explained, "
          f"answers {dict(sorted(Counter(q['answer'] for q in uniq).items()))}, malformed {len(bad)}")
    json.dump(uniq, io.open(f"{OUT}/{sid}.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
