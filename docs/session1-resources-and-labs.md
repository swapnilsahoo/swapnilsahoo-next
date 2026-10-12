# Session 1: resources, business stories and decision labs

Updated 12 October 2026. Target: `/teaching/1-year-mba/session1.html`.

The lesson retains its Session 1 theme, light default, assigned authors, Tesla case, core checks and existing course navigation. Three supplied study-note links and the supplied Session 1 Drive folder are available in the lesson. Links open original resources; publisher/course access restrictions remain applicable. Course-pack PDFs and extracted reading text have not been published in this repository.

## Teaching additions

- An original five-term intended/deliberate/emergent/unrealised/realised diagram, with a fictional lunch-service story and a written explanation. Realised strategy is not required to contain both deliberate and emergent strands, and unrealised intention is distinguished from financial failure.
- Positioning questions illustrated through a fictional service, customer group and delivery constraint. Variety concerns a service subset, rather than a large assortment; the three starting points can combine.
- Six expandable business photo stories: Apple, IKEA and Slack; DMart, Nykaa and Zomato. Each explains the context, decision, activity mechanism, trade-off, teaching interpretation, evidence that would challenge it and linked company sources. Dates are preserved; photographs identify a product/company/setting and are not evidence of the strategic mechanism. The Nykaa image is explicitly a marketing-event photograph.
- Three original local simulations: compare intentions with repeated actions; build an activity system and inspect its cost/capacity consequences; select a positioning lens and defend its activities and refusals. Native controls, feedback, reset and written diagram explanations work without additional libraries, accounts, uploads or persistence.

All simulation figures are fictional educational assumptions. The fit exercise shows ₹115 baseline variable cost at ₹120 price, ₹2,400 daily fixed costs and 150-meal capacity. Selecting all coherent activities produces ₹87 variable cost, ₹2,700 fixed costs and 200-meal capacity, with break-even rounded up to 82 meals. Adding the express/custom request changes cost to ₹126 and capacity to 120: contribution is negative, so no finite break-even exists at that price. At the assumed feasible 120 orders, the remainder after the stated fixed costs is −₹3,420. Other costs and demand responses are omitted; this is not a business forecast.

The positioning model allows zero feasible capacity. Accepting the extra request under the broad access design leaves zero feasible orders and −₹2,400 after fixed costs, rather than inventing one feasible meal. Refusing an extra does not repair a base design that fails to meet its intended customer need or delivery constraint.

The legacy Phoenix Motors choices now advance and support keyboard operation. Workshop dialogs expose their role, contain focus and restore it on dismissal. A missing Chart.js no longer prevents these controls from initialising. The strategy-statement builder renders learner text through DOM text nodes, preventing pasted markup from executing.

## Files and sources

Main integration is in `public/teaching/1-year-mba/session1.html`. Scoped additions are `session1-stories.css` and `session1-resource-lab.js/.css` in that directory. The photographs are under `public/images/teaching/session1/`; exact creators, licenses, source links, conversion changes and hashes are in [the asset source record](session1-asset-sources.md). Eight documented image assets were prepared, with six used in the main story cards; each is below 100 KB. No generated business photograph is used.

Source alignment used the three owner-supplied notes and the provided folder's Porter, Mintzberg and Collis/Rukstad readings. Retrieved reading extracts and working manifests remain in ignored `artifacts/session1-resources/`. Public applications are original explanations and fictional scenarios, with independent company sources for historical facts.

## Verification

`scripts/test-session1-resources.mjs --preview-ready` uses isolated browser contexts and blocks HTTP writes. The local run passed at 1440×900, 390×844 and 320×600, covering light default despite OS/stored-dark preferences, manual dark, six decoded local photos with alt text, exact resource links, unique IDs and internal anchors, all new scenario branches, rounded break-even, negative contribution, zero capacity, reset and keyboard use. It also checked legacy Phoenix branches, dialog focus/dismissal, a harmless injection sentinel, a mocked missing Chart.js, and readable resources/stories without JavaScript. No browser errors or HTTP writes occurred. Story and diagram screenshots were visually reviewed.

Repeat against a deployed origin with `SESSION1_TEST_BASE_URL` and a distinct `SESSION1_TEST_PROFILE`. Reports and screenshots remain ignored; no real learner work, enquiry, account, payment or external provider session is created by this test.
