# One-year MBA course outline V0.2

Source: user-supplied `Course Outline_Strategic Managment_PGPM_2026-27_V0.2.docx`.
The website course map follows its 13-session table: Analysis (1–6), Formulation
(7–11), and Implementation (12–13). Session readings follow that table; the
general Rothaermel textbook remains in the course reading list, without adding
chapter assignments absent from V0.2.

## Existing lesson mapping

Authored lessons retain their existing URLs and content. Some lesson headings
use earlier session numbers, so the course map links by subject. All paths below
are relative to `public/teaching/1-year-mba/`.

| V0.2 session | Primary lesson | Related lesson |
| --- | --- | --- |
| 1–5 | `session1.html` through `session5.html`, respectively | — |
| 6 Shared Value and Competitive Advantage | `session6.html` | `session7.html` (sustaining advantage) |
| 7 Differentiation, Cost Leadership and Blue Ocean | `session8.html` | `Session6_Business Strategy_Differentiation, CostLeadership_BlueOceans_v0.8.html` |
| 8 Entrepreneurship, Platforms, Technology and Innovation | `session9.html` | `Session_7_Business_Strategy_Innovation_Entrepreneurship_Platforms_V0.003.html` |
| 9 Vertical Integration and Diversification | `session10.html` | `session11.html` and `session13.html` |
| 10 Alliances, Mergers and Acquisitions | `Session_9_Corporate_Strategy_Alliances_Mergers_Acquisitions_v0.91.html` | — |
| 11 Global Strategy | `session12.html` | — |
| 12 Organizational Design | `Session_11_Organizational_Design_Structure_Culture_Control_v0.297.html` | — |
| 13 Governance, Ethics and Business Models | `Session_12_Corporate_Governance_Business_Ethics_Business_Models_V0.293.html` | — |

The corporate-scope practice bank `1yr-08` now displays Session 9. The alliances
practice bank `1yr-09` already displays Session 10. Bank identifiers and question
content remain unchanged.

## Source issues for the next outline revision

The Word document has not been edited. These discrepancies require editorial
resolution in that source:

- The cover and PO heading say PGCM; the filename, course code and programme
  field say PGPM. The website uses PGPM, consistent with the user's one-year MBA.
- The course description still describes 20 sessions (1–10, 11–17, 18–20).
  The website follows the actual 13-session table.
- Session 10 links to a vertical-integration handout. Sessions 12 and 13 both
  link to a diversification handout. The website uses the matching lessons above.
- Reflection 1 is due by Session 6 in the deliverables timeline but at the end
  of Session 7 in the individual-project description. The website retains the
  explicit deliverables timeline (Session 6).
- Assessment allocations sum to CO1/PO1 = 55 and CO2/PO2 = 45, while the document's
  total row says 35 and 30. Individual allocations and the 100-mark total are
  preserved on the website; the erroneous column totals are not copied.
- The 10-mark project-rubric criterion uses 5-point performance descriptors and
  references PO5, although only POs 1–4 are defined. The website retains the
  5/5/10 rubric weights without reproducing those inconsistent descriptors.
- Textbook publisher text is truncated, and Appendices A–D are referenced but
  absent from the supplied file.

The website's project description now reflects the explicit source restriction
on secondary data collection. Assessment weights and deliverable timing remain
unchanged.

## Validation and retained lesson limitations

The course page passes lint and TypeScript checks. Browser checks verified all
13 expandable sessions, three phases, 18 lesson links returning HTTP 200, and
no horizontal overflow at 320, 390, 768 or 1440 pixels. Mobile light/dark and
desktop screenshots were inspected. The existing teaching-asset check also
passes; a separate scan found no missing local files in the three newly linked
decks for alliances, organizational design and governance.

Existing lesson content was preserved. Those three decks use earlier examples
(Twitter, general organizational structures, and Theranos/Volkswagen), while
the course map assigns the Amazon case and the new readings. The governance
deck also has two existing defects outside this course-map update: its
“Global Cases” navigation points to an absent `#global-parallels` anchor, and
its optional AI analysis references an undefined `apiKey`, resulting in its
unavailable fallback. These require a separate lesson-content update.
