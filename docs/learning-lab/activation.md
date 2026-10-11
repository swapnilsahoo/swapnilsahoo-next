# Activate online enquiries and the private Lab

Updated 11 October 2026. Persistent enquiries and invitation-only sign-in are active. The permanent administrator password, recurring backup/retry tasks and private Tavus readiness endpoint are now implemented and checked. The six free courses, approved contact, prepared AI mentor/prerecorded welcome and optional original donation QR remain available. Paid course checkout and personal live avatar video remain disabled. Use [the current operations closure](operations-closure.md) for deployment evidence and remaining provider-account boundaries; the bootstrap sections below are reference material for a fresh installation.

## Current production and owner access

The existing project `swapnil-sahoo-s-projects/swapnilsahoo-next` uses its connected `swapnil-learning-lab` Turso/libSQL database. Production database credentials, an independent authentication secret and the canonical HTTPS origin are configured privately. `LAB_LOCAL_MODE=false` and `LAB_LAUNCH_APPROVED=false` remain. Operational source commit `2274f84` was confirmed **READY and PROMOTED** to `www.swapnilsahoo.com` on 11 October; later backup-runner/documentation changes are recorded in the closure. The earlier `89e5936` activation was also verified despite a nonzero CLI exit. No second database, paid plan, DNS change, real learner or invitation email was created.

The approved administrator is `swapnil.s@greatlakes.edu.in`. At the owner's instruction the builder replaced the temporary password through the normal authenticated endpoint with a new independent random permanent password. Actual production checks verified administrator access, rejection of the old password, revocation of another session and final sign-out. Its owner-only Windows DPAPI recovery is `.data/lab-activation-prj_J7bQ4A0zQBS1u6BWvogfQWVSWef1/admin-password-permanent.dpapi`, beside the preserved original `auth-secret.dpapi`. No password was printed, committed or uploaded. The old `admin-password.dpapi` is retained as an obsolete audit record and cannot authenticate. Use [the safe permanent-password recovery helper](../../scripts/copy-learning-lab-admin-password.ps1), with `-CopyToClipboard` only in the owner's private session, then [the HTTPS Lab login](https://www.swapnilsahoo.com/learning-lab/login). The helper refuses copying while clipboard history/cloud sync is enabled. Clear the clipboard afterwards. DPAPI recovery needs this Windows account and its keys; the file alone is not portable.

**Do not rerun first activation against this database.** It is populated and the four core production settings already exist; a refusal from the helper now protects the activated service. Recovery, future migrations and credential rotation require separate diagnosis using the original secret.

Actual production acceptance passed ten API checks and sixteen browser checks: learner and institutional enquiries saved, the duplicate learner submission reused its record, origin/consent checks rejected invalid writes, temporary-admin sign-in and required-password restrictions worked, and sign-out revoked the session. Browser checks confirmed honest saved/no-email/no-enrolment wording, a separately mocked 503 retaining inputs, current privacy copy, light default despite saved/OS dark preferences and mobile layouts. No real learners, emails, payments or provider video sessions were created. See [the verification record](verification.md) for evidence and remaining boundaries.

Private Turso readback verified the exact two synthetic records, their complete payloads, optional marketing consent remaining false, source, workflow defaults and deduplication; only those IDs/emails were marked `is_demo=1`. The administrator's password replacement is complete, and test sessions were signed out. The original eleven-table encrypted production backup passed an independent local restore. The new workflow supports twelve tables including the transactional outbox, checks actual restoration/content/integrity/session exclusion, and independently verifies encrypted content in the owner's private GitHub backup repository. See [the backup operations](backup-operations.md) and closure for actual registered task/run evidence and laptop availability limits.

The original verifier's cleanup was previously blocked by automatic approval review. Under the owner's subsequent explicit instruction to finish operations, the exact obsolete restore file was checked and removed with a single native PowerShell file operation on 11 October. Absence was verified; no recursive deletion, production mutation or backup/recovery deletion occurred. The newer workflow separately verifies cleanup for each unique temporary restore. Raw provider details, rows and credentials were never printed. Earlier evidence remains under ignored `artifacts/learning-lab/`.

Run [the PowerShell helper](../../scripts/activate-learning-lab.ps1) in the owner's private Windows session. **Without `-Activate`, every service operation is read-only.** It reports missing access and never signs in, creates a database/token/account, changes Vercel settings or deploys. It does not change PowerShell execution policy; use a trusted session that permits reviewed local scripts.

## One-time account and database preparation

This section records the original bootstrap workflow. The actual production database is already populated and its administrator uses the permanent-password helper above; do not execute these initial-provisioning or obsolete temporary-password steps against production.

The official Vercel CLI **63.1.0** is installed globally, and the owner completed its OAuth sign-in on 9 October 2026. The exact existing project was verified as `swapnil-sahoo-s-projects/swapnilsahoo-next`; its production function region is `iad1`. The CLI folder, `C:\Users\swapn\AppData\Local\npm-global`, was added to the user PATH for future terminals. An existing terminal may need that folder prepended to its process PATH, or the full `vercel.cmd` path. On 10 October, after the owner completed Turso's terms, the native Marketplace command successfully created and connected `swapnil-learning-lab` on Starter (**$0/month**), requesting `iad1`, for production only. No paid plan or payment method was added. The initial read-only preflight found zero user tables; activation subsequently populated that same database. Do not create a second database or repeat the empty-database bootstrap. The requested provider region is not proof of the actual physical data location.

1. Install the official Vercel CLI if needed (`npm.cmd install --global vercel`) and complete `vercel login` yourself. The helper uses its existing session, not a copied API token. Confirm the existing project `swapnil-sahoo-s-projects/swapnilsahoo-next` is yours.
2. Select a fresh, empty **libSQL** database in your owner-controlled Turso account. Turso's current [free plan](https://turso.tech/pricing) needs no credit card; review current limits and keep paid overages disabled. The current [quickstart](https://docs.turso.tech/quickstart) distinguishes engines: `turso db create <name>` creates libSQL; **do not use `--tursodb`** for this app's existing driver. Provider preparation is separate from this helper. Existing compatible hosted libSQL storage also works.
3. Obtain its URL and restricted database token privately. The Turso CLI is optional when those existing credentials are supplied; if available, the helper checks `turso auth whoami`. `-DatabaseName <existing-name>` additionally checks that CLI lookup matches the supplied URL. It never calls a create or token-mint command.

Alternatively, inspect the project's existing [Turso Cloud Marketplace resources](https://vercel.com/marketplace/tursocloud/database) before creating anything. The installed [Vercel integration CLI](https://vercel.com/docs/cli/integration) can connect a database without a separate Windows Turso installation. The actual connection above already exists. It used `--no-env-pull`; only encrypted production `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` were added. These two values were resolved privately into process memory for the read-only check, using Vercel's authenticated single-variable API; unrelated variables were not decrypted. Map these existing values privately to this helper's `LAB_DATABASE_URL` and `LAB_DATABASE_AUTH_TOKEN`; never print or commit them. Do not upgrade billing or add a payment method as part of this setup. Earlier project linking generated an OIDC-only `.env.local`; that newly created credential file was removed without printing it, while the ignored project link was retained.

Set credentials in the current process using masked input, without putting values in command history or a plaintext file:

```powershell
$env:LAB_DATABASE_URL = Read-Host 'Existing libSQL database URL'
$labDatabaseToken = Read-Host 'Existing database token' -AsSecureString
$labTokenPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($labDatabaseToken)
try {
    $env:LAB_DATABASE_AUTH_TOKEN = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($labTokenPointer)
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($labTokenPointer)
    $labDatabaseToken.Dispose()
}
```

Do not run secret handling under a transcript, tracing/debug logging, screen sharing or an untrusted shell profile. Process environment and memory are not a vault against software running as your Windows account. Never paste these values into chat or commit them.

## Read-only preflight, then explicit activation

From the repository root:

```powershell
.\scripts\activate-learning-lab.ps1
# Optional: -DatabaseName your-existing-libsql-database
# If no ready production source is returned by Vercel, add:
# -ProductionDeploymentUrl https://your-existing-production-deployment.vercel.app
```

Preflight verifies authenticated Vercel access, exact existing project/scope, production environment metadata without decryption, a ready production deployment and read-only database access. It requires zero user tables. It refuses existing production `LAB_DATABASE_URL`, `LAB_DATABASE_AUTH_TOKEN`, `LAB_AUTH_SECRET` or `LAB_BASE_URL`, and refuses an existing flag that cannot be verified as plain `false`. This is deliberately a **first-activation** helper, not a migration, credential rotation or repair script.

Run from the reviewed repository version already published to that production deployment, so the bootstrap schema and deployed backend agree.

After the preflight passes, explicitly run:

```powershell
.\scripts\activate-learning-lab.ps1 -Activate
```

Use the same optional database/deployment arguments if needed. `-Activate` prompts twice for the owner's administrator password, generates an independent authentication secret, and saves a Windows DPAPI-encrypted recovery copy under ignored `.data/lab-activation-<project-id>/auth-secret.dpapi`. That directory permits only the current Windows user; the ordinary masked-prompt mode saves no administrator password, and neither mode saves a database token. Preserve it securely before any future backup: the authentication secret is also the key for existing Lab encrypted backups. DPAPI recovery requires the same Windows account and its keys; a copied file alone is insufficient.

For an explicitly authorised activation without an interactive password prompt, use:

```powershell
.\scripts\activate-learning-lab.ps1 -Activate -GenerateAdminPassword
```

This generates an independent random temporary administrator password and stores **only its DPAPI-encrypted copy** as `admin-password.dpapi` beside `auth-secret.dpapi`. No password appears in console output, command arguments, Vercel environment values or chat. The helper sets the bootstrap-only `LAB_ADMIN_MUST_CHANGE_PASSWORD=true` while provisioning, then restores the caller's original setting. The new administrator must replace the temporary password at first sign-in; both the workspace UI and server reject other admin actions until replacement. The ordinary masked-prompt mode and unflagged `lab:admin` command retain their existing behaviour. Neither mode overwrites or promotes an existing account.

To use the generated password, recover it privately on the same Windows account. Keep clipboard history/sync disabled for this step. This copies the recovered value to the local clipboard without printing it:

```powershell
$labTemporaryPassword = Get-Content -LiteralPath '.data/lab-activation-prj_J7bQ4A0zQBS1u6BWvogfQWVSWef1/admin-password.dpapi' -Raw |
    ConvertTo-SecureString
$labPasswordPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($labTemporaryPassword)
try {
    Set-Clipboard -Value ([Runtime.InteropServices.Marshal]::PtrToStringBSTR($labPasswordPointer))
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($labPasswordPointer)
    $labTemporaryPassword.Dispose()
}
```

Paste it only into the owner's HTTPS Lab sign-in and temporary-password fields, then choose a new private password in the required change screen. Clear the clipboard afterwards with `Set-Clipboard -Value ''`. Do not paste either password into chat, a transcript or a plaintext file. The encrypted recovery copy remains protected; after successful replacement it is no longer a valid login password.

The helper then runs the existing schema/content initialiser and first-administrator bootstrap, creates four **secret production-only** Vercel variables through private stdin, retains `LAB_LOCAL_MODE=false` and `LAB_LAUNCH_APPROVED=false`, checks all six keys, and redeploys the already-published production source. Each missing setting is sent as one JSON object to the queryless create endpoint, then its metadata is immediately verified; current `visibility=secret` and older `type=sensitive` records are accepted. Existing values are preserved. The CLI update notifier is disabled only within each private child command and the caller's setting is restored. The helper does not upload this working tree or its untracked files. The first administrator defaults to the approved `swapnil.s@greatlakes.edu.in`; `-AdminEmail` is available for an approved replacement. No learner or invitation email is created. Course checkout remains hard-disabled in application code.

This uses Vercel's authenticated [API command and stdin input](https://vercel.com/docs/cli/api), [sensitive environment values](https://vercel.com/docs/cli/env) and [production redeployment](https://vercel.com/docs/cli/redeploy). It never requests `upsert=true`, `--force`, variable deletion, value decryption or `.env` export. Child stdout is captured privately and stderr is suppressed, so CLI banners cannot contaminate JSON and failure messages cannot echo provider credentials. Process settings changed for bootstrap are restored even on failure.

## If activation stops after a write

This operation crosses a database and hosting API, so it cannot be one atomic transaction. A failed bootstrap, partial Vercel creation or failed build can leave a fresh schema/account or some environment keys created. The helper stops and **does not delete, overwrite, rotate or blindly retry** them. Keep the encrypted recovery copy and inspect metadata privately. Do not rerun first activation against the populated database.

On 10 October, the first batch request failed after successful schema/administrator creation and DPAPI recovery. Metadata confirmed that no Lab keys had been created. Recovery reused the same secret and existing database, created only confirmed missing settings individually through private stdin, verified all six production keys, then redeployed the verified published source. No account rebootstrap or secret rotation occurred. This observed failure motivated the per-setting protocol now used by the helper; it does not establish that every Vercel API array request is unsupported. A CLI exit code alone is insufficient to decide whether a deployment was promoted: inspect the actual deployment metadata before retrying.

For an authorised manual resume, recover the same secret into process memory without printing it:

```powershell
$labRecoveredSecret = Get-Content -LiteralPath '.data/lab-activation-EXACT-PROJECT-ID/auth-secret.dpapi' -Raw |
    ConvertTo-SecureString
$labSecretPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($labRecoveredSecret)
try {
    $env:LAB_AUTH_SECRET = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($labSecretPointer)
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($labSecretPointer)
    $labRecoveredSecret.Dispose()
}
$env:LAB_BASE_URL = 'https://www.swapnilsahoo.com'
$env:LAB_LOCAL_MODE = 'false'
$env:LAB_LAUNCH_APPROVED = 'false'
```

Keep the original owner-controlled URL/token loaded. Confirm which steps succeeded. The existing `init` command does not overwrite edited programme content; `admin` refuses to overwrite or promote an existing administrator. Review these commands in [the administrator guide](admin-guide.md) before resuming them. A schema/account failure needs diagnosis before any production redeployment.

If a manual resume still needs to create the first administrator with the generated temporary password, recover `admin-password.dpapi` using the same BSTR pattern into process `LAB_ADMIN_PASSWORD`, and set process `LAB_ADMIN_MUST_CHANGE_PASSWORD=true` for that bootstrap only. Clear both afterwards. Never retry `admin` to repair an account already created; diagnose the stopped step privately first.

If only a confirmed missing Vercel variable remains, first link the exact existing project with `vercel link --project swapnilsahoo-next --scope swapnil-sahoo-s-projects`. This writes project metadata, not credentials. Set `$labMissingName` to that one **confirmed missing** key, then pass its existing process value privately on stdin, capturing output rather than echoing it:

```powershell
$labMissingName = 'LAB_AUTH_SECRET' # Example only: select the confirmed missing key.
if ($labMissingName -notin @('LAB_DATABASE_URL','LAB_DATABASE_AUTH_TOKEN','LAB_AUTH_SECRET','LAB_BASE_URL')) {
    throw 'This recovery command only adds an approved missing core variable.'
}
$labMissingValue = [Environment]::GetEnvironmentVariable($labMissingName, 'Process')
if (-not $labMissingValue) { throw 'Load the original value privately before resuming.' }
$labSuppressedOutput = $labMissingValue | vercel env add $labMissingName production --sensitive --scope swapnil-sahoo-s-projects 2>&1
if ($LASTEXITCODE -ne 0) { throw 'Variable creation failed. Raw output was suppressed; review privately.' }
$labMissingValue = $null
$labSuppressedOutput = $null
```

Do not use force/update to resolve a conflict. Confirm both launch flags are `false` and all original values are intact before deliberately redeploying the verified production URL. Finally clear the token and recovered secret from the terminal process and close the private session. The helper preserves the caller's initial environment; it does not remove credentials that the owner loaded before starting it.

## Acceptance after a real activation

Run one controlled enquiry with the owner's consent; verify persistence and administrator visibility, duplicates and honest failure behaviour. Check HTTPS sign-in, password change/session revocation, anonymous/admin/learner boundaries and cross-learner denial using separately authorised test identities. Verify submissions, human review, attendance and certificate eligibility without treating an enquiry or donation as enrolment. Take an encrypted backup and restore it into a separate empty test database. Do not run the existing synthetic integration suite directly against the real production database.

Validation on 9 October 2026: PowerShell AST parsing and 18 isolated mocked scenarios passed, including generated-mode preflight, prompt-free provisioning, bootstrap flag restoration and failure handling. An actual local child process confirmed that a stderr banner does not contaminate JSON stdout. Both synthetic recovery secrets passed DPAPI round trips, owner-only directory ACL checks and refusal to overwrite existing files.

Four isolated local checks exercised the real administrator CLI, Better Auth and API handlers: unflagged bootstrap behaviour stayed unchanged; flagged administrators authenticated but received 403 on records; password replacement enabled records and invalidated the temporary password; repeated bootstrap preserved the existing account/password. Unused Next page-header/navigation helpers were stubbed for this direct handler test; it was not a browser or deployed-service test. Scoped ESLint and whitespace checks passed. After owner OAuth sign-in, the actual read-only preflight verified the existing Vercel project and current ready production deployment, then reported missing database credentials. Windows execution policy required a process-only `-ExecutionPolicy Bypass` invocation for the reviewed local helper; no machine or user execution policy was changed.

The production build and targeted rendered-page checks passed. Commit `e54b77b` deployed successfully. Production GET checks verified the contact/FAQ availability copy, free courses, support route and guide. A headless mobile-browser check passed light default despite stored/OS dark preferences, the guide's current enquiry answer, contact link, popup bounds and close behaviour, with no browser errors or HTTP writes. These checks did not create accounts, leads, emails, payments or provider video sessions.

The 9 October checks above validate the helper and earlier closed-service pages. They are superseded for production enquiry/sign-in availability by the actual 10 October acceptance at the top of this guide. The revised helper also passed isolated mocked checks for per-setting stdin objects, secret-visibility compatibility, immediate verification, concurrent/partial failure preservation and native stdout/stderr/update-notifier isolation. Email delivery, real learner admission and provider audiovisual quality remain unverified; their integrations or admission process have not been activated by these tests.
