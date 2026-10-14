# One-year MBA: consistent learning flow across the course

Updated 14 October 2026. The remaining lessons now follow the existing course theme and learning pattern. The current [13-session course map](https://www.swapnilsahoo.com/teaching/1-year-mba#course-map) and V0.3 outline determine the sequence; older PGPM folder numbers do not.

## Delivered changes

All 13 lessons begin with five measurable learning outcomes and links to the activities that practise them. Session 2 received the missing opening outcomes alongside its existing vision illustrations and resource hub. Sessions 1, 6 and 7 retain their previously completed outcomes and practice work.

Sessions 3–5 and 8–13 additionally contain:

- An original concept diagram with an SVG title/description and an equivalent written explanation.
- A fictional decision scenario, a sourced international example and a sourced Indian example. Facts, historical periods and teaching inferences are distinguished.
- A study guide connecting the supplied PGPM readings to specific questions and tasks, with publisher/source records or assigned course-pack access.
- Four new diagnostic questions with an explanation for every answer, visible selected/correct labels, a score, single-answer locking and a reset that returns keyboard focus to the first choice.
- Discussion disclosures and links from the existing hero/navigation to the outcomes and practice lab.

The same website favicon is present throughout. Every lesson starts in light mode, including when the operating system or stored preference is dark; the manual dark-mode control remains available. The new additions use existing colour tokens, collapse to one column on narrow screens and provide visible keyboard focus. No provider, login or payment service is needed to use them.

## Resource mapping

The user-supplied root was `Strategy/Strategy Sessions/1 Year Course/PGPM`. Readings were matched by title, author and subject rather than by folder number. Required reading assignments remain in each lesson's original reading section.

| Canonical session | Topic and supplied material used for the additions |
| --- | --- |
| 3 | Industry analysis: Porter's structural analysis and five competitive forces readings. The substitute example explicitly defines passenger-car manufacturing and uses public transport outside that boundary. |
| 4 | Beyond five forces: Brandenburger and Nalebuff's game-changing framework, and Strategy Under Uncertainty. The local file `Strategy-Under-Certain.pdf` contains the uncertainty reading. |
| 5 | Internal analysis: Competing on Resources, The Core Competence of the Corporation, and both supplied Patagonia case copies. The core-competence file sits in the older Session 6 folder. |
| 8 | Entrepreneurship, platforms and innovation: Disruptive Technologies: Catching the Wave, both copies of the two-sided-markets reading, and the assigned NVIDIA case. |
| 9 | Integration and diversification: the supplied Competitive Advantage material, From Competitive Advantage to Corporate Strategy, and the parenting-advantage reading. The scanned book is identified as an assigned chapter rather than claimed to have been read in full. |
| 10 | Alliances and acquisitions: When to Ally and When to Acquire, The New M&A Playbook, and Amazon in 2024. Amazon in 2026 is explicitly an optional different-period update. |
| 11 | Global strategy: Distance Still Matters and Managing Differences, with the assigned Amazon case. These readings are in the older organisational-design folder. |
| 12 | Organisation and implementation: The Leader's Guide to Corporate Culture and Secrets to Successful Strategy Execution, with the assigned Amazon case. |
| 13 | Governance and ethics: Ethical Breakdowns and the supplied `The error.pdf` reading, with the assigned Amazon case. |

The guides are original summaries and teaching prompts. Licensed source PDFs and full books were not copied to public assets. Learner records, submissions and unrelated private files were not used. Previously assigned readings and new primary-source links remain available alongside the study guides.

## Preservation and implementation

New HTML and navigation entries are enclosed in `course-learning` markers. An independent comparison against the original source verified preservation of the old teaching content, numerical engines, case exhibits, questions, reading lists and assessment instructions. The sole edit outside those additions corrects **two Session 13 duration labels from 90 to 120 minutes**, matching the V0.3 two-hour session. No new assessment policy was introduced.

`public/teaching/1-year-mba/course-learning.css` and `course-learning.js` supply the shared layout and practice behaviour. Each upgraded page supplies its four original questions as JSON. The renderer builds controls with `textContent`, uses no visitor HTML, makes no network request and stores no new learner data. Existing lesson engines and progress systems remain independent. Reset controls stay hidden until a valid question configuration is loaded; a no-JavaScript visitor can read the outcomes, diagrams, cases, guides and discussion prompts.

## Verification and handover

The repository production build, TypeScript, media/lesson/course/catalogue prechecks, scoped ESLint, JavaScript syntax and diff checks passed. The course validator covers all 13 canonical pages, author assignments, executable scripts, local assets and sequential map links.

Run the integrated public check with:

```powershell
node scripts/test-course-learning.mjs --preview-ready
```

The script serves public assets locally unless `COURSE_TEST_BASE_URL` supplies a deployed origin. `COURSE_TEST_PROFILE` identifies its ignored report directory. It checks all 13 lessons at desktop, tablet and 390/320-pixel widths, including light defaults under dark operating-system/stored preferences, manual dark mode, anchors, IDs, opening outcomes and the geometry of the additions. Across nine new practice modules it exercises all 108 answer branches and checks scoring, answer locks, feedback, reset focus and keyboard use. A separate pass checks readable outcomes without JavaScript. HTTP writes and external iframe documents are blocked during these read-only checks.

The full HTML/CSS additions, source-evidence notes, preservation report, browser reports and screenshots are recorded under the ignored `artifacts/session1-resources/course-rollout/` directory. Production verification should be associated with the exact deployed commit and canonical alias; a successful local build alone is not proof of publication.

These checks are browser viewport checks, not real-device or screen-reader certification. Existing numerical simulations were preserved rather than exhaustively revalidated in this rollout. The no-JavaScript check covers readable new learning content; it does not claim that every legacy interactive simulation works without JavaScript. Avatar, payment, email and learner-workspace readiness are separate from this teaching-page release.
