"""Try to recover the Tesla quiz key (Session 2, both courses — identical files).

The document's answer-key rows are out of order relative to its questions: many
rows' rationales describe a different question. If the rows are the right ones
merely shuffled, each question's own rationale is still somewhere in the table.

Method
 1. Parse the 30 questions and the 30 key rows (two table shapes).
 2. Score every (question, rationale) pair by IDF-weighted shared vocabulary,
    so distinctive terms ("SolarCity", "OTA", "seats", "SEC") carry the weight.
 3. Solve the one-to-one assignment that maximises total score (Hungarian).
 4. Accept a recovered pair only if BOTH hold:
      - it is decisive: the pair beats the question's next-best rationale and
        the rationale's next-best question by a clear margin; and
      - it is self-consistent: the option the row's letter points at is the
        option its rationale describes best.
 Anything else is rejected, never guessed.
"""
import io, re, math, json, sys
import docx

SRC = (r"C:/Users/swapn/OneDrive - greatlakes.edu.in/Prof.Swapnil Sahoo/Strategy/Strategy Sessions/"
       r"1 Year Course/PGPM/Session 2_Tesla Case Study/Quiz Questions Sec A & Sec B.docx")

def clean(s):
    s = re.sub(r"\$\\rightarrow\$", "→", s)
    s = re.sub(r"\$\\text\{([^}]*)\}\$", r"\1", s)
    s = re.sub(r"\\mathbf\{?([^}$]*)\}?", r"\1", s)
    s = re.sub(r"\\text\{([^}]*)\}", r"\1", s)
    s = s.replace("\\&", "&").replace("\\%", "%").replace("\\$", "$")
    s = re.sub(r"\$([^$]*)\$", r"\1", s)
    s = s.replace("$", "")
    return re.sub(r"\s+", " ", s).strip()

paras = [p.text.strip() for p in docx.Document(SRC).paragraphs if p.text.strip()]
full = "\n".join(paras)
qpart, kpart = full.split("Answer Key and Robust Rationale", 1)

# ---------------- questions ----------------
section = None
questions = []
cur = None
for ln in qpart.splitlines():
    m = re.match(r"^Section ([AB])\b", ln)
    if m:
        section = m.group(1); continue
    m = re.match(r"^Question (\d+):\s*(.*)$", ln)
    if m:
        cur = {"sec": section, "n": int(m.group(1)), "title": clean(m.group(2)), "stem": "", "opts": {}}
        questions.append(cur); continue
    m = re.match(r"^([A-D])\.\s*(.*)$", ln)
    if m and cur is not None:
        cur["opts"][m.group(1)] = clean(m.group(2)); continue
    if cur is not None and not cur["opts"] and not ln.startswith("("):
        cur["stem"] = (cur["stem"] + " " + clean(ln)).strip()

# ---------------- key rows (5-column and 4-column shapes) ----------------
rows = []
sec_guess = "A"
for ln in kpart.splitlines():
    c = [x.strip() for x in ln.strip().strip("|").split("|")]
    if len(c) >= 5 and c[0] in ("A", "B") and c[1].isdigit() and c[2] in "ABCD" and c[2]:
        sec_guess = c[0]
        rows.append({"sec": c[0], "n": int(c[1]), "letter": c[2], "principle": clean(c[3]), "rationale": clean(c[4])})
    elif len(c) >= 4 and c[0].isdigit() and c[1] in "ABCD" and c[1]:
        rows.append({"sec": "B", "n": int(c[0]), "letter": c[1], "principle": clean(c[2]), "rationale": clean(c[3])})

print(f"parsed {len(questions)} questions ({sum(1 for q in questions if len(q['opts'])==4)} with 4 options), {len(rows)} key rows")
assert len(questions) == 30 and len(rows) == 30

# ---------------- similarity ----------------
STOP = set("""the a an and or of to in on for with by from as at is are was were be been that this these those which
who its it their there than then so such not no into over under about across between while because if when
where how what why do does did can could should would may might must will also only more most less very much
many any each every other same both all some own firm firms company tesla tesla's strategic strategy""".split())
def toks(s):
    return [w for w in re.findall(r"[a-z][a-z\-]{2,}", s.lower()) if w not in STOP]

qtext = [q["title"] + " " + q["stem"] + " " + " ".join(q["opts"].values()) for q in questions]
rtext = [r["principle"] + " " + r["rationale"] for r in rows]
docs = [set(toks(t)) for t in qtext + rtext]
df = {}
for d in docs:
    for w in d:
        df[w] = df.get(w, 0) + 1
N = len(docs)
idf = {w: math.log(N / c) for w, c in df.items()}
def score(a, b):
    A, B = set(toks(a)), set(toks(b))
    return sum(idf.get(w, 0) for w in A & B)

S = [[score(qtext[i], rtext[j]) for j in range(30)] for i in range(30)]

# ---------------- Hungarian (maximise) ----------------
def hungarian_max(M):
    n = len(M); big = max(max(r) for r in M)
    C = [[big - M[i][j] for j in range(n)] for i in range(n)]
    u = [0.0] * (n + 1); v = [0.0] * (n + 1); p = [0] * (n + 1); way = [0] * (n + 1)
    for i in range(1, n + 1):
        p[0] = i; j0 = 0; minv = [float("inf")] * (n + 1); used = [False] * (n + 1)
        while True:
            used[j0] = True; i0 = p[j0]; delta = float("inf"); j1 = 0
            for j in range(1, n + 1):
                if not used[j]:
                    cur = C[i0 - 1][j - 1] - u[i0] - v[j]
                    if cur < minv[j]: minv[j] = cur; way[j] = j0
                    if minv[j] < delta: delta = minv[j]; j1 = j
            for j in range(n + 1):
                if used[j]: u[p[j]] += delta; v[j] -= delta
                else: minv[j] -= delta
            j0 = j1
            if p[j0] == 0: break
        while True:
            j1 = way[j0]; p[j0] = p[j1]; j0 = j1
            if j0 == 0: break
    ans = [0] * n
    for j in range(1, n + 1):
        ans[p[j] - 1] = j - 1
    return ans

assign = hungarian_max(S)

# ---------------- acceptance tests ----------------
results = []
for i, j in enumerate(assign):
    q, r = questions[i], rows[j]
    s = S[i][j]
    row_next = sorted((S[i][k] for k in range(30) if k != j), reverse=True)[0]
    col_next = sorted((S[k][j] for k in range(30) if k != i), reverse=True)[0]
    decisive = s >= 1.35 * max(row_next, col_next, 1e-9) and s >= 6.0
    opt_scores = {L: score(r["principle"] + " " + r["rationale"], t) for L, t in q["opts"].items()}
    best_opt = max(opt_scores, key=opt_scores.get)
    consistent = r["letter"] in q["opts"] and (best_opt == r["letter"] or
                 opt_scores[r["letter"]] >= 0.8 * opt_scores[best_opt])
    same_slot = (q["sec"], q["n"]) == (r["sec"], r["n"])
    results.append({"q": q, "row": r, "score": round(s, 1), "next": round(max(row_next, col_next), 1),
                    "decisive": decisive, "consistent": consistent, "same_slot": same_slot,
                    "opt_scores": {k: round(v, 1) for k, v in opt_scores.items()}})

acc = [x for x in results if x["decisive"] and x["consistent"]]
print(f"assignment: {sum(x['same_slot'] for x in results)} of 30 rows were already in the right slot")
print(f"accepted (decisive AND self-consistent): {len(acc)} of 30\n")
for x in results:
    q, r = x["q"], x["row"]
    tag = "ACCEPT" if (x["decisive"] and x["consistent"]) else ("reject-weak" if not x["decisive"] else "reject-inconsistent")
    print(f"{tag:<20} Q {q['sec']}{q['n']:<3} <- row {r['sec']}{r['n']:<3} (letter {r['letter']})  score {x['score']} vs next {x['next']}  opts {x['opt_scores']}")
    print(f"      Q: {q['title'][:60]} | {q['stem'][:90]}")
    print(f"      R: {r['principle'][:40]} | {r['rationale'][:110]}")

json.dump([{"sec": x["q"]["sec"], "n": x["q"]["n"], "title": x["q"]["title"], "stem": x["q"]["stem"],
            "opts": x["q"]["opts"], "letter": x["row"]["letter"], "principle": x["row"]["principle"],
            "rationale": x["row"]["rationale"], "accepted": x["decisive"] and x["consistent"],
            "score": x["score"], "next": x["next"], "row_slot": f"{x['row']['sec']}{x['row']['n']}",
            "own_letter": next(r["letter"] for r in rows if (r["sec"], r["n"]) == (x["q"]["sec"], x["q"]["n"])),
            "own_principle": next(r["principle"] for r in rows if (r["sec"], r["n"]) == (x["q"]["sec"], x["q"]["n"])),
            "own_rationale": next(r["rationale"] for r in rows if (r["sec"], r["n"]) == (x["q"]["sec"], x["q"]["n"]))}
           for x in results], io.open("scratch-plan/tesla_key_recovery.json", "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
