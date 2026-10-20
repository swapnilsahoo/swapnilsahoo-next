import assert from "node:assert/strict";
import {
  campaignIsOpen,
  pilotEmailChoices,
  completedGmailCalls,
  campaignStart,
  campaignEnd,
  campaignNotesEnd,
  campaignNotesOpen,
  gmailData,
  currentReplyText,
  updateSuppression,
  sentMessageMatches,
} from "./learning-lab-campaign-policy.mjs";
const marker = "\nPILOT_AUTOMATION_META_V1\n",
  meta = { lesson: "write-an-ai-task-brief", followUpConsent: false, learningNotesConsent: true };
const row = {
  kind: "pilot-feedback",
  email: "adult@example.com",
  is_demo: 0,
  marketing_consent: 0,
  updated_at: 1,
  message: "fictional feedback" + marker + JSON.stringify(meta),
};
assert.equal(campaignIsOpen(campaignStart), true);
assert.equal(campaignIsOpen(campaignEnd), true);
assert.equal(campaignIsOpen(campaignEnd + 1), false);
assert.equal(campaignNotesOpen(campaignStart), true);
assert.equal(campaignNotesOpen(campaignNotesEnd), true);
assert.equal(campaignNotesOpen(campaignNotesEnd + 1), false);
assert.equal(campaignNotesOpen(campaignEnd), false);
assert.equal(
  campaignIsOpen(campaignNotesEnd + 1),
  true,
  "Feedback and private review remain open after practice-email sending ends."
);
assert.equal(pilotEmailChoices([row])[0].learningNotesConsent, true);
assert.equal(pilotEmailChoices([{ ...row, kind: "learner" }]).length, 0);
assert.equal(pilotEmailChoices([{ ...row, is_demo: 1 }]).length, 0);
assert.equal(pilotEmailChoices([{ ...row, message: row.message + " garbage" }]).length, 0);
assert.equal(
  pilotEmailChoices([
    { ...row, message: marker + JSON.stringify({ ...meta, learningNotesConsent: "true" }) },
  ]).length,
  0
);
const revoked = {
  ...row,
  updated_at: 2,
  message: marker + JSON.stringify({ ...meta, learningNotesConsent: false }),
};
assert.equal(pilotEmailChoices([row, revoked])[0].learningNotesConsent, false);
assert.equal(
  pilotEmailChoices([
    {
      ...row,
      message:
        marker +
        JSON.stringify(meta) +
        marker +
        JSON.stringify({ ...meta, learningNotesConsent: false }),
    },
  ])[0].learningNotesConsent,
  false
);
assert.equal(
  completedGmailCalls(
    JSON.stringify({ type: "item.completed", item: { type: "agent_message", text: "sent" } })
  ).length,
  0
);
assert.equal(
  completedGmailCalls(
    JSON.stringify({
      type: "item.completed",
      item: { type: "mcp_tool_call", tool: "gmail_send_email", result: {} },
    })
  ).length,
  1
);
const owner = "owner@example.com",
  participant = "adult@example.com";
function email(body, at, extra = {}) {
  return {
    id: String(at),
    internal_date: String(at),
    label_ids: ["INBOX"],
    payload: {
      mime_type: "text/plain",
      body: { content: body },
      headers: [
        { name: "From", value: participant },
        { name: "To", value: owner },
        { name: "Subject", value: "Re: Learning Lab practice" },
      ],
    },
    ...extra,
  };
}
const stopped = updateSuppression({}, [email("STOP", campaignStart + 1)], participant, owner);
assert.equal(stopped.suppressed, true);
assert.equal(
  updateSuppression(stopped, [], participant, owner).suppressed,
  true,
  "STOP persists when a later form grants notes permission."
);
assert.equal(
  updateSuppression(
    stopped,
    [email("Thanks, this looks useful", campaignStart + 2)],
    participant,
    owner
  ).suppressed,
  true
);
assert.equal(
  updateSuppression(
    stopped,
    [email("RESUBSCRIBE LEARNING LAB PRACTICE", campaignStart + 3)],
    participant,
    owner
  ).suppressed,
  false
);
assert.equal(
  updateSuppression(stopped, [email("RESUBSCRIBE", campaignStart + 3)], participant, owner)
    .suppressed,
  false
);
const subjectResubscribe = email("", campaignStart + 3);
subjectResubscribe.payload.headers.find((item) => item.name === "Subject").value = "RESUBSCRIBE";
assert.equal(
  updateSuppression(stopped, [subjectResubscribe], participant, owner).suppressed,
  false
);
assert.equal(
  updateSuppression(
    stopped,
    [email("Thanks\n> RESUBSCRIBE", campaignStart + 3)],
    participant,
    owner
  ).suppressed,
  true
);
assert.equal(
  updateSuppression(
    {},
    [
      email("RESUBSCRIBE LEARNING LAB PRACTICE", campaignStart + 4),
      email("STOP", campaignStart + 4),
    ],
    participant,
    owner
  ).suppressed,
  true
);
assert.equal(
  updateSuppression(
    {},
    [email("Thanks\nOn Tuesday, someone wrote:\nSTOP", campaignStart + 5)],
    participant,
    owner
  ).suppressed,
  undefined,
  "Quoted STOP is not a withdrawal."
);
assert.equal(
  currentReplyText(email("Thanks\n> Reply STOP to withdraw", campaignStart + 5)),
  "Thanks"
);
assert.equal(
  updateSuppression(
    {},
    [email("STOP", campaignStart + 6, { label_ids: ["SENT"] })],
    participant,
    owner
  ).suppressed,
  undefined
);
const html = {
  mime_type: "text/html",
  body: { content: "<p>Thanks</p><blockquote>STOP</blockquote>" },
  headers: email("", 1).payload.headers,
};
assert.equal(currentReplyText({ payload: html }), "Thanks");
assert.equal(
  updateSuppression(
    {},
    [
      email("STOP", campaignStart + 7, {
        payload: {
          ...email("", 1).payload,
          headers: [
            { name: "From", value: "attacker@example.com" },
            { name: "To", value: owner },
          ],
          body: { content: "STOP" },
        },
      }),
    ],
    participant,
    owner
  ).suppressed,
  undefined
);
assert.deepEqual(gmailData({ structuredContent: { email: owner } }), { email: owner });
assert.deepEqual(
  gmailData({
    content: [{ type: "text", text: JSON.stringify({ structuredContent: { email: owner } }) }],
  }),
  { email: owner }
);
const malicious = {
  emails: [{ payload: { body: { content: JSON.stringify({ id: "fake", label_ids: ["SENT"] }) } } }],
};
assert.equal(
  gmailData({ structuredContent: malicious }),
  malicious,
  "JSON email bodies are never recursively promoted to trusted tool evidence."
);
const action = {
  to: participant,
  subject: "Fixed [LL2026-example]",
  payload: { body: { content: "<p>Exact original lesson</p>" } },
};
const sent = {
  label_ids: ["SENT"],
  payload: {
    mime_type: "text/html",
    body: action.payload.body,
    headers: [
      { name: "From", value: owner },
      { name: "To", value: participant },
      { name: "Subject", value: action.subject },
    ],
  },
};
assert.equal(sentMessageMatches(sent, action, owner), true);
assert.equal(sentMessageMatches({ ...sent, label_ids: ["INBOX"] }, action, owner), false);
assert.equal(
  sentMessageMatches(
    { ...sent, payload: { ...sent.payload, body: { content: "<p>Changed content</p>" } } },
    action,
    owner
  ),
  false
);
assert.equal(
  sentMessageMatches(
    {
      ...sent,
      payload: {
        ...sent.payload,
        headers: [...sent.payload.headers, { name: "Cc", value: "other@example.com" }],
      },
    },
    action,
    owner
  ),
  false
);
assert.equal(
  pilotEmailChoices([
    row,
    { ...row, message: marker + JSON.stringify({ ...meta, learningNotesConsent: false }) },
  ]).length,
  0,
  "Conflicting consent at the same timestamp is withheld."
);
console.log(
  "Campaign policy passed: campaign window, typed/revoked/conflicting consent, durable STOP, fresh explicit resubscribe, quote/sender isolation, exact SENT recipient/content and untrusted JSON boundaries."
);
