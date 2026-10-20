#requires -Version 5.1
param([switch]$Run)
$ErrorActionPreference = 'Stop'
$labRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$labDirectory = Join-Path $labRoot '.data\learning-lab-campaign-2026'
$labRecovery = Join-Path $labRoot '.data\lab-activation-prj_J7bQ4A0zQBS1u6BWvogfQWVSWef1'
function Assert-CampaignOwnerDirectory([string]$Path) {
  $item = Get-Item -LiteralPath $Path
  $owner = [Security.Principal.WindowsIdentity]::GetCurrent().User
  $acl = Get-Acl -LiteralPath $Path
  if (-not $item.PSIsContainer -or ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) -or -not $acl.AreAccessRulesProtected -or $acl.GetOwner([Security.Principal.SecurityIdentifier]).Value -ne $owner.Value) { throw 'Private owner directory required.' }
  $rules = @($acl.GetAccessRules($true,$true,[Security.Principal.SecurityIdentifier]))
  if (-not $rules.Count) { throw 'Owner access rule required.' }
  foreach ($rule in $rules) { if ($rule.IdentityReference.Value -ne $owner.Value -or $rule.AccessControlType -ne 'Allow') { throw 'Directory is accessible beyond the owner.' } }
}
Assert-CampaignOwnerDirectory $labRecovery
if (-not (Test-Path -LiteralPath $labDirectory)) {
  $null = New-Item -ItemType Directory -Path $labDirectory
  $owner = [Security.Principal.WindowsIdentity]::GetCurrent().User
  $acl = [Security.AccessControl.DirectorySecurity]::new()
  $acl.SetAccessRuleProtection($true,$false); $acl.SetOwner($owner)
  $acl.AddAccessRule([Security.AccessControl.FileSystemAccessRule]::new($owner,'FullControl','ContainerInherit,ObjectInherit','None','Allow'))
  Set-Acl -LiteralPath $labDirectory -AclObject $acl
}
Assert-CampaignOwnerDirectory $labDirectory
$receipt = Join-Path $labRoot 'artifacts\learning-lab\growth-execution-2026-10-20\outreach-sent.json'
if (-not (Test-Path -LiteralPath (Join-Path $labDirectory 'invitations.json'))) { Copy-Item -LiteralPath $receipt -Destination (Join-Path $labDirectory 'invitations.json') }
$cliPathFile = Join-Path $labDirectory 'codex-path.txt'
if (Test-Path -LiteralPath $cliPathFile) { $cli = (Get-Content -LiteralPath $cliPathFile -Raw).Trim() }
if (-not $cli -or -not (Test-Path -LiteralPath $cli)) {
  $installed = Get-Command codex.exe -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($installed) { $cli = $installed.Source }
  else {
    # The IDE adds its CLI to its own PATH; Task Scheduler may not inherit that.
    # Re-discover only the owner's installed extension after an ordinary update.
    $extensions = Join-Path $env:USERPROFILE '.vscode\extensions'
    $cli = @(Get-ChildItem -LiteralPath $extensions -Directory -Filter 'openai.chatgpt-*-win32-x64' -ErrorAction SilentlyContinue | Sort-Object LastWriteTimeUtc -Descending | ForEach-Object {
      try {
        $manifest = Get-Content -LiteralPath (Join-Path $_.FullName 'package.json') -Raw | ConvertFrom-Json
        if ($manifest.publisher -eq 'openai' -and $manifest.name -eq 'chatgpt') { Join-Path $_.FullName 'bin\windows-x86_64\codex.exe' }
      } catch { }
    } | Where-Object { Test-Path -LiteralPath $_ -PathType Leaf }) | Select-Object -First 1
  }
  if (-not $cli) { throw 'An installed owner Codex CLI is required; no installation or credential changes were attempted.' }
  Set-Content -LiteralPath $cliPathFile -Value $cli -Encoding UTF8
}
if (-not $Run) { Write-Output 'PASS owner-only campaign directory, invitation receipts and installed CLI preflight. No password decrypted or messages sent.'; exit 0 }
if ([DateTimeOffset]::Now -lt [DateTimeOffset]::Parse('2026-10-20T00:00:00+05:30') -or [DateTimeOffset]::Now -gt [DateTimeOffset]::Parse('2026-11-18T23:59:59.999+05:30')) { Write-Output 'Campaign is outside its dated window. No credentials decrypted or requests made.'; exit 0 }
$priorPassword = $env:LAB_CAMPAIGN_ADMIN_PASSWORD
$priorDirectory = $env:LAB_CAMPAIGN_DIRECTORY
$priorCli = $env:LAB_CAMPAIGN_CODEX
$passwordFile = Join-Path $labRecovery 'admin-password-permanent.dpapi'
$passwordItem = Get-Item -LiteralPath $passwordFile
if ($passwordItem.PSIsContainer -or ($passwordItem.Attributes -band [IO.FileAttributes]::ReparsePoint)) { throw 'A regular protected recovery file is required.' }
$secret = Get-Content -LiteralPath $passwordFile -Raw | ConvertTo-SecureString
$pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secret)
try { $env:LAB_CAMPAIGN_ADMIN_PASSWORD = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer) } finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer); $secret.Dispose() }
$env:LAB_CAMPAIGN_DIRECTORY = $labDirectory; $env:LAB_CAMPAIGN_CODEX = $cli
Push-Location -LiteralPath $labRoot
try {
  $node = (Get-Command node.exe -ErrorAction Stop).Source
  $nodeScript = Join-Path $PSScriptRoot 'run-learning-lab-campaign.mjs'
  $start = [Diagnostics.ProcessStartInfo]::new()
  $start.FileName = $node
  $start.Arguments = '--import tsx "' + $nodeScript + '" --run'
  $start.WorkingDirectory = $labRoot
  $start.UseShellExecute = $false
  $start.CreateNoWindow = $true
  $start.RedirectStandardOutput = $true
  $start.RedirectStandardError = $true
  $process = [Diagnostics.Process]::new(); $process.StartInfo = $start
  if (-not $process.Start()) { throw 'Campaign process did not start.' }
  $stdout = $process.StandardOutput.ReadToEndAsync()
  $stderr = $process.StandardError.ReadToEndAsync()
  $until = [DateTimeOffset]::UtcNow.AddMinutes(14)
  while (-not $process.WaitForExit(250)) {
    if ([DateTimeOffset]::UtcNow -ge $until) {
      # This PID is the exact Node child started above, never a name-based kill.
      & taskkill.exe /PID $process.Id /T /F *> $null
      throw 'Campaign process tree stopped at the outer runtime limit.'
    }
  }
  $safe = $null
  try { $safe = $stdout.Result | ConvertFrom-Json } catch { }
  if ($safe -and $safe.scope) { $safe | ConvertTo-Json -Compress }
  elseif ($safe -and $safe.skipped) { Write-Output ('Campaign skipped: ' + $safe.skipped) }
  if ($process.ExitCode -ne 0) { throw 'Campaign run did not verify completion. See the owner-only latest.json; no delivery or learning is assumed.' }
} finally {
  if ($process -and -not $process.HasExited) { & taskkill.exe /PID $process.Id /T /F *> $null }
  if ($process) { $process.Dispose() }
  $env:LAB_CAMPAIGN_ADMIN_PASSWORD = $priorPassword; $env:LAB_CAMPAIGN_DIRECTORY = $priorDirectory; $env:LAB_CAMPAIGN_CODEX = $priorCli
  $stdout = $null; $stderr = $null; $start = $null
  Pop-Location
}
