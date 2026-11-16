import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { StringDecoder } from "node:string_decoder";

// Only this dedicated branch is synchronized. Production branches are refused.
// Tests may use an existing local bare origin with BOTH --test-remote <path> and
// WEBSITE_SYNC_TEST=1, and never with NODE_ENV=production. No network test needed.
// WEBSITE_SYNC_TEST_TIMEOUT_MS is honored only in that explicit local test mode.
const expectedRepository = "swapnilsahoo/swapnilsahoo-next";
const rootFiles = new Set([
  ".env.example",
  ".gitattributes",
  ".gitignore",
  "AGENTS.md",
  "CLAUDE.md",
  "README.md",
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "next.config.ts",
  "security-headers.ts",
  "tsconfig.json",
  "eslint.config.mjs",
  "postcss.config.mjs",
  "release-smoke.spec.mjs",
  "components.json",
  ".node-version",
  ".vscode/settings.json",
  ".vscode/tasks.json",
]);
const sourceDirectories = new Set(["src", "docs", "scripts", "public", "content", "tests"]);
const blockedDirectories = new Set([
  ".git",
  ".data",
  ".vercel",
  "node_modules",
  ".next",
  "artifacts",
  "scratch-plan",
  "scratch",
  ".agents",
  ".agent",
  ".codex",
  ".claude",
  ".vscode",
  ".github",
  "coverage",
  "test-results",
  "playwright-report",
  "out",
  "build",
  "tmp",
  "temp",
]);
const messages = {
  usage:
    "Invalid arguments. Use --repo PATH --branch laptop-sync --once, --watch, --status or --resume.",
  repository: "The selected folder must be the root of a normal Git working repository.",
  remote: "Origin must be the approved GitHub repository, without credentials in its URL.",
  branch:
    "Switch to the configured dedicated sync branch before syncing. Production branches are refused.",
  identity: "Configure this repository's Git user.name and user.email before syncing.",
  staged: "Existing staged changes were preserved. Commit or unstage them, then resume sync.",
  conflict: "Merge conflicts were preserved. Resolve and commit them in VS Code, then resume sync.",
  merge: "Git could not merge safely. Preserve your files, inspect Git status, then resume sync.",
  secret:
    "A possible credential was found in outgoing content. Remove it from all outgoing commits, then resume sync.",
  excluded:
    "An outgoing commit contains private or excluded files. Review its history before resuming sync.",
  fetch:
    "Could not fetch origin without interaction. Check network and GitHub sign-in; sync will retry.",
  push: "Could not push normally. Check network and GitHub access; sync will retry without force.",
  git: "A Git operation failed safely. Inspect the repository locally before resuming sync.",
  index:
    "Git's index is busy or changed concurrently. Existing staging was preserved; inspect it before resuming sync.",
  lock: "Another sync operation is active for this repository.",
  paused: "Sync is paused. Inspect status and use --resume after resolving the reported issue.",
  state: "Sync state could not be read safely. Inspect the local Git metadata before resuming.",
};
class SyncError extends Error {
  constructor(code, transient = false) {
    super(messages[code] || messages.git);
    this.code = code;
    this.transient = transient;
  }
}
const fail = (code, transient = false) => {
  throw new SyncError(code, transient);
};
const splitNull = (value) => value.toString("utf8").split("\0").filter(Boolean);
const forbidden = (name) => {
  if ([".vscode/settings.json", ".vscode/tasks.json"].includes(name)) return false;
  const parts = name.replaceAll("\\", "/").split("/");
  return parts.some(
    (part) =>
      blockedDirectories.has(part.toLowerCase()) ||
      (/^\.env/i.test(part) && !(parts.length === 1 && part === ".env.example")) ||
      /\.(?:pem|p12|pfx|key)$/i.test(part) ||
      /^id_(?:rsa|ed25519|dsa|ecdsa)(?:\.|$)/i.test(part)
  );
};
const allowed = (name, tracked) =>
  !forbidden(name) &&
  (rootFiles.has(name) || sourceDirectories.has(name.split("/")[0])) &&
  (tracked ||
    rootFiles.has(name) ||
    ["src", "docs", "scripts", "public", "content", "tests"].includes(name.split("/")[0]));

function options(argv) {
  const result = {
    repo: process.cwd(),
    branch: "laptop-sync",
    interval: 60,
    mode: "once",
    resume: false,
  };
  let modes = 0;
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (["--repo", "--branch", "--interval", "--test-remote"].includes(arg)) {
      const value = argv[++index];
      if (!value || value.startsWith("--")) fail("usage");
      result[arg === "--test-remote" ? "testRemote" : arg.slice(2)] = value;
    } else if (["--once", "--watch", "--status"].includes(arg)) {
      result.mode = arg.slice(2);
      modes++;
    } else if (arg === "--resume") result.resume = true;
    else fail("usage");
  }
  result.interval = Number(result.interval);
  if (
    modes > 1 ||
    !Number.isInteger(result.interval) ||
    result.interval < 5 ||
    result.interval > 3600 ||
    /^(?:main|master|production|prod|release)(?:\/|$)/i.test(result.branch) ||
    !/^[A-Za-z0-9][A-Za-z0-9._/-]{0,150}$/.test(result.branch) ||
    (result.resume && result.mode === "status")
  )
    fail("usage");
  if (
    result.testRemote &&
    (process.env.WEBSITE_SYNC_TEST !== "1" || process.env.NODE_ENV === "production")
  )
    fail("remote");
  if (result.testRemote && process.env.WEBSITE_SYNC_TEST_TIMEOUT_MS) {
    result.gitTimeout = Number(process.env.WEBSITE_SYNC_TEST_TIMEOUT_MS);
    if (
      !Number.isInteger(result.gitTimeout) ||
      result.gitTimeout < 250 ||
      result.gitTimeout > 45000
    )
      fail("usage");
  }
  return result;
}

function childEnvironment(extra = {}) {
  const env = { ...process.env };
  for (const key of Object.keys(env))
    if (
      /^GIT_(?:DIR|WORK_TREE|COMMON_DIR|INDEX_FILE|OBJECT_DIRECTORY|ALTERNATE_OBJECT_DIRECTORIES|CONFIG)/i.test(
        key
      )
    )
      delete env[key];
  return {
    ...env,
    GIT_TERMINAL_PROMPT: "0",
    GCM_INTERACTIVE: "Never",
    GIT_ASKPASS: "",
    GIT_EDITOR: "true",
    GIT_SEQUENCE_EDITOR: "true",
    GIT_MERGE_AUTOEDIT: "no",
    GIT_OPTIONAL_LOCKS: "0",
    GIT_NO_REPLACE_OBJECTS: "1",
    GIT_SSH_COMMAND: "ssh -o BatchMode=yes -o StrictHostKeyChecking=yes",
    ...extra,
  };
}

// Git is spawned directly, never through a shell. Captured stderr is deliberately
// never printed: authentication errors may contain credentials or private URLs.
async function runGit(context, args, { input, extraEnv, accepted = [0], scan } = {}) {
  return new Promise((resolve, reject) => {
    let bytes = 0,
      settled = false,
      overlap = "",
      abortError,
      escalation;
    const decoder = new StringDecoder("utf8");
    const output = [];
    const child = spawn("git", [...(args[0] === "add" ? ["--literal-pathspecs"] : []), ...args], {
      cwd: context.repo,
      env: childEnvironment(extraEnv),
      shell: false,
      windowsHide: true,
      detached: process.platform !== "win32",
      stdio: ["pipe", "pipe", "pipe"],
    });
    const timer = setTimeout(() => abort(new SyncError("git")), context.gitTimeout || 45000);
    function finish(error, result) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      clearTimeout(escalation);
      if (error) reject(error);
      else resolve(result);
    }
    function abort(error) {
      if (settled || abortError) return;
      abortError = error;
      // Wait for close before any index cleanup. Killing just Git's parent can
      // leave a hook alive and still writing its inherited private index.
      if (process.platform === "win32" && child.pid) {
        const killer = spawn("taskkill", ["/PID", String(child.pid), "/T", "/F"], {
          shell: false,
          windowsHide: true,
          stdio: "ignore",
        });
        killer.on("error", () => {
          child.kill();
        });
        killer.on("close", () => {
          if (!settled) child.kill();
        });
      } else {
        try {
          process.kill(-child.pid, "SIGTERM");
        } catch {
          child.kill();
        }
        escalation = setTimeout(() => {
          if (!settled) {
            try {
              process.kill(-child.pid, "SIGKILL");
            } catch {
              child.kill();
            }
          }
        }, 1000);
      }
    }
    child.on("error", () => {
      if (!child.pid) finish(new SyncError("git"));
      else abort(new SyncError("git"));
    });
    child.stderr.on("data", () => {});
    child.stdout.on("data", (chunk) => {
      if (abortError) return;
      if (scan) {
        const value = overlap + decoder.write(chunk);
        if (scan.matches(value)) {
          abort(new SyncError("secret"));
          return;
        }
        overlap = value.slice(-scan.window);
      } else {
        bytes += chunk.length;
        if (bytes > 32 * 1024 * 1024) {
          abort(new SyncError("git"));
          return;
        }
        output.push(chunk);
      }
    });
    child.on("close", (code) => {
      if (abortError) {
        finish(abortError);
        return;
      }
      if (scan && scan.matches(overlap + decoder.end())) {
        finish(new SyncError("secret"));
        return;
      }
      finish(null, { code, ok: accepted.includes(code), output: Buffer.concat(output) });
    });
    child.stdin.on("error", () => {});
    child.stdin.end(input);
  });
}
async function git(context, args, settings) {
  const result = await runGit(context, args, settings);
  if (!result.ok) fail("git");
  return result.output;
}
async function textGit(context, args, settings) {
  return (await git(context, args, settings)).toString("utf8").trim();
}

async function inspect(config) {
  const repo = await fs.realpath(path.resolve(config.repo)).catch(() => fail("repository"));
  const context = { ...config, repo };
  const top = await textGit(context, ["rev-parse", "--show-toplevel"]).catch(() =>
    fail("repository")
  );
  if ((await fs.realpath(top)) !== repo) fail("repository");
  const common = await textGit(context, ["rev-parse", "--git-common-dir"]);
  const own = await textGit(context, ["rev-parse", "--absolute-git-dir"]);
  context.gitDir = path.resolve(own);
  context.commonDir = path.resolve(repo, common);
  context.lockPath = path.join(context.commonDir, "website-sync.lock");
  context.statePath = path.join(context.commonDir, "website-sync-state.json");
  const origin = await textGit(context, ["remote", "get-url", "origin"]).catch(() =>
    fail("remote")
  );
  const pushOrigins = splitNull(
    (await textGit(context, ["remote", "get-url", "--push", "--all", "origin"])).replaceAll(
      "\n",
      "\0"
    )
  );
  if (config.testRemote) {
    const remote = await fs.realpath(path.resolve(config.testRemote)).catch(() => fail("remote"));
    if (
      !path.isAbsolute(origin) ||
      (await fs.realpath(origin).catch(() => "")) !== remote ||
      pushOrigins.some((value) => path.resolve(value) !== remote)
    )
      fail("remote");
    const bare = await textGit({ ...context, repo: remote }, ["rev-parse", "--is-bare-repository"]);
    if (bare !== "true") fail("remote");
  } else {
    const valid = (value) =>
      value === `https://github.com/${expectedRepository}.git` ||
      value === `https://github.com/${expectedRepository}` ||
      value === `git@github.com:${expectedRepository}.git`;
    if (!valid(origin) || pushOrigins.some((value) => !valid(value))) fail("remote");
  }
  const branch = await textGit(context, ["symbolic-ref", "--quiet", "--short", "HEAD"]).catch(() =>
    fail("branch")
  );
  if (
    branch !== config.branch ||
    !(await runGit(context, ["check-ref-format", "--branch", config.branch])).ok
  )
    fail("branch");
  return context;
}

async function readState(context) {
  try {
    return JSON.parse(await fs.readFile(context.statePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    fail("state");
  }
}
async function writeState(context, code, transient = false) {
  const previous = await readState(context).catch(() => null);
  await saveState(context, {
    branch: context.branch,
    status: transient ? "retrying" : "paused",
    code,
    at: new Date().toISOString(),
    verifiedAt: previous?.verifiedAt,
    localHead: previous?.localHead,
    remoteHead: previous?.remoteHead,
    recoveryIndex: context.recoveryIndex || previous?.recoveryIndex,
  });
}
async function saveState(context, state) {
  const temporary = `${context.statePath}.${randomUUID()}.tmp`;
  await fs.writeFile(temporary, JSON.stringify(state) + "\n", { mode: 0o600 });
  await fs.rename(temporary, context.statePath);
}
async function acquire(context) {
  try {
    await fs.mkdir(context.lockPath);
  } catch (error) {
    if (error.code !== "EEXIST") fail("lock", true);
    let owner;
    try {
      owner = JSON.parse(await fs.readFile(path.join(context.lockPath, "owner.json"), "utf8"));
    } catch {
      fail("lock", true);
    }
    if (owner.host !== os.hostname() || !Number.isInteger(owner.pid)) fail("lock", true);
    try {
      process.kill(owner.pid, 0);
      fail("lock", true);
    } catch (error) {
      if (error.code !== "ESRCH") fail("lock", true);
    }
    const stale = `${context.lockPath}.stale-${randomUUID()}`;
    await fs.rename(context.lockPath, stale).catch(() => fail("lock", true));
    await fs.rm(stale, { recursive: true, force: true });
    await fs.mkdir(context.lockPath).catch(() => fail("lock", true));
  }
  await fs.writeFile(
    path.join(context.lockPath, "owner.json"),
    JSON.stringify({ pid: process.pid, host: os.hostname() })
  );
  return async () => {
    await fs.rm(context.lockPath, { recursive: true, force: true });
  };
}

async function status(context) {
  const entries = splitNull(
    await git(context, ["status", "--porcelain=v1", "-z", "--untracked-files=all"])
  );
  const result = { staged: false, conflict: false, sources: [], unsupported: [] };
  for (let index = 0; index < entries.length; index++) {
    const record = entries[index],
      code = record.slice(0, 2),
      name = record.slice(3);
    if (/[RC]/.test(code)) index++;
    if (["DD", "AU", "UD", "UA", "DU", "AA", "UU"].includes(code)) result.conflict = true;
    if (code[0] !== " " && code[0] !== "?") result.staged = true;
    (allowed(name, code !== "??") ? result.sources : result.unsupported).push(name);
  }
  if (await fs.stat(path.join(context.gitDir, "MERGE_HEAD")).catch(() => null))
    result.conflict = true;
  return result;
}

async function secretScanner(context) {
  const privateValues = [];
  for (const name of [".env", ".env.local"]) {
    const ignored = await runGit(context, ["check-ignore", "--quiet", "--", name], {
      accepted: [0, 1],
    });
    if (!ignored.ok) fail("git");
    if (ignored.code === 1) continue;
    const location = path.join(context.repo, name);
    const info = await fs.stat(location).catch(() => null);
    if (!info?.isFile()) continue;
    if (info.size > 1024 * 1024) fail("secret");
    // Handles the dotenv forms used here; quoted multiline PEM values are also protected.
    const content = (await fs.readFile(location, "utf8")).replace(/^\uFEFF/, "");
    const assignment =
      /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(?:"((?:[^"\\]|\\[\s\S])*)"|'([^']*)'|([^\r\n]*))/gm;
    for (const match of content.matchAll(assignment)) {
      if (
        !/(?:SECRET|TOKEN|PASSWORD|PASSWD|PRIVATE_KEY|API_KEY|AUTH_KEY|ACCESS_KEY|CREDENTIAL|SIGNING_KEY|ENCRYPTION_KEY|DATABASE_URL)/i.test(
          match[1]
        )
      )
        continue;
      let value = match[2] ?? match[3] ?? match[4].replace(/\s+#.*$/, "").trim();
      if (match[2] !== undefined)
        value = value
          .replace(/\\n/g, "\n")
          .replace(/\\r/g, "\r")
          .replace(/\\"/g, '"')
          .replace(/\\\\/g, "\\");
      if (
        /^(?:true|false|null|undefined|0|1|<[^>]*>|your[-_ ].*|replace[-_ ].*|changeme)$/i.test(
          value
        )
      )
        continue;
      if (/DATABASE_URL/i.test(match[1]) && value.startsWith("file:")) continue;
      if (value.length > 8192) fail("secret");
      if (value.length) privateValues.push(value);
    }
  }
  const prefix =
    /-----BEGIN (?:RSA |DSA |EC |OPENSSH |ENCRYPTED )?PRIVATE KEY-----|(?:gh[pousr]_|github_pat_)[A-Za-z0-9_]{20,}|(?:AKIA|ASIA)[0-9A-Z]{16}|(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}|sk-(?:proj-|ant-)?[A-Za-z0-9_-]{20,}|AIza[0-9A-Za-z_-]{30,}|xox[baprs]-[A-Za-z0-9-]{10,}|(?:glpat-|hf_|npm_|pypi-|vercel_|turso_)[A-Za-z0-9_-]{20,}|\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/;
  return {
    window: Math.max(16384, ...privateValues.map((value) => value.length)),
    matches: (value) =>
      prefix.test(value) || privateValues.some((secret) => value.includes(secret)),
  };
}

async function scanObjects(context, objects, scanner) {
  for (const object of new Set(objects)) {
    if (!/^[0-9a-f]{40,64}$/.test(object)) fail("git");
    const result = await runGit(context, ["cat-file", "-p", object], { scan: scanner });
    if (!result.ok) fail("git");
  }
}
async function scanOutgoing(context, scanner) {
  const localRef = `refs/heads/${context.branch}`;
  const commits = (await textGit(context, ["rev-list", localRef, "--not", "--remotes=origin"]))
    .split("\n")
    .filter(Boolean);
  for (const commit of commits) {
    const names = splitNull(
      await git(context, [
        "diff-tree",
        "--root",
        "-m",
        "--no-commit-id",
        "--name-only",
        "--no-renames",
        "-r",
        "-z",
        commit,
      ])
    );
    if (names.some((name) => !allowed(name, true))) fail("excluded");
    if (names.some((name) => scanner.matches(name))) fail("secret");
  }
  const objects = (
    await textGit(context, [
      "rev-list",
      "--objects",
      "--no-object-names",
      localRef,
      "--not",
      "--remotes=origin",
    ])
  )
    .split("\n")
    .filter(Boolean);
  if (!objects.length) return;
  const details = await textGit(
    context,
    ["cat-file", "--batch-check=%(objectname) %(objecttype)"],
    { input: objects.join("\n") + "\n" }
  );
  await scanObjects(
    context,
    details
      .split("\n")
      .filter((line) => / (?:blob|commit)$/.test(line))
      .map((line) => line.split(" ")[0]),
    scanner
  );
}

async function commitSources(context, scanner) {
  const indexPath = path.join(context.gitDir, "index");
  const indexLock = `${indexPath}.lock`;
  const temporaryIndex = path.join(context.gitDir, `website-sync-index-${randomUUID()}`);
  let handle,
    ownsLock = false,
    mutationStarted = false,
    retainIndex = false;
  try {
    handle = await fs.open(indexLock, "wx", 0o600).catch(() => fail("index"));
    ownsLock = true;
    if ((await textGit(context, ["symbolic-ref", "--quiet", "--short", "HEAD"])) !== context.branch)
      fail("branch");
    const initial = await fs.readFile(indexPath).catch(() => fail("index"));
    const before = await status(context);
    if (before.conflict) fail("conflict");
    if (before.staged) fail("staged");
    if (!before.sources.length) return false;
    if (before.sources.some((name) => scanner.matches(name))) fail("secret");
    for (const key of ["user.name", "user.email"])
      if (!(await textGit(context, ["config", "--get", key]).catch(() => ""))) fail("identity");
    await fs.copyFile(indexPath, temporaryIndex);
    const extraEnv = { GIT_INDEX_FILE: temporaryIndex };
    await git(context, ["add", "-A", "--pathspec-from-file=-", "--pathspec-file-nul"], {
      extraEnv,
      input: before.sources.join("\0") + "\0",
    });
    const records = splitNull(
      await git(
        context,
        ["diff", "--cached", "--raw", "-z", "--no-renames", "--no-abbrev", "--diff-filter=ACMT"],
        { extraEnv }
      )
    );
    const objects = [];
    for (let index = 0; index < records.length; index += 2) {
      if (forbidden(records[index + 1])) fail("excluded");
      if (scanner.matches(records[index + 1])) fail("secret");
      objects.push(records[index].split(" ")[3]);
    }
    await scanObjects(context, objects, scanner);
    if (
      (await runGit(context, ["diff", "--cached", "--quiet"], { extraEnv, accepted: [0, 1] }))
        .code === 0
    )
      return false;
    await scanOutgoing(context, scanner);
    const oldHead = await textGit(context, ["rev-parse", `refs/heads/${context.branch}`]);
    if ((await textGit(context, ["symbolic-ref", "--quiet", "--short", "HEAD"])) !== context.branch)
      fail("branch");
    const currentIndex = await fs.readFile(indexPath);
    if (!initial.equals(currentIndex)) fail("index");
    mutationStarted = true;
    await git(context, ["commit", "-m", "Sync website work"], { extraEnv });
    const newHead = await textGit(context, ["rev-parse", `refs/heads/${context.branch}`]);
    if (newHead === oldHead || !(await fs.readFile(indexPath)).equals(initial)) fail("index");
    await handle.writeFile(await fs.readFile(temporaryIndex));
    await handle.close();
    handle = null;
    await fs.rename(indexLock, indexPath);
    ownsLock = false;
    return true;
  } catch (error) {
    if (mutationStarted) {
      retainIndex = true;
      context.recoveryIndex = path.basename(temporaryIndex);
    }
    throw error;
  } finally {
    if (handle) await handle.close().catch(() => {});
    if (ownsLock) await fs.unlink(indexLock).catch(() => {});
    if (!retainIndex) {
      await fs.unlink(temporaryIndex).catch(() => {});
      await fs.unlink(`${temporaryIndex}.lock`).catch(() => {});
    }
  }
}

async function fetchOrigin(context) {
  const result = await runGit(context, [
    "fetch",
    "--no-tags",
    "--recurse-submodules=no",
    "origin",
    "refs/heads/*:refs/remotes/origin/*",
  ]).catch(() => fail("fetch", true));
  if (!result.ok) fail("fetch", true);
}
async function mergeOrigin(context, scanner) {
  if ((await textGit(context, ["symbolic-ref", "--quiet", "--short", "HEAD"])) !== context.branch)
    fail("branch");
  if (
    !(
      await runGit(context, [
        "show-ref",
        "--verify",
        "--quiet",
        `refs/remotes/origin/${context.branch}`,
      ])
    ).ok
  )
    return;
  const remoteRef = `refs/remotes/origin/${context.branch}`;
  const localRef = `refs/heads/${context.branch}`;
  const ahead = await textGit(context, ["rev-list", "--count", `${localRef}..${remoteRef}`]);
  if (ahead === "0") return;
  // Incoming content is scanned before it can affect future automatic commits.
  const incoming = (
    await textGit(context, [
      "rev-list",
      "--objects",
      "--no-object-names",
      remoteRef,
      `^${localRef}`,
    ])
  )
    .split("\n")
    .filter(Boolean);
  if (incoming.length) {
    const details = await textGit(
      context,
      ["cat-file", "--batch-check=%(objectname) %(objecttype)"],
      { input: incoming.join("\n") + "\n" }
    );
    await scanObjects(
      context,
      details
        .split("\n")
        .filter((line) => / (?:blob|commit)$/.test(line))
        .map((line) => line.split(" ")[0]),
      scanner
    );
  }
  // Hold the actual index lock while merge uses a private index. This blocks a
  // simultaneous normal checkout/switch without preventing the merge itself.
  // Publish conflict stages as well as successful merges so VS Code can resolve
  // both laptops' versions using Git's ordinary merge tools.
  const indexPath = path.join(context.gitDir, "index"),
    indexLock = `${indexPath}.lock`;
  const temporaryIndex = path.join(context.gitDir, `website-sync-merge-${randomUUID()}`);
  let handle,
    ownsLock = false,
    result,
    mutationStarted = false,
    retainIndex = false;
  try {
    handle = await fs.open(indexLock, "wx", 0o600).catch(() => fail("index"));
    ownsLock = true;
    if ((await textGit(context, ["symbolic-ref", "--quiet", "--short", "HEAD"])) !== context.branch)
      fail("branch");
    const before = await status(context);
    if (before.conflict) fail("conflict");
    if (before.staged) fail("staged");
    const initial = await fs.readFile(indexPath);
    await fs.copyFile(indexPath, temporaryIndex);
    mutationStarted = true;
    result = await runGit(context, ["merge", "--no-edit", remoteRef], {
      extraEnv: { GIT_INDEX_FILE: temporaryIndex },
    });
    if (!(await fs.readFile(indexPath)).equals(initial)) fail("index");
    await handle.writeFile(await fs.readFile(temporaryIndex));
    await handle.close();
    handle = null;
    await fs.rename(indexLock, indexPath);
    ownsLock = false;
  } catch (error) {
    if (mutationStarted) {
      retainIndex = true;
      context.recoveryIndex = path.basename(temporaryIndex);
    }
    throw error;
  } finally {
    if (handle) await handle.close().catch(() => {});
    if (ownsLock) await fs.unlink(indexLock).catch(() => {});
    if (!retainIndex) {
      await fs.unlink(temporaryIndex).catch(() => {});
      await fs.unlink(`${temporaryIndex}.lock`).catch(() => {});
    }
  }
  if (!result.ok) {
    if ((await status(context)).conflict) fail("conflict");
    fail("merge");
  }
}

async function cycle(context) {
  // A watch process must notice branch or remote changes made since its launch.
  await inspect(context);
  const release = await acquire(context);
  context.recoveryIndex = undefined;
  try {
    const recorded = await readState(context);
    if (recorded?.status === "paused" && !context.resume) fail("paused");
    context.resume = false;
    const before = await status(context);
    if (before.conflict) fail("conflict");
    if (before.staged) fail("staged");
    const scanner = await secretScanner(context);
    await fetchOrigin(context);
    const committed = await commitSources(context, scanner);
    const afterCommit = await status(context);
    if (afterCommit.conflict) fail("conflict");
    if (afterCommit.staged) fail("staged");
    for (let attempt = 0; attempt < 3; attempt++) {
      await mergeOrigin(context, scanner);
      await scanOutgoing(context, scanner);
      const remoteRef = `refs/remotes/origin/${context.branch}`;
      const remoteExists = (await runGit(context, ["show-ref", "--verify", "--quiet", remoteRef]))
        .ok;
      const outgoing = remoteExists
        ? await textGit(context, [
            "rev-list",
            "--count",
            `${remoteRef}..refs/heads/${context.branch}`,
          ])
        : "1";
      if (outgoing === "0") break;
      const pushed = await runGit(context, [
        "push",
        "--porcelain",
        "--no-follow-tags",
        "--recurse-submodules=no",
        "origin",
        `refs/heads/${context.branch}:refs/heads/${context.branch}`,
      ]).catch(() => ({ ok: false }));
      if (pushed.ok) break;
      if (attempt === 2) fail("push", true);
      await fetchOrigin(context);
    }
    await fetchOrigin(context);
    const localHead = await textGit(context, ["rev-parse", `refs/heads/${context.branch}`]);
    const remoteHead = await textGit(context, [
      "rev-parse",
      `refs/remotes/origin/${context.branch}`,
    ]);
    if (localHead !== remoteHead) fail("push", true);
    await inspect(context);
    const after = await status(context);
    if (after.conflict) fail("conflict");
    if (after.staged) fail("staged");
    const verifiedAt = new Date().toISOString();
    await saveState(context, {
      branch: context.branch,
      status: after.sources.length ? "pending" : "synced",
      localHead,
      remoteHead,
      at: verifiedAt,
      verifiedAt,
      pending: after.sources.length > 0,
    });
    console.log(
      `${after.sources.length ? "Cloud checkpoint saved; newer website edits pending" : `Synced ${context.branch}`}${committed ? "; website changes saved" : ""}.${after.unsupported.length ? ` ${after.unsupported.length} excluded change(s) remain local.` : ""}`
    );
    return 0;
  } catch (error) {
    const safe = error instanceof SyncError ? error : new SyncError("git");
    if (safe.code !== "paused" && safe.code !== "lock")
      await writeState(context, safe.code, safe.transient).catch(() => {});
    throw safe;
  } finally {
    await release();
  }
}

export async function main(argv = process.argv.slice(2)) {
  let context;
  try {
    context = await inspect(options(argv));
    if (context.mode === "status") {
      const recorded = await readState(context),
        current = await status(context);
      const state = current.conflict ? "conflict" : current.staged ? "staged" : recorded?.code;
      const localHead = await textGit(context, ["rev-parse", "HEAD"]);
      const remoteHead = await textGit(context, [
        "rev-parse",
        "--verify",
        `refs/remotes/origin/${context.branch}`,
      ]).catch(() => "unavailable");
      const syncState = state
        ? recorded?.status === "retrying"
          ? "retrying"
          : "paused"
        : recorded?.status === "synced" &&
            recorded.localHead === localHead &&
            remoteHead === localHead &&
            !current.sources.length
          ? "synced (last verified checkpoint)"
          : "pending";
      console.log(
        `Branch: ${context.branch}. Sync: ${syncState}. Website changes: ${current.sources.length}. Other local changes: ${current.unsupported.length}.`
      );
      console.log(`Local HEAD: ${localHead}. Cached cloud HEAD: ${remoteHead}.`);
      if (/^\d{4}-\d{2}-\d{2}T[\d:.]+Z$/.test(recorded?.verifiedAt || ""))
        console.log(`Last cloud verification: ${recorded.verifiedAt}`);
      if (/^website-sync-(?:index|merge)-[0-9a-f-]+$/.test(recorded?.recoveryIndex || ""))
        console.log(
          `Recovery index retained in Git metadata: ${recorded.recoveryIndex}. Inspect the interrupted operation before resuming.`
        );
      if (state) console.log(messages[state] || messages.paused);
      return state || syncState === "pending" ? 2 : 0;
    }
    if (context.mode === "once") return await cycle(context);
    let stopping = false;
    const stop = () => {
      stopping = true;
    };
    process.once("SIGINT", stop);
    process.once("SIGTERM", stop);
    while (!stopping) {
      try {
        await cycle(context);
      } catch (error) {
        console.error(error instanceof SyncError ? error.message : messages.git);
      }
      const until = Date.now() + context.interval * 1000;
      while (!stopping && Date.now() < until)
        await new Promise((resolve) => setTimeout(resolve, Math.min(1000, until - Date.now())));
    }
    return 0;
  } catch (error) {
    const safe = error instanceof SyncError ? error : new SyncError("git");
    console.error(safe.message);
    return safe.code === "lock"
      ? 3
      : ["usage", "repository", "remote", "branch"].includes(safe.code)
        ? 1
        : 2;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  process.exitCode = await main();
