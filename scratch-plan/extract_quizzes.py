"""Extract MCQ banks from the professor's own .docx files.

Student docs carry question + option text as paragraphs; instructor keys carry
Q / LO / Ans / Explanation as tables. We join them on (set, question number).
Nothing here is authored - it is a faithful extraction, or it is skipped.
"""
import os, re, json, sys
import docx

BASE = r"C:/Users/swapn/OneDrive - greatlakes.edu.in/Prof.Swapnil Sahoo/Strategy/Strategy Sessions"
OPT = re.compile(r"^([A-D])[\.\)]\s+(.*)$")
SET = re.compile(r"^Set\s+([A-D])\b", re.I)

def paras(path):
    return [p.text.strip() for p in docx.Document(path).paragraphs if p.text.strip()]

def parse_student(path):
    """-> {set letter: [ {n, stem, options{A..D}} ]}"""
    out, cur_set, pending, buf = {}, None, None, []
    for line in paras(path):
        m = SET.match(line)
        if m and len(line) < 24:
            cur_set = m.group(1).upper(); out.setdefault(cur_set, []); pending = None; continue
        if cur_set is None: continue
        om = OPT.match(line)
        if om:
            if pending is None: continue
            pending["options"][om.group(1)] = om.group(2).strip()
            if len(pending["options"]) == 4:
                out[cur_set].append(pending); pending = None
            continue
        # a non-option line starts a new question stem
        if pending is not None and len(pending["options"]) == 0:
            pending["stem"] = line          # previous line was an LO blurb, replace
        else:
            pending = {"n": len(out[cur_set]) + 1, "stem": line, "options": {}}
    return out

def parse_key(path):
    """-> {set letter: {qnum: {ans, lo, explanation}}}

    Header-driven: the source files use both 'Q|LO|Ans|Explanation' and
    'Q|Answer|Explanation'. Positional parsing silently mis-reads the 3-column
    form, taking the answer from the first letter of the explanation, so columns
    are located by name and a table whose header cannot be understood is skipped.
    """
    d = docx.Document(path)
    out = {}
    letters = "ABCD"
    ti = -1
    for t in d.tables:
        if not t.rows:
            continue
        head = [c.text.strip().lower() for c in t.rows[0].cells]
        def col(*names):
            for i, h in enumerate(head):
                if any(h == n or h.startswith(n) or n in h for n in names):
                    return i
            return None
        qi = col("q", "question", "#")
        ai = col("ans", "answer", "correct")
        ei = col("explanation", "rationale", "why")
        li = col("lo", "learning")
        if qi is None or ai is None:
            continue                      # not an answer-key table (e.g. a caselet)
        ti += 1
        s_letter = letters[ti] if ti < 4 else str(ti)
        rows = {}
        for r in t.rows[1:]:
            c = [x.text.strip() for x in r.cells]
            if max(qi, ai) >= len(c) or not c[qi].isdigit():
                continue
            ansv = c[ai][:1].upper()
            if ansv not in "ABCD":
                continue                  # refuse anything that is not a real option letter
            rows[int(c[qi])] = {
                "lo": c[li] if li is not None and li < len(c) else None,
                "ans": ansv,
                "explanation": c[ei] if ei is not None and ei < len(c) else "",
            }
        if rows:
            out[s_letter] = rows
    return out

def find_pairs(root):
    """Locate (student, key) docx pairs per session folder."""
    pairs = []
    for dirpath, dirnames, files in os.walk(root):
        dirnames[:] = [x for x in dirnames if x.upper() != "TRASH"]
        stud = [f for f in files if f.lower().endswith(".docx") and "student" in f.lower()]
        keys = [f for f in files if f.lower().endswith(".docx") and ("instructorkey" in f.lower().replace(" ", "") or "key" in f.lower())]
        for s in stud:
            base = s.lower().replace("_student.docx", "")
            k = next((x for x in keys if x.lower().startswith(base[:24])), keys[0] if keys else None)
            pairs.append((os.path.join(dirpath, s), os.path.join(dirpath, k) if k else None))
    return pairs

if __name__ == "__main__":
    result = {}
    for course, sub in (("2yr", "2 Year Course"), ("1yr", "1 Year Course/PGPM")):
        root = os.path.join(BASE, sub)
        if not os.path.isdir(root): continue
        for spath, kpath in find_pairs(root):
            folder = os.path.relpath(spath, root).split(os.sep)[0]
            m = re.match(r"Session\s*(\d+)", folder, re.I)
            if not m: continue
            sid = "%s-%02d" % (course, int(m.group(1)))
            try:
                stu = parse_student(spath)
                key = parse_key(kpath) if kpath else {}
            except Exception as e:
                print("ERR", sid, e); continue
            merged = []
            for setl in sorted(stu):
                for q in stu[setl]:
                    k = key.get(setl, {}).get(q["n"], {})
                    if len(q["options"]) != 4: continue
                    merged.append({"set": setl, "n": q["n"], "stem": q["stem"],
                                   "options": q["options"], "answer": k.get("ans"),
                                   "lo": k.get("lo"), "explanation": k.get("explanation")})
            if merged:
                result.setdefault(sid, []).extend(merged)
                print("%-8s %-52s questions=%-4d answered=%d" %
                      (sid, os.path.basename(spath)[:52], len(merged),
                       sum(1 for x in merged if x["answer"])))
    json.dump(result, open("scratch-plan/quiz-bank.json", "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    tot = sum(len(v) for v in result.values())
    ans = sum(1 for v in result.values() for x in v if x["answer"])
    print("\nsessions with quizzes: %d   questions: %d   with answer key: %d" % (len(result), tot, ans))
