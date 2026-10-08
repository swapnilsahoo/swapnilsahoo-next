# Learning Lab — pilot administrator guide

Prepared 8 October 2026 from the implemented UI and server API. This guide describes controls, not test results or permission to launch. Complete the gates in [incorporation-and-launch.md](incorporation-and-launch.md) before collecting real enquiries, admitting learners or accepting any payment. No admin control sends email, charges a learner or contacts an institution.

## Access and first administrator

The operator configures persistent storage, an authentication secret and the correct Lab base URL through private environment variables. Run `npm.cmd run lab:setup` to initialise the schema and proposed programme content. For the first administrator, supply `LAB_ADMIN_EMAIL`, `LAB_ADMIN_PASSWORD` (at least 12 characters) and optionally `LAB_ADMIN_NAME` privately, then run `npm.cmd run lab:admin`. Remove the bootstrap password from the environment after provisioning. Do not place credentials in source control or public messages. The bootstrap command refuses to overwrite an account or add another administrator once one exists.

Sign in at `/learning-lab/login`, then open `/learning-lab/admin`. Only a database-authorised administrator can use the admin API. Learners receive a separate workspace. Public sign-up and password-recovery email are disabled; recovery and additional administrator provisioning require an authorised operator procedure, not a website role selector. Sessions expire after eight hours, and the **Sign out** control ends the session. Use a separate browser profile for operator work and sign out before leaving a shared device.

The local demo command `npm.cmd run lab:demo` needs a privately supplied `LAB_DEMO_PASSWORD`, `LAB_LOCAL_MODE=true` and an explicit local `file:` database. It creates `learner1@demo.invalid` and `learner2@demo.invalid` as synthetic learners with AI programme assignments. Keep this data in the local demo store. Synthetic records are labelled and excluded from real dashboard/export results.

## Navigation and honest saved states

The protected workspace contains **Overview, Enquiries, Accounts, Cohorts, Enrolments, Reviews, Content** and **Certificates**. Select a section with its button. Controls show loading, saved or error states. A saved confirmation means the database operation was acknowledged, not that email was delivered or payment collected. If an error appears, reload records before retrying a potentially duplicate create operation. **Try loading again** refreshes an unavailable workspace.

## Content and availability — do this before enrolment

1. In **Content**, select the programme and expand **Edit complete programme JSON**. Copy the current JSON to a secure working file or take a backup before editing.
2. Keep the existing programme slug. Edit the complete contract: audience, prerequisites, duration, format, outcomes, sessions and exercise outputs, capstone, rubric, completion rules, resource links and original demonstration lesson.
3. Choose **Validate and save curriculum**. Server validation requires rubric weights to total 100, certificate lesson count to equal the configured sessions, an in-range checkpoint answer and HTTPS resource links. Invalid JSON or a failed validation is not a saved change.
4. Review the public programme page and demonstration after saving. The public pages and workspaces read the stored content; the checked-in curriculum provides initial seed and fallback content, not a second admin editing system. A setup command does not overwrite existing edited content.

Curriculum is locked as soon as any enrolment exists for the programme, including a synthetic enrolment. The current release does not provide programme-version creation, curriculum unlocking or an automatic unlock when a cohort finishes. Finalise content before assignments and use a separate fresh local demo store for experiments. Do not remove real enrolments to bypass the lock; request a reviewed versioning/migration change instead.

Expand **Availability, dates and fees** separately. Without `LAB_LAUNCH_APPROVED=true`, only **Register Interest** with blank dates, fees and capacity can be saved; the server enforces this as well as the UI. After explicit founder approval is recorded by the deployment operator, these fields can store an approved status/start date/INR fee/capacity. Setting availability does not implement checkout, charge anyone or enforce a booking system. Payments remain disabled. Do not set the approval flag merely to experiment with public prices.

## Enquiries

In **Enquiries**, review the person's name, email, kind, selected programme, organisation if supplied, optional message, source and current optional marketing permission. The working stages are **New, Contacted, Qualified, Proposal sent, Booked, Delivered** and **Lost**. Existing **Closed (legacy)** records remain available without being reclassified automatically. Choose the appropriate stage, an optional **Responsible administrator**, an optional **Next action** (up to 500 characters), and an optional due date/time, then choose **Save enquiry workflow**. Due dates are entered and displayed in your browser's local time and stored as an absolute timestamp. An owner must be an existing administrator; learners cannot be assigned or change workflow records.

Stages describe the operator's assessment, not an automated service: “Contacted” and “Proposal sent” send no message; “Booked” confirms no payment or enrolment; “Delivered” imports no attendance or learner results. Record the supporting evidence through the approved operational process. The due date is a reminder record, not a scheduled notification. Clearing an owner, next action or due date removes that value. Older API clients that send only a stage preserve the existing workflow fields. A missing enquiry returns an error rather than a saved confirmation.

Repeated enquiries for the same kind/email/programme/organisation update the existing record rather than add another. The latest name, message and marketing choice replace those fields; the assigned owner, next action, due date and stage are preserved. Do not interpret a saved enquiry as enrolment or payment. The founder has supplied `swapnil.s@greatlakes.edu.in` as the public contact for this initiative; this contact choice does not imply employer sponsorship or a partnership. Use the approved contact for authorised responses and do not add people to marketing merely because they enquired. The displayed lead list is limited to the latest 200 records.

## Accounts and invitations

In **Accounts**, enter the learner's name, valid email and a unique temporary password of at least 12 characters. Mark **Synthetic demo account** only for invented demonstration identities. Confirm identity and agreed pilot access, then choose **Create learner account**. This creates a learner role only; it cannot promote someone to administrator.

Before provisioning a real person, confirm that they are aged 18 or over and have agreed to the approved pilot terms/privacy notice. Do not import academic student lists or provision a minor. The public enquiry form records an adult declaration; direct operator invitations need the same manual eligibility check.

No invitation email is sent. Confirm the recipient and provide the login URL and temporary password through the approved private process; do not use a public enquiry response, student distribution list or shared password sheet. Keep enough operational evidence of who authorised the invitation. The learner must replace the temporary password before accessing programme records or submitting work; changing it revokes other sessions. An account alone has no programme until assigned.

The accounts table identifies roles, demo status and whether a temporary-password change is required. Account deletion, password recovery/reset, role reassignment and additional administrator creation are not UI features in this release. Handle these through a reviewed operator process and record the action rather than inventing an email recovery workflow.

## Cohorts and programme assignment

In **Cohorts**, choose a programme, give it an internal title, choose **Draft**, **Active** or **Completed**, and mark demo status accurately before **Create cohort**. A cohort is an internal grouping. The current form creates a cohort; it does not edit an existing cohort, schedule meetings, send notifications or automatically change enrolment access when a cohort is completed.

In **Enrolments**, select a provisioned learner and programme. Optionally select a matching cohort; **Individual assignment; no cohort** is also supported. Cohorts are filtered by programme and demo/real identity. The server rejects mixing a real participant with a demo cohort. Choose **Assign programme** only after access is agreed. A learner can have one enrolment per programme in the current model; duplicate assignment produces an error, not another seat.

Assignments create active learner access independently of public fee/date availability. Therefore the administrator must enforce approval and capacity manually. This is pilot provisioning, not paid self-enrolment. Repeated participation in a new cohort of the same programme, enrolment status changes and automated capacity enforcement are not implemented.

## Attendance and lesson progress

Learners declare exercise completion in their workspace; these checkboxes are self-reported progress, not proof of attendance or competence. The instructor keeps a verified live-session attendance record separately. Calculate the attendance percentage from that evidence, including any approved alternative consistently, enter the integer from 0 to 100 in **Enrolments**, and choose **Save verified attendance**.

Saving attendance revokes an existing certificate for reassessment, even if the new percentage would still meet the threshold. Confirm the intended change before saving. Meeting attendance is not imported automatically; the operator must retain the underlying evidence appropriately. Do not improve outcome figures by marking attendance without evidence.

## Submissions and instructor review

Learners submit capstone text of 100–20,000 characters. They can import a readable UTF-8 `.txt` file up to 20 KB into their browser editor; import alone does not submit it. The server stores submitted text and an optional simple `.txt` filename, not an arbitrary uploaded binary file. A revision replaces earlier text and clears its previous assessment/approval. Learners should retain their own copies.

In **Reviews**, open **Read the submitted capstone** and assess the current text against every published criterion. The scale is 0–4, with half-point input supported: 0 no usable evidence, 1 weak, 2 developing, 3 sound, 4 strong. The weighted preview is `sum(weight × criterion score / 4)`, rounded to an integer out of 100. Write feedback of 20–5,000 characters. Record approval only after assessing originality, evidence and every criterion; scores below the programme threshold cannot be approved by the server. Choose **Save instructor review**.

Use current work, not a stale open tab. If a revision conflict is reported, reload and assess the new text before saving. The instructor, not an AI tool, makes the assessment and approval decision. Saving or changing a review revokes any previous certificate, so eligibility must be rechecked. An approved capstone alone does not meet all certificate requirements.

## Certificates and public privacy

In **Certificates**, select the learner's programme record and choose **Check eligibility and issue certificate**. The server checks completion of every configured lesson, instructor-recorded attendance and an approved capstone at or above the configured threshold. The proposed programmes use all six lessons, at least 80% attendance and an approved score of at least 60/100. A failed eligibility check creates no certificate. Issuing an already-valid certificate returns its existing verification record rather than a duplicate.

The issued record contains a non-guessable public verification identifier. **Open minimal public verification** displays status, programme, issue date and demo status. The learner's name is hidden by default; only the learner can opt in through **Save certificate privacy preference** in their own workspace. Administrators must not publish identity simply to make a certificate look more credible. Verification never exposes email, marks, attendance, feedback or assignment text, and the pages are marked for search engines not to index.

The certificate is a **Certificate of Completion**, not a degree, recognised qualification or accreditation. There is no automated emailed certificate attachment or PDF certificate generation in this release. Share a link only through the approved process and with the learner's choice about visibility.

Use **Revoke this certificate** after the approved review procedure if it was issued in error or eligibility needs reassessment. The public record then states revoked. Reissue runs eligibility checks again, creates a new verification identifier, resets public-name permission to hidden and makes the previous identifier unavailable. Preserve an appropriate operational audit of the decision and notify the learner through the approved channel; the control itself sends no notification.

## Reporting and CSV export

**Overview** shows real enquiry/enrolment/submission/valid-certificate counts and the mean score of reviewed real submissions. Demo records and revoked certificates are excluded from those applicable totals. Enquiries count only the latest 200 records shown; this is not a lifetime total. The mean is an operational score average, not proof of learning improvement, and counts are not placements, sales or causal impact.

The links **Export real leads as CSV**, **Export real enrolments as CSV** and **Export real submissions as CSV** require an authenticated administrator and exclude demo records. Exports contain:

| Export      | Included fields                                                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Leads       | ID, kind, name, email, programme, organisation, marketing permission, status, administrator owner ID, next action, due timestamp, creation and update dates; latest 200 records. |
| Enrolments  | ID, name, email, programme, attendance percentage and enrolment status.                                                                                                          |
| Submissions | ID, name, email, programme, score, approval and submission date; not submission text or feedback.                                                                                |

Export only for an authorised operational purpose, store the file securely and delete it according to the approved retention procedure. Formula-sensitive CSV cells are escaped by the server. Export does not send data to a CRM, institution, marketing provider or AI service. Keep the additional measures in [pilot-90-days.md](pilot-90-days.md) in a defined manual scorecard until collection/reporting is implemented; do not fill missing values with invented results.

## Backups, retention and manual operations

The authorised operator can run `npm.cmd run lab:backup` against the configured database to create an encrypted logical snapshot under `.data/backups`. Keep the authentication secret needed for decryption separately and securely. Do not email backups or attach them to public tickets. Enquiry workflow fields are included. Older backups omit these new nullable fields and restore them as unassigned; existing stage values remain unchanged. Sessions and authentication/rate-limit logs are excluded from this backup; the runbook must demonstrate restoration to a separate fresh store before production use.

`npm.cmd run lab:purge` is a manual deletion tool and refuses to run unless `LAB_CONFIRM_RETENTION=approved`. After actual policy approval, it removes enquiries in **New**, **Lost** or legacy **Closed** stages with no update for more than 180 days, expired rate-limit/session rows, auth rate-limit records older than one day and audit records older than 30 days. Other lead stages are retained for an operator retention review; a due date does not extend the configured retention period. It does not perform programme-record deletion or individual rights requests. These retention choices are proposed operational settings, not a legal determination; approve them and align processor/backups before using the command. Take an appropriate backup first and do not use the approval variable as a shortcut around review.

No UI automates privacy requests, institutional reporting, learner deletion, formal appeals, support email, recordings, payment collection/refunds or incorporation transfer. Assign responsible people and use the reviewed procedures described in [incorporation-and-launch.md](incorporation-and-launch.md). Keep commercial operations separate from academic employment and retain only necessary, authorised evidence.
