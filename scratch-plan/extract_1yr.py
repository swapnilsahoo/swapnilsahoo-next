"""Extract the 1-Year (PGPM) quiz format: '1.' stems, 'a)' options,
inline 'Answer: b) ...' and 'Explanation: ...'. Faithful extraction only."""
import os, re, json, docx

BASE = r"C:/Users/swapn/OneDrive - greatlakes.edu.in/Prof.Swapnil Sahoo/Strategy/Strategy Sessions/1 Year Course/PGPM"
Q_RE   = re.compile(r"^(\d{1,2})[\.\)]\s+(.{15,})$")
OPT_RE = re.compile(r"^([a-dA-D])[\)\.]\s+(.+)$")
ANS_RE = re.compile(r"^Answer\s*[:\-]\s*\(?([a-dA-D])\)?", re.I)
EXP_RE = re.compile(r"^Explanation\s*[:\-]\s*(.*)$", re.I)

def parse(path):
    ps=[p.text.strip() for p in docx.Document(path).paragraphs if p.text.strip()]
    out=[]; q=None; mode=None
    def flush():
        nonlocal q
        if q and len(q["options"])==4 and q.get("answer"): out.append(q)
        q=None
    for line in ps:
        m=Q_RE.match(line)
        if m and not OPT_RE.match(line):
            flush(); q={"n":int(m.group(1)),"stem":m.group(2).strip(),"options":{},
                        "answer":None,"explanation":""}; mode="q"; continue
        if q is None: continue
        m=ANS_RE.match(line)
        if m: q["answer"]=m.group(1).upper(); mode="ans"; continue
        m=EXP_RE.match(line)
        if m: q["explanation"]=m.group(1).strip(); mode="exp"; continue
        m=OPT_RE.match(line)
        if m and mode=="q" and len(q["options"])<4:
            q["options"][m.group(1).upper()]=m.group(2).strip(); continue
        if mode=="exp" and q["explanation"]: q["explanation"]+=" "+line
    flush()
    return out

if __name__=="__main__":
    res={}
    for dp,dn,fs in os.walk(BASE):
        dn[:]=[x for x in dn if x.upper() not in ("TRASH","NEW FOLDER")]
        folder=os.path.relpath(dp,BASE).split(os.sep)[0]
        m=re.match(r"Session\s*(\d+)",folder,re.I)
        if not m: continue
        sid="1yr-%02d"%int(m.group(1))
        for f in fs:
            if not f.lower().endswith(".docx"): continue
            if not any(k in f.lower() for k in ("quiz","q&a","question")): continue
            if "script" in f.lower(): continue
            try: qs=parse(os.path.join(dp,f))
            except Exception as e: print("ERR",f,e); continue
            if qs:
                res.setdefault(sid,[]).extend([dict(x, src=f) for x in qs])
                print("%-8s %-58s q=%d" % (sid,f[:58],len(qs)))
    json.dump(res,open("scratch-plan/quiz-1yr.json","w",encoding="utf-8"),indent=1,ensure_ascii=False)
    print("\n1-Year: %d sessions, %d questions"%(len(res),sum(len(v) for v in res.values())))
