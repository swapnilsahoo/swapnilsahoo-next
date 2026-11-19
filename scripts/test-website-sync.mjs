import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

// Entirely local: synthetic repositories, a bare origin, synthetic credentials.
// Neither the actual website Git index nor its .env files are opened or changed.
const worker = fileURLToPath(new URL("./website-sync.mjs", import.meta.url));
const temporary = await fs.mkdtemp(path.join(os.tmpdir(), "website-sync-test-"));
const remote = path.join(temporary, "cloud.git");
const timeoutOnly = process.argv.includes("--timeout-only");
let assertions = 0;
function command(executable, args, cwd, extraEnv = {}) {
  return spawnSync(executable, args, {
    cwd,
    encoding: "utf8",
    windowsHide: true,
    timeout: 90000,
    shell: false,
    env: {
      ...process.env,
      GIT_TERMINAL_PROMPT: "0",
      GCM_INTERACTIVE: "Never",
      GIT_CONFIG_NOSYSTEM: "1",
      ...extraEnv,
    },
  });
}
function git(cwd, ...args) {
  const result = command("git", args, cwd);
  assert.equal(result.status, 0, `Fixture Git operation failed: ${args[0]}`);
  return result.stdout.trim();
}
async function put(repo, name, value) {
  const filename = path.join(repo, name);
  await fs.mkdir(path.dirname(filename), { recursive: true });
  await fs.writeFile(filename, value);
}
function sync(repo, args = [], expected = 0, env = {}) {
  const result = command(
    process.execPath,
    [worker, "--repo", repo, "--test-remote", remote, "--once", ...args],
    temporary,
    { WEBSITE_SYNC_TEST: "1", NODE_ENV: "test", ...env }
  );
  assert.equal(
    result.status,
    expected,
    `Sync exit ${result.status}: ${result.stdout}${result.stderr}`
  );
  assertions++;
  return result.stdout + result.stderr;
}
function invoke(repo, args, expected = 0, env = {}) {
  const result = command(process.execPath, [worker, "--repo", repo, ...args], temporary, {
    WEBSITE_SYNC_TEST: "1",
    NODE_ENV: "test",
    ...env,
  });
  assert.equal(
    result.status,
    expected,
    `CLI exit ${result.status}: ${result.stdout}${result.stderr}`
  );
  assertions++;
  return result.stdout + result.stderr;
}
async function makeClone(name) {
  const repo = path.join(temporary, name);
  git(temporary, "clone", remote, repo);
  git(repo, "config", "user.name", "Sync Test Owner");
  git(repo, "config", "user.email", "sync-test@example.invalid");
  git(repo, "config", "core.autocrlf", "false");
  git(repo, "config", "core.hooksPath", path.join(temporary, "empty-hooks"));
  git(repo, "config", "commit.gpgsign", "false");
  git(repo, "checkout", "-b", "laptop-sync");
  return repo;
}
const head = (repo) => git(repo, "rev-parse", "HEAD");
const cloud = () => git(temporary, "--git-dir", remote, "rev-parse", "refs/heads/laptop-sync");
const cleanIndex = (repo) =>
  assert.equal(
    git(repo, "diff", "--cached", "--name-only"),
    "",
    "Worker left reverse-staged changes"
  );

try {
  git(temporary, "init", "--bare", remote);
  const seed = path.join(temporary, "seed");
  git(temporary, "init", "--initial-branch=main", seed);
  git(seed, "config", "user.name", "Sync Test Owner");
  git(seed, "config", "user.email", "sync-test@example.invalid");
  git(seed, "config", "core.autocrlf", "false");
  git(seed, "config", "core.hooksPath", path.join(temporary, "empty-hooks"));
  git(seed, "config", "commit.gpgsign", "false");
  await put(seed, ".gitignore", ".env*\n!.env.example\n.data/\nnode_modules/\n.next/\n.vercel/\n");
  await put(seed, "README.md", "Website sync fixture\n");
  await put(seed, "src/shared.txt", "baseline\n");
  await put(seed, "scratch-plan/tracked.txt", "private scratch baseline\n");
  git(seed, "add", ".");
  git(seed, "commit", "-m", "Initial fixture");
  git(seed, "remote", "add", "origin", remote);
  git(seed, "push", "origin", "main");
  git(temporary, "--git-dir", remote, "symbolic-ref", "HEAD", "refs/heads/main");
  const mainBefore = git(seed, "rev-parse", "HEAD");
  const office = await makeClone("Office laptop with spaces");
  const personal = timeoutOnly ? null : await makeClone("Personal laptop ü");

  sync(office); // Publish the dedicated branch without touching main.
  assert.equal(head(office), cloud());
  cleanIndex(office);
  if (!timeoutOnly) {
    const firstHead = cloud();
    sync(office);
    assert.equal(cloud(), firstHead, "Idempotent run made an empty commit");
    console.log("PASS dedicated branch and idempotence");

    await put(office, "src/office.txt", "office change\n");
    assert.ok(invoke(office, ["--test-remote", remote, "--status"], 2).includes("Sync: pending"));
    sync(office);
    cleanIndex(office);
    assert.equal(head(office), cloud());
    sync(personal);
    assert.equal(
      await fs.readFile(path.join(personal, "src/office.txt"), "utf8"),
      "office change\n"
    );
    assert.equal(head(personal), cloud());
    cleanIndex(personal);
    await put(personal, "docs/personal.md", "personal change\n");
    sync(personal);
    sync(office);
    assert.equal(
      await fs.readFile(path.join(office, "docs/personal.md"), "utf8"),
      "personal change\n"
    );

    // Both laptops start from the same commit and edit independently.
    await put(office, "src/independent-office.txt", "office concurrent\n");
    await put(personal, "src/independent-personal.txt", "personal concurrent\n");
    sync(office);
    sync(personal);
    sync(office);
    assert.equal(head(office), head(personal));
    assert.equal(head(office), cloud());
    assert.equal(
      git(personal, "show", "--format=%P", "--no-patch").split(" ").length,
      2,
      "Independent edits should merge without discarding either laptop"
    );
    cleanIndex(office);
    cleanIndex(personal);
    console.log("PASS bidirectional sync and independent concurrent merge");

    // Unsupported tracked scratch and untracked artifacts do not block source work.
    await put(office, "scratch-plan/tracked.txt", "changed private scratch\n");
    await put(office, "artifacts/private.json", "local evidence\n");
    await put(office, ".agents/private.txt", "local tools\n");
    await put(office, "unknown-local.txt", "unsupported local file\n");
    await put(office, ".env", "LAB_AUTH_SECRET=synthetic-private-value-for-only-this-test\n");
    await put(office, ".env.local", "RAZORPAY_KEY_SECRET=another-private-test-value\n");
    await put(office, ".data/private.db", "local database\n");
    await put(office, ".node-version", "24.19.0\n");
    await put(office, ".vscode/settings.json", '{"files.autoSave":"afterDelay"}\n');
    await put(office, ".vscode/tasks.json", '{"version":"2.0.0","tasks":[]}\n');
    await put(office, ".env.example", "LAB_LOCAL_MODE=true\nRAZORPAY_KEY_SECRET=\n");
    await put(office, "src/with-local-files.txt", "safe source content\n");
    sync(office);
    cleanIndex(office);
    assert.equal(
      await fs.readFile(path.join(office, "scratch-plan/tracked.txt"), "utf8"),
      "changed private scratch\n"
    );
    const outgoingFiles = git(office, "show", "--format=", "--name-only", "HEAD");
    for (const excluded of [
      "scratch-plan",
      "artifacts",
      ".agents",
      "unknown-local",
      ".env.local",
      ".data",
    ])
      assert.equal(outgoingFiles.includes(excluded), false);
    assert.ok(outgoingFiles.includes(".env.example"));
    assert.ok(outgoingFiles.includes(".vscode/tasks.json"));
    sync(personal);
    assert.equal(await fs.readFile(path.join(personal, ".node-version"), "utf8"), "24.19.0\n");

    // Pre-existing staging is byte-for-byte preserved until explicitly resolved.
    await put(personal, "src/staged.txt", "user staged work\n");
    git(personal, "add", "src/staged.txt");
    const staged = await fs.readFile(path.join(personal, ".git/index"));
    const stagedHead = head(personal);
    sync(personal, [], 2);
    assert.ok((await fs.readFile(path.join(personal, ".git/index"))).equals(staged));
    assert.equal(head(personal), stagedHead);
    assert.equal(cloud(), stagedHead);
    git(personal, "restore", "--staged", "src/staged.txt");
    sync(personal, [], 2); // Persistent pause requires an explicit resume.
    sync(personal, ["--resume"]);
    cleanIndex(personal);
    sync(office);
    console.log("PASS exclusions, local database isolation and staged-index preservation");

    // Exact private values from ignored dotenv files cannot enter source commits.
    const secretBefore = head(office);
    await put(office, "src/accidental-secret.txt", "synthetic-private-value-for-only-this-test\n");
    const secretMessage = sync(office, [], 2);
    assert.ok(secretMessage.includes("possible credential"));
    assert.equal(secretMessage.includes("synthetic-private-value-for-only-this-test"), false);
    assert.equal(head(office), secretBefore);
    assert.equal(cloud(), secretBefore);
    cleanIndex(office);
    await fs.unlink(path.join(office, "src/accidental-secret.txt"));
    sync(office, ["--resume"]);

    // Blank values must not consume the next assignment as a fake credential.
    // Values after blank fields, indentation and quoted multiline values stay guarded.
    const guardedValues = [
      "synthetic-indented-private-value",
      "synthetic-exported-private-value",
      "synthetic-multiline-first\nsynthetic-multiline-second",
    ];
    await put(
      office,
      ".env.local",
      [
        "LAB_DATABASE_AUTH_TOKEN=",
        "LAB_AUTH_SECRET=",
        "",
        "export LAB_ADMIN_PASSWORD = \t",
        "LAB_ADMIN_NAME=",
        "  LAB_EMPTY_SECRET = ",
        "LAB_PUBLIC_SETTING=harmless-public-setting",
        `  INDENTED_SECRET = '${guardedValues[0]}'`,
        `export\tEXPORTED_TOKEN = ${guardedValues[1]}`,
        `MULTILINE_PRIVATE_KEY="${guardedValues[2]}"`,
        "",
      ].join("\r\n")
    );
    await put(
      office,
      "src/empty-setting-names.txt",
      "LAB_AUTH_SECRET=\nLAB_ADMIN_NAME=\nLAB_PUBLIC_SETTING=harmless-public-setting\n"
    );
    sync(office);
    cleanIndex(office);
    assert.equal(head(office), cloud());
    assert.equal(git(office, "ls-files", ".env.local"), "");
    for (const value of guardedValues) {
      const safeHead = head(office);
      await put(office, "src/accidental-secret.txt", value);
      const message = sync(office, [], 2);
      assert.ok(message.includes("possible credential"));
      assert.equal(message.includes(value), false);
      assert.equal(head(office), safeHead);
      assert.equal(cloud(), safeHead);
      cleanIndex(office);
      await fs.unlink(path.join(office, "src/accidental-secret.txt"));
      sync(office, ["--resume"]);
    }
    console.log("PASS blank dotenv fields, horizontal whitespace and multiline secret guards");

    // Prefix protection works without dotenv, and errors do not echo the token.
    const token = "gh" + "p_" + "A".repeat(36);
    await put(personal, "src/token.txt", token);
    const prefixMessage = sync(personal, [], 2);
    assert.equal(prefixMessage.includes(token), false);
    assert.ok(prefixMessage.includes("possible credential"));
    await fs.unlink(path.join(personal, "src/token.txt"));
    sync(personal, ["--resume"]);

    // Manually committed secrets are checked in outgoing history, including a
    // secret that was removed again in a later local commit.
    const history = await makeClone("History guard");
    git(history, "merge", "--ff-only", "origin/laptop-sync");
    await put(history, "src/history-token.txt", token);
    git(history, "add", "src/history-token.txt");
    git(history, "commit", "-m", "Accidental synthetic credential");
    await put(history, "src/history-token.txt", "removed\n");
    git(history, "add", "src/history-token.txt");
    git(history, "commit", "-m", "Remove synthetic credential");
    const safeCloud = cloud();
    sync(history, [], 2);
    assert.equal(cloud(), safeCloud);
    const excluded = await makeClone("Excluded history guard");
    git(excluded, "merge", "--ff-only", "origin/laptop-sync");
    await put(excluded, "artifacts/accidental.txt", "private artifact\n");
    git(excluded, "add", "artifacts/accidental.txt");
    git(excluded, "commit", "-m", "Accidental artifact");
    assert.ok(sync(excluded, [], 2).includes("excluded files"));
    assert.equal(cloud(), safeCloud);
    const unknown = await makeClone("Unknown history guard");
    git(unknown, "merge", "--ff-only", "origin/laptop-sync");
    await put(unknown, "financial.xlsx", "synthetic personal spreadsheet\n");
    git(unknown, "add", "financial.xlsx");
    git(unknown, "commit", "-m", "Accidental personal spreadsheet");
    assert.ok(sync(unknown, [], 2).includes("excluded files"));
    assert.equal(cloud(), safeCloud);
    console.log("PASS dotenv, token-prefix, outgoing-history and excluded-history guards");

    // Same-line concurrent edits stop with both versions and merge state intact.
    sync(office);
    sync(personal);
    await put(office, "src/shared.txt", "office conflicting edit\n");
    await put(personal, "src/shared.txt", "personal conflicting edit\n");
    sync(office);
    const conflictCloud = cloud();
    assert.ok(sync(personal, [], 2).includes("Merge conflicts"));
    const conflicted = await fs.readFile(path.join(personal, "src/shared.txt"), "utf8");
    assert.ok(conflicted.includes("office conflicting edit"));
    assert.ok(conflicted.includes("personal conflicting edit"));
    assert.equal(cloud(), conflictCloud);
    sync(personal, ["--resume"], 2);
    await put(personal, "src/shared.txt", "resolved both laptop edits\n");
    git(personal, "add", "src/shared.txt");
    git(personal, "commit", "-m", "Resolve both versions");
    sync(personal, ["--resume"]);
    sync(office);
    cleanIndex(personal);
    cleanIndex(office);
    assert.equal(head(office), cloud());
    console.log("PASS conflict preservation and explicit resume");

    // A transient transport failure never claims cloud success and retries on
    // the next call without --resume. File edits remain intact while offline.
    git(office, "config", "remote.origin.uploadpack", "website-sync-missing-test-command");
    await put(office, "src/offline-change.txt", "saved locally during network outage\n");
    const offlineCloud = cloud();
    const offlineMessage = sync(office, [], 2);
    assert.equal(offlineMessage.includes("Synced"), false);
    assert.ok(offlineMessage.includes("fetch"));
    assert.equal(cloud(), offlineCloud);
    assert.equal(
      await fs.readFile(path.join(office, "src/offline-change.txt"), "utf8"),
      "saved locally during network outage\n"
    );
    const offlineStatus = invoke(office, ["--test-remote", remote, "--status"], 2);
    assert.ok(offlineStatus.includes("Sync: retrying"));
    assert.ok(offlineStatus.includes("Last cloud verification:"));
    git(office, "config", "--unset", "remote.origin.uploadpack");
    sync(office);
    sync(personal); // No resume required after network returns.

    // Configured hooks and signing are honored, never bypassed by the worker.
    const hookRepo = await makeClone("Hook guard");
    git(hookRepo, "merge", "--ff-only", "origin/laptop-sync");
    const hooks = path.join(hookRepo, ".git", "custom-hooks");
    await fs.mkdir(hooks);
    await fs.writeFile(
      path.join(hooks, "pre-commit"),
      "#!/bin/sh\nprintf 'hook-ran' > .git/sync-hook-marker\nexit 1\n",
      { mode: 0o755 }
    );
    git(hookRepo, "config", "core.hooksPath", hooks);
    await put(hookRepo, "src/hook-guard.txt", "hook must reject this automatic commit\n");
    const hookHead = head(hookRepo);
    sync(hookRepo, [], 2);
    assert.equal(
      await fs.readFile(path.join(hookRepo, ".git/sync-hook-marker"), "utf8"),
      "hook-ran"
    );
    assert.equal(head(hookRepo), hookHead);
    cleanIndex(hookRepo);
    git(hookRepo, "config", "core.hooksPath", path.join(temporary, "empty-hooks"));
    git(hookRepo, "config", "commit.gpgsign", "true");
    git(hookRepo, "config", "gpg.program", "website-sync-missing-test-signer");
    sync(hookRepo, ["--resume"], 2);
    assert.equal(head(hookRepo), hookHead);
    cleanIndex(hookRepo);
    git(hookRepo, "config", "commit.gpgsign", "false");
    sync(hookRepo, ["--resume"]);
    sync(office);
    sync(personal);

    // An ordinary user branch switch during an automatic merge is blocked by
    // the real index lock, while Git's merge runs through the private index.
    await fs.unlink(path.join(hooks, "pre-commit"));
    await fs.writeFile(
      path.join(hooks, "pre-merge-commit"),
      "#!/bin/sh\nunset GIT_INDEX_FILE\ngit switch main >/dev/null 2>&1\nprintf '%s' \"$?\" > .git/sync-switch-exit\nexit 0\n",
      { mode: 0o755 }
    );
    git(hookRepo, "config", "core.hooksPath", hooks);
    await put(office, "docs/merge-lock-cloud.md", "cloud side of merge\n");
    sync(office);
    await put(hookRepo, "src/merge-lock-local.txt", "local side of merge\n");
    sync(hookRepo);
    assert.notEqual(
      await fs.readFile(path.join(hookRepo, ".git/sync-switch-exit"), "utf8"),
      "0",
      "Concurrent ordinary branch switch escaped the real index lock"
    );
    assert.equal(git(hookRepo, "branch", "--show-current"), "laptop-sync");
    assert.equal(head(hookRepo), cloud());
    cleanIndex(hookRepo);
    sync(office);
    sync(personal);
    console.log("PASS configured hooks/signing and branch-switch lock during merge");

    // Branch, origin, test escape-hatch and lock checks make no source mutations.
    git(personal, "checkout", "main");
    invoke(personal, ["--test-remote", remote, "--once"], 1);
    invoke(personal, ["--test-remote", remote, "--branch", "main", "--once"], 1);
    git(personal, "checkout", "laptop-sync");
    const mismatchHead = head(personal);
    invoke(personal, ["--once"], 1); // Local origins require explicit test mode.
    invoke(personal, ["--test-remote", remote, "--once"], 1, { WEBSITE_SYNC_TEST: "0" });
    invoke(personal, ["--test-remote", remote, "--once"], 1, { NODE_ENV: "production" });
    git(personal, "remote", "set-url", "--push", "origin", "https://example.invalid/other.git");
    sync(personal, [], 1);
    git(personal, "remote", "set-url", "--push", "origin", remote);
    const lock = path.join(personal, ".git/website-sync.lock");
    await fs.mkdir(lock);
    await fs.writeFile(
      path.join(lock, "owner.json"),
      JSON.stringify({ pid: process.pid, host: os.hostname() })
    );
    sync(personal, [], 3);
    await fs.rm(lock, { recursive: true });
    assert.equal(head(personal), mismatchHead);
    const statusMessage = invoke(personal, ["--test-remote", remote, "--status"]);
    assert.ok(statusMessage.includes("Branch: laptop-sync"));
    assert.equal(
      git(temporary, "--git-dir", remote, "rev-parse", "refs/heads/main"),
      mainBefore,
      "Production branch changed"
    );
  }

  // A timed-out merge hook cannot keep writing after the worker releases its
  // locks. Preserve the private index, both source versions and merge metadata
  // for review rather than discarding an interrupted Git transaction.
  const timed = await makeClone("Timed merge recovery");
  git(timed, "merge", "--ff-only", "origin/laptop-sync");
  await put(timed, "src/timeout-local.txt", "local checkpoint before interrupted merge\n");
  git(timed, "add", "src/timeout-local.txt");
  git(timed, "commit", "-m", "Local checkpoint for timeout fixture");
  const timedHead = head(timed);
  await put(office, "docs/timeout-remote.md", "cloud checkpoint before interrupted merge\n");
  sync(office);
  const timedCloud = cloud();
  const slowHooks = path.join(timed, ".git/slow-hooks");
  await fs.mkdir(slowHooks);
  await fs.writeFile(
    path.join(slowHooks, "pre-merge-commit"),
    "#!/bin/sh\nfor n in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30; do\nprintf '.' >> .git/timeout-heartbeat\nsleep 0.2\ndone\nprintf 'escaped' > .git/timeout-escaped\nexit 0\n",
    { mode: 0o755 }
  );
  git(timed, "config", "core.hooksPath", slowHooks);
  sync(timed, [], 2, { WEBSITE_SYNC_TEST_TIMEOUT_MS: "2000" });
  const beat = await fs.readFile(path.join(timed, ".git/timeout-heartbeat"), "utf8");
  await new Promise((resolve) => setTimeout(resolve, 600));
  assert.equal(
    await fs.readFile(path.join(timed, ".git/timeout-heartbeat"), "utf8"),
    beat,
    "Hook kept writing after worker exited"
  );
  assert.equal(await fs.stat(path.join(timed, ".git/timeout-escaped")).catch(() => null), null);
  assert.equal(await fs.stat(path.join(timed, ".git/index.lock")).catch(() => null), null);
  assert.equal(await fs.stat(path.join(timed, ".git/website-sync.lock")).catch(() => null), null);
  const interrupted = JSON.parse(
    await fs.readFile(path.join(timed, ".git/website-sync-state.json"), "utf8")
  );
  assert.equal(interrupted.status, "paused");
  assert.match(interrupted.recoveryIndex, /^website-sync-merge-[0-9a-f-]+$/);
  const recoveryIndex = path.join(timed, ".git", interrupted.recoveryIndex);
  assert.ok((await fs.stat(recoveryIndex)).isFile());
  const recovered = command("git", ["ls-files", "--stage"], timed, {
    GIT_INDEX_FILE: recoveryIndex,
  });
  assert.equal(recovered.status, 0);
  assert.ok(recovered.stdout.includes("src/timeout-local.txt"));
  assert.ok(recovered.stdout.includes("docs/timeout-remote.md"));
  assert.equal(head(timed), timedHead);
  assert.equal(cloud(), timedCloud);
  assert.ok(
    (await fs.readFile(path.join(timed, "src/timeout-local.txt"), "utf8")).includes(
      "local checkpoint"
    )
  );
  assert.ok(
    (await fs.readFile(path.join(timed, "docs/timeout-remote.md"), "utf8")).includes(
      "cloud checkpoint"
    )
  );
  assert.ok(
    invoke(timed, ["--test-remote", remote, "--status"], 2).includes("Recovery index retained")
  );
  console.log("PASS timed-out merge process closure and retained recovery index");
  console.log(
    `PASS website sync: ${assertions} isolated CLI checks; two-laptop merge, conflict, staging, exclusions and credential guards verified; no network.`
  );
} finally {
  await fs.rm(temporary, { recursive: true, force: true });
}
