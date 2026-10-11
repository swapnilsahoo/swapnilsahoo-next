#requires -Version 5.1
<#
.SYNOPSIS
Verified encrypted daily backup using the existing owner's Vercel login and DPAPI recovery.
.DESCRIPTION
Without -Run, checks only local configuration. Never pulls an env file or mutates
provider configuration. Production is read-only. Personal OneDrive receives only
encrypted snapshots; a local copy is not independent proof of a completed upload.
See docs/learning-lab/backup-operations.md for Task Scheduler and recovery.
#>
[CmdletBinding()]
param(
    [switch]$Run,
    [switch]$PruneManagedBackups,
    [ValidatePattern('^[a-z0-9][a-z0-9-]*$')][string]$VercelScope = 'swapnil-sahoo-s-projects',
    [ValidatePattern('^[a-z0-9][a-z0-9-]*$')][string]$ProjectName = 'swapnilsahoo-next',
    [ValidatePattern('^prj_[a-zA-Z0-9]+$')][string]$ProjectId = 'prj_J7bQ4A0zQBS1u6BWvogfQWVSWef1',
    [string]$PersonalOneDriveRoot = '',
    [switch]$SkipOneDrive,
    [ValidatePattern('^$|^[a-zA-Z0-9][a-zA-Z0-9-]*/[a-zA-Z0-9_.-]+$')][string]$GitHubRepository = '',
    [switch]$PassThru
)

Set-StrictMode -Version 2.0
$ErrorActionPreference = 'Stop'
$repoPath = [IO.Path]::GetFullPath((Split-Path -Parent $PSScriptRoot))
$ownerDirectory = Join-Path $repoPath ".data/lab-backup-$ProjectId"
$recoveryDirectory = Join-Path $repoPath ".data/lab-activation-$ProjectId"
$stage = 'local configuration'
$result = [ordered]@{ format='learning-lab-backup-wrapper-v1'; at=[DateTime]::UtcNow.ToString('o'); passed=$false; mode=$(if ($Run) { 'run' } else { 'preflight' }); cloudUploadConfirmed=$false }
$savedEnvironment = @{}

function Assert-BackupDestinations([bool]$Skip, [string]$GitHub) {
    if ($Skip -and [string]::IsNullOrWhiteSpace($GitHub)) { throw 'SKIP_ONEDRIVE_REQUIRES_GITHUB' }
}

function Assert-OwnerOnly([string]$Path, [bool]$Directory, [bool]$Protected = $true, [bool]$AllowCloud = $false) {
    $entry = Get-Item -LiteralPath $Path -Force
    if ($entry.PSIsContainer -ne $Directory) { throw 'PATH_KIND_INVALID' }
    # OneDrive Files On-Demand marks normal cloud directories as reparse points.
    # Reject link/junction redirection; only the registry-matched sync branch allows cloud placeholders.
    if ($entry.Attributes -band [IO.FileAttributes]::ReparsePoint) {
        if (-not $AllowCloud -or $entry.LinkType -or $entry.Target) { throw 'PATH_LINK_REJECTED' }
    }
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent().User
    $acl = Get-Acl -LiteralPath $Path
    if ($Protected -and -not $acl.AreAccessRulesProtected) { throw 'OWNER_ACL_INHERITANCE_NOT_PROTECTED' }
    if ($acl.GetOwner([Security.Principal.SecurityIdentifier]).Value -ne $identity.Value) { throw 'OWNER_ACL_ACCOUNT_MISMATCH' }
    $rules = @($acl.GetAccessRules($true, $true, [Security.Principal.SecurityIdentifier]))
    if (-not $rules.Count) { throw 'OWNER_ACL_RULE_REQUIRED' }
    foreach ($rule in $rules) {
        if ($rule.IdentityReference.Value -ne $identity.Value -or $rule.AccessControlType -ne 'Allow') { throw 'OWNER_ACL_BROADER_ACCESS' }
    }
}
function New-OwnerDirectory([string]$Path, [bool]$AllowCloud = $false) {
    if (-not (Test-Path -LiteralPath $Path)) {
        $null = New-Item -ItemType Directory -Path $Path
        $identity = [Security.Principal.WindowsIdentity]::GetCurrent().User
        $acl = [Security.AccessControl.DirectorySecurity]::new()
        $acl.SetAccessRuleProtection($true, $false); $acl.SetOwner($identity)
        $acl.AddAccessRule([Security.AccessControl.FileSystemAccessRule]::new($identity, 'FullControl', 'ContainerInherit,ObjectInherit', 'None', 'Allow'))
        Set-Acl -LiteralPath $Path -AclObject $acl
    }
    Assert-OwnerOnly -Path $Path -Directory $true -AllowCloud $AllowCloud
}
function Invoke-PrivateNative([string]$Command, [string[]]$Arguments, [string]$Label, [string]$InputText) {
    $preference = $ErrorActionPreference
    $previousNotifier = [Environment]::GetEnvironmentVariable('NO_UPDATE_NOTIFIER', 'Process')
    try {
        $ErrorActionPreference = 'Continue'
        [Environment]::SetEnvironmentVariable('NO_UPDATE_NOTIFIER', '1', 'Process')
        $global:LASTEXITCODE = 0
        if ($PSBoundParameters.ContainsKey('InputText')) { $captured = @($InputText | & $Command @Arguments 2>$null) }
        else { $captured = @(& $Command @Arguments 2>$null) }
        $code = $LASTEXITCODE
    } finally {
        $ErrorActionPreference = $preference
        [Environment]::SetEnvironmentVariable('NO_UPDATE_NOTIFIER', $previousNotifier, 'Process')
    }
    # Captured provider output is never echoed or saved, including failed requests.
    return [pscustomobject]@{ Code=$code; Output=(($captured | ForEach-Object { $_.ToString() }) -join "`n"); Label=$Label }
}
function Invoke-GitHubJson([string]$Endpoint, [string]$Method = 'GET', [string]$InputText) {
    $arguments = @('api', $Endpoint, '--hostname', 'github.com', '--method', $Method)
    $parameters = @{ Command=$gh; Arguments=$arguments; Label='GITHUB_PRIVATE_REQUEST_FAILED' }
    if ($PSBoundParameters.ContainsKey('InputText')) { $parameters.Arguments += @('--input','-'); $parameters.InputText=$InputText }
    $response = Invoke-PrivateNative @parameters
    if ($response.Code -ne 0) { throw 'GITHUB_PRIVATE_REQUEST_FAILED' }
    try { return ($response.Output | ConvertFrom-Json) }
    catch { throw 'GITHUB_JSON_INVALID' }
}
function Assert-PrivateGitHubRepository {
    $user = Invoke-GitHubJson 'user'
    $repository = Invoke-GitHubJson "repos/$GitHubRepository"
    if ($repository.full_name -ine $GitHubRepository -or $repository.owner.login -ine $user.login -or
        $repository.private -ne $true -or $repository.archived -eq $true -or $repository.fork -eq $true -or
        -not $repository.PSObject.Properties['permissions'] -or $repository.permissions.push -ne $true) {
        throw 'GITHUB_OWNER_PRIVATE_REPOSITORY_REQUIRED'
    }
}
function Publish-EncryptedGitHubBackup([string]$BackupFile) {
    Assert-OwnerOnly -Path $BackupFile -Directory $false -Protected $false
    $file = [IO.Path]::GetFileName($BackupFile)
    if ($file -notmatch '^lab-daily-\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z-[0-9a-f-]{36}\.json$' -or
        [IO.Path]::GetDirectoryName($BackupFile) -ine (Join-Path $ownerDirectory 'backups')) { throw 'GITHUB_BACKUP_PATH_INVALID' }
    $bytes = [IO.File]::ReadAllBytes($BackupFile)
    if ($bytes.Length -gt 900000) { throw 'GITHUB_ENCRYPTED_BACKUP_SIZE_LIMIT' }
    try { $envelope = [Text.Encoding]::UTF8.GetString($bytes) | ConvertFrom-Json }
    catch { throw 'GITHUB_BACKUP_ENVELOPE_INVALID' }
    $keys = @($envelope.PSObject.Properties | ForEach-Object { $_.Name } | Sort-Object)
    if (($keys -join '|') -ne 'data|iv|tag|version' -or $envelope.version -ne 1 -or
        [Convert]::FromBase64String($envelope.iv).Length -ne 12 -or [Convert]::FromBase64String($envelope.tag).Length -ne 16) { throw 'GITHUB_BACKUP_ENVELOPE_INVALID' }
    $remotePath = "backups/daily/$file"
    # No sha/upsert: a colliding filename fails rather than replacing any file.
    # The only uploaded bytes are the already restored/authenticated encrypted envelope.
    $body = ConvertTo-Json -InputObject @{ message="Encrypted Learning Lab backup $([DateTime]::UtcNow.ToString('yyyy-MM-dd'))"; content=[Convert]::ToBase64String($bytes) } -Compress
    $created = Invoke-GitHubJson -Endpoint "repos/$GitHubRepository/contents/$remotePath" -Method 'PUT' -InputText $body
    if (-not $created.content -or $created.content.path -ne $remotePath) { throw 'GITHUB_BACKUP_CREATE_NOT_CONFIRMED' }
    $remote = Invoke-GitHubJson "repos/$GitHubRepository/contents/$remotePath"
    if ($remote.type -ne 'file' -or $remote.path -ne $remotePath -or $remote.encoding -ne 'base64' -or $remote.size -ne $bytes.Length) { throw 'GITHUB_BACKUP_READBACK_INVALID' }
    $readback = [Convert]::FromBase64String(($remote.content -replace '\s',''))
    $sha256 = [Security.Cryptography.SHA256]::Create()
    try {
        $expected = [Convert]::ToBase64String($sha256.ComputeHash($bytes))
        $actual = [Convert]::ToBase64String($sha256.ComputeHash($readback))
        if ($actual -cne $expected) { throw 'GITHUB_BACKUP_READBACK_MISMATCH' }
    } finally { $sha256.Dispose() }
    return [pscustomobject]@{ repository=$GitHubRepository; path=$remotePath; encryptedBytes=$bytes.Length; ownerPrivateVerified=$true; contentReadbackMatched=$true; cloudUploadConfirmed=$true; historyRetention='No remote deletion; git history retains prior committed ciphertext.' }
}
function Invoke-VercelJson([string]$Endpoint) {
    # The installed cmd shim returned empty output/exit 0 in actual native checks.
    # Run the official package entry point with Node; never inspect CLI auth files.
    $response = Invoke-PrivateNative -Command $node -Arguments @($vercelEntryPath, 'api', $Endpoint, '--scope', $VercelScope, '--raw', '--no-color', '--non-interactive') -Label 'VERCEL_READ_ONLY_REQUEST_FAILED'
    if ($response.Code -ne 0) { throw 'VERCEL_READ_ONLY_REQUEST_FAILED' }
    try { return ($response.Output | ConvertFrom-Json) }
    catch { throw 'VERCEL_JSON_INVALID' }
}
function Get-ExistingProductionValue([object[]]$Environment, [string]$Name) {
    $records = @($Environment | Where-Object { $_.key -eq $Name -and @($_.target) -contains 'production' })
    if ($records.Count -ne 1 -or -not $records[0].id -or $records[0].id -notmatch '^[a-zA-Z0-9_-]+$') { throw 'PRODUCTION_DATABASE_METADATA_NOT_UNIQUE' }
    # The documented per-id GET decrypts only this selected existing variable.
    # Sensitive variables may be unreadable; refuse rather than rotate or write.
    $value = Invoke-VercelJson "/v1/projects/$ProjectId/env/$($records[0].id)"
    if ($value.key -ne $Name -or -not $value.PSObject.Properties['value'] -or [string]::IsNullOrWhiteSpace($value.value)) { throw 'PRODUCTION_DATABASE_VALUE_UNREADABLE' }
    if ($value.PSObject.Properties['decrypted'] -and $value.decrypted -ne $true) { throw 'PRODUCTION_DATABASE_VALUE_NOT_DECRYPTED' }
    return [string]$value.value
}
function Read-RecoverySecret([string]$Path) {
    Assert-OwnerOnly -Path $Path -Directory $false -Protected $false
    $secure = ConvertTo-SecureString ([IO.File]::ReadAllText($Path))
    $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try { return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer) }
    finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer); $secure.Dispose() }
}
function Set-PrivateProcessValue([string]$Name, [AllowNull()][string]$Value) {
    if (-not $savedEnvironment.ContainsKey($Name)) { $savedEnvironment[$Name] = [Environment]::GetEnvironmentVariable($Name, 'Process') }
    [Environment]::SetEnvironmentVariable($Name, $Value, 'Process')
}

Push-Location -LiteralPath $repoPath
try {
    Assert-BackupDestinations -Skip $SkipOneDrive.IsPresent -GitHub $GitHubRepository
    if ($env:OS -ne 'Windows_NT') { throw 'OWNER_WINDOWS_ACCOUNT_REQUIRED' }
    $node = Get-Command node.exe -ErrorAction SilentlyContinue | Select-Object -First 1
    $vercelCommand = Get-Command vercel.cmd -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $node -or -not (Test-Path -LiteralPath (Join-Path $repoPath 'node_modules/@libsql/client/package.json'))) { throw 'OWNER_RUNTIME_DEPENDENCIES_REQUIRED' }
    $node = $node.Source
    # A scheduled NoProfile process may lack the global npm bin folder on PATH.
    # These are standard installation locations, not provider auth/config files.
    $vercelShim = if ($vercelCommand) { $vercelCommand.Source } else {
        @((Join-Path $env:LOCALAPPDATA 'npm-global/vercel.cmd'), (Join-Path $env:APPDATA 'npm/vercel.cmd')) |
            Where-Object { Test-Path -LiteralPath $_ -PathType Leaf } | Select-Object -First 1
    }
    if (-not $vercelShim) { throw 'VERCEL_OFFICIAL_ENTRY_POINT_REQUIRED' }
    $vercelDirectory = Split-Path -Parent $vercelShim
    $vercelEntries = @((Join-Path $vercelDirectory 'node_modules/vercel/dist/index.js'), (Join-Path $vercelDirectory '../vercel/dist/index.js'))
    $vercelEntryPath = $vercelEntries | Where-Object { Test-Path -LiteralPath $_ -PathType Leaf } | Select-Object -First 1
    if (-not $vercelEntryPath) { throw 'VERCEL_OFFICIAL_ENTRY_POINT_REQUIRED' }
    $vercelEntryPath = [IO.Path]::GetFullPath($vercelEntryPath)
    if ($GitHubRepository) {
        $ghCommand = Get-Command gh.exe -ErrorAction SilentlyContinue | Select-Object -First 1
        if (-not $ghCommand) { throw 'GITHUB_OWNER_CLI_REQUIRED' }
        $gh = $ghCommand.Source
    }
    Assert-OwnerOnly -Path $recoveryDirectory -Directory $true
    $secretPath = Join-Path $recoveryDirectory 'auth-secret.dpapi'
    Assert-OwnerOnly -Path $secretPath -Directory $false -Protected $false
    $syncDirectory = ''
    $result.oneDriveSkipped = $SkipOneDrive.IsPresent
    if (-not $SkipOneDrive) {
        $registry = 'HKCU:\Software\Microsoft\OneDrive\Accounts\Personal'
        if (-not (Test-Path -LiteralPath $registry)) { throw 'PERSONAL_ONEDRIVE_NOT_CONFIGURED' }
        $configuredRoot = (Get-ItemProperty -LiteralPath $registry -Name UserFolder).UserFolder
        if (-not $configuredRoot) { throw 'PERSONAL_ONEDRIVE_FOLDER_MISSING' }
        if (-not $PersonalOneDriveRoot) { $PersonalOneDriveRoot = $configuredRoot }
        $PersonalOneDriveRoot = [IO.Path]::GetFullPath($PersonalOneDriveRoot).TrimEnd('\')
        if ($PersonalOneDriveRoot -ine [IO.Path]::GetFullPath($configuredRoot).TrimEnd('\')) { throw 'PERSONAL_ONEDRIVE_FOLDER_MISMATCH' }
        $rootEntry = Get-Item -LiteralPath $PersonalOneDriveRoot -Force
        if (-not $rootEntry.PSIsContainer -or $rootEntry.LinkType -or $rootEntry.Target) { throw 'PERSONAL_ONEDRIVE_LINK_REJECTED' }
        $syncDirectory = Join-Path $PersonalOneDriveRoot 'Learning Lab Encrypted Backups'
        if (Test-Path -LiteralPath $syncDirectory) { Assert-OwnerOnly -Path $syncDirectory -Directory $true -AllowCloud $true }
        $result.personalOneDriveConfigured = $true
        $result.syncClientRunning = [bool](Get-Process -Name OneDrive -ErrorAction SilentlyContinue)
    }
    $result.ownerDirectory = $ownerDirectory; $result.syncedDirectory = $syncDirectory
    $result.retentionMode = $(if ($PruneManagedBackups) { '30 daily + 12 monthly verified managed backups' } else { 'report only; no managed backup deletion' })
    if (-not $Run) {
        $result.passed = $true
        Write-Host 'PASS local backup preflight. No secrets decrypted, provider calls, files created or task registered.'
        if ($PassThru) { [pscustomobject]$result }
        return
    }
    $stage = 'owner-only managed folders'
    New-OwnerDirectory $ownerDirectory
    foreach ($child in @('backups','reports','work')) { New-OwnerDirectory (Join-Path $ownerDirectory $child) }
    if (-not $SkipOneDrive) { New-OwnerDirectory -Path $syncDirectory -AllowCloud $true }
    if ($GitHubRepository) {
        $stage = 'existing private GitHub repository identity'
        Assert-PrivateGitHubRepository
    }
    $stage = 'existing Vercel project identity'
    $project = Invoke-VercelJson "/v9/projects/$ProjectId"
    if ($project.id -ne $ProjectId -or $project.name -ne $ProjectName) { throw 'VERCEL_PROJECT_IDENTITY_MISMATCH' }
    $stage = 'production database metadata'
    # Queryless read is verified with this installed CLI. Its default list values
    # are not decrypted; use only selected metadata and per-id private readback.
    $metadata = Invoke-VercelJson "/v10/projects/$ProjectId/env"
    if ($metadata.PSObject.Properties['envs']) { $environment = @($metadata.envs) }
    elseif ($metadata -is [array]) { $environment = @($metadata) }
    else { throw 'VERCEL_ENVIRONMENT_LIST_SHAPE_INVALID' }
    $stage = 'private production database readback'
    $databaseUrl = Get-ExistingProductionValue -Environment $environment -Name 'TURSO_DATABASE_URL'
    $databaseToken = Get-ExistingProductionValue -Environment $environment -Name 'TURSO_AUTH_TOKEN'
    $stage = 'original DPAPI authentication secret'
    $authSecret = Read-RecoverySecret $secretPath
    if ($authSecret.Length -lt 32) { throw 'ORIGINAL_AUTH_SECRET_REQUIRED' }
    foreach ($setting in @{
        LAB_DATABASE_URL=$databaseUrl; LAB_DATABASE_AUTH_TOKEN=$databaseToken; LAB_AUTH_SECRET=$authSecret
        LAB_BACKUP_PROJECT_ID=$ProjectId; LAB_BACKUP_OWNER_DIRECTORY=$ownerDirectory; LAB_BACKUP_SYNC_DIRECTORY=$syncDirectory
        LAB_BACKUP_SKIP_ONEDRIVE=$(if ($SkipOneDrive) { 'true' } else { 'false' }); LAB_BACKUP_GITHUB_REPOSITORY=$GitHubRepository
        LAB_BACKUP_PRUNE=$(if ($PruneManagedBackups) { 'true' } else { 'false' })
    }.GetEnumerator()) { Set-PrivateProcessValue $setting.Key $setting.Value }
    $stage = 'read-only backup and verified restoration'
    $worker = Invoke-PrivateNative -Command $node -Arguments @((Join-Path $PSScriptRoot 'backup-learning-lab.mjs'), '--run') -Label 'BACKUP_WORKER_FAILED'
    try { $operation = $worker.Output | ConvertFrom-Json }
    catch { throw 'BACKUP_WORKER_REPORT_INVALID' }
    $result.operation = $operation
    $result.passed = $worker.Code -eq 0 -and $operation.passed -eq $true
    $result.syncStatus = $(if ($SkipOneDrive) { 'OneDrive explicitly skipped; private GitHub required' } else { 'locally queued; remote upload not independently confirmed' })
    # A cleanup-only failure must not hide successful backup/restore outcomes or
    # prevent an independently verified encrypted off-site copy. Still exit failed.
    if (-not $result.passed -and (-not $operation.PSObject.Properties['functionalPassed'] -or $operation.functionalPassed -ne $true)) { throw 'BACKUP_WORKER_FAILED' }
    if ($GitHubRepository) {
        $stage = 'private encrypted GitHub upload and content readback'
        Assert-PrivateGitHubRepository
        $result.github = Publish-EncryptedGitHubBackup $operation.backupFile
        $result.cloudUploadConfirmed = $true
    }
    if (-not $result.passed) { $stage='exact temporary cleanup'; throw 'BACKUP_WORKER_FAILED' }
    if ($result.cloudUploadConfirmed) {
        if ($SkipOneDrive) { Write-Host 'PASS encrypted backup and fresh restore. Private GitHub content readback confirmed; OneDrive explicitly skipped.' }
        else { Write-Host 'PASS encrypted backup and fresh restore. Private GitHub content readback confirmed; personal OneDrive copy is locally queued.' }
    } else {
        Write-Host 'PASS encrypted backup, fresh restore and encrypted personal OneDrive copy. Remote upload remains unconfirmed.'
    }
    if (-not $SkipOneDrive -and -not $result.syncClientRunning) { Write-Host 'ATTENTION OneDrive is not running; the encrypted copy awaits the owner client.' }
} catch {
    $result.passed = $false; $result.failedStage = $stage
    # Publish only a fixed code from this script, never native/provider exceptions.
    $safeCodes = @('SKIP_ONEDRIVE_REQUIRES_GITHUB','OWNER_WINDOWS_ACCOUNT_REQUIRED','OWNER_RUNTIME_DEPENDENCIES_REQUIRED','VERCEL_OFFICIAL_ENTRY_POINT_REQUIRED','PERSONAL_ONEDRIVE_NOT_CONFIGURED','PERSONAL_ONEDRIVE_FOLDER_MISSING','PERSONAL_ONEDRIVE_FOLDER_MISMATCH','PERSONAL_ONEDRIVE_LINK_REJECTED','VERCEL_PROJECT_IDENTITY_MISMATCH','VERCEL_ENVIRONMENT_LIST_SHAPE_INVALID','VERCEL_READ_ONLY_REQUEST_FAILED','VERCEL_JSON_INVALID','PRODUCTION_DATABASE_METADATA_NOT_UNIQUE','PRODUCTION_DATABASE_VALUE_UNREADABLE','PRODUCTION_DATABASE_VALUE_NOT_DECRYPTED','ORIGINAL_AUTH_SECRET_REQUIRED','BACKUP_WORKER_FAILED','BACKUP_WORKER_REPORT_INVALID','PATH_KIND_INVALID','PATH_LINK_REJECTED','OWNER_ACL_INHERITANCE_NOT_PROTECTED','OWNER_ACL_ACCOUNT_MISMATCH','OWNER_ACL_RULE_REQUIRED','OWNER_ACL_BROADER_ACCESS','GITHUB_OWNER_CLI_REQUIRED','GITHUB_PRIVATE_REQUEST_FAILED','GITHUB_JSON_INVALID','GITHUB_OWNER_PRIVATE_REPOSITORY_REQUIRED','GITHUB_BACKUP_PATH_INVALID','GITHUB_ENCRYPTED_BACKUP_SIZE_LIMIT','GITHUB_BACKUP_ENVELOPE_INVALID','GITHUB_BACKUP_CREATE_NOT_CONFIRMED','GITHUB_BACKUP_READBACK_INVALID','GITHUB_BACKUP_READBACK_MISMATCH')
    $code = $_.Exception.Message
    $result.failureCode = $(if ($safeCodes -contains $code) { $code } else { 'PRIVATE_OPERATION_FAILED' })
    Write-Host "FAIL $stage. Raw provider, credential and record details were suppressed."
} finally {
    foreach ($name in $savedEnvironment.Keys) { [Environment]::SetEnvironmentVariable($name, $savedEnvironment[$name], 'Process') }
    $savedEnvironment.Clear()
    $databaseUrl=$null; $databaseToken=$null; $authSecret=$null; $environment=$null; $metadata=$null; $worker=$null
    if ($Run -and (Test-Path -LiteralPath (Join-Path $ownerDirectory 'reports'))) {
        try {
            Assert-OwnerOnly -Path (Join-Path $ownerDirectory 'reports') -Directory $true
            $statusFile = Join-Path $ownerDirectory 'reports/latest-wrapper.json'
            if (Test-Path -LiteralPath $statusFile) { Assert-OwnerOnly -Path $statusFile -Directory $false -Protected $false }
            [IO.File]::WriteAllText($statusFile, (ConvertTo-Json -InputObject $result -Depth 12), [Text.UTF8Encoding]::new($false))
        } catch { $result.statusWriteFailed=$true; $result.passed=$false }
    }
    Pop-Location
}
if ($PassThru) { [pscustomobject]$result }
if (-not $result.passed) { exit 1 }
