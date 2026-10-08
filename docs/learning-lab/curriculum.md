# Learning Lab curriculum and demonstration lessons

The three proposed programmes target adults in management education and early-career work. They use original hypothetical scenarios and publicly linked framework references. They do not reuse employer teaching materials, proprietary teaching cases, student work, institutional branding or unverifiable venture outcomes.

Original programme defaults are maintained in `src/features/learning-lab/programmes.ts` and seeded into the relational database. The protected administration workspace provides the operational editing approach: one complete programme JSON editor. Each programme has six sessions, observable outputs, a capstone, a rubric totalling 100 and machine-readable certificate requirements. Proposed durations are curriculum assumptions, not announced dates or capacity. Paid enrolment remains subject to founder approval and the launch conditions documented elsewhere.

| Programme | Proposed duration | Live hours | Independent learner work | Capstone |
| --- | --- | --- | --- | --- |
| AI for Managers | Four weeks | 6 × 90 minutes = 9 hours | About 2 hours per week | Evidence-based workflow pilot proposal |
| Strategy and Case Thinking Lab | Three weeks | 6 × 90 minutes = 9 hours | About 2 hours per week | Decision memo and oral defence |
| Entrepreneurship Under Constraint Bootcamp | Four weeks | 6 × 90 minutes = 9 hours | About 3 hours per week | Venture evidence dossier and next-test decision |

For first-pilot budgeting, the AI flagship can provisionally allow six founder hours for preparation and revision and eight hours for assessment/support for a 12-person cohort, in addition to nine live teaching hours. These are operational estimates to validate, not confirmed delivery commitments.

## Assessment and completion

All three programmes use the same minimum completion rule: all six assigned lessons completed; at least 80% attendance of scheduled live learning time; and an original capstone with an instructor-approved rubric score of at least 60/100. Public demonstration activity is self-practice and does not update assessed progress or count towards a certificate. Learner notes, checkpoint attempts and browser activity are not evidence of attendance or instructor approval.

Instructor feedback should identify the criterion, observed evidence, a specific improvement and the next revision opportunity. Simulated discovery evidence must be labelled. A recommendation to stop an AI or venture proposal can receive a strong score if it is well supported; assessment does not reward an artificially positive conclusion.

A Certificate of Completion describes participation and completion in a Lab programme. It must not imply a degree, recognised qualification, employer endorsement or institutional accreditation. The server must independently enforce eligibility; displaying these criteria in the browser is not an authorisation control.

## Public lesson behaviour

`DemoLesson.tsx` provides an original scenario, a short guided explanation, two branching decision exercises, a retryable checkpoint and three reflection prompts for each programme. Feedback is authored instructional content; there is no AI call, fabricated tutor response or automated assessed grade.

Notes remain in page memory by default. Learners can explicitly save their three answers in this browser, restore them, clear them or download a plain-text worksheet. Saved browser notes are not private from another person using the same browser profile. They never enter the Lab database or production outcome reports. Browser-storage failure displays an honest error; a downloaded copy remains available. The worksheet labels the material as a hypothetical demonstration and records choices without claiming completion.

Native radio groups, labelled textareas, semantic headings, visible keyboard focus and live feedback support keyboard and assistive-technology use. Independent IDs allow more than one demo on a page. Layouts stack on small screens; no autoplay or decorative media is required.

## Pilot content editing

Use Administration → Content to inspect and edit the full programme JSON before the first enrolment. The server validates the structure, rubric total, answer index and the requirement that every configured lesson is completed. Existing enrolments lock curriculum changes to preserve the basis of assessment. Availability is edited separately and remains gated by founder launch approval; saving a proposed syllabus does not publish a date, fee or paid offer.

Demonstration branches live in optional `demo.decisions`, an array of `{question, choices: [{title, feedback}]}` objects. Keep those branches consistent with any change to the hypothetical scenario or instructional text. Newly seeded programme content includes both branches; older local seed content without this field uses the original authored fallback in `demo-decisions.ts`. The renderer derives decision and reflection fields from the configured arrays. Changing reflection prompts can make an old browser-saved worksheet incompatible; a saved download remains readable.

Capstone review includes a submission revision number. If a learner replaces work while an instructor is reviewing an earlier version, the server rejects that stale review rather than applying it to the new text. Instructors should refresh, reread and assess the current revision.

## Original material and framework references

The invented businesses Paperlane and Noonbox and the bicycle-maintenance exercise are hypothetical teaching scenarios. All figures and constraints are invented learning inputs and are labelled as such. They must not be presented as real company findings, Lab outcomes or revenue forecasts.

AI risk discussion draws on the voluntary [NIST AI Risk Management Framework 1.0 (2023)](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) and [NIST Generative AI Profile (2024)](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence). These references do not establish legal compliance or NIST endorsement.

The strategy programme uses positioning, trade-offs and activity consistency as a conceptual lens from [Michael E. Porter, *What Is Strategy?* (1996), publisher information](https://store.hbr.org/product/what-is-strategy/96608). The programme provides original scenarios rather than copying the article or its cases; a full publisher reading may require a separate purchase.

The entrepreneurship programme draws on means and limited commitments under uncertainty from [Saras D. Sarasvathy, *Causation and Effectuation* (2001)](https://effectuation.org/publications-library/causation-and-effectuation-toward-a-theoretical-shift-from-economic-inevitability-to-entrepreneurial-contingency). Discovery practice is informed by the hands-on customer conversations described by [US National Science Foundation I-Corps](https://www.nsf.gov/funding/initiatives/i-corps/about-teams). The Lab is independent and does not claim those organisations' curriculum, partnership, accreditation or outcomes.

Primary-source links checked on 8 October 2026. Framework versions are stated explicitly; references should be reviewed when programme content is revised.
