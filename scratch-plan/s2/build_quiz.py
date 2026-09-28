"""Clean the v9 quiz and rotate options deterministically so the answer is not
almost always option B. The rotation moves the option text, never the mapping,
and the script asserts the correct text survives."""
import io, re, json, hashlib
from collections import Counter

s = io.open("scratch-plan/s2/v9_quiz.js", encoding="utf-8", errors="replace").read()
OPT = re.compile(r'"((?:[^"\\]|\\.)*)"')
items = re.findall(r'\{\s*q:\s*"(.*?)",\s*o:\s*\[(.*?)\],\s*a:\s*(\d+),\s*e:\s*"(.*?)"\s*\}',
                   s, flags=re.S)

def clean(x):
    x = x.replace("\ufffd", "\u2014")        # the source's mojibake was an em dash
    x = re.sub(r"\*\*(.+?)\*\*", r"\1", x)   # markdown bold -> plain text
    x = re.sub(r"\*(.+?)\*", r"\1", x)
    x = x.replace("\\'", "'").replace('\\"', '"')
    return re.sub(r"\s+", " ", x).strip()

out = []
for q, o, a, e in items:
    opts = [clean(t) for t in OPT.findall(o)]
    a = int(a)
    assert 0 <= a < len(opts), (q[:40], a, len(opts))
    correct = opts[a]
    # place the answer at a target slot that cycles A,B,C,D so the distribution is flat
    target = len(out) % len(opts)
    k = (a - target) % len(opts)
    rot = opts[k:] + opts[:k]
    assert rot.index(correct) == target
    out.append({"q": clean(q), "o": rot, "a": rot.index(correct), "e": clean(e)})

print("questions:", len(out))
print("answer index before:", sorted(Counter(int(a) for _, _, a, _ in items).items()))
print("answer index after :", sorted(Counter(x["a"] for x in out).items()))
print("options per question:", sorted(Counter(len(x["o"]) for x in out).items()))

bad = []
for x, src in zip(out, items):
    want = clean(OPT.findall(src[1])[int(src[2])])
    if x["o"][x["a"]] != want:
        bad.append(x["q"][:50])
print("correct answer preserved:", "yes, all" if not bad else bad)
assert not bad

io.open("scratch-plan/s2/quiz.json", "w", encoding="utf-8").write(
    json.dumps(out, ensure_ascii=False, indent=1))
print("\nsample:", json.dumps(out[0], ensure_ascii=False)[:240])
