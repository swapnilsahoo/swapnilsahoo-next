# Work on the website from either laptop

Website: **www.swapnilsahoo.com**, including the Learning Lab.
GitHub: <https://github.com/swapnilsahoo/swapnilsahoo-next>.
Shared working branch: **laptop-sync**.

Both laptops use the same GitHub branch. VS Code saves edits after a short pause, and a Windows task checks for saved website changes every minute while you are signed in and online. It commits and uploads your website work, downloads changes from the other laptop, and combines changes when Git can do so safely. Closing VS Code does not disable the scheduled task.

GitHub is the common source of website code. Files that have not been saved, an offline/sleeping laptop, failed authentication and conflicting edits cannot be instantly synchronized. Check **Website: Sync status** before changing laptops. A successful check should show the local and cloud commit matching. If it reports pending work, offline or paused, that laptop has not finished syncing.

## First setup on your office laptop

1. Open **PowerShell** in VS Code's Terminal menu.
2. Run the supplied `Office-Laptop-Setup.ps1` bootstrap. It downloads a pinned, checksum-verified copy of the setup script from this repository.
3. Sign into your **swapnilsahoo** GitHub account if GitHub asks. Complete account login yourself. The script does not copy account cookies or passwords between laptops.
4. Let installation finish. The website opens in VS Code from `%USERPROFILE%\web\site`, outside OneDrive.
5. Use **Terminal → Run Task → Website: Start local preview**. Open <http://localhost:3110> and, for the payment page, <http://localhost:3110/learning-lab/checkout>.

The same bootstrap is stored at [scripts/setup-office-laptop.ps1](../scripts/setup-office-laptop.ps1) on the **laptop-sync** branch, so it can be retrieved from GitHub after losing either laptop. Keep the Word guide and a copy of the bootstrap somewhere you can access independently of this computer.

The script checks Git, Node.js 24 and GitHub CLI, and can install missing tools using Windows Package Manager. The project pins pnpm **11.21.0**. It installs the locked dependencies, creates a separate local Learning Lab database, adds the existing Vercel project's nonsecret link and enables the source-sync task. It does not create a new website, cloud database or production administrator.

Initial setup checks out every current website file first. It then fetches commit history, leaving old versions of large assets on GitHub until you need them. If the history download fails, the current checkout remains usable. Rerun setup while online before merging branches that need older history.

If your office manages software installation, use its normal IT process for any blocked prerequisite. The script does not change Windows security policies or bypass company controls. If Node is already installed in an incompatible version, resolve that prerequisite before rerunning setup.

If you already have a second clone on the office laptop, do not copy this project over it. Choose one working folder and keep any unfinished work. Setup refuses to overwrite an unrelated directory or switch a dirty repository from another branch.

## Daily use

1. Start the laptop and connect to the internet. Use **Website: Sync now**, then **Website: Sync status** before editing.
2. Open the website folder in VS Code. Work with your preferred coding assistant or edit any website page yourself. Source instructions and documentation travel with the repository; an AI chat transcript is not required to rebuild the project.
3. Preview changes locally using **Website: Start local preview**. The preview belongs to the laptop running it; `localhost` on the other laptop is its own server.
4. Before leaving, save your work and run **Website: Sync now**. Confirm the cloud and local commits match before starting on the other laptop.

You do not need to leave both laptops switched on. The computer you are using syncs to GitHub; the other receives those commits when it is next online and signed in. Avoid simultaneously changing the same paragraph/component on both laptops. Independent changes can normally be combined; a conflict pauses automation for review.

The VS Code tasks are:

- **Website: Start local preview** — run the isolated development server.
- **Website: Sync now** — commit, download/merge and upload saved website changes.
- **Website: Sync status** — inspect the most recent result.
- **Website: Enable automatic sync** — register the per-minute/logon Windows task.
- **Website: Disable automatic sync** — stop future automatic runs.

The same operations can be run from a PowerShell terminal in the website folder:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\website-laptop.ps1 -Mode Sync -RepoPath (Get-Location).Path
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\website-laptop.ps1 -Mode Status -RepoPath (Get-Location).Path
```

Automatic commits are checkpoints, not proof that an edit passes tests. Run the checks appropriate to a change before publishing it.

## Publishing the public website

Automatic source sync uses **laptop-sync** and does not push `main` or run a deployment. When a set of changes is ready, review and test it, then merge the working branch to `main` using a reviewed pull request and explicitly publish the release to the existing Vercel project.

Disable automatic sync before deliberately switching branches or preparing a release. Return to **laptop-sync** and enable it again when that work is complete. The worker checks the branch and pauses if you are elsewhere.

The 16 November project inspection returned no linked Git repository in Vercel. Do not assume a GitHub push publishes this website automatically. Deploying through the signed-in Vercel account is a separate operation; a future Git connection can change that behavior.

The Vercel project is **swapnilsahoo-next**, under **swapnil-sahoo-s-projects**:

```json
{
  "projectId": "prj_J7bQ4A0zQBS1u6BWvogfQWVSWef1",
  "orgId": "team_cBscvpUlMomd60kmZYUnmS9S",
  "projectName": "swapnilsahoo-next"
}
```

Sign into Vercel separately on each laptop when deployment or project administration is required. The existing domain, cloud database and Vercel environment settings belong to their cloud accounts, so changing laptop does not recreate them. Setup writes only the ignored project-link metadata; it does not pull production secrets into the local development environment.

## Credentials, data and integrations

GitHub source sync includes website code, content, public assets, configuration templates, scripts and documentation. Actual `.env` files, `.data`, `.vercel`, dependency/build folders, local reports and private recovery files are excluded. The repository is public, so private credentials must stay outside Git. The sync worker checks common secret patterns and known local secret values before uploads; this is an additional check, not a guarantee that every type of private information is detectable.

Each laptop has its own local development database. Learner submissions and live administrator records remain in the existing cloud database; local test records do not merge between laptops. This keeps ordinary local editing separate from production data.

The fresh local configuration keeps email sending, live avatar calls and paid-cohort launch disabled. Razorpay needs matching **test** credentials added privately on the office laptop before its test checkout is available. Vercel production variables stay in Vercel. Use the provider dashboard or your private credential manager for keys; do not paste them into source files, GitHub issues or prompts intended for publication.

Keep the **personal laptop** as the scheduled production-backup/email/campaign operator initially. The source-sync task is independent and can run on both laptops. Existing production-operation recovery files use Windows DPAPI and cannot simply be copied to another Windows account. Moving those responsibilities requires a separate secure credential/state handover; see [backup operations](learning-lab/backup-operations.md) and [the administrator guide](learning-lab/admin-guide.md).

## If sync pauses

Open **Website: Sync status**. Do not delete the project, force-push, reset or clean the working directory. Common cases:

- **Offline/authentication failure:** reconnect or sign into the correct GitHub account. A normal scheduled run can retry.
- **Manually staged work:** finish your deliberate commit or unstage it through VS Code after reviewing it; automation preserves existing staging.
- **Merge conflict:** both versions remain in Git. Ask the coding assistant to reconcile the changes and complete the merge.
- **Possible credential:** remove the private value from source and check any unpushed commits that contain it. Moving it out of the latest file alone does not remove it from history.
- **Different branch:** return to the intended shared branch after preserving unfinished work. Automation does not switch branches underneath you.

After resolving a persistent pause, resume with:

```powershell
node scripts/website-sync.mjs --repo (Get-Location).Path --branch laptop-sync --resume --once
```

## Prompt to paste into your coding assistant

```text
This repository is my website www.swapnilsahoo.com and its Learning Lab.
I work from two Windows laptops. Our shared source branch is laptop-sync at
https://github.com/swapnilsahoo/swapnilsahoo-next.git.

Read AGENTS.md and docs/website-two-laptops.md first. Check sync status and
preserve all unfinished changes. Use scripts/website-laptop.ps1 for local
setup/start/sync, Node 24 and pnpm 11.21.0. Develop against localhost:3110
with the isolated local Lab database. Check the relevant source before editing.

Saved public website source is automatically committed and synced to GitHub.
Finish by running a sync and reporting the cloud commit and any pending work.
Never force-push, reset/clean away work or hide conflicts. If sync pauses,
inspect the reason and reconcile both versions before resuming.

Keep actual credentials, .env files, local data and recovery keys out of Git.
Do not initialize production, recreate its administrator/database, run production
email/campaign tasks or register duplicate production-backup schedules.
Publish to the live website only when I explicitly ask for publication.
```

Git's merge behavior is described in [GitHub's remote-work guide](https://docs.github.com/en/get-started/using-git/getting-changes-from-a-remote-repository) and the [Git merge documentation](https://git-scm.com/docs/git-merge).
