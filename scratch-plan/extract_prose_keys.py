"""Parser for self-contained instructor keys held as paragraphs.

Shape:  SET A / Caselet A - title + narrative / Qn. stem / A-D options /
        Correct Answer: X / Explanation: ... / Distractor Misconceptions: ...
Everything is a faithful extraction; anything unparseable is skipped, never guessed.
"""
import os, re, json, docx

SET_RE  = re.compile(r"^SET\s+([A-D])\b", re.I)
CASE_RE = re.compile(r"^Caselet\s+([A-D])\s*[—\-–]\s*(.+)$", re.I)
Q_RE    = re.compile(r"^Q(\d+)[\.\)]\s*(.*)$")
Q2_RE   = re.compile(r"^([A-D])(\d{1,2})[\.\)]\s+(.+)$")
OPT_RE  = re.compile(r"^([A-D])[\.\)]\s+(.*)$")
ANS_RE  = re.compile(r"^Correct\s+answer:\s*([A-D])(?:\s*\|\s*(LO[\w\-\.]+))?", re.I)
EXP_RE  = re.compile(r"^Explanation:\s*(.*)$", re.I)
MIS_RE  = re.compile(r"^([A-D]):\s*(.*)$")

def parse(path):
    ps = [p.text.strip() for p in docx.Document(path).paragraphs if p.text.strip()]
    out, cur_set, caselets, q, mode = [], None, {}, None, None

    def flush():
        nonlocal q
        if q and len(q["options"]) == 4 and q.get("answer"):
            out.append(q)
        q = None

    for line in ps:
        m = SET_RE.match(line)
        if m and len(line) < 24:
            flush(); cur_set = m.group(1).upper(); mode = None; continue
        m = CASE_RE.match(line)
        if m:
            flush()
            caselets[m.group(1).upper()] = {"title": m.group(2).strip(), "body": ""}
            mode = "caselet"; continue
        m = Q_RE.match(line)
        if m:
            flush()
            q = {"set": cur_set, "n": int(m.group(1)), "stem": m.group(2).strip(),
                 "options": {}, "answer": None, "explanation": "", "misconceptions": {}}
            mode = "q"; continue
        m2 = Q2_RE.match(line)
        if m2 and len(line) > 24 and (cur_set is None or m2.group(1) == cur_set):
            flush()
            q = {"set": m2.group(1), "n": int(m2.group(2)), "stem": m2.group(3).strip(),
                 "options": {}, "answer": None, "explanation": "", "misconceptions": {}}
            mode = "q"; continue
        if q is not None:
            m = ANS_RE.match(line)
            if m:
                q["answer"] = m.group(1).upper()
                if m.lastindex and m.lastindex >= 2 and m.group(2): q["lo"] = m.group(2)
                mode = "ans"; continue
            m = EXP_RE.match(line)
            if m: q["explanation"] = m.group(1).strip(); mode = "exp"; continue
            if line.lower().startswith("distractor misconception"): mode = "mis"; continue
            m = OPT_RE.match(line)
            if m:
                if mode in ("q",) and len(q["options"]) < 4:
                    q["options"][m.group(1)] = m.group(2).strip(); continue
                if mode == "mis":
                    q["misconceptions"][m.group(1)] = m.group(2).strip(); continue
            if mode == "exp" and q["explanation"]:
                q["explanation"] += " " + line; continue
        elif mode == "caselet" and cur_set is None and caselets:
            k = list(caselets)[-1]
            caselets[k]["body"] = (caselets[k]["body"] + " " + line).strip()
        elif mode == "caselet" and caselets:
            k = list(caselets)[-1]
            caselets[k]["body"] = (caselets[k]["body"] + " " + line).strip()
    flush()
    return out, caselets

if __name__ == "__main__":
    import sys
    BASE = r"C:/Users/swapn/OneDrive - greatlakes.edu.in/Prof.Swapnil Sahoo/Strategy/Strategy Sessions"
    targets = []
    for course, sub in (("2yr","2 Year Course"), ("1yr","1 Year Course/PGPM")):
        root = os.path.join(BASE, sub)
        for dp, dn, fs in os.walk(root):
            dn[:] = [x for x in dn if x.upper() != "TRASH"]
            for f in fs:
                if f.lower().endswith(".docx") and "key" in f.lower():
                    folder = os.path.relpath(os.path.join(dp,f), root).split(os.sep)[0]
                    m = re.match(r"Session\s*(\d+)", folder, re.I)
                    if m: targets.append(("%s-%02d"%(course,int(m.group(1))), os.path.join(dp,f)))
    allq, allc = {}, {}
    for sid, path in sorted(targets):
        try: qs, cs = parse(path)
        except Exception as e:
            print("ERR", sid, os.path.basename(path), e); continue
        if qs:
            allq.setdefault(sid, []).extend(qs)
            if cs: allc.setdefault(sid, {}).update(cs)
            print("%-8s %-54s q=%-4d caselets=%d" % (sid, os.path.basename(path)[:54], len(qs), len(cs)))
    json.dump(allq, open("scratch-plan/quiz-prose.json","w",encoding="utf-8"), indent=1, ensure_ascii=False)
    json.dump(allc, open("scratch-plan/caselets.json","w",encoding="utf-8"), indent=1, ensure_ascii=False)
    print("\nsessions=%d questions=%d caselet-sets=%d" % (len(allq), sum(len(v) for v in allq.values()), sum(len(v) for v in allc.values())))
