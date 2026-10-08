# Learning Lab verification record

Verified locally on 8 October 2026 before publication. These checks used synthetic records and made no institutional outreach, purchase, payment or legal commitment. The founder subsequently explicitly authorised public publication with “go live”. Unrelated working-tree changes were preserved.

## Public production release

Vercel deployed `adbb94d` to [swapnilsahoo.com/learning-lab](https://www.swapnilsahoo.com/learning-lab) on 8 October 2026. An independent HTTP check confirmed all 18 public Lab pages and login returned 200. Chromium then passed 41 route/viewport checks: the 18 public pages plus login at 1440px and 375px, and the existing homepage, MBA course map and Session 1. All three original demos passed branching-feedback changes, incorrect/correct checkpoint retry, browser-only note save/restore/clear, worksheet download and checkpoint reset. Theme switching persisted after reload. No browser page errors, failed Next assets or horizontal overflow were observed.

The live contact, college and programme pages show “Enquiries opening soon”, and login shows “Workspace opening soon”, without asking for email/password data. Production private APIs correctly return 503 while configuration is missing; the payment endpoint returns 409. No production accounts, enquiries, cohorts or certificates were created. Live evidence is retained privately in ignored `artifacts/learning-lab/live-results.json` and screenshots.

## Executed checks

| Check actually run | Result |
| --- | --- |
| `npm.cmd run build` | PASS. Next.js 16.3.5 production compilation, TypeScript, 97 static pages and dynamic Lab routes. Existing media, teaching lessons, 13-session MBA course, scripture and guesstimate prebuild checks passed. |
| `npm.cmd run typecheck` | PASS. The final production build also repeated TypeScript checking after the last application change. |
| `npm.cmd run lint` | PASS, zero errors and 34 existing warnings in unrelated scratch/check scripts. Scoped ESLint for all new Lab source and verification scripts passed without warnings. |
| `node --conditions=react-server --import tsx scripts/test-learning-lab.mts` against the optimised localhost:3111 server | PASS, all **36 integration checks**, rerun after the final enquiry-closure fix. |
| `node --conditions=react-server --import tsx scripts/test-learning-lab-availability.mts` | PASS in a new isolated synthetic database: closed enquiries rejected before persistence; configured approved dates/fees/capacity exposed; open interest persisted; unapproved details hidden. |
| `node --conditions=react-server --import tsx scripts/test-learning-lab-backup.mts` | PASS. Actual CLI encrypted backup restored into a fresh database; all 11 backed-up tables matched counts and canonical content hashes; no restored sessions, foreign-key violations or integrity errors. Wrong decryption key rejected. Missing production database/secret and hosted file-database misuse rejected. |
| `node --import tsx scripts/test-learning-lab-browser.mjs` with `LAB_TEST_BASE_URL=http://localhost:3111` | PASS. All 18 public URLs at 320, 360, 768 and 1440px; one main landmark, canonical metadata, no duplicate IDs or horizontal overflow; theme persistence; three interactive demonstrations; honest enquiry validation/failure states. Zero browser page errors. |
| `node scripts/test-learning-lab-workspace.mjs` with the same local production URL | PASS. All eight admin sections at 1280/375px, account provisioning, synthetic cohort/enrolment, password replacement, six lesson declarations, UTF-8 text import/submission, instructor review, certificate issuance/name opt-in and immediate public revocation. No horizontal overflow or browser page errors. Native POST/disabled pre-hydration password form verified. |
| `node scripts/test-learning-lab-unconfigured.mjs` against the unconfigured localhost:3112 production server | PASS. Public content remains readable; all five enquiry locations and login show opening-soon notices without credential fields. Enquiry save, private access and verification fail with 503; enquiry response explicitly says nothing was submitted; checkout remains disabled with 409. A separate mobile Chromium check confirmed the notices, no overflow and no browser page errors. |

The 36 API checks cover anonymous/forged-session denial, disabled public signup, origin protection, content type/JSON/body limits, non-cacheable authentication, temporary-password replacement and session rotation, admin role checks, protected exports, duplicate enrolments, learner isolation, curriculum validation/freezing, unapproved availability, disabled checkout/webhooks, adult/privacy/marketing declarations, honeypot/timing/rate limits, enquiry persistence/deduplication, safe text filenames, rubric scoring/revision reset/stale-review rejection, certificate requirements/random identifiers/idempotency, minimal verification/name opt-in, revocation/reissue and concurrent eligibility changes. Synthetic records are excluded from reports and CSV exports; CSV formula prefixes are escaped.

These are functional and source-review checks for a pilot MVP. They are not an independent penetration test, accessibility certification, legal opinion or production load test. No payment-event success or email delivery is claimed because those integrations are disabled.

## Screenshots and findings

Evidence is in ignored `artifacts/learning-lab/`: `integration-results.json`, `availability-results.json`, `backup-results.json`, `browser-results.json`, `workspace-ui-results.json`, `unconfigured-results.json` and `screenshots/`.

Desktop/mobile/light/dark screenshots were visually reviewed. The review fixed a long Entrepreneurship heading overflow at 320px, secondary-button/theme-icon contrast in dark mode, and password submission before client hydration. Keyboard focus remains visible, including the existing site's skip link. Screens include all three demonstration lessons, public enquiry errors, eight administration sections, learner completion/feedback and minimal certificate verification. They contain explicitly synthetic records only. Do not treat them as evidence of real Lab learners or achieved outcomes.

Existing academic regression checks passed for `/`, `/teaching/1-year-mba` and `/teaching/1-year-mba/session1.html`: responses remained available, academic primary navigation remained present on Next pages, and Lab chrome did not replace it.

## Measured local performance

Measured in Chromium against the optimised local production preview before the public-only release, one warm reload per page at each viewport, without network or CPU throttling. Resource caching was warm. Values are Navigation Timing measurements, not Lighthouse or real-user web-vitals scores. They do not predict a student's device or network. Later changes enforced enquiry closure in the server API and added opening-soon notices for missing production credentials; both were separately tested.

| Page | Viewport width | DOM content loaded (ms) | Load event (ms) | Gzip HTML bytes | Total warm transfer bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| Lab home | 1440 | 122.2 | 122.6 | 14,247 | 42,368 |
| AI for Managers | 1440 | 170.6 | 171.3 | 29,132 | 57,726 |
| Strategy and Case Thinking | 1440 | 191.3 | 192.0 | 29,043 | 57,630 |
| Entrepreneurship | 1440 | 182.7 | 183.6 | 30,994 | 59,584 |
| Lab home | 360 | 119.7 | 120.1 | 14,247 | 42,366 |
| AI for Managers | 360 | 142.9 | 143.3 | 29,132 | 57,718 |
| Strategy and Case Thinking | 360 | 141.6 | 141.8 | 29,043 | 57,629 |
| Entrepreneurship | 360 | 163.3 | 163.8 | 30,994 | 59,584 |

Warm transfer includes headers and uncached navigation/resource transfers; cached resources may report zero transferred bytes. It is not the initial download weight. Full encoded/decoded sizes and resource counts are retained in the JSON evidence. Production database region, cold starts, hosting, device/network conditions and field accessibility still require checks after approved infrastructure is configured.

## Handover status

| Status | Scope |
| --- | --- |
| Implemented | Public site and three original demos; actual local persistence; established authentication and server roles; learner/admin pilot workflows; validated content editor; rubric feedback; eligibility-gated certificates/minimal verification; protected exports; encrypted backup/restore; environment template, setup/admin guides and private business planning. |
| Needs Credentials | Persistent production libSQL database/token, strong production authentication secret and canonical HTTPS origin. |
| Public Release Authorised | Programme pages, original interactive demos and draft disclosures. Without production credentials, enquiries and sign-in show opening-soon notices rather than requesting data. Payments remain disabled. |
| Needs Founder Approval | Actual operator/business contact/address, policies and professional review, adult pilot support/recovery procedures, employment separation, programme details/pricing/capacity and commercial launch configuration. |
| Deferred | Payments, automated email invitations/recovery, analytics, AI tutor, binary uploads/video hosting, repeat enrolment/cohort editing and curriculum versioning, automated survey/learning-gain/renewal reporting. |

Attendance and assessment remain human instructor responsibilities. One enrolment per learner/programme, text-only submissions and manual account/privacy support are deliberate pilot boundaries. The current local database contains synthetic users/cohorts/certificates; create a fresh reviewed production database and provision the real operator privately. See [README.md](README.md) and [admin-guide.md](admin-guide.md) for exact run and operating instructions.
