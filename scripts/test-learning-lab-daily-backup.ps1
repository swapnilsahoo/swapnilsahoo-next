#requires -Version 5.1
# Isolated helpers only: no wrapper -Run, actual recovery/provider auth or live API.
$ErrorActionPreference='Stop'
Set-StrictMode -Version 2.0
$repoPath = Split-Path -Parent $PSScriptRoot
$tokens=$null; $errors=$null
$ast = [Management.Automation.Language.Parser]::ParseFile((Join-Path $PSScriptRoot 'backup-learning-lab.ps1'),[ref]$tokens,[ref]$errors)
if ($errors.Count) { throw 'Backup helper AST parse failed.' }
$functions = @{}
foreach ($definition in $ast.FindAll({ param($entry) $entry -is [Management.Automation.Language.FunctionDefinitionAst] }, $true)) {
    $functions[$definition.Name]=$definition.Extent.Text
    Invoke-Expression $definition.Extent.Text
}
$checks=[Collections.Generic.List[string]]::new()
function Confirm([bool]$Condition,[string]$Name) { if (-not $Condition) { throw $Name }; $checks.Add($Name); Write-Host "PASS $Name" }
function Must-Fail([scriptblock]$Action,[string]$Code) { try { & $Action; throw 'Expected isolated failure.' } catch { if ($_.Exception.Message -ne $Code) { throw 'Unexpected isolated failure code.' } } }
$fixture = Join-Path $repoPath ("artifacts/learning-lab/daily-backup-ps-test-" + [guid]::NewGuid().ToString())
New-OwnerDirectory $fixture
$ownerDirectory = Join-Path $fixture 'managed'; New-OwnerDirectory $ownerDirectory
$backupDirectory = Join-Path $ownerDirectory 'backups'; New-OwnerDirectory $backupDirectory
$privateKey = 'synthetic-only-DPAPI-recovery-secret-' + [guid]::NewGuid().ToString()
$secure = ConvertTo-SecureString $privateKey -AsPlainText -Force
try { [IO.File]::WriteAllText((Join-Path $fixture 'synthetic.dpapi'), (ConvertFrom-SecureString $secure)) } finally { $secure.Dispose() }
$roundtrip = Read-RecoverySecret (Join-Path $fixture 'synthetic.dpapi')
Confirm ($roundtrip -ceq $privateKey) 'Synthetic DPAPI round trip and owner-only ACL pass'
$roundtrip=$null; $privateKey=$null

$node=(Get-Command node.exe).Source
$env:NO_UPDATE_NOTIFIER='synthetic-caller-setting'
$nativeScript=Join-Path $fixture 'synthetic-native.cjs'
[IO.File]::WriteAllText($nativeScript,'process.stdout.write(JSON.stringify({safe:true,notifier:process.env.NO_UPDATE_NOTIFIER}));process.stderr.write("synthetic stderr banner")')
$native = Invoke-PrivateNative -Command $node -Arguments @($nativeScript) -Label 'SYNTHETIC'
$nativeJson=$native.Output | ConvertFrom-Json
Confirm ($native.Code -eq 0 -and $nativeJson.safe -eq $true -and $nativeJson.notifier -eq '1' -and $env:NO_UPDATE_NOTIFIER -eq 'synthetic-caller-setting') 'Native stdout excludes stderr and update-notifier caller state is restored'
$env:NO_UPDATE_NOTIFIER=$null

$VercelScope='synthetic-scope'; $ProjectId='prj_Synthetic'; $vercelEntryPath='synthetic-official-index.js'
function Invoke-PrivateNative([string]$Command,[string[]]$Arguments,[string]$Label,[string]$InputText) {
    $script:capturedCommand=$Command; $script:capturedArguments=$Arguments
    return [pscustomobject]@{ Code=0; Output='{"key":"TURSO_DATABASE_URL","value":"libsql://synthetic.invalid","decrypted":true}'; Label=$Label }
}
$metadata=@([pscustomobject]@{key='TURSO_DATABASE_URL';id='env_synthetic';target=@('production')})
$value=Get-ExistingProductionValue $metadata 'TURSO_DATABASE_URL'
Confirm ($value -ceq 'libsql://synthetic.invalid' -and $capturedCommand -eq $node -and $capturedArguments[0] -eq $vercelEntryPath -and $capturedArguments[2] -eq '/v1/projects/prj_Synthetic/env/env_synthetic') 'Vercel per-id GET uses Node official entrypoint and selected metadata only'
Must-Fail { Get-ExistingProductionValue @($metadata[0],$metadata[0]) 'TURSO_DATABASE_URL' } 'PRODUCTION_DATABASE_METADATA_NOT_UNIQUE'
Confirm $true 'Duplicate production credentials are refused'
function Invoke-PrivateNative { return [pscustomobject]@{Code=0;Output='{"key":"TURSO_DATABASE_URL","decrypted":false}'} }
Must-Fail { Get-ExistingProductionValue $metadata 'TURSO_DATABASE_URL' } 'PRODUCTION_DATABASE_VALUE_UNREADABLE'
Confirm $true 'Unreadable existing credential fails without rotation or env-file fallback'

$GitHubRepository='synthetic-owner/synthetic-backups'
$script:repositoryPrivate=$true; $script:repositoryOwner='synthetic-owner'; $script:readbackMismatch=$false
$script:uploadedBytes=$null; $script:uploadBody=$null; $script:putCalls=0; $script:getCalls=0
function Invoke-GitHubJson([string]$Endpoint,[string]$Method='GET',[string]$InputText) {
    if ($Endpoint -eq 'user') { return [pscustomobject]@{login='synthetic-owner'} }
    if ($Endpoint -eq "repos/$GitHubRepository") { return [pscustomobject]@{full_name=$GitHubRepository;owner=[pscustomobject]@{login=$script:repositoryOwner};private=$script:repositoryPrivate;archived=$false;fork=$false;permissions=[pscustomobject]@{push=$true}} }
    $remotePath=$Endpoint.Substring(("repos/$GitHubRepository/contents/").Length)
    if ($Method -eq 'PUT') {
        $script:putCalls++; $script:uploadBody=$InputText | ConvertFrom-Json
        $script:uploadedBytes=[Convert]::FromBase64String($script:uploadBody.content)
        return [pscustomobject]@{content=[pscustomobject]@{path=$remotePath}}
    }
    $script:getCalls++
    $content=if ($script:readbackMismatch) { [Convert]::ToBase64String([byte[]]@(1,2,3)) } else { [Convert]::ToBase64String($script:uploadedBytes) }
    return [pscustomobject]@{type='file';path=$remotePath;encoding='base64';size=$script:uploadedBytes.Length;content=$content}
}
Assert-PrivateGitHubRepository
$script:repositoryPrivate=$false
Must-Fail { Assert-PrivateGitHubRepository } 'GITHUB_OWNER_PRIVATE_REPOSITORY_REQUIRED'
$script:repositoryPrivate=$true; $script:repositoryOwner='other-owner'
Must-Fail { Assert-PrivateGitHubRepository } 'GITHUB_OWNER_PRIVATE_REPOSITORY_REQUIRED'
$script:repositoryOwner='synthetic-owner'
Confirm $true 'GitHub repository must be private and belong to the authenticated owner'
$filename='lab-daily-2026-10-11T12-00-00-000Z-' + [guid]::NewGuid().ToString() + '.json'
$backupFile=Join-Path $backupDirectory $filename
$envelope=@{version=1;iv=[Convert]::ToBase64String([byte[]]::new(12));tag=[Convert]::ToBase64String([byte[]]::new(16));data=[Convert]::ToBase64String([byte[]]::new(64))} | ConvertTo-Json -Compress
[IO.File]::WriteAllText($backupFile,$envelope,[Text.UTF8Encoding]::new($false))
$published=Publish-EncryptedGitHubBackup $backupFile
Confirm ($published.cloudUploadConfirmed -and $published.contentReadbackMatched -and $putCalls -eq 1 -and $getCalls -eq 1 -and @($uploadBody.PSObject.Properties).Count -eq 2 -and -not $uploadBody.PSObject.Properties['sha']) 'Encrypted-only GitHub stdin create is immutable and verified by content readback'
$script:readbackMismatch=$true
Must-Fail { Publish-EncryptedGitHubBackup $backupFile } 'GITHUB_BACKUP_READBACK_MISMATCH'
Confirm $true 'GitHub content mismatch fails instead of claiming off-site verification'
$script:readbackMismatch=$false
[IO.File]::WriteAllText($backupFile,('x' * 900001))
$before=$putCalls
Must-Fail { Publish-EncryptedGitHubBackup $backupFile } 'GITHUB_ENCRYPTED_BACKUP_SIZE_LIMIT'
Confirm ($putCalls -eq $before) '900000-byte encrypted upload limit fails before any mock remote write'

[IO.File]::WriteAllText((Join-Path $fixture 'results.json'),(ConvertTo-Json -InputObject @{passed=$true;checks=@($checks);fixture=$fixture} -Depth 4))
Write-Host "PASS $($checks.Count) isolated PowerShell helper checks. No actual provider calls or recovery reads."
