param([switch]$CopyToClipboard)
$ErrorActionPreference = 'Stop'
$labRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$labRecovery = Join-Path $labRoot '.data\lab-activation-prj_J7bQ4A0zQBS1u6BWvogfQWVSWef1\admin-password-permanent.dpapi'
if (-not (Test-Path -LiteralPath $labRecovery -PathType Leaf)) {
    throw 'The protected administrator recovery file is not available on this Windows account.'
}
if (-not $CopyToClipboard) {
    Write-Output 'The permanent administrator password is stored encrypted for its Windows owner. Run with -CopyToClipboard only when ready to paste into the HTTPS Lab sign-in. No password is printed.'
    exit 0
}
$labClipboardSettings = Get-ItemProperty -LiteralPath 'HKCU:\Software\Microsoft\Clipboard' -ErrorAction SilentlyContinue
if ($labClipboardSettings.EnableClipboardHistory -eq 1 -or $labClipboardSettings.EnableCloudClipboard -eq 1) {
    throw 'Disable Windows clipboard history and sync before copying an administrator password.'
}
$labSecret = Get-Content -LiteralPath $labRecovery -Raw | ConvertTo-SecureString
$labPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($labSecret)
try {
    Set-Clipboard -Value ([Runtime.InteropServices.Marshal]::PtrToStringBSTR($labPointer))
    Write-Output 'Copied privately. Paste only at https://www.swapnilsahoo.com/learning-lab/login, then clear the clipboard with Set-Clipboard -Value "".'
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($labPointer)
    $labSecret.Dispose()
}
