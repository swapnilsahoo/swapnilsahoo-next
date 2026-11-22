#requires -Version 5.1
<#
.SYNOPSIS
Runs this project's scheduled console tasks without opening a window.
.DESCRIPTION
On Windows 11, a console program started by Task Scheduler (powershell.exe, node.exe,
cmd.exe) opens a visible Windows Terminal window, and "-WindowStyle Hidden" cannot
hide it reliably. A task that runs every minute therefore flashes a window every minute.

This helper compiles the small launcher below with the C# compiler that ships with
Windows (.NET Framework) into %LOCALAPPDATA%\SwapnilWebsite and points tasks at it.
The launcher is a windowless program. It starts the original command with
CREATE_NO_WINDOW, waits for it and returns its exit code, so Task Scheduler results
stay meaningful. If Task Scheduler stops the launcher (for example at a time limit),
the command's whole process tree ends with it.

Nothing is downloaded and no binary is stored in Git; the launcher is rebuilt from
this source on each laptop when needed.
.PARAMETER TaskName
Existing task names (wildcards allowed) whose console actions should be converted.
Conversion is idempotent and keeps triggers, settings and the principal unchanged.
.PARAMETER PrintLauncher
Only build the launcher if needed and print its path (used by website-laptop.ps1).
.EXAMPLE
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\windowless-task.ps1 -TaskName 'Swapnil*'
#>
[CmdletBinding()]
param(
    [string[]]$TaskName = @(),
    [switch]$PrintLauncher
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version 2.0

$launcherSource = @'
using System;
using System.Runtime.InteropServices;
using System.Text;

public static class WindowlessTaskLauncher
{
    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    struct STARTUPINFO
    {
        public int cb; public string lpReserved; public string lpDesktop; public string lpTitle;
        public int dwX, dwY, dwXSize, dwYSize, dwXCountChars, dwYCountChars, dwFillAttribute, dwFlags;
        public short wShowWindow, cbReserved2;
        public IntPtr lpReserved2, hStdInput, hStdOutput, hStdError;
    }
    [StructLayout(LayoutKind.Sequential)]
    struct PROCESS_INFORMATION { public IntPtr hProcess, hThread; public int dwProcessId, dwThreadId; }
    [StructLayout(LayoutKind.Sequential)]
    struct JOBOBJECT_BASIC_LIMIT_INFORMATION
    {
        public long PerProcessUserTimeLimit, PerJobUserTimeLimit; public uint LimitFlags;
        public UIntPtr MinimumWorkingSetSize, MaximumWorkingSetSize; public uint ActiveProcessLimit;
        public UIntPtr Affinity; public uint PriorityClass, SchedulingClass;
    }
    [StructLayout(LayoutKind.Sequential)]
    struct IO_COUNTERS { public ulong ReadOps, WriteOps, OtherOps, ReadBytes, WriteBytes, OtherBytes; }
    [StructLayout(LayoutKind.Sequential)]
    struct JOBOBJECT_EXTENDED_LIMIT_INFORMATION
    {
        public JOBOBJECT_BASIC_LIMIT_INFORMATION Basic; public IO_COUNTERS Io;
        public UIntPtr ProcessMemoryLimit, JobMemoryLimit, PeakProcessMemoryUsed, PeakJobMemoryUsed;
    }
    [StructLayout(LayoutKind.Sequential)]
    struct MSG { public IntPtr hwnd; public uint message; public IntPtr wParam, lParam; public uint time; public int x, y; }

    [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
    static extern bool CreateProcess(string applicationName, StringBuilder commandLine, IntPtr processAttributes,
        IntPtr threadAttributes, bool inheritHandles, uint creationFlags, IntPtr environment,
        string currentDirectory, ref STARTUPINFO startupInfo, out PROCESS_INFORMATION processInformation);
    [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
    static extern IntPtr CreateJobObject(IntPtr attributes, string name);
    [DllImport("kernel32.dll", SetLastError = true)]
    static extern bool SetInformationJobObject(IntPtr job, int infoClass, ref JOBOBJECT_EXTENDED_LIMIT_INFORMATION info, int length);
    [DllImport("kernel32.dll", SetLastError = true)]
    static extern bool AssignProcessToJobObject(IntPtr job, IntPtr process);
    [DllImport("kernel32.dll", SetLastError = true)]
    static extern uint ResumeThread(IntPtr thread);
    [DllImport("kernel32.dll", SetLastError = true)]
    static extern uint WaitForSingleObject(IntPtr handle, uint milliseconds);
    [DllImport("kernel32.dll", SetLastError = true)]
    static extern bool GetExitCodeProcess(IntPtr process, out uint exitCode);
    [DllImport("kernel32.dll")]
    static extern bool CloseHandle(IntPtr handle);
    [DllImport("user32.dll")]
    static extern bool PeekMessage(out MSG message, IntPtr window, uint filterMin, uint filterMax, uint remove);

    const uint CREATE_SUSPENDED = 0x00000004;
    const uint CREATE_NO_WINDOW = 0x08000000;
    const uint JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE = 0x00002000;
    const int JobObjectExtendedLimitInformation = 9;

    public static int Main()
    {
        // Report "ready" at once so Windows does not show a busy pointer while we wait.
        MSG ignored;
        PeekMessage(out ignored, IntPtr.Zero, 0, 0, 0);

        string commandLine = AfterFirstToken(Environment.CommandLine);
        if (commandLine.Length == 0) return 87; // ERROR_INVALID_PARAMETER: nothing to run.

        // The job ends the command's process tree if this launcher is stopped.
        IntPtr job = CreateJobObject(IntPtr.Zero, null);
        if (job != IntPtr.Zero)
        {
            JOBOBJECT_EXTENDED_LIMIT_INFORMATION limits = new JOBOBJECT_EXTENDED_LIMIT_INFORMATION();
            limits.Basic.LimitFlags = JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE;
            if (!SetInformationJobObject(job, JobObjectExtendedLimitInformation, ref limits,
                Marshal.SizeOf(typeof(JOBOBJECT_EXTENDED_LIMIT_INFORMATION))))
            {
                CloseHandle(job);
                job = IntPtr.Zero;
            }
        }

        STARTUPINFO startup = new STARTUPINFO();
        startup.cb = Marshal.SizeOf(typeof(STARTUPINFO));
        PROCESS_INFORMATION process;
        if (!CreateProcess(null, new StringBuilder(commandLine), IntPtr.Zero, IntPtr.Zero, false,
            CREATE_NO_WINDOW | CREATE_SUSPENDED, IntPtr.Zero, null, ref startup, out process))
        {
            int error = Marshal.GetLastWin32Error();
            return error != 0 ? error : 1;
        }
        if (job != IntPtr.Zero) AssignProcessToJobObject(job, process.hProcess);
        ResumeThread(process.hThread);
        CloseHandle(process.hThread);
        WaitForSingleObject(process.hProcess, 0xFFFFFFFF);
        uint exitCode;
        if (!GetExitCodeProcess(process.hProcess, out exitCode)) exitCode = 1;
        CloseHandle(process.hProcess);
        return unchecked((int)exitCode);
    }

    // Removes this launcher's own path (the first token) from its command line.
    static string AfterFirstToken(string line)
    {
        int i = 0;
        while (i < line.Length && char.IsWhiteSpace(line[i])) i++;
        if (i < line.Length && line[i] == '"')
        {
            i++;
            while (i < line.Length && line[i] != '"') i++;
            if (i < line.Length) i++;
        }
        else
        {
            while (i < line.Length && !char.IsWhiteSpace(line[i])) i++;
        }
        return line.Substring(i).Trim();
    }
}
'@

function Get-WindowlessLauncher {
    $sha = [Security.Cryptography.SHA256]::Create()
    try { $hash = [BitConverter]::ToString($sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($launcherSource))).Replace('-','').Substring(0,12) }
    finally { $sha.Dispose() }
    $directory = Join-Path $env:LOCALAPPDATA 'SwapnilWebsite'
    $launcher = Join-Path $directory "WindowlessTask-$hash.exe"
    if (Test-Path -LiteralPath $launcher -PathType Leaf) { return $launcher }
    New-Item -ItemType Directory -Force -Path $directory | Out-Null
    $build = Join-Path $directory ('build-' + [guid]::NewGuid().ToString('N') + '.exe')
    try {
        Add-Type -TypeDefinition $launcherSource -Language CSharp -OutputAssembly $build -OutputType WindowsApplication
        if (-not (Test-Path -LiteralPath $launcher -PathType Leaf)) { Move-Item -LiteralPath $build -Destination $launcher }
    } finally {
        Remove-Item -LiteralPath $build -Force -ErrorAction SilentlyContinue
    }
    return $launcher
}

function Join-QuotedCommand([string]$Execute, [string]$Arguments) {
    $path = $Execute.Trim().Trim('"')
    if ($path.Contains('"')) { throw "Unexpected quote in task program path: $Execute" }
    $command = '"' + $path + '"'
    if ($Arguments) { $command += ' ' + $Arguments }
    return $command
}

$launcher = Get-WindowlessLauncher
if ($PrintLauncher) { return $launcher }
if (-not $TaskName.Count) { throw 'Name the tasks to convert with -TaskName, or use -PrintLauncher.' }

$consolePrograms = @('powershell.exe','pwsh.exe','node.exe','cmd.exe')
$tasks = @(Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue)
if (-not $tasks.Count) { Write-Warning ('No scheduled task matched: ' + ($TaskName -join ', ')); return }
foreach ($task in $tasks) {
    $changed = $false
    $actions = @(foreach ($action in $task.Actions) {
        $isExec = $action.CimClass.CimClassName -eq 'MSFT_TaskExecAction'
        $program = if ($isExec -and $action.Execute) { [IO.Path]::GetFileName($action.Execute.Trim().Trim('"')) } else { '' }
        $directory = if ($isExec) { $action.WorkingDirectory } else { $null }
        if ($program -match '^WindowlessTask-[0-9A-F]{12}\.exe$') {
            if ($action.Execute.Trim('"') -ieq $launcher) { $action; continue }
            $wrapped = $action.Arguments  # Older launcher build: keep the wrapped command, use the current launcher.
        } elseif ($consolePrograms -contains $program.ToLowerInvariant()) {
            $wrapped = Join-QuotedCommand $action.Execute $action.Arguments
        } else { $action; continue }
        $changed = $true
        if ($directory) { New-ScheduledTaskAction -Execute $launcher -Argument $wrapped -WorkingDirectory $directory }
        else { New-ScheduledTaskAction -Execute $launcher -Argument $wrapped }
    })
    if ($changed) {
        Set-ScheduledTask -TaskName $task.TaskName -TaskPath $task.TaskPath -Action $actions | Out-Null
        Write-Host "Windowless: $($task.TaskName) (converted)"
    } else {
        Write-Host "Windowless: $($task.TaskName) (already windowless or not a console task)"
    }
}
