# Learning Lab verification record

Verified locally on 8 October 2026 before publication. These checks used synthetic records and made no institutional outreach, purchase, payment or legal commitment. The founder subsequently explicitly authorised public publication with “go live”. Unrelated working-tree changes were preserved.

## Public production release

Vercel deployed `adbb94d` to [swapnilsahoo.com/learning-lab](https://www.swapnilsahoo.com/learning-lab) on 8 October 2026. An independent HTTP check confirmed all 18 public Lab pages and login returned 200. Chromium then passed 41 route/viewport checks: the 18 public pages plus login at 1440px and 375px, and the existing homepage, MBA course map and Session 1. All three original demos passed branching-feedback changes, incorrect/correct checkpoint retry, browser-only note save/restore/clear, worksheet download and checkpoint reset. Theme switching persisted after reload. No browser page errors, failed Next assets or horizontal overflow were observed.

At the initial release, contact, college and programme pages showed “Enquiries opening soon”, and login showed “Workspace opening soon”, without asking for email/password data. Production private APIs correctly returned 503 while configuration was missing; the payment endpoint returned 409. No production accounts, enquiries, cohorts or certificates were created. Initial live evidence is retained privately in ignored `artifacts/learning-lab/live-results.json` and screenshots.

## Subsequent audit response

The founder supplied `swapnil.s@greatlakes.edu.in` as the approved public contact. Updated programme/contact sections offer email enquiries without claiming website saving or email delivery. Open programme outlines, a labelled fictional AI worked example, direct verified founder credentials and a capability-aware learner-access label preserve the existing theme. The enquiry workflow now supports seven stages, a responsible administrator, next action and due date, with legacy record/backup compatibility.

Before publication of this update, the optimised local production service passed **39 API checks**, the full 18-route/four-viewport browser suite and all eight private workspace sections, learner submission/review/certificate workflows and immediate revocation. Seven isolated migration/backup/retention checks and CRM browser controls at 375/1280px also passed. A separate missing-credentials preview passed 20 page/viewport checks; all three programme-outline downloads and all three demo worksheet contents were inspected, including the entrepreneurship export. The fictional example has ten correctly counted cases and explicitly invented outcomes. Sitemap/robots responses and exclusion of private workspace URLs were checked. No physical-phone or screen-reader certification, real email delivery, merchant activation or production learner admission is claimed.

## Executed checks

| Check actually run | Result |
| --- | --- |
| `npm.cmd run build` | PASS. Next.js 16.3.5 production compilation, TypeScript, 97 static pages and dynamic Lab routes. Existing media, teaching lessons, 13-session MBA course, scripture and guesstimate prebuild checks passed. |
| `npm.cmd run typecheck` | PASS. The final production build also repeated TypeScript checking after the last application change. |
| `npm.cmd run lint` | PASS, zero errors and 34 existing warnings in unrelated scratch/check scripts. Scoped ESLint for all new Lab source and verification scripts passed without warnings. |
| `node --conditions=react-server --import tsx scripts/test-learning-lab.mts` against the optimised localhost:3111 server | PASS, all **39 integration checks**, including the updated enquiry workflow. |
| `node --conditions=react-server --import tsx scripts/test-learning-lab-availability.mts` | PASS in a new isolated synthetic database: closed enquiries rejected before persistence; configured approved dates/fees/capacity exposed; open interest persisted; unapproved details hidden. |
| `node --conditions=react-server --import tsx scripts/test-learning-lab-backup.mts` | PASS. Actual CLI encrypted backup restored into a fresh database; all 11 backed-up tables matched counts and canonical content hashes; no restored sessions, foreign-key violations or integrity errors. Wrong decryption key rejected. Missing production database/secret and hosted file-database misuse rejected. |
| `node --import tsx scripts/test-learning-lab-browser.mjs` with `LAB_TEST_BASE_URL=http://localhost:3111` | PASS. All 18 public URLs at 320, 360, 768 and 1440px; one main landmark, canonical metadata, no duplicate IDs or horizontal overflow; theme persistence; three interactive demonstrations; honest enquiry validation/failure states. Zero browser page errors. |
| `node scripts/test-learning-lab-workspace.mjs` with the same local production URL | PASS. All eight admin sections at 1280/375px, account provisioning, synthetic cohort/enrolment, password replacement, six lesson declarations, UTF-8 text import/submission, instructor review, certificate issuance/name opt-in and immediate public revocation. No horizontal overflow or browser page errors. Native POST/disabled pre-hydration password form verified. |
| `node scripts/test-learning-lab-unconfigured.mjs` against the unconfigured localhost:3112 production server | PASS. Public content remains readable; enquiry sections offer the approved email instead of unusable form fields, and login remains unavailable. Enquiry save, private access and verification fail with 503; enquiry response explicitly says nothing was submitted; checkout remains disabled with 409. Authentication error/disabled-signup responses are not cacheable. |

The 39 API checks cover anonymous/forged-session denial, disabled public signup, origin protection, content type/JSON/body limits, non-cacheable authentication, temporary-password replacement and session rotation, admin role checks, protected exports, duplicate enrolments, learner isolation, curriculum validation/freezing, unapproved availability, disabled checkout/webhooks, adult/privacy/marketing declarations, honeypot/timing/rate limits, enquiry persistence/deduplication/workflow ownership, missing/invalid records, safe text filenames, rubric scoring/revision reset/stale-review rejection, certificate requirements/random identifiers/idempotency, minimal verification/name opt-in, revocation/reissue and concurrent eligibility changes. Synthetic records are excluded from reports and CSV exports; CSV formula prefixes are escaped.

These are functional and source-review checks for a pilot MVP. They are not an independent penetration test, accessibility certification, legal opinion or production load test. No payment-event success or email delivery is claimed because those integrations are disabled.

## Screenshots and findings

Evidence is in ignored `artifacts/learning-lab/`: `integration-results.json`, `availability-results.json`, `backup-results.json`, `browser-results.json`, `workspace-ui-results.json`, `unconfigured-results.json` and `screenshots/`.

Desktop/mobile/light/dark screenshots were visually reviewed. The review fixed a long Entrepreneurship heading overflow at 320px, secondary-button/theme-icon contrast in dark mode, and password submission before client hydration. Keyboard focus remains visible, including the existing site's skip link. Screens include all three demonstration lessons, public enquiry errors, eight administration sections, learner completion/feedback and minimal certificate verification. They contain explicitly synthetic records only. Do not treat them as evidence of real Lab learners or achieved outcomes.

Existing academic regression checks passed for `/`, `/teaching/1-year-mba` and `/teaching/1-year-mba/session1.html`: responses remained available, academic primary navigation remained present on Next pages, and Lab chrome did not replace it.

## Measured local performance

Measured in Chromium against the configured optimised local production preview during the audit response, one warm reload per page at each viewport, without network or CPU throttling. Resource caching was warm. Values are Navigation Timing measurements, not Lighthouse or real-user web-vitals scores. They do not predict a student's device or network. The unconfigured public deployment has different enquiry/access copy. Final changes to FAQ and unavailable-service wording were checked separately.

| Page | Viewport width | DOM content loaded (ms) | Load event (ms) | Gzip HTML bytes | Total warm transfer bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| Lab home | 1440 | 134.4 | 134.8 | 14,462 | 42,796 |
| AI for Managers | 1440 | 106.5 | 107.1 | 29,497 | 58,308 |
| Strategy and Case Thinking | 1440 | 97.1 | 97.4 | 29,325 | 58,128 |
| Entrepreneurship | 1440 | 94.3 | 94.6 | 31,275 | 60,081 |
| Lab home | 360 | 65.7 | 65.9 | 14,462 | 42,799 |
| AI for Managers | 360 | 122.9 | 123.9 | 29,497 | 58,300 |
| Strategy and Case Thinking | 360 | 93.9 | 94.1 | 29,325 | 58,128 |
| Entrepreneurship | 360 | 97.2 | 97.5 | 31,275 | 60,087 |

Warm transfer includes headers and uncached navigation/resource transfers; cached resources may report zero transferred bytes. It is not the initial download weight. Full encoded/decoded sizes and resource counts are retained in the JSON evidence. Production database region, cold starts, hosting, device/network conditions and field accessibility still require checks after approved infrastructure is configured.

## Handover status

| Status | Scope |
| --- | --- |
| Implemented | Public site and three original demos; actual local persistence; established authentication and server roles; learner/admin pilot workflows; validated content editor; rubric feedback; eligibility-gated certificates/minimal verification; protected exports; encrypted backup/restore; environment template, setup/admin guides and private business planning. |
| Needs Credentials | Persistent production libSQL database/token, strong production authentication secret and canonical HTTPS origin. |
| Public Release Authorised | Programme pages, original interactive demos and draft disclosures. Without production credentials, enquiries and sign-in show opening-soon notices rather than requesting data. Payments remain disabled. |
| Needs Founder Approval | Operator address, policies and professional review, adult pilot support/recovery procedures, employment separation, programme details/pricing/capacity and commercial launch configuration. The public contact email has been explicitly supplied. |
| Deferred | Payments, automated email invitations/recovery, analytics, AI tutor, binary uploads/video hosting, repeat enrolment/cohort editing and curriculum versioning, automated survey/learning-gain/renewal reporting. |

Attendance and assessment remain human instructor responsibilities. One enrolment per learner/programme, text-only submissions and manual account/privacy support are deliberate pilot boundaries. The current local database contains synthetic users/cohorts/certificates; create a fresh reviewed production database and provision the real operator privately. See [README.md](README.md) and [admin-guide.md](admin-guide.md) for exact run and operating instructions.
