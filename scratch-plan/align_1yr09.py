"""1yr-09: 15 questions per section, but Section B's key has 14 entries (13 with a
short explanation, then a bare '**B'). Each explained entry names its content, so
try every position for the missing entry and keep the alignment whose
explanations best describe their questions. A question is published only if its
key entry has an explanation that actually matches it."""
import io, json, re, math

raw = json.load(io.open("scratch-plan/newquiz/1yr-09-raw.json", encoding="utf-8"))
qs, key = raw["qs"], raw["key"]
STOP = set("the a an and or of to in on for with by from as at is are be that this which its it their than not into".split())
def toks(s): return {w for w in re.findall(r"[a-z][a-z\-]{2,}", s.lower()) if w not in STOP}
def qtext(q): return q["stem"] + " " + " ".join(q["opts"].values())
def ov(entry, q):
    letter, why = entry
    if not why: return 0.0
    e = toks(why)
    whole = len(e & toks(qtext(q)))
    keyed = len(e & toks(q["opts"].get(letter, "")))
    return whole + 2 * keyed          # reward explanations that describe the keyed option

out, report = [], []
for sec in ("A", "B"):
    Q = [q for q in qs if q["sec"] == sec]
    K = key[sec]
    if len(K) == len(Q):
        pairs = list(zip(Q, K)); gap = None
    else:
        best = None
        for g in range(len(Q)):
            mapped = [q for i, q in enumerate(Q) if i != g]
            sc = sum(ov(k, q) for k, q in zip(K, mapped))
            if best is None or sc > best[0]: best = (sc, g, mapped)
        scores = sorted((sum(ov(k, q) for k, q in zip(K, [q for i, q in enumerate(Q) if i != g])), g) for g in range(len(Q)))
        runner = scores[-2][0]
        gap = best[1]
        pairs = list(zip(best[2], K))
        report.append(f"Section {sec}: {len(K)} key entries for {len(Q)} questions -> missing entry is question "
                      f"{Q[gap]['n']} (alignment score {best[0]:.0f} vs next-best {runner:.0f})")
    for q, (letter, why) in pairs:
        s = ov((letter, why), q)
        # A11 and A14 have explanations too terse to score ("51:49 split", "A++ is a JV");
        # both were read against their options and match the keyed answer exactly.
        verified = (bool(why) and s >= 2 and letter in q["opts"]) or f"{sec}{q['n']}" in ("A11", "A14")
        report.append(f"  {sec}{q['n']:<3} key {letter} {'VERIFIED' if verified else 'UNVERIFIED':<10} "
                      f"score {s:<4} | {why[:70]}")
        if verified:
            out.append({"set": sec, "stem": q["stem"], "options": q["opts"], "answer": letter,
                        "explanation": why, "lo": "Resource pathways" if sec == "A" else "Alliances & M&A"})
    if gap is not None:
        report.append(f"  {sec}{Q[gap]['n']:<3} NO KEY ENTRY — withheld")

print("\n".join(report))
print(f"\npublishable: {len(out)} of {len(qs)}")
json.dump(out, io.open("scratch-plan/newquiz/1yr-09.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
