#requires -Version 5.1
param([switch]$Run)
$ErrorActionPreference = 'Stop'
$labRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$labRecoveryDirectory = Join-Path $labRoot '.data\lab-activation-prj_J7bQ4A0zQBS1u6BWvogfQWVSWef1'
$labPasswordFile = Join-Path $labRecoveryDirectory 'admin-password-permanent.dpapi'
$labOperationsDirectory = Join-Path $labRoot '.data\lab-operations-prj_J7bQ4A0zQBS1u6BWvogfQWVSWef1'
function Assert-LabOwnerDirectory([string]$Path) {
    $labItem = Get-Item -LiteralPath $Path
    $labIdentity = [Security.Principal.WindowsIdentity]::GetCurrent().User
    $labAcl = Get-Acl -LiteralPath $Path
    if (-not $labItem.PSIsContainer -or ($labItem.Attributes -band [IO.FileAttributes]::ReparsePoint) -or
        -not $labAcl.AreAccessRulesProtected -or $labAcl.GetOwner([Security.Principal.SecurityIdentifier]).Value -ne $labIdentity.Value) {
        throw 'Owner-protected operation directory required.'
    }
    $labRules = @($labAcl.GetAccessRules($true, $true, [Security.Principal.SecurityIdentifier]))
    if (-not $labRules.Count) { throw 'Owner access rule required.' }
    foreach ($labRule in $labRules) {
        if ($labRule.IdentityReference.Value -ne $labIdentity.Value -or $labRule.AccessControlType -ne 'Allow') {
            throw 'Operation directory has broader access than the owner.'
        }
    }
}
Assert-LabOwnerDirectory $labRecoveryDirectory
$labPasswordItem = Get-Item -LiteralPath $labPasswordFile
if ($labPasswordItem.PSIsContainer -or ($labPasswordItem.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
    throw 'A regular protected recovery file is required.'
}
if (-not $Run) {
    Write-Output 'Email retry task is ready to run under its Windows owner. This preflight makes no website or email request and decrypts no password.'
    exit 0
}
if (-not (Test-Path -LiteralPath $labOperationsDirectory)) {
    $null = New-Item -ItemType Directory -Path $labOperationsDirectory
    $labIdentity = [Security.Principal.WindowsIdentity]::GetCurrent().User
    $labAcl = [Security.AccessControl.DirectorySecurity]::new()
    $labAcl.SetAccessRuleProtection($true, $false)
    $labAcl.SetOwner($labIdentity)
    $labAcl.AddAccessRule([Security.AccessControl.FileSystemAccessRule]::new($labIdentity, 'FullControl', 'ContainerInherit,ObjectInherit', 'None', 'Allow'))
    Set-Acl -LiteralPath $labOperationsDirectory -AclObject $labAcl
}
Assert-LabOwnerDirectory $labOperationsDirectory
$labPreviousPassword = [Environment]::GetEnvironmentVariable('LAB_EMAIL_RETRY_ADMIN_PASSWORD', 'Process')
$labPreviousStatus = [Environment]::GetEnvironmentVariable('LAB_EMAIL_RETRY_STATUS_FILE', 'Process')
$labSecret = Get-Content -LiteralPath $labPasswordFile -Raw | ConvertTo-SecureString
$labPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($labSecret)
try {
    $env:LAB_EMAIL_RETRY_ADMIN_PASSWORD = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($labPointer)
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($labPointer)
    $labSecret.Dispose()
}
$env:LAB_EMAIL_RETRY_STATUS_FILE = Join-Path $labOperationsDirectory 'email-retry-latest.json'
Push-Location -LiteralPath $labRoot
try {
    $labResult = & node (Join-Path $PSScriptRoot 'process-learning-lab-emails.mjs') --run 2>$null
    $labExitCode = $LASTEXITCODE
    if ($labExitCode -ne 0) { throw 'Email retry did not complete. Check the protected status report; no raw credentials or response bodies are printed.' }
    $labSafeReport = $labResult | ConvertFrom-Json
    if ($labSafeReport.passed -ne $true) { throw 'Email retry status was not verified.' }
    if ($labSafeReport.providerConfigured) { Write-Output 'PASS bounded email retry completed; provider acceptance is not inbox delivery.' }
    else { Write-Output 'PASS protected task ran and signed out. Email provider is not connected; no email was attempted.' }
} finally {
    [Environment]::SetEnvironmentVariable('LAB_EMAIL_RETRY_ADMIN_PASSWORD', $labPreviousPassword, 'Process')
    [Environment]::SetEnvironmentVariable('LAB_EMAIL_RETRY_STATUS_FILE', $labPreviousStatus, 'Process')
    $labResult = $null
    Pop-Location
}
