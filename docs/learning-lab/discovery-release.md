# Learning Lab discovery release

20 October 2026. This release implements the website priorities in the supplied growth note: make the Lab prominent, improve useful search entry pages and add tools worth returning to. It does not claim improved traffic, Google indexing, email delivery or learner outcomes.

## Implemented

- Learning Lab is a direct academic-site navigation link on full and compact desktop layouts, and the first link in the mobile menu. Existing academic destinations remain reachable. A **Start learning free** card appears below the homepage name and before the preserved biography.
- The Lab homepage states the initial audience: MBA students and early-career professionals practising strategy, applied AI and case interviews.
- Three existing courses now have a direct opening answer, descriptive search title, visible prerequisites and a meaningful 20 October revision date. Their original readings, fictional examples, decisions, checkpoints, worked answers and worksheet prompts are preserved.
- Unit economics has an editable break-even calculator with contribution, whole-unit rounding, a capacity check and the result after listed costs. Money arithmetic uses paise. Empty/invalid values and nonpositive contribution do not produce fabricated break-even results. Expected orders remain an explicit assumption.
- The AI briefing lesson has a weak/improved comparison and editable template covering task authority, evidence, missing facts, output and a five-point human review checklist.
- Customer discovery has an editable five-question interview builder and an evidence log distinguishing reported behaviour from interpretation and unknowns.
- All six courses have a share/copy control with a manual-copy fallback, plus an optional link to the owner’s existing Substack signup. This is separate from programme enquiries. No new email address is collected or subscription silently created by the Lab.
- Catalogue, path and Lab homepage social metadata describe the actual page. Course Twitter metadata no longer inherits unrelated generic text.
- The sitemap now contains **97 unique canonical URLs**, including all 25 catalogue destinations and all 13 standalone MBA sessions. Fragment identifiers are stripped and private Lab operations remain excluded. No invented modification dates were added.
- Removed the two broad route-loading boundaries that left existing lesson bodies hidden when JavaScript was disabled. Public pages now wait for complete server HTML; private workspace, sign-in and saving controls keep their own loading feedback. Interactive tools explain their JavaScript requirement and retain readable sample content.

The course tools make no network requests and do not save edits. Existing optional worksheet/note controls retain their original behaviour. Light remains the default; manual dark is available. No dependency, paid service, DNS record, account, tracking pixel or analytics SDK was added.

## Search visibility evidence

Before this release, all 14 audited core pages were HTTP 200, self-canonical and had no indexing prohibition; all 25 catalogue destinations worked and their links were present in server-rendered HTML. Robots allowed public content. A later no-JavaScript browser check found lesson bodies hidden behind the existing loading fallback, in both the original production response and the local production build. The loading-boundary change addresses that reading defect; it does not establish how Google previously rendered or indexed the pages. Fifteen catalogue destinations and the remaining standalone MBA sessions were absent from the old 70-URL sitemap; this release addresses that discovery gap.

These checks do not establish that Google indexed the pages. Actual query impressions, non-brand clicks, rankings, Search Console ownership and returning learners remain unverified. The absence of a verification meta tag does not disprove DNS verification. No Search Console indexing request, domain verification or sitemap submission was performed. No fabricated zero baseline was recorded.

A relevant Search Console integration was found through Windsor.ai, but no installation or connection was confirmed in this session. Account-level evidence requires an owner-controlled property connection. Website work and public verification do not depend on that optional integration.

Primary guidance checked: Google’s [technical requirements](https://developers.google.com/search/docs/essentials/technical), [crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [URL Inspection](https://support.google.com/webmasters/answer/9012289) and [Search Performance](https://support.google.com/webmasters/answer/10268906?hl=en). Search discovery and rankings are not guaranteed by these changes.

## Return visits and distribution

The existing Substack homepage and `/subscribe` route returned HTTP 200 and exposed an email field during a read-only check. No subscription was submitted, so its welcome message, delivery, cadence and account metrics remain untested. The Lab’s separate transactional-email setup was not activated, and the site does not promise an automatic welcome or one business case every Friday.

[The prepared distribution and pilot kit](growth-content-kit.md) includes two LinkedIn drafts, four short learning-email drafts, a proposed 30-day calendar, an adult volunteer pilot script and a measurement sheet with unknown baselines explicitly marked. No outreach, publication, recruitment, testimonial or email sending was performed. Real pilot findings and separate publication permission are needed before adding learner outcome claims.

## Validation and refresh

The calculator helper has independent expected-answer checks for the baseline, discount, capacity cap, whole-unit rounding, paise precision, zero/negative contribution and invalid/unsafe values. Run `npm run lab:test:course-tools`.

The discovery check validates all 25 catalogue targets, all 13 MBA sessions, unique fragment-free sitemap URLs, exclusion of private routes and the three complete enhanced course entries. Run `npm run lab:test:discovery`.

Browser checks passed for navigation at 320, 390, 768, 1024, 1280, 1536 and 1920px, including mobile keyboard/Escape, compact placement-menu access, default light and manual dark. The three tools passed at 320, 390, 768 and 1440px, including arithmetic changes, readable labels, containment, keyboard operation and clipboard success/denial fallbacks. Course sharing passed copy, manual-copy, native-share and cancellation paths. The checks blocked HTTP writes and created no learner, enquiry, payment or subscription records.

The production build passed compilation, TypeScript and the required existing content checks. Against the built local server, all 14 core entry pages had visible main headings without JavaScript; all six course reading sequences and practice sections were readable, with static tool samples and the JavaScript notice on the three enhanced courses. The served sitemap contained the expected 97 URLs. With JavaScript enabled, the discounted calculator, an original correct-answer checkpoint, a completed worksheet download with inspected contents and checkpoint reset passed without browser errors. These are browser checks, not observed learner outcomes.

Private evidence is under ignored `artifacts/learning-lab/growth-2026-10-20/`, `artifacts/learning-lab/discovery/` and `artifacts/learning-lab/course-tools/`. Physical Android-device testing, actual email receipt and private search/traffic metrics are separate from these browser viewport checks. The existing unrelated manual-payment draft is outside this release.
