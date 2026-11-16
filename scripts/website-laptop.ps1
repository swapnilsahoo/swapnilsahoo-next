#requires -Version 5.1
<#
.SYNOPSIS
Sets up this website on a Windows laptop and controls its source-only Git sync.
.DESCRIPTION
Setup never pushes or deploys. Local preview overrides inherited cloud settings.
Private recovery credentials and production schedules need a separate handover.
#>
[CmdletBinding()]
param(
    [ValidateSet('Setup','Start','Sync','Status','EnableAutoSync','DisableAutoSync','Open')]
    [string]$Mode = 'Setup',
    [string]$RepoPath = (Join-Path $env:USERPROFILE 'web\site'),
    [string]$Branch = 'laptop-sync',
    [string]$BundlePath = '',
    [switch]$InstallMissingTools,
    [switch]$ConnectGitHub,
    [switch]$NoOpen,
    [string]$TestRemote = '',
    [string]$NodePath = ''
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version 2.0
$RepoPath = [IO.Path]::GetFullPath($RepoPath).TrimEnd('\')
$sourceRemote = 'https://github.com/swapnilsahoo/swapnilsahoo-next.git'
$pnpmVersion = '11.21.0'
$localSettings = [ordered]@{
    LAB_LOCAL_MODE='true'; LAB_BASE_URL='http://localhost:3110'
    LAB_DATABASE_URL='file:.data/learning-lab.db'; LAB_DATABASE_AUTH_TOKEN=''; LAB_AUTH_SECRET=''
    LAB_LAUNCH_APPROVED='false'; LAB_ADMIN_EMAIL=''; LAB_ADMIN_NAME=''; LAB_ADMIN_PASSWORD=''
    LAB_ADMIN_MUST_CHANGE_PASSWORD=''; LAB_DEMO_PASSWORD=''; LAB_CONFIRM_RETENTION=''
    LAB_EMAIL_ENABLED='false'; RESEND_API_KEY=''; LAB_EMAIL_FROM=''
    LAB_EMAIL_VERIFIED_DOMAIN=''; LAB_EMAIL_DOMAIN_VERIFIED='false'
    LAB_EMAIL_REPLY_TO=''; LAB_EMAIL_OPERATOR_TO=''; LAB_EMAIL_DAILY_LIMIT='80'
    DIGITAL_AVATAR_ENABLED='false'; DIGITAL_AVATAR_PROVIDER='1mind'
    DIGITAL_AVATAR_BASE_URL='http://localhost:3110'; DIGITAL_AVATAR_SESSION_SECRET=''
    DIGITAL_AVATAR_DAILY_SESSION_LIMIT=''; DIGITAL_AVATAR_SESSION_SECONDS='300'
    ONEMIND_EMBED_URL=''; ONEMIND_DEPLOYMENT_APPROVED='false'
    TAVUS_API_KEY=''; TAVUS_FACE_ID=''; TAVUS_PAL_ID=''; TAVUS_LESSON_DOCUMENT_IDS='{}'
    RAZORPAY_KEY_ID=''; RAZORPAY_KEY_SECRET=''; NEXT_PUBLIC_RAZORPAY_KEY_ID=''
    TURSO_DATABASE_URL=''; TURSO_AUTH_TOKEN=''; VERCEL=''; VERCEL_ENV=''; VERCEL_URL=''
}

function Find-Tool([string]$Name) {
    $found = Get-Command $Name -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) { return $found.Source }
    return $null
}
function Refresh-ToolPath {
    $env:PATH = @([Environment]::GetEnvironmentVariable('PATH','Machine'),
        [Environment]::GetEnvironmentVariable('PATH','User'), $env:PATH) -join ';'
}
function Install-Tool([string]$Id) {
    $winget = Find-Tool 'winget.exe'
    if (-not $winget) { throw 'Install Microsoft App Installer (winget), then rerun with -InstallMissingTools.' }
    $installArguments = @('install','--id',$Id,'--exact','--silent','--accept-source-agreements','--accept-package-agreements','--disable-interactivity')
    if ($Id -eq 'OpenJS.NodeJS.LTS') { $installArguments += @('--version','24.19.0') }
    & $winget @installArguments
    if ($LASTEXITCODE -ne 0) { throw "Installation of $Id did not finish. Install it manually and rerun." }
    Refresh-ToolPath
}
function Require-Git {
    $script:git = Find-Tool 'git.exe'
    if (-not $script:git -and $InstallMissingTools -and $Mode -eq 'Setup') {
        Install-Tool 'Git.Git'; $script:git = Find-Tool 'git.exe'
    }
    if (-not $script:git) { throw 'Install Git for Windows, or rerun Setup with -InstallMissingTools.' }
    if ($Branch.Length -gt 128 -or $Branch -notmatch '^[A-Za-z0-9][A-Za-z0-9._/-]*$') {
        throw 'Use a normal Git branch name, for example laptop-sync.'
    }
    & $script:git check-ref-format --branch $Branch *> $null
    if ($LASTEXITCODE -ne 0) { throw 'Invalid Git branch name.' }
}
function Require-Node {
    if ($NodePath) {
        $script:node = [IO.Path]::GetFullPath($NodePath)
        if (-not (Test-Path -LiteralPath $script:node -PathType Leaf)) { throw 'The configured Node executable is missing.' }
    } else { $script:node = Find-Tool 'node.exe' }
    if (-not $script:node -and $InstallMissingTools -and $Mode -eq 'Setup') {
        Install-Tool 'OpenJS.NodeJS.LTS'; $script:node = Find-Tool 'node.exe'
    }
    if (-not $script:node) { throw 'Install Node.js 24 LTS, or rerun Setup with -InstallMissingTools.' }
    $version = & $script:node --version
    if ($LASTEXITCODE -ne 0 -or $version -notmatch '^v24\.\d+\.\d+$' -or [version]$version.TrimStart('v') -lt [version]'24.19.0') {
        throw 'This project requires Node.js 24.19.0 or a newer 24.x release. Select/install Node 24, reopen PowerShell, and rerun.'
    }
}
function Invoke-Git([string[]]$Arguments, [switch]$OutsideRepository) {
    $gitArguments = $Arguments
    if (-not $OutsideRepository) { $gitArguments = @('-C',$RepoPath) + $Arguments }
    $start = [Diagnostics.ProcessStartInfo]::new()
    $start.FileName = $script:git
    $start.Arguments = (@($gitArguments | ForEach-Object { Quote-Argument $_ }) -join ' ')
    $start.UseShellExecute = $false; $start.CreateNoWindow = $true
    $start.RedirectStandardOutput = $true; $start.RedirectStandardError = $true
    $process = [Diagnostics.Process]::new(); $process.StartInfo = $start
    try {
        if (-not $process.Start()) { throw 'Git could not start.' }
        $stdout = $process.StandardOutput.ReadToEndAsync()
        $stderr = $process.StandardError.ReadToEndAsync()
        $process.WaitForExit()
        $output = $stdout.GetAwaiter().GetResult()
        $null = $stderr.GetAwaiter().GetResult()
        if ($process.ExitCode -ne 0) { throw 'Git did not complete. Check access and the checkout state, then rerun.' }
        if ($output.Length) { return $output.TrimEnd([char[]]"`r`n") -split '\r?\n' }
    } finally { $process.Dispose() }
}
function Get-ExpectedRemote {
    if (-not $TestRemote) { return $sourceRemote }
    if ($env:WEBSITE_SYNC_TEST -ne '1' -or $env:NODE_ENV -eq 'production') {
        throw '-TestRemote requires WEBSITE_SYNC_TEST=1 in a non-production test process.'
    }
    if ($TestRemote -match '^[a-zA-Z][a-zA-Z0-9+.-]*://' -or $TestRemote -match '^git@') {
        throw '-TestRemote accepts only an existing local bare Git repository.'
    }
    $testPath = [IO.Path]::GetFullPath($TestRemote)
    if (-not (Test-Path -LiteralPath $testPath -PathType Container)) { throw 'The local test remote does not exist.' }
    $bare = & $script:git -C $testPath rev-parse --is-bare-repository 2>$null
    if ($LASTEXITCODE -ne 0 -or $bare -ne 'true') { throw '-TestRemote must be a local bare Git repository.' }
    return $testPath
}
function Assert-Repository {
    if (-not (Test-Path -LiteralPath $RepoPath -PathType Container)) { throw 'Checkout not found. Run -Mode Setup first.' }
    $top = & $script:git -C $RepoPath rev-parse --show-toplevel 2>$null
    if ($LASTEXITCODE -ne 0 -or [IO.Path]::GetFullPath([string]$top).TrimEnd('\') -ine $RepoPath) {
        throw 'RepoPath must name the website checkout root.'
    }
    $remote = [string](Invoke-Git -Arguments @('remote','get-url','origin'))
    if ($TestRemote) {
        if ([IO.Path]::GetFullPath($remote).TrimEnd('\') -ine $script:expectedRemote.TrimEnd('\')) {
            throw 'Existing origin does not match the explicitly selected local test remote.'
        }
    } elseif ($remote -notmatch '^(https://github\.com/|git@github\.com:|ssh://git@github\.com/)swapnilsahoo/swapnilsahoo-next(\.git)?/?$') {
        throw 'Origin is not the expected swapnilsahoo/swapnilsahoo-next GitHub repository. Nothing was changed.'
    }
}
function Get-TaskName {
    $sha = [Security.Cryptography.SHA256]::Create()
    try { $hash = $sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($RepoPath.ToLowerInvariant() + '|' + $Branch)) }
    finally { $sha.Dispose() }
    return 'Swapnil Website Source Sync ' + ([BitConverter]::ToString($hash).Replace('-','').Substring(0,16))
}
function Quote-Argument([string]$Value) {
    if ($Value.Contains('"') -or $Value.Contains("`r") -or $Value.Contains("`n")) { throw 'Unexpected quote or newline in a task path.' }
    return '"' + $Value + '"'
}
function Get-LocalTestPayment {
    # Never mix a key from one file with a secret from another; never echo values.
    foreach ($fileName in @('.env.local','.env')) {
        $file = Join-Path $RepoPath $fileName
        if (-not (Test-Path -LiteralPath $file -PathType Leaf)) { continue }
        if ((Get-Item -LiteralPath $file).Attributes -band [IO.FileAttributes]::ReparsePoint) { continue }
        $pair = @{}
        $duplicate = $false
        foreach ($line in [IO.File]::ReadLines($file)) {
            if ($line -notmatch '^\s*(?:export\s+)?(RAZORPAY_KEY_ID|RAZORPAY_KEY_SECRET|NEXT_PUBLIC_RAZORPAY_KEY_ID)\s*=\s*(.*)$') { continue }
            $name = $matches[1]; $value = $matches[2].Trim()
            if ($pair.ContainsKey($name)) { $duplicate = $true }
            if ($value -match '^([''"])(.*?)\1\s*(?:#.*)?$') { $value = $matches[2] }
            else { $value = ($value -split '#',2)[0].Trim() }
            $pair[$name] = $value
        }
        if (-not $duplicate -and $pair['RAZORPAY_KEY_ID'] -match '^rzp_test_[A-Za-z0-9]+$' -and
            $pair['RAZORPAY_KEY_SECRET'] -match '^[A-Za-z0-9_-]{12,256}$' -and
            (-not $pair['NEXT_PUBLIC_RAZORPAY_KEY_ID'] -or $pair['NEXT_PUBLIC_RAZORPAY_KEY_ID'] -eq $pair['RAZORPAY_KEY_ID'])) {
            return @{ KeyId=$pair['RAZORPAY_KEY_ID']; Secret=$pair['RAZORPAY_KEY_SECRET'] }
        }
    }
    return $null
}
function Invoke-Local([string]$Command, [string[]]$Arguments, [switch]$AllowTestPayments) {
    # Explicit child entries (including empty values) prevent Next from loading a
    # preserved .env.local's cloud credentials. Parent environment stays untouched.
    $start = [Diagnostics.ProcessStartInfo]::new()
    $start.FileName = $Command
    $start.Arguments = (@($Arguments | ForEach-Object { Quote-Argument $_ }) -join ' ')
    $start.WorkingDirectory = $RepoPath
    $start.UseShellExecute = $false
    $start.CreateNoWindow = $true
    $start.RedirectStandardOutput = $true
    $start.RedirectStandardError = $true
    $names = @($start.EnvironmentVariables.Keys | Where-Object {
        $_ -match '^(LAB_|VERCEL|TURSO_|RAZORPAY_|NEXT_PUBLIC_RAZORPAY_|RESEND_|DIGITAL_AVATAR_|ONEMIND_|TAVUS_)'
    })
    foreach ($name in $names) { $start.EnvironmentVariables[$name] = '' }
    foreach ($entry in $localSettings.GetEnumerator()) { $start.EnvironmentVariables[$entry.Key] = $entry.Value }
    $start.EnvironmentVariables['COREPACK_ENABLE_AUTO_PIN'] = '0'
    if ($AllowTestPayments) {
        $testPayment = Get-LocalTestPayment
        if ($testPayment) {
            $start.EnvironmentVariables['RAZORPAY_KEY_ID'] = $testPayment.KeyId
            $start.EnvironmentVariables['RAZORPAY_KEY_SECRET'] = $testPayment.Secret
            $start.EnvironmentVariables['NEXT_PUBLIC_RAZORPAY_KEY_ID'] = $testPayment.KeyId
            Write-Host 'A private Razorpay test-mode key pair is enabled for this local preview.'
        }
    }
    $start.EnvironmentVariables['NODE_ENV'] = 'development'
    $process = [Diagnostics.Process]::new()
    $process.StartInfo = $start
    $started = $false
    try {
        if (-not $process.Start()) { throw 'The local command could not start.' }
        $started = $true
        $stdout = $process.StandardOutput.ReadLineAsync()
        $stderr = $process.StandardError.ReadLineAsync()
        $outDone = $false; $errDone = $false
        while (-not ($outDone -and $errDone)) {
            if (-not $outDone -and $stdout.IsCompleted) {
                $line = $stdout.GetAwaiter().GetResult()
                if ($null -eq $line) { $outDone = $true }
                else { Write-Host $line; $stdout = $process.StandardOutput.ReadLineAsync() }
            }
            if (-not $errDone -and $stderr.IsCompleted) {
                $line = $stderr.GetAwaiter().GetResult()
                if ($null -eq $line) { $errDone = $true }
                else { Write-Host $line; $stderr = $process.StandardError.ReadLineAsync() }
            }
            if (-not ($outDone -and $errDone)) { Start-Sleep -Milliseconds 40 }
        }
        $process.WaitForExit()
        if ($process.ExitCode -ne 0) { throw 'Local website command failed. See its output above.' }
    } finally {
        if ($started -and -not $process.HasExited) { $process.Kill() }
        $process.Dispose()
    }
}
function Write-NewPrivateSettings {
    $envFile = Join-Path $RepoPath '.env.local'
    & $script:git -C $RepoPath ls-files --error-unmatch -- .env.local *> $null
    if ($LASTEXITCODE -eq 0) { throw '.env.local is tracked. Remove credentials from tracked source before using this helper.' }
    if (-not (Test-Path -LiteralPath $envFile)) {
        $lines = @('# Local preview only. Never copy production credentials here.')
        foreach ($entry in $localSettings.GetEnumerator()) { $lines += ($entry.Key + '=' + $entry.Value) }
        $bytes = [Text.UTF8Encoding]::new($false).GetBytes(($lines -join "`r`n") + "`r`n")
        $stream = [IO.File]::Open($envFile,[IO.FileMode]::CreateNew,[IO.FileAccess]::Write,[IO.FileShare]::None)
        try { $stream.Write($bytes,0,$bytes.Length) } finally { $stream.Dispose() }
    }
    $vercelDirectory = Join-Path $RepoPath '.vercel'
    if (-not (Test-Path -LiteralPath $vercelDirectory)) { $null = New-Item -ItemType Directory -Path $vercelDirectory }
    if ((Get-Item -LiteralPath $vercelDirectory).Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'The local .vercel directory must not be a link.' }
    $projectFile = Join-Path $vercelDirectory 'project.json'
    $project = @{ projectId='prj_J7bQ4A0zQBS1u6BWvogfQWVSWef1'; orgId='team_cBscvpUlMomd60kmZYUnmS9S'; projectName='swapnilsahoo-next' }
    if (Test-Path -LiteralPath $projectFile) {
        if ((Get-Item -LiteralPath $projectFile).Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'The Vercel project file must not be a link.' }
        $existing = Get-Content -LiteralPath $projectFile -Raw | ConvertFrom-Json
        if ($existing.projectId -ne $project.projectId -or $existing.orgId -ne $project.orgId) { throw 'The existing Vercel project link targets another project; it was preserved.' }
    } else { [IO.File]::WriteAllText($projectFile,($project | ConvertTo-Json -Compress),[Text.UTF8Encoding]::new($false)) }
}
function Configure-Author {
    $gh = Find-Tool 'gh.exe'
    if (-not $gh -and $InstallMissingTools) { Install-Tool 'GitHub.cli'; $gh = Find-Tool 'gh.exe' }
    $account = $null
    if ($gh -and -not $TestRemote) {
        & $gh auth status --hostname github.com *> $null
        if ($LASTEXITCODE -ne 0 -and $ConnectGitHub) {
            & $gh auth login --hostname github.com --git-protocol https --web
            if ($LASTEXITCODE -ne 0) { throw 'GitHub sign-in did not finish. Complete it privately, then rerun Setup.' }
            & $gh auth status --hostname github.com *> $null
        }
        if ($LASTEXITCODE -eq 0) {
            $raw = & $gh api user --jq '{login: .login, id: .id, name: .name}' 2>$null
            if ($LASTEXITCODE -eq 0) { $account = $raw | ConvertFrom-Json }
            if (-not $account -or $account.login -ne 'swapnilsahoo') { throw 'Sign GitHub CLI into the personal swapnilsahoo account before enabling sync.' }
            if ($ConnectGitHub) {
                & $gh auth setup-git --hostname github.com
                if ($LASTEXITCODE -ne 0) { throw 'GitHub Git authentication setup failed. Resolve it and rerun Setup.' }
            }
        }
    }
    if ($account) {
        & $script:git -C $RepoPath config user.name *> $null
        if ($LASTEXITCODE -ne 0) { $null = Invoke-Git -Arguments @('config','--local','user.name',$(if ($account.name) { $account.name } else { $account.login })) }
        & $script:git -C $RepoPath config user.email *> $null
        if ($LASTEXITCODE -ne 0) { $null = Invoke-Git -Arguments @('config','--local','user.email',"$($account.id)+swapnilsahoo@users.noreply.github.com") }
    } elseif (-not $TestRemote) {
        Write-Host 'Before sync, sign in as swapnilsahoo: gh auth login -h github.com -p https -w'
        Write-Host 'Then run: gh auth setup-git; rerun Setup to configure a missing repository author.'
        Write-Host 'Alternatively set repository-local user.name and your GitHub noreply user.email manually.'
    }
}
function Open-Editor {
    $code = Find-Tool 'code.cmd'
    if ($code) { & $code --new-window $RepoPath }
    else { Write-Host "Open this folder in VS Code: $RepoPath" }
}

Require-Git
$script:expectedRemote = Get-ExpectedRemote
if ($Mode -eq 'Setup') {
    Require-Node
    $corepack = Find-Tool 'corepack.cmd'
    if (-not $corepack) { throw 'Install Corepack with npm.cmd install --global corepack, then rerun Setup. No global pnpm activation is needed.' }
    $corepackDirectory = Split-Path -Parent $corepack
    $corepackEntry = @((Join-Path $corepackDirectory 'node_modules\corepack\dist\corepack.js'),
        (Join-Path $corepackDirectory '..\corepack\dist\corepack.js')) | Where-Object { Test-Path -LiteralPath $_ -PathType Leaf } | Select-Object -First 1
    if (-not $corepackEntry) { throw 'Cannot find the installed Corepack JavaScript entry point. Repair Corepack, then rerun.' }
    if (Test-Path -LiteralPath $RepoPath) {
        $items = @(Get-ChildItem -LiteralPath $RepoPath -Force)
        if ($items.Count -and -not (Test-Path -LiteralPath (Join-Path $RepoPath '.git'))) { throw 'RepoPath is nonempty and is not a checkout. Choose another empty directory.' }
    }
    if (-not (Test-Path -LiteralPath (Join-Path $RepoPath '.git'))) {
        $parent = Split-Path -Parent $RepoPath
        if (-not (Test-Path -LiteralPath $parent)) { $null = New-Item -ItemType Directory -Path $parent -Force }
        $cloneFrom = $script:expectedRemote
        if ($BundlePath) {
            $cloneFrom = (Resolve-Path -LiteralPath $BundlePath).Path
            if (-not (Test-Path -LiteralPath $cloneFrom -PathType Leaf)) { throw 'BundlePath must name an existing Git bundle file.' }
            & $script:git bundle list-heads $cloneFrom *> $null
            if ($LASTEXITCODE -ne 0) { throw 'BundlePath is not a readable Git bundle.' }
        }
        Write-Host "Cloning website source into $RepoPath..."
        $null = Invoke-Git -OutsideRepository -Arguments @('-c','core.longpaths=true','-c','core.autocrlf=false','clone','--',$cloneFrom,$RepoPath)
        if ($BundlePath) { $null = Invoke-Git -Arguments @('remote','set-url','origin',$script:expectedRemote) }
    }
    Assert-Repository
    $null = Invoke-Git -Arguments @('config','--local','core.longpaths','true')
    $null = Invoke-Git -Arguments @('config','--local','core.autocrlf','false')
    $current = [string](Invoke-Git -Arguments @('branch','--show-current'))
    if ($current -ne $Branch) {
        $dirty = @(Invoke-Git -Arguments @('status','--porcelain'))
        if ($dirty.Count) { throw 'The checkout has unsaved Git changes on another branch. Commit/stash them yourself before Setup changes branches.' }
        & $script:git -C $RepoPath show-ref --verify --quiet "refs/heads/$Branch"
        if ($LASTEXITCODE -eq 0) { $null = Invoke-Git -Arguments @('switch',$Branch) }
        else {
            & $script:git -C $RepoPath show-ref --verify --quiet "refs/remotes/origin/$Branch"
            if ($LASTEXITCODE -eq 0) { $null = Invoke-Git -Arguments @('switch','--track','-c',$Branch,"origin/$Branch") }
            else { $null = Invoke-Git -Arguments @('switch','-c',$Branch) }
        }
    }
    $null = Invoke-Git -Arguments @('config','--local',"branch.$Branch.remote",'origin')
    $null = Invoke-Git -Arguments @('config','--local',"branch.$Branch.merge","refs/heads/$Branch")
    Configure-Author
    Write-NewPrivateSettings
    Invoke-Local -Command $script:node -Arguments @($corepackEntry,"pnpm@$pnpmVersion",'install','--frozen-lockfile')
    Invoke-Local -Command $script:node -Arguments @('--conditions=react-server','--import','tsx','scripts/learning-lab.mts','init')
    Write-Host "Setup complete at $RepoPath on $Branch. No source was pushed or deployed."
    if (-not $NoOpen) { Open-Editor }
    return
}

Assert-Repository
if ($Mode -eq 'Open') { Open-Editor; return }
$taskName = Get-TaskName
if ($Mode -eq 'DisableAutoSync') {
    $task = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
    if ($task) { Disable-ScheduledTask -TaskName $taskName | Out-Null }
    Write-Host "Automatic source sync is disabled for $RepoPath."
    return
}
Require-Node
$worker = Join-Path $RepoPath 'scripts\website-sync.mjs'
if ($Mode -eq 'Start') {
    if (-not (Test-Path -LiteralPath (Join-Path $RepoPath 'node_modules\next\dist\bin\next'))) { throw 'Dependencies are missing. Run -Mode Setup first.' }
    Write-Host 'Starting local preview at http://localhost:3110. Press Ctrl+C to stop.'
    Invoke-Local -Command $script:node -Arguments @('node_modules/next/dist/bin/next','dev','--hostname','localhost','--port','3110') -AllowTestPayments
    return
}
if (-not (Test-Path -LiteralPath $worker -PathType Leaf)) { throw 'The source sync worker is missing. Update the checkout/bootstrap bundle.' }
if ($Mode -eq 'EnableAutoSync') {
    if ($TestRemote) { throw 'Test fixtures cannot register an automatic sync task. Exercise --once manually in the isolated test process.' }
    $wrapper = Join-Path $RepoPath 'scripts\website-laptop.ps1'
    if (-not (Test-Path -LiteralPath $wrapper -PathType Leaf)) { throw 'The PowerShell helper must be present inside the checkout before scheduling.' }
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent().Name
    $arguments = '-NoProfile -NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass -File ' + (Quote-Argument $wrapper) +
        ' -Mode Sync -RepoPath ' + (Quote-Argument $RepoPath) + ' -Branch ' + (Quote-Argument $Branch) +
        ' -NodePath ' + (Quote-Argument $script:node)
    $action = New-ScheduledTaskAction -Execute (Join-Path $env:WINDIR 'System32\WindowsPowerShell\v1.0\powershell.exe') -Argument $arguments -WorkingDirectory $RepoPath
    $minute = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 1)
    $logon = New-ScheduledTaskTrigger -AtLogOn -User $identity
    $principal = New-ScheduledTaskPrincipal -UserId $identity -LogonType Interactive -RunLevel Limited
    $settings = New-ScheduledTaskSettingsSet -Hidden -StartWhenAvailable -RunOnlyIfNetworkAvailable -MultipleInstances IgnoreNew -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit (New-TimeSpan -Minutes 5)
    Register-ScheduledTask -TaskName $taskName -Action $action -Trigger @($minute,$logon) -Principal $principal -Settings $settings -Description 'Synchronizes saved website source on the selected Git branch. No deployment or private data sync.' -Force | Out-Null
    Write-Host "Enabled $taskName (each minute and owner logon while signed in, awake and online)."
    return
}
$workerMode = if ($Mode -eq 'Status') { '--status' } else { '--once' }
$workerArguments = @($worker,$workerMode,'--repo',$RepoPath,'--branch',$Branch)
if ($TestRemote) { $workerArguments += @('--test-remote',$script:expectedRemote) }
& $script:node @workerArguments
$workerExit = $LASTEXITCODE
if ($Mode -eq 'Status') {
    $task = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
    if ($task) { Write-Host ("Automatic source sync task: " + $task.State) }
    else { Write-Host 'Automatic source sync task: not registered' }
}
exit $workerExit
