# Learning Lab implementation and local handover

Prepared 8 October 2026. The founder explicitly authorised publication with “go live”. The public release includes the programme catalogue, original interactive demonstration lessons and draft policy disclosures. The founder subsequently supplied `swapnil.s@greatlakes.edu.in` as the published contact, providing a direct email route. Production database/authentication credentials and the operator address remain outstanding; online forms and sign-in display opening-soon notices until configured. No purchase, outreach, paid offer or incorporation is authorised by this release.

Start with [the audit and product brief](site-audit-and-launch-brief.md), then [the curriculum](curriculum.md), [the administrator guide](admin-guide.md), [the pilot plan](pilot-90-days.md), [the proposal](institutional-proposal.md), [the private budget](business-budget.md), and [the incorporation and launch review](incorporation-and-launch.md). These planning documents are not served by the website.

The [8 October audit response](audit-response-2026-10-08.md) records the subsequent founder decisions, contact/download improvements and enquiry follow-up workflow.

The [free-course library](free-courses.md) adds six immediately available, original self-paced courses with interactive practice and worksheets. The homepage and navigation lead into this open classroom. The founder's approximately ₹100 introductory-workshop preference is recorded separately; paid scheduling, terms and merchant activation remain unresolved. Private pilot details and additional institution enquiry fields are implemented, without enabling payment or making unapproved drafts public.

The 9 October update adds an [animated speaking guide and prerecorded welcome](../digital-avatar-created.md), preserving the default light theme and six free courses. The original PhonePe QR is available only for optional voluntary support. The [production activation guide](activation.md) supplies a tested, read-only-by-default helper for the separate enquiry and learner/admin backend. Actual activation still requires the owner's authenticated Vercel session and hosted libSQL access; the helper does not create accounts, purchase services or enable course checkout.

## Architecture

The existing Next.js 16 / React / TypeScript / Tailwind stack is preserved. Public routes live under `/learning-lab`; academic pages retain their existing URLs and navigation. A pathname boundary replaces the academic header/footer only inside the Lab. Cream, indigo, Poppins and Fraunces continue the site's identity, with light/dark themes and mobile navigation.

One Node runtime and one relational database support the pilot. libSQL provides an actual local SQLite database for development and a compatible persistent hosted database for production. Better Auth manages password hashing, signed session cookies and revocation through its Drizzle adapter. Server-side database membership determines roles; browser controls never grant permissions. Public signup is disabled. Administrators are provisioned through the protected operator CLI; administrators can provision learners. There is no external identity provider requirement.

`src/features/learning-lab/programmes.ts` supplies original seed curriculum. The administrator's validated JSON editor is the single content-editing interface. Curriculum becomes locked as soon as any learner is enrolled; changing completed-cohort curricula requires a future versioning implementation. Availability controls are separate from curriculum and cannot expose proposed fees, dates or capacity while `LAB_LAUNCH_APPROVED=false`. This approval flag is a gate, not evidence of legal review.

`src/features/learning-lab/config.ts` centralises the brand owner/label, name and positioning used by the masthead, home and footer. `LAB_OPERATOR_NAME` configures the contact-page operator separately from the founder's history. Review source, disclosures and policies together before any incorporation-related change; changing a name does not transfer legal obligations. Rebuild after branding/operator configuration changes. Closed programme enquiries are rejected transactionally by the server, including requests from stale forms.

The data model covers users, library-managed authentication accounts/sessions, membership roles/demo flags, programme content/availability, cohorts, enrolments, lesson progress, versioned text capstones, rubric feedback, certificates, enquiries, HMAC rate-limit keys and an audit trail. Production storage and credentials are required for saving enquiries or using private workspaces. Public programme content falls back to the proposed seed if storage is unavailable. API failures return an error, never a submission confirmation.

The six lesson exercises are self-reported completion declarations. Live attendance is entered separately by the instructor. Only an instructor's approved rubric assessment plus configured lessons and attendance can allow a Certificate of Completion. Verification uses 256 bits of random token entropy, reveals programme/date/status and the demo label, and hides the learner's name until that learner separately opts in. Verification URLs are bearer links: share them deliberately. Email, scores, attendance and submitted work are never exposed by public verification.

Submission revisions increment a database revision number. An instructor review must name the revision it assessed; stale reviews are rejected. Eligibility checks and dependent writes share database transactions, including submission revision, completion removal, instructor feedback, certificate issuance and first-enrolment curriculum locking. Sensitive forms stay disabled until their client submit handlers attach and use POST as their native method, so pre-hydration submission cannot put passwords into URLs.

## Local preview

Use PowerShell in this repository. Dependencies are locked with pnpm. Do not commit `.env.local`, `.data`, backups or downloaded exports.

```powershell
corepack.cmd pnpm install --frozen-lockfile
Copy-Item .env.example .env.local
$env:LAB_LOCAL_MODE='true'
$env:LAB_BASE_URL='http://localhost:3110'
$env:LAB_DATABASE_URL='file:.data/learning-lab.db'
npm.cmd run lab:setup
npm.cmd run dev -- --port 3110
```

Visit `http://localhost:3110/learning-lab`. Use **localhost consistently** for sign-in, origin checks and development assets; changing to 127.0.0.1 is a different origin. Next loads `.env.local`; standalone CLI commands use shell environment variables, so set them explicitly as above. The local database and random local secret are created under ignored `.data`. Windows file permissions depend on the workstation ACL: use a private user directory and disk encryption; Unix mode flags alone do not harden Windows ACLs.

For the optimised local preview, run `npm.cmd run build` then `npm.cmd run lab:preview`; open `http://localhost:3111/learning-lab`. This foreground helper binds to localhost and uses the local database. It performs no deployment. `node scripts/learning-lab-preview.mjs --unconfigured` provides an isolated missing-credentials preview at localhost:3112 for failure tests. Do not use either helper as a production hosting command.

In a second terminal, initialise the real local administrator in a fresh database:

```powershell
$env:LAB_LOCAL_MODE='true'
$env:LAB_DATABASE_URL='file:.data/learning-lab.db'
$env:LAB_ADMIN_EMAIL='your-approved-business-email@example.com'
$env:LAB_ADMIN_NAME='Dr. Swapnil Sahoo'
# Supply LAB_ADMIN_PASSWORD privately, with at least 12 characters.
npm.cmd run lab:admin
Remove-Item Env:LAB_ADMIN_PASSWORD
```

The bootstrap refuses to overwrite or promote an existing administrator. Use a fresh database for actual operations; the local test preview already has clearly synthetic administrators. There is no email invitation/reset delivery. Confirm recipients and communicate temporary learner passwords through a separately approved private process. Learners must change temporary passwords at first access. Production password recovery and account removal are operator-reviewed processes described in the administrator guide.

For optional synthetic learners on an explicitly local database, privately set `LAB_DEMO_PASSWORD` and run `npm.cmd run lab:demo`. This creates two `@demo.invalid` accounts and synthetic AI cohorts, excluded from real reporting. Never run synthetic seeds on production. A fuller local integration run creates its own random synthetic accounts:

```powershell
$env:LAB_LOCAL_MODE='true'
$env:LAB_BASE_URL='http://localhost:3110'
$env:LAB_DATABASE_URL='file:.data/learning-lab.db'
node --conditions=react-server --import tsx scripts/test-learning-lab.mts
```

The integration suite requires a running local server pointing at the same database. It writes local preview credentials to ignored `.data/learning-lab-preview-access.json`, without printing passwords. Test evidence goes to ignored `artifacts/learning-lab`. Do not send the credentials file to students or publish it. Each run creates new synthetic records; a fresh local database is preferred for repeat testing. Keep that test data separate from actual pilot records.

## Configuration and launch gates

| Configuration | Local preview | Production requirement |
| --- | --- | --- |
| `LAB_BASE_URL` | `http://localhost:3110` | Canonical HTTPS website origin |
| `LAB_DATABASE_URL` | `file:.data/learning-lab.db` | Persistent libSQL service URL; never an ephemeral Vercel file |
| `LAB_DATABASE_AUTH_TOKEN` | Empty for local file | Secret database token with needed database access |
| `LAB_AUTH_SECRET` | Generated private local random file | Independently generated secret, at least 32 characters; store in hosting secret manager |
| `LAB_LOCAL_MODE` | `true` only on workstation | **Unset or false**; never true on Vercel |
| `LAB_BUSINESS_EMAIL`, `LAB_BUSINESS_ADDRESS` | Founder-approved email defaults to `swapnil.s@greatlakes.edu.in`; address empty | Confirm operator address; email can be overridden with an approved replacement |
| `LAB_OPERATOR_NAME` | Defaults to Dr. Swapnil Sahoo | Approved actual operator; a name change does not transfer contracts or establish incorporation |
| `LAB_LAUNCH_APPROVED` | `false` | Founder-approved programme/operator/policy decisions before exposing confirmed availability |
| Payments | Disabled in code | Deferred integration and separate approval, credentials and provider eligibility |

Public publication was explicitly authorised on 8 October 2026. Use the existing GitHub/Vercel deployment without changing DNS. Before enabling enquiries/private access, configure a fresh persistent database, authentication, backups, approved business contact details, the real administrator and support/recovery procedures. Before any paid offer, complete operator/CA/lawyer review, policies and programme dates/fees/capacity. Keep `LAB_LAUNCH_APPROVED=false` until those commercial details are approved. Public publication does not authorise charging.

On Vercel, the server rejects file databases and generated local secrets even if `LAB_LOCAL_MODE=true` was copied accidentally. Non-Vercel deployments currently share the local enquiry IP bucket; before using another production host, configure and test its trusted-proxy client-IP handling. An arbitrary `X-Forwarded-For` header is not trusted for public enquiries.

Email, analytics, payments and cloud AI are absent rather than simulated. Forms explicitly say no confirmation email has been sent. The demo lessons run locally in the browser and do not call an AI service. The only browser storage for demo notes is opt-in. Clear notes on shared devices. No marketing pixels or invasive attribution are added.

## Backups, restoration and retention

The operator CLI uses the same database/secret environment as the app. `npm.cmd run lab:backup` takes a consistent logical snapshot of business records and credential hashes, encrypts it using AES-256-GCM, and writes `.data/backups/lab-<timestamp>.json`. It excludes sessions and rate-limit logs. The file still contains sensitive information under encryption: restrict access and copy it to approved private durable storage. Keep the matching `LAB_AUTH_SECRET` separately; loss of that secret makes the backup unrecoverable. Do not rotate or delete it without preserving the key for older snapshots.

Restore only into a fresh, empty database with the matching secret:

```powershell
$env:LAB_DATABASE_URL='file:.data/learning-lab-restored.db'
node --conditions=react-server --import tsx scripts/learning-lab.mts restore .data/backups/lab-EXACT-TIMESTAMP.json
```

The destination must have no users/enquiries/enrolments. Verify restored record counts and sign-in in an isolated preview; sessions are intentionally not restored. Schedule backups and a restore drill externally before any pilot; no unattended backup scheduler is claimed. Hosted database provider backup/availability terms must be reviewed separately.

Retention is a draft operator decision. After approval, `LAB_CONFIRM_RETENTION=approved` permits `npm.cmd run lab:purge` to remove new/closed enquiries unchanged for 180 days, expired sessions/rate-limit records, old authentication rate logs and audit entries over 30 days. Qualified/contacted enquiries and course/certificate records require manual review. The purge command is destructive: take a backup and confirm the approved policy first. Responding to access/correction/deletion/consent requests remains a manual verified operator process; no automatic legal-compliance claim is made.

## Known boundaries

- Capstones accept pasted text or locally imported UTF-8 `.txt` files. Only validated text and a simple filename reach the server. Binary uploads, public file storage, arbitrary HTML rendering and custom video hosting are intentionally absent.
- One enrolment per learner per programme; cohort reassignment, programme versioning, bulk imports, lifecycle deletion and automated reset-email delivery need a later operational extension.
- Cohort status describes the created cohort; attendance is manually verified. It is not a timetabling or live-video system.
- Reports show actual operational records and exclude synthetic participants. Enquiries show the latest 200; conversion, learning gain, satisfaction, refunds and renewal need the defined manual collection process in the pilot plan. No achievement claims are manufactured.
- Keyboard, responsive, contrast and semantic checks support a WCAG 2.2 AA-oriented design. They do not constitute an independent accessibility certification or exhaustive assistive-technology audit.
- Pricing scenarios and listing aspirations are private planning, not public offers or promises. The business is a founder-led initiative pending incorporation and professional review.

See `verification.md` for commands actually run, measurements, screenshots and limitations. Recurring database, hosting, support and future email/payment costs depend on selected provider plans and pilot load; private budget assumptions are scenarios, not purchased subscriptions or guaranteed prices.
