#requires -Version 5.1
# Website source setup only. This file contains no credentials.
$ErrorActionPreference = 'Stop'
$setupCommit = '1c817066b713ff59ee0f647bb5148ecf7f0a51b8'
$setupSha256 = 'F814ACE63178F901E512B9BDE40DD7C729FAECE29591CC9205AB139EA01E222B'
$sourceUrl = "https://raw.githubusercontent.com/swapnilsahoo/swapnilsahoo-next/$setupCommit/scripts/website-laptop.ps1"
$siteRoot = Join-Path $env:USERPROFILE 'web\site'
$downloadRoot = Join-Path $env:LOCALAPPDATA 'SwapnilWebsiteSetup'
$null = New-Item -ItemType Directory -Path $downloadRoot -Force
$downloadPath = Join-Path $downloadRoot ('website-laptop-' + $setupCommit + '.ps1')

Invoke-WebRequest -UseBasicParsing -TimeoutSec 60 -Uri $sourceUrl -OutFile $downloadPath
if ((Get-FileHash -LiteralPath $downloadPath -Algorithm SHA256).Hash -ne $setupSha256) {
    throw 'Downloaded setup did not match the expected checksum. Nothing was executed.'
}
$powershellExe = Join-Path $env:WINDIR 'System32\WindowsPowerShell\v1.0\powershell.exe'
& $powershellExe -NoProfile -ExecutionPolicy Bypass -File $downloadPath -Mode Setup -RepoPath $siteRoot -Branch laptop-sync -InstallMissingTools -ConnectGitHub -NoOpen
if ($LASTEXITCODE -ne 0) { throw 'Setup needs attention. Resolve the message above and rerun this script.' }

# A child setup process can install tools but cannot update this terminal's PATH.
$env:Path = @(
    [Environment]::GetEnvironmentVariable('Path', 'Machine')
    [Environment]::GetEnvironmentVariable('Path', 'User')
    $env:Path
) -join ';'

$helper = Join-Path $siteRoot 'scripts\website-laptop.ps1'
& $powershellExe -NoProfile -ExecutionPolicy Bypass -File $helper -Mode Sync -RepoPath $siteRoot -Branch laptop-sync
if ($LASTEXITCODE -ne 0) { throw 'Initial GitHub sync did not complete. Automatic sync was not enabled.' }
& $powershellExe -NoProfile -ExecutionPolicy Bypass -File $helper -Mode EnableAutoSync -RepoPath $siteRoot -Branch laptop-sync
if ($LASTEXITCODE -ne 0) { throw 'Automatic sync could not be registered. Read the message above.' }
& $powershellExe -NoProfile -ExecutionPolicy Bypass -File $helper -Mode Status -RepoPath $siteRoot -Branch laptop-sync
if ($LASTEXITCODE -ne 0) { throw 'Check sync status in the website folder before editing.' }
& $powershellExe -NoProfile -ExecutionPolicy Bypass -File $helper -Mode Open -RepoPath $siteRoot -Branch laptop-sync
if ($LASTEXITCODE -ne 0) { throw "Sync is configured. Open this folder in VS Code: $siteRoot" }
Write-Host "Ready: $siteRoot"
Write-Host 'In VS Code choose Terminal > Run Task > Website: Start local preview.'
Write-Host 'Open http://localhost:3110. GitHub sync runs every minute; publishing is separate.'
