"""Extractor for the 'master exam' layout with a detached answer key.

Shape:
    SET A: MASTER QUESTIONS
    1. Context: <a scenario title>
    <the actual question text>
    A. option ... D. option
    ...
    ANSWER KEY & EXPLANATIONS (SET A)
    A (Competitive Parity): If everyone is the same, no one wins.
    ...
    SET GENERATION KEYS
    SET B: [25, 23, 21, ...]        <- sets B-D are permutations of the master list

Only the master set is emitted. The permutations are deliberately ignored: they
reorder the same 25 questions, so importing them would be duplicate content with
a different number on it.

The key is joined positionally, and the join is refused unless the number of key
lines equals the number of questions - a silent off-by-one here would attach
every explanation to the wrong question.
"""
from __future__ import annotations

import os
import re
import json
import docx

BASE = r"C:/Users/swapn/OneDrive - greatlakes.edu.in/Prof.Swapnil Sahoo/Strategy/Strategy Sessions"

Q_RE = re.compile(r"^(\d{1,2})[\.\)]\s+(.{4,})$")
OPT_RE = re.compile(r"^(\*)?\(?([A-D])[\)\.]\s+(.+)$")
KEYHEAD_RE = re.compile(r"answer\s*key", re.I)
# Some key lines carry stray bold markers ("**B (...)"), so allow and ignore them.
KEYLINE_RE = re.compile(r"^\*{0,2}\(?([A-D])\)?\s*[\(\:\-]\s*(.*)$")
STOP_RE = re.compile(r"^(SET GENERATION|To create Sets)", re.I)


def parse(path: str):
    lines = [p.text.strip() for p in docx.Document(path).paragraphs if p.text.strip()]
    key_at = next((i for i, x in enumerate(lines) if KEYHEAD_RE.search(x) and len(x) < 80), None)
    if key_at is None:
        return []

    body, key_lines = lines[:key_at], lines[key_at:]

    questions = []
    q = None

    def flush():
        nonlocal q
        if q and len(q["options"]) == 4:
            q["stem"] = re.sub(r"\s+", " ", " ".join(q["parts"])).strip()
            del q["parts"]
            if q["stem"]:
                questions.append(q)
        q = None

    for line in body:
        m = Q_RE.match(line)
        if m and not OPT_RE.match(line):
            flush()
            head = m.group(2).strip()
            # "1. Context: Nvidia's CUDA moat" is a scenario label, not the question
            q = {"n": int(m.group(1)), "parts": [head] if head else [], "options": {}, "starred": None}
            continue
        if q is None:
            continue
        m = OPT_RE.match(line)
        if m and len(q["options"]) < 4:
            letter = m.group(2).upper()
            q["options"][letter] = re.sub(r"\s+", " ", m.group(3)).strip()
            # One option in this file carries a leading asterisk. It is NOT a
            # correct-answer marker: it occurs exactly once in 25 questions and
            # contradicts the key, which says HRM (a support activity in the
            # value chain) rather than marketing (a primary one). The key is
            # right, so the asterisk is a stray editing mark and is dropped.
            if m.group(1):
                q["starred"] = letter
            continue
        if not q["options"]:
            q["parts"].append(line)
    flush()

    answers = []
    for line in key_lines:
        if STOP_RE.match(line):
            break
        if KEYHEAD_RE.search(line) and len(line) < 80:
            continue
        m = KEYLINE_RE.match(line)
        if m:
            answers.append((m.group(1).upper(), re.sub(r"\s+", " ", line).strip()))

    if len(answers) != len(questions) or not questions:
        print("    (refused: %d questions vs %d key lines)" % (len(questions), len(answers)))
        return []

    out = []
    conflicts = 0
    for item, (letter, gloss) in zip(questions, answers):
        if letter not in item["options"]:
            continue
        if item.get("starred") and item["starred"] != letter:
            # Report it, but keep the question: the key is the authority here.
            conflicts += 1
            print("    note Q%s: key says %s, a stray asterisk sits on %s - keeping the key"
                  % (item["n"], letter, item["starred"]))
        out.append({
            "set": "A", "n": item["n"], "stem": item["stem"],
            "options": item["options"], "answer": letter,
            "explanation": gloss, "lo": None,
        })
    return out


def main() -> None:
    proven = json.load(open("scratch-plan/quiz-bank-v2.json", encoding="utf-8"))
    found = {}
    for course, sub in (("2yr", "2 Year Course"), ("1yr", "1 Year Course/PGPM")):
        root = os.path.join(BASE, sub)
        for dirpath, dirnames, files in os.walk(root):
            dirnames[:] = [d for d in dirnames if d.upper() != "TRASH"]
            folder = os.path.relpath(dirpath, root).split(os.sep)[0]
            m = re.match(r"Session\s*(\d+)", folder, re.I)
            if not m:
                continue
            sid = f"{course}-{int(m.group(1)):02d}"
            if sid in proven:
                continue
            for name in files:
                if not name.lower().endswith(".docx") or name.startswith("~$"):
                    continue
                if not any(k in name.lower() for k in ("quiz", "mcq", "exam", "q&a", "question")):
                    continue
                if "script" in name.lower():
                    continue
                print("  trying %-8s %s" % (sid, name[:56]))
                try:
                    qs = parse(os.path.join(dirpath, name))
                except Exception as exc:
                    print("    ERR", str(exc)[:60])
                    continue
                if qs:
                    print("    -> %d questions" % len(qs))
                    found.setdefault(sid, []).extend(qs)
    json.dump(found, open("scratch-plan/quiz-master.json", "w", encoding="utf-8"),
              indent=1, ensure_ascii=False)
    print("\nsessions=%d questions=%d" % (len(found), sum(len(v) for v in found.values())))


if __name__ == "__main__":
    main()
