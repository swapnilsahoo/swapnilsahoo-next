# Learning paths and lesson-aware mentor

Implementation date: 10 October 2026. This follows the owner's avatar build brief and the 9 October platform review in the Entrepreneurship folder.

## Public learning experience

The four paths are Business Foundations, Applied AI for Managers, Career and Case Practice, and Entrepreneurship Under Constraint. The catalogue groups existing public resources and distinguishes free original lessons from optional academic material and beta tools. Published duration estimates come from the original mini-courses; other resources do not acquire invented completion times, certificates or prerequisites.

The compact Dr. Swapnil Sahoo AI Mentor offers four actions: find a path, explain a concept, practise a case and review reasoning. It keeps a visible AI identity and separates prepared browser guidance, the stock-voice welcome video and the still-unavailable live provider. Voice questions and read-aloud remain opt-in. The website starts in light mode.

The unit-economics pilot teaches contribution, whole-unit break-even and capacity one question at a time, with progressive hints and optional worked explanations. The original case is followed by a fresh fictional transfer case. Arithmetic feedback checks numbers; the reasoning review uses the learner's own checklist selections and explicitly does not evaluate prose, certify mastery or issue a formal grade. Attempts remain in the open panel and are cleared when it is closed, reset or navigated away from.

## Source and provider boundaries

`src/features/digital-avatar/lesson-manifest.ts` resolves the six original free lessons into a public manifest with stable IDs, canonical URLs, content version `2026-10-10.1`, skills, introductory level, English language, prerequisites, duration estimates, explanations, examples, fictional cases, practice prompts, access, owner, review date and source links. The checklist is practice guidance, not a certification rubric. No private student submissions or licensed case text are included.

The live-session endpoint accepts only consent and optional validated lesson/mode identifiers. It derives context on the server. Optional processed Tavus document IDs are configured privately per approved lesson, never selected by arbitrary client URLs or learner text. Persistent quota reservations, caller ownership and provider-confirmed stop handling remain in force. Session length is configurable from 60 to 300 seconds; actual billing and provider enforcement remain unverified.

## Checks and remaining activation

The production build and scoped lint passed. Eighteen server integration checks passed with every Tavus request mocked. They cover ownership, quotas/concurrency, strict lesson/mode validation, source scoping, invalid private mappings, configured duration and failed-stop retry even after local expiry.

Seven mentor browser groups passed against the built local website: progressive hints, incorrect attempts, capacity/demand distinction, fresh-case rounding to 267, checklist revision, source links, transient-state cleanup and the 320-pixel popup. The existing 16 voice checks and 16 public route/viewport guide combinations also passed against the development preview with speech mocked and HTTP writes blocked.

Built-route catalogue acceptance checked all 25 resource targets, four viewport widths, search/access filters, empty-result reset, all four paths' save/reload/restore/clear behaviour and actual downloaded worksheet contents. New sitemap entries, current privacy metadata, the V0.3/25-mark course-map correction, an unknown-path 404 and the original QR's exact SHA-256 also passed. No page errors or HTTP writes occurred. Supporting reports and screenshots are under ignored `artifacts/learning-lab/`; these tests do not establish real microphone quality, hosted storage or provider video service.

Repeat the source/link check with `npm.cmd run check:catalogue`. After building and starting an unconfigured local preview, run `npm.cmd run test:mentor`; `GUIDE_TEST_BASE_URL` and `GUIDE_TEST_PROFILE` can select a read-only production run. The mentor script mocks device audio and blocks HTTP writes.

No live audiovisual provider was activated. The required owner account, real face/voice capture, private credentials and provider verification remain missing. No purchases, training uploads or customer payments were made. See [provider settings and verification](../digital-avatar-provider.md) and [the recording brief](../digital-avatar-recording-brief.md).

Vercel account authentication succeeded. The separate Lab storage activation still needs the owner to accept Turso's Marketplace terms before its selected $0 Starter resource can be provisioned. See [the activation handover](activation.md). A published catalogue, prepared mentor or donation QR does not establish secure hosted learner access or payment verification.
