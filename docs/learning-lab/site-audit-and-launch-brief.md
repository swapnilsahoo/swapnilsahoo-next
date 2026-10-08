# Swapnil Sahoo Learning Lab — site audit and launch brief

Prepared 8 October 2026. This is a build and pilot planning document, not approval to publish, collect production data, charge learners or approach institutions.

## First customer and smallest useful release

The first customer is an adult MBA/management student or early-career professional who can use an AI tool but struggles to decide what to trust, how to protect confidential information and how to defend a managerial recommendation. The first offer should be a small **AI for Managers** pilot: an original decision exercise, six proposed 90-minute facilitated sessions over four weeks, a defensible capstone and instructor feedback. Proposed schedules, fees and capacity remain unapproved. All three programmes begin with **Register Interest**.

The differentiation is management judgement under uncertainty: learners make a decision, state their evidence and assumptions, test a counterargument and revise their output. Strategy and Case Thinking Lab and Entrepreneurship Under Constraint Bootcamp provide adjacent offers. Coding instruction, placement guarantees and a large course marketplace are outside the first release.

The public release contains `/learning-lab`, three programme pages and working sample exercises, separate individual and institutional enquiry paths, founder context, resources, FAQs and draft policies. The thin pilot workflow supports invited adults, assigned lessons, text submissions, instructor feedback, progress and gated completion certificates. The admin workflow uses one protected management area and real records; an empty dashboard is preferable to invented activity. Checkout, automated email, analytics and AI processing stay disabled until configured and approved.

Required positioning: **“Swapnil Sahoo Learning Lab: A founder-led professional education initiative hosted on swapnilsahoo.com.”** The initiative is presently unincorporated. Company suffixes, a CIN/GSTIN, accreditation, partnerships and the Lab's learner/revenue claims must not appear without evidence.

## Public-site findings

| Verified finding | Consequence for this build | Evidence checked on 8 October 2026 |
|---|---|---|
| The website presents strategy, entrepreneurship and innovation and describes 17 years in industry and a Ph.D. in Entrepreneurship from XLRI Jamshedpur. | Use a restrained founder biography. These are the founder's credentials, not the Lab's operating record. | [Founder homepage](https://www.swapnilsahoo.com/), independently consistent with [official faculty biography](https://www.greatlakes.edu.in/gurgaon/swapnil-sahoo/). |
| The academic teaching area contains an interactive 1-year MBA course map and session pages. | Preserve its URLs and academic scope; use new original Lab exercises rather than commercially reusing proprietary cases. | [1-year MBA teaching](https://www.swapnilsahoo.com/teaching/1-year-mba). |
| Existing AI guidance stresses disclosure, checking sources and the learner's ability to defend a submission. | Make verification and human judgement visible learning outcomes. | [AI for students](https://www.swapnilsahoo.com/ai-initiatives/ai-for-students). |
| Startup resources already use practical questions about customer discovery, constraints and decisions. | Link to useful public context; write the Lab curriculum and materials separately. | [How to build a startup](https://www.swapnilsahoo.com/teaching/how-to-build-a-startup). |
| The academic profile lists institutional history and an institutional email address. | Do not imply employers sponsor the Lab or reuse that email as the Lab's business contact. No institutional logos, student databases, recordings or endorsements are carried into commercial operations. | [Founder homepage](https://www.swapnilsahoo.com/). |

No Lab cohort, partnership, learner count, placement rate, testimonial, commercial revenue or incorporation was verified. Academic activity is not evidence of Lab outcomes. The founder portrait's existing use on the academic site does not automatically authorise its use in this venture; it remains configurable pending confirmation.

## ByteXL reference and differentiation

The official `bytexl.com` address redirects to `bytexl.ai`. Its site describes institution-integrated skilling, practice, assessment and an institutional enquiry path. Its bCAP page targets engineering students and pairs facilitated learning with task experience. These are useful product principles: connect curriculum to an institution's calendar, assess an observable output, and give institutions a clear pilot discussion route. They are self-described features of another provider, not verified outcomes or claims the Lab can adopt. Sources: [ByteXL official site](https://bytexl.ai/) and [bCAP](https://bytexl.ai/bcap), reviewed 8 October 2026.

The Lab instead starts with adult management judgement, original decision cases, constraint-based entrepreneurship and responsible AI use. ByteXL branding, layouts, proprietary curriculum, partners, logos and testimonials are not copied. A custom coding platform, video infrastructure, marketplace and employment service are deferred.

## Repository integration decision

The existing repository uses Next.js App Router, React and TypeScript; the installed package identifies Next.js 16.3.5. The Lab uses `/learning-lab` within this application and its existing deployment architecture. Existing academic routes and user changes are preserved. A dedicated Lab shell provides clear programme/enquiry navigation, with one main-site Learning Lab entry. Private planning documents under `docs/learning-lab` are not public marketing pages.

Operator name, business email/address, availability and future incorporation identity must be configurable. Public forms require real server persistence; failed persistence must produce an error rather than a success message. The learner/admin workflow requires a relational store and established authentication, not browser-only role checks. The architecture/run guide records actual dependencies, configuration and test results once implementation is complete.

## Gates before launch

| Gate | Missing decision or evidence | Owner |
|---|---|---|
| Public collection of real enquiries | Approved operator identity, independent business contact/address, final privacy/terms, storage/processor choices, retention and response owner. | Founder + lawyer + technical operator |
| Paid pilot | Approved programme/version, dates/capacity/fees, refund and participation terms, eligible merchant account and bank settlement, accountant-approved invoices/receipts and GST treatment, legal review of online-service obligations. | Founder + CA/lawyer + payment provider |
| Academic/commercial separation | Review employment/conflict rules and obtain any needed permission; document ownership/licence of all commercial materials. | Founder |
| Learner access | Named authorised admins, individual invitations, tested record isolation, support/grievance process, backups and restore procedure. | Founder + technical operator |
| Certificate issue | Configured completion rules, instructor approval, minimal public verification consent and correction/revocation procedure. | Instructor + admin |

Draft public policies are review material. Launch approval is not inferred from building the site. See [incorporation-and-launch.md](incorporation-and-launch.md), [pilot-90-days.md](pilot-90-days.md) and [business-budget.md](business-budget.md).
