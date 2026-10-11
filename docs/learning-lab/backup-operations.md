# Learning Lab daily backup operations

The reviewed workflow is `scripts/backup-learning-lab.ps1`. Registration and the first actual run must be recorded separately; implementation and synthetic tests alone do not prove a daily task ran or an off-site upload completed.

The owner Windows account uses its existing authenticated Vercel CLI to read only the selected Production `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`. The helper executes the official installed CLI JavaScript entry point with Node, because the local command shim returned empty stdout in actual native checks. `NO_UPDATE_NOTIFIER=1` applies only while each private command runs. No environment file, Vercel auth file, provider token file, new token, cloud database or billing configuration is created. Missing/unreadable credentials fail rather than being replaced. The original authentication secret is decrypted in memory from the existing owner-only Windows DPAPI recovery copy; credentials and keys never appear in command arguments, reports or stdout.

Production is read through a transaction using `@libsql/client` directly. The application schema initializer and migrations are never called on the production connection. The AES-256-GCM envelope is compatible with `lab:restore`. It contains twelve supported tables: users, accounts, members, programmes, cohorts, enrolments, progress, submissions, certificates, enquiries, audit and the email outbox. An installation or older backup without the outbox is accepted as an empty outbox. Sessions and verification/authentication/rate-limit records are excluded.

Each run restores the actual encrypted file through the existing CLI into a unique fresh database under the protected local `work` directory. All table counts and canonical content must match; local integrity and foreign-key checks must pass, and restored sessions must be empty. Queued email deliberately differs: restored **pending**/**processing** rows become **review**, with `last_error_code=restored-review-required` and cleared lease fields. The immutable payload, idempotency key and provider reference remain unchanged. Other email states remain unchanged. No restored message is sent. The verifier checks this transformation and compares the production structural schema before/after through `sqlite_master`, because the remote endpoint does not support `PRAGMA schema_version`.

## Paths and destinations

For the existing Vercel project `prj_J7bQ4A0zQBS1u6BWvogfQWVSWef1`:

- Recovery: `.data/lab-activation-prj_J7bQ4A0zQBS1u6BWvogfQWVSWef1/auth-secret.dpapi`. It stays separate and is never uploaded.
- Managed encrypted files: `.data/lab-backup-prj_J7bQ4A0zQBS1u6BWvogfQWVSWef1/backups`.
- Safe run/manifest reports: the same managed root's `reports`; `latest-wrapper.json` records the wrapper, including GitHub verification and failures.
- Temporary restores: the same managed root's `work`, protected for the current Windows owner. A separate local verifier process releases native database handles on exit. Cleanup then removes only this run's exact database/WAL/SHM/journal filenames. A transient `EBUSY` gets at most four short retries of the same exact file; permissions/policy failures are never retried or bypassed. Cleanup failure is reported separately from completed backup/restore checks, returns failure, and preserves the protected file for review.
- Synced encrypted copies: the registry-configured **personal** OneDrive folder's `Learning Lab Encrypted Backups` child. The helper rejects an institutional fallback, mismatched root, junction or symbolic link. Normal OneDrive Files On-Demand cloud placeholders are permitted. Local files/folders are restricted to the current owner; this ACL does not replace cloud-account access controls.
- Optional independently verified destination: the existing private personal GitHub repository `swapnilsahoo/swapnil-learning-lab-backups`, under `backups/daily/<immutable-filename>.json`.

Local inspection on 11 October found the personal OneDrive configuration at `C:\Users\swapn\OneDrive\New folder (2)\OneDrive` and a running OneDrive client. A byte-for-byte encrypted file copied there means **locally queued**. It does not prove Microsoft received the upload. The report keeps `cloudUploadConfirmed=false` for OneDrive; the owner can independently check the file in the cloud UI. If the client is stopped, the report explicitly flags that it awaits the owner client.

With `-GitHubRepository`, the helper verifies the current authenticated GitHub owner, exact existing repository identity, private visibility and write permission before upload. It creates an immutable filename without a replacement SHA, sends only the encrypted envelope on stdin, then fetches that exact content and compares SHA-256 privately. A confirmed content readback sets the wrapper's `cloudUploadConfirmed=true`. No key, DPAPI file, plaintext data, screenshot, report, environment file or other repository content is uploaded. Files above **900,000 bytes** fail with `GITHUB_ENCRYPTED_BACKUP_SIZE_LIMIT`; a new large-file/off-site approach must be reviewed before raising that bound. The repository is not created by the helper.

## First controlled run and schedule

Run from the owner Windows account; the checkout and locked dependencies must remain available. Default execution is local preflight only and decrypts nothing:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\backup-learning-lab.ps1 -PassThru
```

The real operation uses the existing logins and recovery key:

```powershell
powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -File .\scripts\backup-learning-lab.ps1 -Run -GitHubRepository swapnilsahoo/swapnil-learning-lab-backups
```

The scheduled action should use the absolute reviewed script path and that same command. The root's planned registration is daily at **09:00 IST** plus owner logon, owner `Interactive`/`Limited`, hidden process, `StartWhenAvailable`, network available, battery allowed, `MultipleInstances=IgnoreNew`, no waking the computer, and a 15-minute execution limit. An interactive-owner task avoids storing a Windows password and uses the already running personal OneDrive session; it runs only while that account is logged in. DPAPI recovery and the Vercel/GitHub logins are tied to that account. A sleeping/offline laptop cannot provide a guaranteed 24-hour backup interval. Registration is performed by the root operator; this helper does not register, enable or modify a scheduled task. Record the actual registered settings and first verified run separately.

Task Scheduler reports a failed run when the script exits nonzero. Inspect the data-free `reports/latest-wrapper.json` for the fixed failure stage/code and the individual `*.operation.json` reports for backup/restore/copy/cleanup outcomes. Do not post raw native CLI errors. A task must be inspected for a recent success rather than inferred from its registered state. An expired provider login, missing recovery key, stale `running.lock`, corrupt backup, restore mismatch, unavailable sync root, oversized GitHub upload or remote content mismatch fails visibly. A stale lock is preserved; investigate the previous process before manually removing its exact file. No emails, webhooks or external failure notifications are sent by this workflow.

## Retention and recovery

Default retention is **report only**; no existing backup is deleted. `-PruneManagedBackups` enables selection of the newest verified snapshot per day for the most recent 30 UTC days plus the newest per month for 12 available months, always keeping the newest verified snapshot. It removes only exact workflow-created pairs whose protected local manifest and both local/synced encrypted hashes still match. Unmanaged, incomplete, corrupt or changed files are preserved for review. Activation recovery/backups and all other folders are outside this scope. This is encrypted-backup retention, separate from production learner/enquiry retention; the workflow never runs `lab:purge`.

GitHub retention remains append-only: the helper performs **no remote deletion**. Git history retains prior committed ciphertext even if a future policy removes paths from the current tree; no claim of true historical deletion is made. Review storage growth and the repository lifecycle separately. Encryption does not remove the need to retain the original key safely or to follow the approved records policy.

For recovery, retrieve an encrypted backup from the private destination and preserve the original key independently. The DPAPI file alone is not portable: recovery requires the same Windows account and its DPAPI keys. Run `lab:restore` only into a fresh empty store; never restore over production. Check table comparisons, mail quarantine, integrity, foreign keys and empty sessions before switching any application. Scheduled successful local restores exercise this procedure daily but do not test loss of the Windows account or its DPAPI keys.

## Focused verification

`node scripts/test-learning-lab-daily-backup.mjs` uses only unique synthetic local databases and isolated sync folders. It checks SELECT-only snapshot access, authenticated encryption/corruption/wrong-key rejection, actual twelve-table CLI restore, mail quarantine, source preservation, legacy eleven-table restore, stale-lock preservation, retention selection and safe failure reporting. `powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/test-learning-lab-daily-backup.ps1` exercises helpers with synthetic DPAPI/ACL files and mocked provider responses: native stdout/stderr isolation, direct official Vercel entry point, selected/duplicate/unreadable credentials, private GitHub ownership, encrypted immutable upload/readback, mismatch rejection and the upload-size limit. Neither suite accesses actual recovery secrets, authenticated provider APIs, OneDrive data or production.
