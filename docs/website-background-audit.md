# Office laptop background-launch audit

Checked on 19 November 2026. The live website, production data, email/campaign jobs and production-backup schedules were not changed.

## Findings and fixes

- There was one website source-sync scheduled task, with a one-minute trigger and an owner sign-in trigger. No duplicate website task, website Startup-folder entry, website Run/RunOnce registry entry or automatic VS Code website task was found.
- The tracked launcher still used PowerShell directly with `-WindowStyle Hidden`, while an existing uncommitted change and the registered task already used `conhost.exe --headless`. The existing change was preserved, checked and synced, with an added missing-console-host guard. Direct hidden PowerShell launches can still flash with Windows Terminal; see [Microsoft's issue](https://github.com/microsoft/terminal/issues/12464). A popup was not reproduced during the final observation period.
- Source sync had paused on 18 November because its dotenv scanner used newline-matching whitespace after `=`. An empty sensitive setting could consume the next assignment and treat that setting's name as a private value. Horizontal whitespace now stays on its own line. Real credentials, indented assignments and quoted multiline values remain guarded. Actual private environment files were not modified or uploaded.
- A separate Samsung Notes batch file in the all-users Startup folder requested an administrator Command Prompt and contained registry writes. After explicit owner approval, it was moved out of Startup to `%LOCALAPPDATA%\WebsiteLaptop\startup-recovery\2026-11-19\samsung_notes.bat.disabled`. Its SHA-256 hash was unchanged. It was not executed, and its registry operations were not applied or reversed.

## Verification

- PowerShell helper syntax, scoped JavaScript lint and whitespace checks passed.
- The source-sync regression suite passed 61 isolated CLI checks using synthetic local repositories and credentials, with no network. Coverage includes blank dotenv fields, real-secret rejection, two-laptop merging, conflicts, staged-index preservation, exclusions, outgoing-history checks and interrupted-merge recovery.
- A local window audit sampled visible console windows and foreground changes 2,159 times over 142 seconds, using the Windows [window enumeration](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumwindows) and [visibility](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-iswindowvisible) APIs. Two website task starts and two completions were observed: no new visible console windows and no console focus changes. Actual source-sync state was `synced`, not merely a successful outer launcher exit.
- The single task remains enabled, headless, limited-privilege and noninteractive, with overlapping instances ignored and its existing battery/network safeguards retained. No Windows default-terminal or security policy was changed.

Window-audit evidence stays in ignored `.data/qa/background-task-audit.json`; the recovery batch file stays outside the repository. Sign-in trigger configuration was inspected without signing out or rebooting the laptop. These observations cover the tested runs, not every unrelated application's future behavior.

On the other laptop, receive the source changes and rerun **Website: Enable automatic sync** once to update that laptop's registered action. See [quiet background sync](website-two-laptops.md#quiet-background-sync).
