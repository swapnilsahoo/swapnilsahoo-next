# Session 6: learning flow and practice feedback

Updated 13 October 2026. Target: `/teaching/1-year-mba/session6.html`.

The update preserves the current V0.3 topic, 90-minute duration, Patagonia case, three teaching questions, assigned readings and existing exercises. No assessment weight or Reflection 1 deadline is changed.

## Changes

- Five learning outcomes precede the first teaching section. They cover value creation and capture, added value, external and internal sources of advantage, evidence for shared value, core-competence tests and a case-based recommendation. Practice links connect the outcomes to the existing activities.
- Browser-tab icon links use the same canonical SVG as the main website and Session 1. Light remains the default theme, with manual dark available.
- One shared quiz renderer identifies the answer and the learner's choice in words, announces the explanation, retains the existing question options and scores, and returns keyboard focus after reset. Two concept-check explanations now state that the added-value capture bound applies under the unrestricted-bargaining model already specified elsewhere in the lesson; their correct answers remain unchanged.
- Each of the four shared classifiers offers a fresh attempt without reloading the page. The CSR/CSV cases continue to accept the existing defensible alternatives; a practice score is not a human assessment result.
- Browser progress records activity use through answers and control changes, including keyboard interaction. Reading or clicking surrounding text does not establish activity completion. Existing local progress remains compatible.

The page continues to distinguish case evidence, reading examples and illustrative assumptions. The source document's contradictory Reflection 1 references remain documented in [the V0.3 handover](one-year-mba-outline-v03.md); this update does not resolve them by inventing a policy.

## Verification

`scripts/test-session6-learning-flow.mjs --preview-ready` passed in isolated browser contexts at 1440, 768, 390 and 320 pixels, with no browser page errors or HTTP writes. It checked all 27 quiz questions, mixed scoring, answer locking, explicit feedback and focus-restoring resets; all four classifier resets and ten defensible alternative answers; five independent value-stick fixtures and six ledger fixtures, including zero boundaries; keyboard/range progress, existing tabs/workshops/simulation, light default despite OS/stored-dark preferences, manual dark and viewport containment. Static outcomes and course-pack resource information remained available without scripts. This does not certify the legacy page's entire no-script responsive layout.

The production build, course validator and scoped regression-script lint passed. Desktop and phone screenshots were visually reviewed. Repeat the focused check against a live origin using `SESSION6_TEST_BASE_URL` and a distinct `SESSION6_TEST_PROFILE`.

Reports and screenshots remain in ignored working directories; no real learner account, submission, payment or provider conversation is used.
