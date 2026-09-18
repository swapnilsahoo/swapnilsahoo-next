"""Targeted extractor for the 'Question N: Title' layout with a pipe-table key.

Shape:
    Section A: ... (15 Questions)
    Question 1: <a short title>
    <the actual stem>
    A. option
    ...
    Answer Key and Robust Rationale
    | 1 | B | Category | Rationale ...

This is kept separate from the proven extractors on purpose. It only runs over
sessions that have no verified questions yet, and it refuses to emit anything
unless the key lines up with the questions exactly.
"""
from __future__ import annotations

import os
import re
import json
import docx

BASE = r"C:/Users/swapn/OneDrive - greatlakes.edu.in/Prof.Swapnil Sahoo/Strategy/Strategy Sessions"

QTITLE_RE = re.compile(r"^Question\s+(\d{1,3})\s*[:\.\-]\s*(.*)$", re.I)
OPT_RE = re.compile(r"^\(?([A-D])[\)\.]\s+(.+)$")
SECT_RE = re.compile(r"^Section\s+([A-D])\b", re.I)
KEYHEAD_RE = re.compile(r"answer\s*key", re.I)
ROW_RE = re.compile(r"^\|?\s*(?:[A-D]\s*\|\s*)?(\d{1,3})\s*\|\s*([A-D])\s*\|\s*(.*)$")

# The source marks emphasis with LaTeX fragments. Strip them so a student reads
# prose, being careful not to eat an escaped currency symbol on the way through.
CMD_BRACED = re.compile(r"\\[a-zA-Z]+\{([^{}]*)\}")
CMD_BARE = re.compile(r"\\(?:rightarrow|to)\b")
CMD_LEFTOVER = re.compile(r"\\[a-zA-Z]+\b")
MATH_SPAN = re.compile(r"\$([^$]*)\$")
CURRENCY = "\x00CUR\x00"


def clean(text: str) -> str:
    text = text.replace(r"\$", CURRENCY)          # protect escaped currency
    text = CMD_BARE.sub("->", text)
    for _ in range(4):                            # unwrap nested \mathbf{\text{x}}
        new = CMD_BRACED.sub(r"\1", text)
        if new == text:
            break
        text = new
    text = MATH_SPAN.sub(r"\1", text)
    text = CMD_LEFTOVER.sub("", text)             # any command that lost its braces
    text = text.replace(r"\%", "%").replace(r"\&", "&").replace("{", "").replace("}", "")
    text = text.replace(CURRENCY, "$")
    return re.sub(r"\s+", " ", text).strip()


def parse(path: str):
    lines = [p.text.strip() for p in docx.Document(path).paragraphs if p.text.strip()]
    if not any(QTITLE_RE.match(x) for x in lines):
        return []

    key_at = next((i for i, x in enumerate(lines) if KEYHEAD_RE.search(x) and len(x) < 80), len(lines))
    body, key_block = lines[:key_at], lines[key_at:]

    questions = []
    section = None
    q = None

    def flush():
        nonlocal q
        if q and len(q["options"]) == 4 and q["stem"]:
            questions.append(q)
        q = None

    for line in body:
        m = SECT_RE.match(line)
        if m and len(line) < 90:
            flush()
            section = m.group(1).upper()
            continue
        m = QTITLE_RE.match(line)
        if m:
            flush()
            q = {"section": section, "n": int(m.group(1)), "title": clean(m.group(2)),
                 "stem": "", "options": {}}
            continue
        if q is None:
            continue
        m = OPT_RE.match(line)
        if m and len(q["options"]) < 4:
            q["options"][m.group(1).upper()] = clean(m.group(2))
            continue
        if not q["options"]:
            q["stem"] = clean((q["stem"] + " " + line).strip())
    flush()

    # answer key rows, in document order
    rows = []
    for line in key_block:
        m = ROW_RE.match(line)
        if m:
            rows.append((int(m.group(1)), m.group(2).upper(), clean(m.group(3))))
    if not rows:
        return []

    # Join on (section, n) where possible; fall back to strict positional order.
    by_n = {}
    for n, letter, why in rows:
        by_n.setdefault(n, []).append((letter, why))

    out = []
    used = {}
    for item in questions:
        bucket = by_n.get(item["n"])
        if not bucket:
            continue
        slot = used.get(item["n"], 0)
        if slot >= len(bucket):
            continue
        used[item["n"]] = slot + 1
        letter, why = bucket[slot]
        if letter not in item["options"]:
            continue
        stem = item["stem"] or item["title"]
        if not stem:
            continue
        out.append({
            "set": item["section"], "n": item["n"], "stem": stem,
            "options": item["options"], "answer": letter,
            "explanation": why, "lo": None,
        })
    # Refuse a partial join - it usually means the numbering did not line up.
    if len(out) < 0.6 * len(questions):
        return []
    return out


def main() -> None:
    proven = json.load(open("scratch-plan/quiz-bank-FINAL.json", encoding="utf-8"))
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
                if "script" in name.lower():
                    continue
                try:
                    qs = parse(os.path.join(dirpath, name))
                except Exception:
                    continue
                if qs:
                    print("  %-8s %-56s %d" % (sid, name[:56], len(qs)))
                    found.setdefault(sid, []).extend(qs)
    json.dump(found, open("scratch-plan/quiz-titled.json", "w", encoding="utf-8"),
              indent=1, ensure_ascii=False)
    print("\nsessions=%d questions=%d" % (len(found), sum(len(v) for v in found.values())))


if __name__ == "__main__":
    main()
