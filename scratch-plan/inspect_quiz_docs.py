"""Show the layout of each unparsed quiz document: first lines, tables, and how
many lines match each answer-key grammar, so an extractor can be chosen per file."""
import re, sys, docx

B = r"C:/Users/swapn/OneDrive - greatlakes.edu.in/Prof.Swapnil Sahoo/Strategy/Strategy Sessions/"
DOCS = {
    "S1 Q&A A": "1 Year Course/PGPM/Session 1_What is Strategy/Quiz/Session1_Section A Q&A.docx",
    "S1 QandA A": "1 Year Course/PGPM/Session 1_What is Strategy/Quiz/Section A Questions and Answers.docx",
    "2yr-03 Sec A": "2 Year Course/Session 3_Chief Strategy Ofiicer/Quiz/Section_A_Fundamentals.docx",
    "2yr-03 Grand": "2 Year Course/Session 3_Chief Strategy Ofiicer/Quiz/Strategic_Management_Grand_Quiz.docx",
    "2yr-03 Bank": "2 Year Course/Session 3_Chief Strategy Ofiicer/Quiz/Strategic_Management_Assessment_Bank.md.docx",
    "2yr-04": "2 Year Course/Session 4_Purpose_Values_Strategy_Tesla/Quiz Questions.docx",
    "2yr-07": "2 Year Course/Session 7_ Managing Strategic Leadership and StrategyProcess/Quiz for Session 7.docx",
    "2yr-08": "2 Year Course/Session 8_Industry Structure and Firm Strategy/Session 8_Industry Structure and Firm Strategy_MCQ - 25 Quiz Questions.docx",
    "1yr-09": "1 Year Course/PGPM/Session 9 _Corporate Strategy_Strategic Alliances_Mergers_Acquisitions/Session 9_QUIZ_ Set A & B .docx",
}
PATS = {"'1.' stem": r"^\d{1,3}[\.\)]\s+\S", "'Q1.'": r"^Q\s?\d+[\.\):]", "'Question 1'": r"^Question\s+\d+",
        "opt A.": r"^[A-D][\.\)]\s", "opt a)": r"^[a-d][\.\)]\s", "Answer:": r"^\**\s*(Correct\s+)?Answer\s*[:\-]",
        "Explanation": r"^\**\s*(Explanation|Rationale)\s*[:\-]", "Set/Section": r"^#*\s*(Set|Section|SET|SECTION)\s+[A-D1-4]"}
which = sys.argv[1:] or list(DOCS)
for key in which:
    d = docx.Document(B + DOCS[key])
    paras = [p.text.strip() for p in d.paragraphs if p.text.strip()]
    print("=" * 100); print(key, "|", DOCS[key].split("/")[-1], f"| {len(paras)} paragraphs, {len(d.tables)} tables")
    for t in d.tables[:3]:
        print(f"   table {len(t.rows)}x{len(t.columns)} header: {[c.text.strip()[:18] for c in t.rows[0].cells][:6]}")
    print("   grammar counts:", {k: sum(1 for x in paras if re.match(v, x)) for k, v in PATS.items()})
    for x in paras[:16]:
        print("     |", x[:140])
