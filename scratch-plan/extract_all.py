"""Unified MCQ extractor for the Strategy session .docx corpus.

The professor's quiz files use several layouts. Rather than maintain a parser
per layout, this detects the question-line grammar per file and runs one state
machine, then joins a detached answer key if the file keeps one.

Question-line grammars seen:
  "1."  stem            "Q1."  stem            "A1."  stem
  "Question 1:" title, with the real stem on the following line
  "1. Context: title",  with the real stem on the following line

Answer placement seen:
  inline   - "Answer: b)" / "Correct answer: A | LO10-4" directly under the options
  detached - an "ANSWER KEY & EXPLANATIONS" block of N ordered lines, each
             beginning with the correct option letter

Everything here is a faithful extraction. A question missing its stem, its four
options or its answer is DROPPED, never guessed - a wrong answer key is worse
than a missing one.
"""
from __future__ import annotations

import os
import re
import json
import docx

BASE = r"C:/Users/swapn/OneDrive - greatlakes.edu.in/Prof.Swapnil Sahoo/Strategy/Strategy Sessions"

Q_PATTERNS = [
    ("F3", re.compile(r"^([A-D])(\d{1,2})[\.\)]\s+(.{12,})$")),
    ("F2", re.compile(r"^Q\s?(\d{1,3})[\.\)]\s*(.{12,})$", re.I)),
    ("F4", re.compile(r"^Question\s+(\d{1,3})\s*[:\.\-]\s*(.*)$", re.I)),
    ("F1", re.compile(r"^(\d{1,3})[\.\)]\s+(.{8,})$")),
]
OPT_RE = re.compile(r"^\(?([a-dA-D])[\)\.]\s+(.+)$")
ANS_RE = re.compile(r"^(?:Correct\s+)?Answer\s*[:\-]?\s*\(?([a-dA-D])\)?(?![\w])", re.I)
EXP_RE = re.compile(r"^(?:Explanation|Rationale|Why)\s*[:\-]\s*(.*)$", re.I)
SET_RE = re.compile(r"^(?:SET|Section|Set)\s+([A-D])\b", re.I)
LO_RE = re.compile(r"\b(LO[\w\-.]*\d)\b")
KEYHEAD_RE = re.compile(r"answer\s*key", re.I)
KEYLINE_RE = re.compile(r"^\(?([A-D])\)?\s*[\(\:\-\.]", re.I)


def paragraphs(path: str) -> list[str]:
    return [p.text.strip() for p in docx.Document(path).paragraphs if p.text.strip()]


def detached_key(lines: list[str]) -> list[tuple[str, str]]:
    """Ordered (letter, gloss) pairs from an 'ANSWER KEY' block, if present."""
    start = next((i for i, ln in enumerate(lines) if KEYHEAD_RE.search(ln) and len(ln) < 70), None)
    if start is None:
        return []
    found = []
    for ln in lines[start + 1:]:
        if KEYHEAD_RE.search(ln) and len(ln) < 70:
            continue
        m = KEYLINE_RE.match(ln)
        if m:
            found.append((m.group(1).upper(), ln))
        elif found and re.match(r"^(SET\b|To create)", ln, re.I):
            break
    return found


def parse(path: str):
    lines = paragraphs(path)
    if not lines:
        return []

    best_key, best_re, best_hits = None, None, 0
    for key, rx in Q_PATTERNS:
        hits = sum(1 for ln in lines if rx.match(ln) and not OPT_RE.match(ln))
        if hits > best_hits:
            best_key, best_re, best_hits = key, rx, hits
    if not best_re or best_hits < 3:
        return []

    out: list[dict] = []
    cur_set = None
    q = None

    def flush():
        nonlocal q
        if not q:
            return
        q["stem"] = re.sub(r"\s+", " ", " ".join(q["stemParts"])).strip()
        del q["stemParts"]
        if len(q["options"]) == 4 and q["stem"] and q["answer"] and q["answer"] in q["options"]:
            out.append(q)
        q = None

    for line in lines:
        if KEYHEAD_RE.search(line) and len(line) < 70:
            flush()
            break  # questions end where the key begins

        m = SET_RE.match(line)
        if m and len(line) < 30:
            flush()
            cur_set = m.group(1).upper()
            continue

        m = best_re.match(line)
        if m and not OPT_RE.match(line):
            flush()
            if best_key == "F3":
                qset, qn, head = m.group(1), int(m.group(2)), m.group(3)
            else:
                qset, qn, head = cur_set, int(m.group(1)), m.group(2)
            q = {"set": qset, "n": qn, "stemParts": [head.strip()] if head.strip() else [],
                 "options": {}, "answer": None, "explanation": "", "lo": None}
            continue

        if q is None:
            continue

        m = ANS_RE.match(line)
        if m:
            q["answer"] = m.group(1).upper()
            lo = LO_RE.search(line)
            if lo:
                q["lo"] = lo.group(1)
            continue

        m = EXP_RE.match(line)
        if m:
            q["explanation"] = m.group(1).strip()
            continue

        m = OPT_RE.match(line)
        if m and len(q["options"]) < 4 and q["answer"] is None:
            q["options"][m.group(1).upper()] = m.group(2).strip()
            continue

        if q["answer"] is not None and q["explanation"]:
            q["explanation"] += " " + line
        elif not q["options"]:
            q["stemParts"].append(line)          # title line, real stem follows

    flush()

    # Join a detached key positionally, but only when the counts line up exactly.
    if out and not any(x["answer"] for x in out):
        key = detached_key(lines)
        if len(key) == len(out):
            for item, (letter, gloss) in zip(out, key):
                item["answer"] = letter
                item["explanation"] = item["explanation"] or gloss
            out = [x for x in out if x["answer"] in x["options"]]
        else:
            out = []
    return out


def parse_with_detached(path: str):
    """Run the state machine; if answers were detached, re-run keeping unanswered."""
    lines = paragraphs(path)
    if not lines:
        return []
    direct = parse(path)
    if direct:
        return direct

    # second attempt: collect questions ignoring the missing answer, then join key
    saved_flush_ok = []
    best_key, best_re, best_hits = None, None, 0
    for key, rx in Q_PATTERNS:
        hits = sum(1 for ln in lines if rx.match(ln) and not OPT_RE.match(ln))
        if hits > best_hits:
            best_key, best_re, best_hits = key, rx, hits
    if not best_re or best_hits < 3:
        return []

    q = None
    cur_set = None
    for line in lines:
        if KEYHEAD_RE.search(line) and len(line) < 70:
            break
        m = SET_RE.match(line)
        if m and len(line) < 30:
            cur_set = m.group(1).upper()
        m = best_re.match(line)
        if m and not OPT_RE.match(line):
            if q and len(q["options"]) == 4:
                q["stem"] = re.sub(r"\s+", " ", " ".join(q["stemParts"])).strip()
                del q["stemParts"]
                saved_flush_ok.append(q)
            head = m.group(3) if best_key == "F3" else m.group(2)
            q = {"set": cur_set, "n": int(m.group(2) if best_key == "F3" else m.group(1)),
                 "stemParts": [head.strip()] if head.strip() else [],
                 "options": {}, "answer": None, "explanation": "", "lo": None}
            continue
        if q is None:
            continue
        m = OPT_RE.match(line)
        if m and len(q["options"]) < 4:
            q["options"][m.group(1).upper()] = m.group(2).strip()
            continue
        if not q["options"]:
            q["stemParts"].append(line)
    if q and len(q["options"]) == 4:
        q["stem"] = re.sub(r"\s+", " ", " ".join(q["stemParts"])).strip()
        del q["stemParts"]
        saved_flush_ok.append(q)

    key = detached_key(lines)
    if saved_flush_ok and len(key) == len(saved_flush_ok):
        for item, (letter, gloss) in zip(saved_flush_ok, key):
            item["answer"] = letter
            item["explanation"] = gloss
        return [x for x in saved_flush_ok if x["answer"] in x["options"]]
    return []


def session_id(root: str, path: str, course: str):
    folder = os.path.relpath(path, root).split(os.sep)[0]
    m = re.match(r"Session\s*(\d+)", folder, re.I)
    return f"{course}-{int(m.group(1)):02d}" if m else None


def main() -> None:
    found: dict[str, list[dict]] = {}
    per_file = []
    for course, sub in (("2yr", "2 Year Course"), ("1yr", "1 Year Course/PGPM")):
        root = os.path.join(BASE, sub)
        if not os.path.isdir(root):
            continue
        for dirpath, dirnames, files in os.walk(root):
            dirnames[:] = [d for d in dirnames if d.upper() != "TRASH"]
            for name in files:
                if not name.lower().endswith(".docx") or name.startswith("~$"):
                    continue
                if not any(k in name.lower() for k in ("quiz", "mcq", "q&a", "question", "exam")):
                    continue
                if "script" in name.lower():
                    continue
                path = os.path.join(dirpath, name)
                sid = session_id(root, path, course)
                if not sid:
                    continue
                try:
                    qs = parse_with_detached(path)
                except Exception as exc:
                    per_file.append((sid, name, "ERR " + str(exc)[:38]))
                    continue
                per_file.append((sid, name, len(qs)))
                if qs:
                    found.setdefault(sid, []).extend(qs)

    for sid, name, n in sorted(per_file, key=lambda r: (r[0], str(r[2]))):
        print("%-8s %-58s %s" % (sid, name[:58], n))
    json.dump(found, open("scratch-plan/quiz-multi.json", "w", encoding="utf-8"),
              indent=1, ensure_ascii=False)
    print("\nsessions=%d  raw questions=%d" % (len(found), sum(len(v) for v in found.values())))


if __name__ == "__main__":
    main()
