#requires -Version 5.1
# Website source setup only. This file contains no credentials.
$ErrorActionPreference = 'Stop'
$setupCommit = '53fe2443e509a9757178d1057dd8ea64c54b89da'
$setupSha256 = 'C7697208B18E444F9F8ABE03EBDA03EACE8282781764D554DCD77E358D9E86A3'
$sourceUrl = "https://raw.githubusercontent.com/swapnilsahoo/swapnilsahoo-next/$setupCommit/scripts/website-laptop.ps1"
$siteRoot = Join-Path $env:USERPROFILE 'web\site'
$downloadRoot = Join-Path $env:LOCALAPPDATA 'SwapnilWebsiteSetup'
$null = New-Item -ItemType Directory -Path $downloadRoot -Force
$downloadPath = Join-Path $downloadRoot ('website-laptop-' + $setupCommit + '.ps1')

Invoke-WebRequest -UseBasicParsing -Uri $sourceUrl -OutFile $downloadPath
if ((Get-FileHash -LiteralPath $downloadPath -Algorithm SHA256).Hash -ne $setupSha256) {
    throw 'Downloaded setup did not match the expected checksum. Nothing was executed.'
}
$powershellExe = Join-Path $env:WINDIR 'System32\WindowsPowerShell\v1.0\powershell.exe'
& $powershellExe -NoProfile -ExecutionPolicy Bypass -File $downloadPath -Mode Setup -RepoPath $siteRoot -Branch laptop-sync -InstallMissingTools -ConnectGitHub -NoOpen
if ($LASTEXITCODE -ne 0) { throw 'Setup needs attention. Resolve the message above and rerun this script.' }

$helper = Join-Path $siteRoot 'scripts\website-laptop.ps1'
& $powershellExe -NoProfile -ExecutionPolicy Bypass -File $helper -Mode Sync -RepoPath $siteRoot -Branch laptop-sync
if ($LASTEXITCODE -ne 0) { throw 'Initial GitHub sync did not complete. Automatic sync was not enabled.' }
& $powershellExe -NoProfile -ExecutionPolicy Bypass -File $helper -Mode EnableAutoSync -RepoPath $siteRoot -Branch laptop-sync
if ($LASTEXITCODE -ne 0) { throw 'Automatic sync could not be registered. Read the message above.' }
& $powershellExe -NoProfile -ExecutionPolicy Bypass -File $helper -Mode Status -RepoPath $siteRoot -Branch laptop-sync
if ($LASTEXITCODE -ne 0) { throw 'Check sync status in the website folder before editing.' }
& $powershellExe -NoProfile -ExecutionPolicy Bypass -File $helper -Mode Open -RepoPath $siteRoot -Branch laptop-sync
Write-Host "Ready: $siteRoot"
Write-Host 'In VS Code choose Terminal > Run Task > Website: Start local preview.'
Write-Host 'Open http://localhost:3110. GitHub sync runs every minute; publishing is separate.'
