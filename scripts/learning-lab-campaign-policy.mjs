export const campaignStart = Date.parse("2026-10-20T00:00:00+05:30");
export const campaignEnd = Date.parse("2026-11-18T23:59:59.999+05:30");
export const campaignNotesEnd = Date.parse("2026-11-13T23:59:59.999+05:30");
const marker = "\nPILOT_AUTOMATION_META_V1\n";
const lessons = new Set([
  "read-your-unit-economics",
  "write-an-ai-task-brief",
  "ask-better-customer-questions",
]);
export function campaignIsOpen(now = Date.now()) {
  return Number.isFinite(now) && now >= campaignStart && now <= campaignEnd;
}
export function campaignNotesOpen(now = Date.now()) {
  return Number.isFinite(now) && now >= campaignStart && now <= campaignNotesEnd;
}
export function pilotEmailChoices(records) {
  const latest = new Map();
  for (const row of records) {
    if (
      row.kind !== "pilot-feedback" ||
      row.is_demo ||
      !/^[-.\w+]+@[-.\w]+\.[a-z]{2,}$/i.test(row.email || "")
    )
      continue;
    const email = row.email.toLowerCase(),
      prior = latest.get(email);
    if (!Number.isFinite(Number(row.updated_at))) continue;
    if (!prior || Number(row.updated_at) > Number(prior.updated_at)) latest.set(email, row);
    else if (Number(row.updated_at) === Number(prior.updated_at) && row.message !== prior.message)
      latest.set(email, { ...row, message: "" }); // Conflicting same-time records fail closed.
  }
  return [...latest].flatMap(([email, row]) => {
    const text = String(row.message || ""),
      index = text.lastIndexOf(marker);
    if (index < 0 || row.marketing_consent !== 0) return [];
    try {
      const meta = JSON.parse(text.slice(index + marker.length));
      if (
        Object.keys(meta).sort().join(",") !== "followUpConsent,learningNotesConsent,lesson" ||
        !lessons.has(meta.lesson) ||
        typeof meta.followUpConsent !== "boolean" ||
        typeof meta.learningNotesConsent !== "boolean"
      )
        return [];
      return [
        {
          email,
          lesson: meta.lesson,
          followUpConsent: meta.followUpConsent,
          learningNotesConsent: meta.learningNotesConsent,
        },
      ];
    } catch {
      return [];
    }
  });
}
// Inspect only actual completed MCP results, never the assistant's success claim.
export function completedGmailCalls(stdout) {
  const calls = [];
  for (const line of stdout.split(/\r?\n/)) {
    try {
      const event = JSON.parse(line),
        item = event.item;
      if (
        event.type === "item.completed" &&
        item?.type === "mcp_tool_call" &&
        /gmail/i.test(item.tool || "")
      )
        calls.push(item);
    } catch {}
  }
  return calls;
}
export function resultObjects(value) {
  const out = [];
  function visit(x, depth) {
    if (depth > 12 || !x) return;
    if (typeof x === "string") {
      try {
        visit(JSON.parse(x), depth + 1);
      } catch {}
      return;
    }
    if (Array.isArray(x)) {
      x.forEach((v) => visit(v, depth + 1));
      return;
    }
    if (typeof x === "object") {
      out.push(x);
      Object.values(x).forEach((v) => visit(v, depth + 1));
    }
  }
  visit(value, 0);
  return out;
}

// Unwrap only the MCP envelope. Never promote JSON inside an email body into
// trusted profile, consent or SENT evidence.
export function gmailData(value) {
  let current = value;
  for (let depth = 0; depth < 5; depth++) {
    if (!current || typeof current !== "object" || current.isError)
      throw new Error("gmail-result-invalid");
    if (current.structuredContent && typeof current.structuredContent === "object") {
      current = current.structuredContent;
      continue;
    }
    if (Array.isArray(current.content)) {
      const texts = current.content.filter((part) => part.type === "text");
      let parsed;
      for (const part of texts) {
        try {
          parsed = JSON.parse(part.text);
          break;
        } catch {
          /* MCP status text is not data. */
        }
      }
      if (!parsed || typeof parsed !== "object") throw new Error("gmail-result-invalid");
      current = parsed;
      continue;
    }
    return current;
  }
  throw new Error("gmail-result-envelope-too-deep");
}

export function header(message, name) {
  return (message.payload?.headers || [])
    .filter((item) => item.name?.toLowerCase() === name.toLowerCase())
    .map((item) => item.value || "")
    .join(", ");
}
export function addresses(value) {
  return (String(value).match(/[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}/gi) || []).map(
    (email) => email.toLowerCase()
  );
}
function partText(part, mime) {
  if (!part || typeof part !== "object") return "";
  if (part.mime_type === mime && !part.filename) return part.body?.content || "";
  return (part.parts || [])
    .map((child) => partText(child, mime))
    .filter(Boolean)
    .join("\n");
}
export function currentReplyText(message) {
  let text = partText(message.payload, "text/plain");
  if (!text) {
    text = partText(message.payload, "text/html")
      .split(/<blockquote\b|<div\b[^>]*class=["'][^"']*gmail_quote/i)[0]
      .replace(/<br\s*\/?\s*>|<\/p>|<\/div>/gi, "\n")
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&#39;|&apos;/gi, "'");
  }
  const current = [];
  for (const line of text.replace(/\r\n/g, "\n").split("\n")) {
    if (
      /^\s*>|^\s*On\s+.+wrote:\s*$|^\s*-{2,}\s*(?:Original|Forwarded)\s+(?:message|mail)|^\s*From:\s|^\s*_{5,}/i.test(
        line
      )
    )
      break;
    current.push(line);
  }
  return current.join("\n").trim();
}
export function messageTime(message) {
  const numeric = Number(message.internal_date);
  if (Number.isFinite(numeric) && numeric > 0) return numeric;
  const parsed = Date.parse(header(message, "date"));
  return Number.isFinite(parsed) ? parsed : null;
}
export function updateSuppression(previous, messages, email, ownerEmail) {
  const next = { ...(previous || {}) };
  const incoming = messages.filter((message) => {
    const from = addresses(header(message, "from"));
    return (
      from.length === 1 &&
      from[0] === email &&
      addresses(header(message, "to")).includes(ownerEmail) &&
      !message.label_ids?.includes("SENT")
    );
  });
  if (incoming.some((message) => messageTime(message) === null))
    return { ...next, suppressed: true, reason: "undated-inbound-message" };
  for (const message of incoming.sort(
    (a, b) => messageTime(a) - messageTime(b) || String(a.id).localeCompare(String(b.id))
  )) {
    const at = messageTime(message);
    if (at < campaignStart || at > campaignEnd || at < (next.lastEventAt || 0)) continue;
    const body = currentReplyText(message),
      subject = header(message, "subject").trim();
    const stop =
      /\b(?:STOP|unsubscribe|withdraw|opt[ -]?out|remove (?:me|my address)|take me off|no (?:more|further) (?:emails?|notes?|messages?)|do not (?:email|send|contact)|don['’]t (?:email|send|contact|want (?:any )?(?:more )?(?:emails?|notes?|messages?))|not interested|no thanks)\b/i.test(
        body
      ) ||
      /^(?:re:\s*)?(?:STOP|unsubscribe|withdraw)(?:\s+learning lab(?: practice)?)?[.!]?$/i.test(
        subject
      );
    const resubscribe =
      /^RESUBSCRIBE(?: LEARNING LAB PRACTICE)?[.!]?$/i.test(body) ||
      /^RESUBSCRIBE(?: LEARNING LAB PRACTICE)?[.!]?$/i.test(subject);
    if (stop || (resubscribe && at > (next.lastEventAt || 0))) {
      next.suppressed = stop; // STOP always wins when both occur.
      next.reason = stop ? "explicit-email-withdrawal" : "explicit-email-resubscribe";
      next.lastEventAt = at;
      next.messageId = message.id;
    }
  }
  return next;
}
export function sentMessageMatches(message, action, ownerEmail) {
  const from = addresses(header(message, "from")),
    to = addresses(header(message, "to"));
  return (
    message.label_ids?.includes("SENT") &&
    from.length === 1 &&
    from[0] === ownerEmail &&
    to.length === 1 &&
    to[0] === action.to &&
    !header(message, "cc") &&
    !header(message, "bcc") &&
    header(message, "subject") === action.subject &&
    partText(message.payload, "text/html").replace(/\r\n/g, "\n").trim() ===
      action.payload.body.content.replace(/\r\n/g, "\n").trim()
  );
}
