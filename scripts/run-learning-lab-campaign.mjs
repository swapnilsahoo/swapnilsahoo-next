import { readFile, writeFile, rename, open, stat, unlink, lstat } from "node:fs/promises";
import { resolve, join } from "node:path";
import { request } from "playwright";
import { createRequire } from "node:module";
import { CampaignGmail } from "./learning-lab-campaign-gmail.mjs";
import {
  campaignIsOpen,
  campaignNotesOpen,
  pilotEmailChoices,
  gmailData,
  header,
  addresses,
  updateSuppression,
  sentMessageMatches,
} from "./learning-lab-campaign-policy.mjs";
import { runCampaignHealth } from "./check-learning-lab-campaign.mjs";
const require = createRequire(import.meta.url),
  { getPublishedWeeklyNotes } = require("../src/features/learning-lab/weekly-notes.ts");
const root = resolve(import.meta.dirname, ".."),
  directory = process.env.LAB_CAMPAIGN_DIRECTORY;
if (!directory || !process.argv.includes("--run"))
  throw new Error("Use the protected owner PowerShell runner.");
const ownerEmail = "swapnil.s@greatlakes.edu.in",
  origin = "https://www.swapnilsahoo.com",
  deadline = Date.now() + 13 * 60 * 1000;
const report = {
  checkedAt: new Date().toISOString(),
  passed: false,
  phase: "start",
  sent: 0,
  attempted: 0,
  accepted: 0,
  reconciled: 0,
  withheld: 0,
  pilotResponses: 0,
  invitationReplies: 0,
  scope: "Actual bounded operator run; sending is not delivery, engagement or assessed learning.",
};
let password = process.env.LAB_CAMPAIGN_ADMIN_PASSWORD || "";
delete process.env.LAB_CAMPAIGN_ADMIN_PASSWORD; // Never inherited by Codex.
let gmail,
  client,
  timedOut = false,
  state;
const assertTime = () => {
  if (timedOut || Date.now() >= deadline) throw new Error("campaign-runtime-deadline");
};
const lockPath = join(directory, "operator.lock"),
  priorLock = await stat(lockPath).catch(() => null);
if (priorLock && Date.now() - priorLock.mtimeMs > 30 * 60 * 1000) await unlink(lockPath);
const lock = await open(lockPath, "wx").catch(() => null);
if (!lock) {
  password = "";
  console.log(JSON.stringify({ skipped: "another-run-or-unreviewed-lock" }));
  process.exit(0);
}
async function loadJson(path, fallback) {
  try {
    if (!(await lstat(path)).isFile()) throw new Error("private-state-not-regular-file");
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}
async function atomic(path, value) {
  const temp = path + "." + process.pid + ".tmp";
  await writeFile(temp, JSON.stringify(value, null, 2), { flag: "wx", mode: 0o600 });
  await rename(temp, path);
}
const statePath = join(directory, "state.json"),
  rawReads = [];
const safeFailure = (error) =>
  /^[a-z][a-z0-9-]{2,90}$/.test(error?.message || "") ? error.message : "operator-request-failed";
const escape = (text) =>
  text.replace(
    /[<>&"']/g,
    (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[c]
  );
function actionFor(email, note) {
  const url = `${origin}/learning-lab/weekly-notes/${note.slug}?utm_source=pilot_mail&utm_medium=email&utm_campaign=lab_pilot_2026`;
  return {
    key: email + ":" + note.slug,
    to: email,
    subject: `Learning Lab practice: ${note.title} [LL2026-${note.slug}]`,
    payload: {
      mime_type: "text/html",
      charset: "UTF-8",
      body: {
        content: `<p>Your optional Learning Lab practice note</p><h2>${escape(note.title)}</h2><p>${escape(note.summary)}</p><p>${escape(note.task)}</p><p><a href="${escape(url)}">Read the worked example and try the exercise</a></p><p>These are fictional learning examples. This is one of the four practice notes you selected in the voluntary pilot. Reply STOP to withdraw; reply RESUBSCRIBE to resume if your separate pilot notes choice is still on. Practice-note sending ends on 13 November 2026.</p><p>Swapnil Sahoo Learning Lab<br>Independently run by Dr. Swapnil Sahoo</p>`,
      },
    },
  };
}
async function tool(action, args) {
  assertTime();
  if (action === "send_email" && !campaignNotesOpen())
    throw new Error("practice-email-window-closed");
  const result = gmailData(await gmail.call(action, args));
  assertTime();
  if (action !== "send_email") rawReads.push({ action, arguments: args, result });
  return result;
}
async function search(query) {
  const result = await tool("search_emails", { query, max_results: 20 });
  if (!Array.isArray(result.emails)) throw new Error("gmail-search-shape-invalid");
  return result;
}
async function readEmail(id) {
  if (!/^[a-f0-9]{10,40}$/i.test(id || "")) throw new Error("gmail-message-id-invalid");
  const message = await tool("read_email", { message_id: id, format: "full" });
  if (message.id !== id || !message.payload) throw new Error("gmail-message-shape-invalid");
  return message;
}
async function scanWithdrawals(email, invitationMessages) {
  const found = await search(`in:anywhere after:2026/10/19 from:${email} to:${ownerEmail}`),
    messages = [...invitationMessages];
  for (const item of found.emails) messages.push(await readEmail(item.id));
  state.suppressions[email] = updateSuppression(
    state.suppressions[email],
    messages,
    email,
    ownerEmail
  );
  await atomic(statePath, state);
  return !found.next_page_token && !state.suppressions[email]?.suppressed;
}
async function reconcile(action) {
  const tag = action.subject.match(/\[LL2026-[a-z0-9-]+\]/)?.[0];
  if (!tag) throw new Error("campaign-subject-invalid");
  const found = await search(
    `in:anywhere after:2026/10/19 from:${ownerEmail} to:${action.to} subject:"${tag}"`
  );
  if (found.next_page_token) return "uncertain";
  for (const item of found.emails) {
    const message = await readEmail(item.id);
    if (sentMessageMatches(message, action, ownerEmail)) {
      state.outbox[action.key] = {
        status: "sent",
        id: message.id,
        verifiedAt: new Date().toISOString(),
      };
      await atomic(statePath, state);
      report.reconciled++;
      return "sent";
    }
    if (header(message, "subject") === action.subject) return "uncertain";
  }
  return state.outbox[action.key]?.status === "pending" ? "uncertain" : "not-sent";
}
async function run() {
  if (!campaignIsOpen()) {
    report.passed = true;
    report.skipped = "outside-campaign";
    return;
  }
  report.phase = "public-health";
  const health = await runCampaignHealth();
  assertTime();
  report.publicHealthPassed = health.passed;
  await atomic(join(directory, "public-health.json"), health);
  if (!health.passed) throw new Error("public-health-failed");
  report.phase = "private-read";
  if (password.length < 32) throw new Error("owner-recovery-unavailable");
  client = await request.newContext({ baseURL: origin, timeout: 30000, maxRedirects: 0 });
  const post = (path, data) =>
    client.post("/api/learning-lab/" + path, {
      data,
      headers: { Origin: origin, "Content-Type": "application/json" },
    });
  let records;
  try {
    assertTime();
    if (
      (
        await post("auth/sign-in/email", { email: ownerEmail, password, rememberMe: false })
      ).status() !== 200
    )
      throw new Error("operator-authentication-failed");
    password = "";
    const response = await client.get("/api/learning-lab/admin/pilot"),
      body = await response.json();
    assertTime();
    if (response.status() !== 200 || body.ok !== true || !Array.isArray(body.records))
      throw new Error("private-snapshot-failed");
    records = body.records.filter((row) => row.kind === "pilot-feedback" && !row.is_demo);
    report.pilotResponses = records.length;
  } finally {
    password = "";
  }
  await atomic(
    join(directory, "feedback-private.json"),
    records.map((row) => ({
      id: row.id,
      email: row.email,
      updatedAt: row.updated_at,
      feedback: row.message,
    }))
  );
  const choices = pilotEmailChoices(records);
  report.separateNotesOptIns = choices.filter((choice) => choice.learningNotesConsent).length;
  state = await loadJson(statePath, { outbox: {}, suppressions: {} });
  state.outbox ||= {};
  state.suppressions ||= {};
  delete state.hold;
  const invitations = await loadJson(join(directory, "invitations.json"), null);
  if (
    invitations?.account !== ownerEmail ||
    !Array.isArray(invitations.sent) ||
    invitations.sent.length !== 3 ||
    new Set(invitations.sent.map((item) => item.to)).size !== 3 ||
    invitations.sent.some(
      (item) =>
        !/^[-.\w+]+@[-.\w]+\.[a-z]{2,}$/i.test(item.to || "") ||
        !/^[a-f0-9]{10,40}$/i.test(item.result?.thread_id || "") ||
        !item.result?.label_ids?.includes("SENT")
    )
  )
    throw new Error("invitation-receipts-invalid");
  report.phase = "gmail-read";
  gmail = new CampaignGmail({ executable: process.env.LAB_CAMPAIGN_CODEX, cwd: root, deadline });
  await gmail.connect(root);
  const profile = await tool("get_profile", {});
  if (![profile.email, profile.email_address, profile.emailAddress].includes(ownerEmail))
    throw new Error("gmail-account-mismatch");
  report.gmailProfileVerified = true;
  const invitationMessages = new Map();
  for (const invitation of invitations.sent) {
    const thread = await tool("read_email_thread", {
      thread_id: invitation.result.thread_id,
      max_messages: 100,
    });
    if (thread.id !== invitation.result.thread_id || !Array.isArray(thread.messages))
      throw new Error("gmail-thread-shape-invalid");
    const messages = thread.messages.filter(
      (message) =>
        addresses(header(message, "from")).includes(invitation.to.toLowerCase()) &&
        addresses(header(message, "to")).includes(ownerEmail)
    );
    invitationMessages.set(invitation.to.toLowerCase(), messages);
    report.invitationReplies += messages.length;
    state.suppressions[invitation.to.toLowerCase()] = updateSuppression(
      state.suppressions[invitation.to.toLowerCase()],
      messages,
      invitation.to.toLowerCase(),
      ownerEmail
    );
  }
  await atomic(statePath, state);
  const notes = getPublishedWeeklyNotes(),
    allActions = choices.flatMap((contact) => notes.map((note) => actionFor(contact.email, note)));
  for (const action of allActions.filter((item) => state.outbox[item.key]?.status === "pending"))
    await reconcile(action);
  const eligible = new Set(
    choices.filter((contact) => contact.learningNotesConsent).map((contact) => contact.email)
  );
  report.notesSendingOpen = campaignNotesOpen();
  const candidates = report.notesSendingOpen
    ? allActions.filter(
        (action) => eligible.has(action.to) && state.outbox[action.key]?.status !== "sent"
      )
    : [];
  report.dueNotes = candidates.length;
  report.phase = "gmail-notes";
  for (const action of candidates) {
    if (report.attempted >= 5 || deadline - Date.now() < 45000 || !campaignNotesOpen()) break;
    if (!(await scanWithdrawals(action.to, invitationMessages.get(action.to) || []))) {
      report.withheld++;
      continue;
    }
    const status = await reconcile(action);
    if (status !== "not-sent") {
      if (status === "uncertain") report.withheld++;
      continue;
    }
    // Keep the protected operator cookie only in this process. Re-read consent
    // immediately before each send; an earlier snapshot is never sufficient.
    const freshResponse = await client.get("/api/learning-lab/admin/pilot");
    const fresh = await freshResponse.json();
    assertTime();
    if (freshResponse.status() !== 200 || fresh.ok !== true || !Array.isArray(fresh.records))
      throw new Error("fresh-consent-read-failed");
    report.freshConsentReads = (report.freshConsentReads || 0) + 1;
    const permission = pilotEmailChoices(fresh.records).find(
      (choice) => choice.email === action.to
    );
    if (permission?.learningNotesConsent !== true || state.suppressions[action.to]?.suppressed) {
      report.withheld++;
      continue;
    }
    if (!campaignNotesOpen()) break;
    assertTime();
    state.outbox[action.key] = { status: "pending", attemptedAt: new Date().toISOString() };
    await atomic(statePath, state);
    report.attempted++;
    try {
      const receipt = await tool("send_email", {
        to: action.to,
        subject: action.subject,
        payload: action.payload,
        response_fields: ["id", "thread_id", "label_ids"],
      });
      if (typeof receipt.id !== "string" || !receipt.label_ids?.includes("SENT")) {
        report.withheld++;
        continue;
      }
      report.accepted++;
      const message = await readEmail(receipt.id);
      if (!sentMessageMatches(message, action, ownerEmail)) {
        report.withheld++;
        continue;
      }
      state.outbox[action.key] = {
        status: "sent",
        id: receipt.id,
        verifiedAt: new Date().toISOString(),
      };
      await atomic(statePath, state);
      report.sent++;
    } catch (error) {
      report.withheld++;
      report.sendFailure = safeFailure(error);
      break;
    }
  }
  report.suppressedContacts = Object.values(state.suppressions).filter(
    (entry) => entry.suppressed
  ).length;
  report.pendingReconciliation = Object.values(state.outbox).filter(
    (entry) => entry.status === "pending"
  ).length;
  report.passed = true;
  report.phase = "complete";
}
let timer;
try {
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(
      () => {
        timedOut = true;
        reject(new Error("campaign-runtime-deadline"));
      },
      Math.max(1, deadline - Date.now())
    );
  });
  await Promise.race([run(), timeout]);
} catch (error) {
  report.failure = safeFailure(error);
  process.exitCode = 1;
} finally {
  clearTimeout(timer);
  password = "";
  if (client) {
    try {
      report.signedOut =
        (
          await client.post("/api/learning-lab/auth/sign-out", {
            data: {},
            headers: { Origin: origin, "Content-Type": "application/json" },
          })
        ).status() === 200;
    } catch {
      report.signedOut = false;
    } finally {
      await client.dispose().catch(() => {});
      client = null;
    }
    if (!report.signedOut) {
      report.passed = false;
      report.failure = "operator-sign-out-failed";
      process.exitCode = 1;
    }
  }
  if (gmail) await gmail.close();
  if (state) await atomic(statePath, state);
  await atomic(join(directory, "gmail-private-latest.json"), rawReads);
  await atomic(join(directory, "latest.json"), report);
  await lock.close();
  await unlink(lockPath);
}
console.log(JSON.stringify(report));
