#requires -Version 5.1
<#
.SYNOPSIS
Read-only first-activation preflight; -Activate explicitly enables production changes.
.DESCRIPTION
Uses an existing owner-controlled libSQL database and an authenticated Vercel CLI.
Never creates provider accounts, databases, tokens, paid plans, learners or course offers.
Credentials use process memory, masked prompts and encrypted recovery, never native argv/plaintext files.
See docs/learning-lab/activation.md before running -Activate.
#>
[CmdletBinding()]
param(
    [switch]$Activate,
    [ValidatePattern('^[a-z0-9][a-z0-9-]*$')]
    [string]$VercelScope = 'swapnil-sahoo-s-projects',
    [ValidatePattern('^[a-z0-9][a-z0-9-]*$')]
    [string]$ProjectName = 'swapnilsahoo-next',
    [string]$DatabaseName = '',
    [string]$ProductionDeploymentUrl = '',
    [string]$AdminEmail = 'swapnil.s@greatlakes.edu.in',
    [switch]$GenerateAdminPassword,
    [switch]$PassThru
)

Set-StrictMode -Version 2.0
$ErrorActionPreference = 'Stop'
$repoPath = Split-Path -Parent $PSScriptRoot
$baseUrl = 'https://www.swapnilsahoo.com'
$coreNames = @('LAB_DATABASE_URL', 'LAB_DATABASE_AUTH_TOKEN', 'LAB_AUTH_SECRET', 'LAB_BASE_URL')
$flagNames = @('LAB_LOCAL_MODE', 'LAB_LAUNCH_APPROVED')
$issues = [Collections.Generic.List[string]]::new()

function Find-OwnerCommand([string[]]$Names) {
    foreach ($name in $Names) {
        $command = Get-Command $name -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($command) { return $command.Name }
    }
    return $null
}

function Invoke-PrivateCommand {
    param([string]$Command, [string[]]$Arguments, [string]$InputText, [string]$Label)
    # Capture stdout privately and discard stderr; CLI banners must not contaminate JSON.
    # Provider errors may contain URLs, tokens or submitted values and are never echoed.
    # Values travel only on stdin or inherited process environment, never in argv.
    $previousPreference = $ErrorActionPreference
    try {
        $ErrorActionPreference = 'Continue'
        $global:LASTEXITCODE = 0
        if ($PSBoundParameters.ContainsKey('InputText')) {
            $captured = @($InputText | & $Command @Arguments 2>$null)
        } else {
            $captured = @(& $Command @Arguments 2>$null)
        }
        $code = $LASTEXITCODE
    } finally { $ErrorActionPreference = $previousPreference }
    if ($code -ne 0) { throw "$Label failed (exit $code). Raw output was suppressed to protect credentials." }
    return (($captured | ForEach-Object { $_.ToString() }) -join "`n")
}

function Invoke-VercelJson([string]$Endpoint) {
    $raw = Invoke-PrivateCommand -Command $vercel -Arguments @(
        'api', $Endpoint, '--scope', $VercelScope, '--raw', '--no-color', '--non-interactive'
    ) -Label 'Vercel read-only API request'
    try { return ($raw | ConvertFrom-Json) }
    catch { throw 'Vercel did not return valid JSON. Update the official CLI; no raw response was printed.' }
}

function Get-ProductionEnvironment {
    $response = Invoke-VercelJson "/v10/projects/$($project.id)/env?decrypt=false"
    if ($response.PSObject.Properties['envs']) { $records = @($response.envs) }
    elseif ($response -is [array]) { $records = @($response) }
    else { throw 'Unexpected Vercel environment-list shape; refusing to infer missing credentials.' }
    return @($records | Where-Object { @($_.target) -contains 'production' })
}

function Read-PlainSecret([string]$Prompt) {
    $secure = Read-Host $Prompt -AsSecureString
    $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try { return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer) }
    finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
        $secure.Dispose()
    }
}

function New-RandomSecret([ValidateRange(32, 64)][int]$ByteCount = 48) {
    $bytes = [byte[]]::new($ByteCount)
    $rng = [Security.Cryptography.RandomNumberGenerator]::Create()
    try {
        $rng.GetBytes($bytes)
        return [Convert]::ToBase64String($bytes)
    } finally {
        [Array]::Clear($bytes, 0, $bytes.Length)
        $rng.Dispose()
    }
}

function Save-EncryptedRecoverySecret([string]$Secret, [string]$Directory, [string]$AdminPassword = '') {
    # Windows DPAPI binds this encrypted recovery copy to the current Windows account.
    # The directory inherits no broader ACL; no database token/plaintext password is saved.
    if (Test-Path -LiteralPath $Directory) {
        throw 'An activation recovery directory already exists. Preserve it and use the documented manual recovery path.'
    }
    $null = New-Item -ItemType Directory -Path $Directory
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent().User
    $acl = [Security.AccessControl.DirectorySecurity]::new()
    $acl.SetAccessRuleProtection($true, $false)
    $rule = [Security.AccessControl.FileSystemAccessRule]::new(
        $identity, 'FullControl', 'ContainerInherit,ObjectInherit', 'None', 'Allow'
    )
    $acl.AddAccessRule($rule)
    Set-Acl -LiteralPath $Directory -AclObject $acl
    $recoveryValues = [ordered]@{ 'auth-secret.dpapi' = $Secret }
    if ($AdminPassword) { $recoveryValues['admin-password.dpapi'] = $AdminPassword }
    try {
        foreach ($name in $recoveryValues.Keys) {
            $secure = ConvertTo-SecureString $recoveryValues[$name] -AsPlainText -Force
            try {
                $encrypted = ConvertFrom-SecureString $secure
                $file = Join-Path $Directory $name
                $stream = [IO.File]::Open($file, [IO.FileMode]::CreateNew, [IO.FileAccess]::Write)
                $writer = [IO.StreamWriter]::new($stream, [Text.UTF8Encoding]::new($false))
                try { $writer.Write($encrypted) } finally { $writer.Dispose() }
            } finally { $secure.Dispose() }
        }
    } finally { $recoveryValues.Clear() }
}

$node = Find-OwnerCommand @('node.exe', 'node')
$vercel = Find-OwnerCommand @('vercel.cmd', 'vercel')
$turso = Find-OwnerCommand @('turso.exe', 'turso')
$project = $null
$productionEnvironment = @()
$deploymentUrl = ''
$database = $null
$databaseUrl = [Environment]::GetEnvironmentVariable('LAB_DATABASE_URL', 'Process')
$databaseToken = [Environment]::GetEnvironmentVariable('LAB_DATABASE_AUTH_TOKEN', 'Process')

Push-Location -LiteralPath $repoPath
try {
    Write-Host 'Learning Lab first-activation preflight (read-only).'
    if (-not $node) { $issues.Add('Install Node.js and the locked repository dependencies.') }
    if (-not (Test-Path -LiteralPath 'node_modules/@libsql/client/package.json')) {
        $issues.Add('Install the repository dependencies before running this helper.')
    }
    if (-not $vercel) {
        $issues.Add('Install the official Vercel CLI, then sign in yourself with vercel login.')
    } else {
        try {
            $account = Invoke-VercelJson '/v2/user'
            if (-not $account.user.id) { throw 'No authenticated Vercel account was returned.' }
            $project = Invoke-VercelJson "/v9/projects/$ProjectName"
            if ($project.name -ne $ProjectName -or $project.id -notmatch '^prj_[a-zA-Z0-9]+$') {
                throw 'The selected Vercel project identity did not match.'
            }
            $productionEnvironment = @(Get-ProductionEnvironment)
            foreach ($name in $coreNames) {
                if (@($productionEnvironment | Where-Object { $_.key -eq $name }).Count) {
                    $issues.Add("Production $name already exists; this first-time helper will not overwrite or rotate it.")
                }
            }
            foreach ($name in $flagNames) {
                $existing = @($productionEnvironment | Where-Object { $_.key -eq $name })
                if ($existing.Count -gt 1 -or ($existing.Count -eq 1 -and (
                    $existing[0].type -ne 'plain' -or $existing[0].value -ne 'false'
                ))) { $issues.Add("Existing $name cannot be verified as plain false; review it privately before activation.") }
            }
            if ($ProductionDeploymentUrl) {
                $uri = [uri]$ProductionDeploymentUrl
                if ($uri.Scheme -ne 'https' -or $uri.Host -notlike '*.vercel.app' -or $uri.UserInfo -or $uri.Query -or $uri.Fragment) {
                    throw 'Use the HTTPS *.vercel.app URL of an existing ready production deployment.'
                }
                $deployment = Invoke-VercelJson "/v13/deployments/$($uri.Host)"
                if ($deployment.projectId -ne $project.id -or $deployment.target -ne 'production' -or $deployment.readyState -ne 'READY') {
                    throw 'That deployment is not a ready production deployment of the selected project.'
                }
                $deploymentUrl = "https://$($uri.Host)"
            } elseif ($project.PSObject.Properties['latestDeployments']) {
                $latest = @($project.latestDeployments | Where-Object {
                    $_.target -eq 'production' -and $_.readyState -eq 'READY'
                } | Select-Object -First 1)
                if ($latest.Count -and $latest[0].url -match '^[a-zA-Z0-9.-]+\.vercel\.app$') {
                    $deploymentUrl = "https://$($latest[0].url)"
                }
            }
            if (-not $deploymentUrl) { $issues.Add('Supply -ProductionDeploymentUrl with the selected project existing ready *.vercel.app production URL.') }
            Write-Host "Verified existing Vercel project: $VercelScope/$ProjectName. No values were decrypted."
        } catch { $issues.Add($_.Exception.Message) }
    }
    if ($turso) {
        try {
            $null = Invoke-PrivateCommand -Command $turso -Arguments @('auth', 'whoami') -Label 'Turso account check'
            if ($DatabaseName) {
                $shownUrl = Invoke-PrivateCommand -Command $turso -Arguments @('db', 'show', $DatabaseName, '--url') -Label 'Existing Turso database lookup'
                if ($databaseUrl -and $shownUrl.Trim().TrimEnd('/') -ne $databaseUrl.TrimEnd('/')) {
                    throw 'The selected Turso database URL does not match LAB_DATABASE_URL.'
                }
            }
            Write-Host 'Turso CLI session verified. No database or token was created.'
        } catch { $issues.Add($_.Exception.Message) }
    } elseif ($DatabaseName) {
        $issues.Add('DatabaseName needs the owner-authenticated Turso CLI. Omit it only when supplying an existing database URL/token privately.')
    } else {
        Write-Host 'Turso CLI is absent; existing database-token access will be checked directly.'
    }
    $validDatabaseUrl = $false
    try {
        $dbUri = [uri]$databaseUrl
        $validDatabaseUrl = $dbUri.IsAbsoluteUri -and @('libsql', 'https') -contains $dbUri.Scheme -and
            $dbUri.Host -and -not $dbUri.UserInfo -and -not $dbUri.Query -and -not $dbUri.Fragment
    } catch { }
    if (-not $validDatabaseUrl -or -not $databaseToken) {
        $issues.Add('Supply the existing libSQL URL and token privately in process LAB_DATABASE_URL and LAB_DATABASE_AUTH_TOKEN. Local file databases are rejected.')
    } elseif ($node -and (Test-Path -LiteralPath 'node_modules/@libsql/client/package.json')) {
        try {
            $probe = @'
import { createClient } from "@libsql/client";
const db = createClient({ url: process.env.LAB_DATABASE_URL, authToken: process.env.LAB_DATABASE_AUTH_TOKEN });
try {
  const result = await db.execute("SELECT count(*) AS n FROM sqlite_master WHERE type='table' AND substr(name,1,7)<>'sqlite_' AND substr(name,1,8)<>'_libsql_'");
  process.stdout.write(JSON.stringify({ tables: Number(result.rows[0].n) }));
} catch { process.exitCode = 1; } finally { db.close(); }
'@
            $raw = Invoke-PrivateCommand -Command $node -Arguments @('--input-type=module') -InputText $probe -Label 'Read-only database connection'
            $database = $raw | ConvertFrom-Json
            if ($database.tables -ne 0) { $issues.Add('The database already has user tables. Use a fresh empty database; this helper does not alter an existing installation.') }
            Write-Host "Database read-only access passed; user-table count: $($database.tables)."
        } catch { $issues.Add($_.Exception.Message) }
    }
    if ($env:OS -ne 'Windows_NT') { $issues.Add('Activation recovery uses Windows DPAPI; run this helper in the Windows PowerShell session of the owner.') }
    $recoveryDirectory = if ($project) { Join-Path $repoPath ".data/lab-activation-$($project.id)" } else { '' }
    if ($recoveryDirectory -and (Test-Path -LiteralPath $recoveryDirectory)) {
        $issues.Add('An encrypted activation recovery directory already exists. Preserve it; use the documented recovery path instead of repeating first activation.')
    }
    $ready = $issues.Count -eq 0
    if (-not $ready) {
        foreach ($issue in $issues) { Write-Host "Needs attention: $issue" }
        if ($Activate) { throw 'Activation stopped before any writes. Resolve the preflight items first.' }
    } else { Write-Host 'Preflight passed. No database, environment or deployment changes have been made.' }
    if (-not $Activate) {
        if ($PassThru) { [pscustomobject]@{ Ready = $ready; Issues = @($issues); Mode = 'Preflight' } }
        return
    }

    if ($AdminEmail -notmatch '^[^\s@]+@[^\s@]+\.[^\s@]+$') { throw 'Supply the approved administrator email.' }
    if ($GenerateAdminPassword) {
        $password = 'Aa7!' + (New-RandomSecret -ByteCount 32)
    } else {
        $password = Read-PlainSecret 'Choose the administrator password (at least 12 characters; masked)'
        $confirmation = Read-PlainSecret 'Confirm the administrator password (masked)'
        if ($password.Length -lt 12 -or $password -cne $confirmation) { throw 'Passwords did not match or were too short. No writes were made.' }
        $confirmation = $null
    }
    $authSecret = New-RandomSecret
    $recoveryArguments = @{ Secret = $authSecret; Directory = $recoveryDirectory }
    if ($GenerateAdminPassword) { $recoveryArguments.AdminPassword = $password }
    try { Save-EncryptedRecoverySecret @recoveryArguments } finally { $recoveryArguments.Clear() }
    Write-Host 'Saved a Windows-account-encrypted recovery copy under ignored .data. No secret was printed.'
    if ($GenerateAdminPassword) { Write-Host 'The encrypted temporary administrator password is alongside the auth secret. First sign-in requires replacement.' }
    $settings = [ordered]@{
        LAB_DATABASE_URL = $databaseUrl; LAB_DATABASE_AUTH_TOKEN = $databaseToken
        LAB_AUTH_SECRET = $authSecret; LAB_BASE_URL = $baseUrl
        LAB_LOCAL_MODE = 'false'; LAB_LAUNCH_APPROVED = 'false'
    }
    $saved = @{}
    try {
        $bootstrapNames = @('LAB_ADMIN_EMAIL', 'LAB_ADMIN_NAME', 'LAB_ADMIN_PASSWORD', 'NODE_ENV', 'VERCEL')
        if ($GenerateAdminPassword) { $bootstrapNames += 'LAB_ADMIN_MUST_CHANGE_PASSWORD' }
        foreach ($name in @($settings.Keys) + $bootstrapNames) {
            $saved[$name] = [Environment]::GetEnvironmentVariable($name, 'Process')
        }
        foreach ($name in $settings.Keys) { [Environment]::SetEnvironmentVariable($name, $settings[$name], 'Process') }
        [Environment]::SetEnvironmentVariable('NODE_ENV', 'production', 'Process')
        [Environment]::SetEnvironmentVariable('VERCEL', '1', 'Process')
        [Environment]::SetEnvironmentVariable('LAB_ADMIN_EMAIL', $AdminEmail, 'Process')
        [Environment]::SetEnvironmentVariable('LAB_ADMIN_NAME', 'Dr. Swapnil Sahoo', 'Process')
        [Environment]::SetEnvironmentVariable('LAB_ADMIN_PASSWORD', $password, 'Process')
        if ($GenerateAdminPassword) { [Environment]::SetEnvironmentVariable('LAB_ADMIN_MUST_CHANGE_PASSWORD', 'true', 'Process') }
        # Recheck the empty database immediately before this first write, without importing getDatabase.
        $raw = Invoke-PrivateCommand -Command $node -Arguments @('--input-type=module') -InputText $probe -Label 'Final read-only database check'
        if (($raw | ConvertFrom-Json).tables -ne 0) { throw 'The database changed after preflight; refusing initialisation.' }
        $null = Invoke-PrivateCommand -Command $node -Arguments @('--conditions=react-server', '--import', 'tsx', 'scripts/learning-lab.mts', 'init') -Label 'Lab schema initialisation'
        $null = Invoke-PrivateCommand -Command $node -Arguments @('--conditions=react-server', '--import', 'tsx', 'scripts/learning-lab.mts', 'admin') -Label 'First administrator provisioning'
        Write-Host 'Fresh schema and administrator provisioned. No invitation email was sent.'
        # No upsert/force, and no updates/deletes: an existing key is always preserved.
        $records = @()
        foreach ($name in $settings.Keys) {
            if (@($productionEnvironment | Where-Object { $_.key -eq $name }).Count) { continue }
            $records += @{ key = $name; value = $settings[$name]; type = $(if ($coreNames -contains $name) { 'sensitive' } else { 'plain' }); target = @('production') }
        }
        $body = ConvertTo-Json -InputObject $records -Depth 5 -Compress
        $raw = Invoke-PrivateCommand -Command $vercel -Arguments @(
            'api', "/v10/projects/$($project.id)/env?upsert=false", '-X', 'POST', '--input', '-',
            '--scope', $VercelScope, '--raw', '--no-color', '--non-interactive'
        ) -InputText $body -Label 'Private production environment creation'
        $created = $raw | ConvertFrom-Json
        if ($created.PSObject.Properties['failed'] -and @($created.failed).Count) {
            throw 'Vercel reported one or more environment creation failures. Do not redeploy; use the recovery guide.'
        }
        $after = @(Get-ProductionEnvironment)
        foreach ($name in $settings.Keys) {
            $confirmed = @($after | Where-Object { $_.key -eq $name })
            if ($confirmed.Count -ne 1) { throw "Production $name was not uniquely confirmed. Do not redeploy; use the recovery guide." }
            if ($coreNames -contains $name -and $confirmed[0].type -ne 'sensitive') {
                throw "Production $name was not confirmed as sensitive. Do not redeploy; use the recovery guide."
            }
            if ($flagNames -contains $name -and ($confirmed[0].type -ne 'plain' -or $confirmed[0].value -ne 'false')) {
                throw "Production $name was not confirmed as false. Do not redeploy; use the recovery guide."
            }
        }
        Write-Host 'Private production settings added; paid offers remain unapproved and course checkout remains disabled.'
        $null = Invoke-PrivateCommand -Command $vercel -Arguments @(
            'redeploy', $deploymentUrl, '--target', 'production', '--scope', $VercelScope, '--no-color', '--non-interactive'
        ) -Label 'Production redeployment'
        Write-Host "Redeployment completed. Verify enquiries and operator sign-in at $baseUrl/learning-lab before inviting learners."
        if ($PassThru) { [pscustomobject]@{ Ready = $true; Mode = 'Activated'; BaseUrl = $baseUrl } }
    } finally {
        foreach ($name in $saved.Keys) { [Environment]::SetEnvironmentVariable($name, $saved[$name], 'Process') }
        $password = $null; $authSecret = $null; $body = $null; $records = $null; $settings = $null; $raw = $null
    }
} finally { Pop-Location }
