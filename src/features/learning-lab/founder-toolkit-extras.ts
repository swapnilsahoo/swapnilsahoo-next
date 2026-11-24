/**
 * Founder toolkit extras: Hindi and Hinglish scripts, the facilitator kit for E-Cells,
 * innovation councils and faculty, and the 14-day calendar reminders (.ics).
 * Pure data and helpers; tested by scripts/test-learning-lab-founder-toolkit.mjs.
 */
import { ventureDayHelp, type ToolkitSlug } from "./founder-toolkit";

/* ------------------------------------------------------------------ */
/* Hindi and Hinglish versions                                         */
/* ------------------------------------------------------------------ */

export const indianLanguageNote =
  "If a line sounds unnatural to you, say it your own way. The meaning matters more than the exact words.";

export const outreachMessagesHinglish = [
  {
    id: "whatsapp-dm-hinglish",
    channel: "WhatsApp message (Hinglish)",
    message:
      "Hi [name], main [your name], [college] mein [year] year ka student hoon. Main samajhna chahta/chahti hoon ki [who] [problem] ko kaise handle karte hain. Main kuch bech nahi raha/rahi. Kya main aapse 5 chhote sawaal pooch sakta/sakti hoon? Bas 10 minute lagenge, call pe ya milke. Mana karna bilkul theek hai!",
  },
  {
    id: "in-person-hinglish",
    channel: "In person (Hinglish)",
    message:
      "Hi, sorry disturb karne ke liye. Main ek student hoon aur [problem] par ek chhota project kar raha/rahi hoon. Kya aapke paas 5 minute hain kuch sawaalon ke liye? Main kuch bech nahi raha/rahi. Abhi time nahi hai to koi baat nahi.",
  },
  {
    id: "group-post-hinglish",
    channel: "Group post, after the admin says yes (Hinglish)",
    message:
      "Hi sabko, [admin] ne yeh post karne ki permission di hai. Main samajhna chahta/chahti hoon ki students [problem] ko kaise handle karte hain. Agar aapke saath yeh recently hua hai, to kya aap 10 minute de sakte hain? Reply ya message kar dijiye. Thank you!",
  },
  {
    id: "after-no-hinglish",
    channel: "When someone says no (Hinglish)",
    message: "Koi baat nahi, reply karne ke liye thank you. All the best!",
  },
] as const;

export const conversationScriptHinglish = [
  "CUSTOMER SE BAAT — SCRIPT (Hinglish)",
  "",
  "SHURUAAT",
  "“Time dene ke liye thank you. Main ek student hoon aur is topic par project kar raha/rahi hoon. Main kuch bech nahi raha/rahi. Koi sahi ya galat jawab nahi hai. Kya main kuch notes likh sakta/sakti hoon? Aapka naam nahi likhunga/likhungi.”",
  "",
  "5 SAWAAL — pichhli baar kya hua, uske baare mein",
  "1. Pichhli baar aisa kab hua tha? Tab kya hua, bataiye.",
  "2. Usmein sabse mushkil kya tha?",
  "3. Aapne uske liye kya kiya? Aur kya-kya try kiya hai?",
  "4. Abhi aap jaise handle karte hain, usmein kya pasand nahi hai?",
  "5. Ismein aapka kitna time ya paisa laga? Rough idea bhi chalega.",
  "",
  "AUR JAANNE KE LIYE",
  "• Thoda aur bataiye?",
  "• Woh mushkil kyun tha?",
  "• Uske baad kya hua?",
  "",
  "AGAR WOH AAPKA IDEA POOCHEIN",
  "“Last mein zaroor bataunga/bataungi. Abhi aapke jawab par asar nahi daalna chahta/chahti.”",
  "",
  "END",
  "• Is baare mein mujhe aur kisse baat karni chahiye?",
  "• “Bahut bahut thank you, isse sach mein help mili.”",
].join("\n");

export const conversationScriptHindi = [
  "ग्राहक से बातचीत — स्क्रिप्ट (हिंदी)",
  "",
  "शुरुआत",
  "“समय देने के लिए धन्यवाद। मैं एक स्टूडेंट हूँ और इस विषय पर एक प्रोजेक्ट कर रहा/रही हूँ। मैं कुछ बेच नहीं रहा/रही। कोई सही या गलत जवाब नहीं है। क्या मैं कुछ नोट्स लिख सकता/सकती हूँ? आपका नाम नहीं लिखूँगा/लिखूँगी।”",
  "",
  "पाँच सवाल — पिछली बार क्या हुआ, उसके बारे में",
  "1. पिछली बार ऐसा कब हुआ था? उस समय क्या हुआ, बताइए।",
  "2. उसमें सबसे मुश्किल क्या था?",
  "3. आपने उसके लिए क्या किया? और क्या-क्या आज़माया है?",
  "4. अभी आप जिस तरह इसे संभालते हैं, उसमें आपको क्या पसंद नहीं है?",
  "5. इसमें आपका कितना समय या पैसा लगा? मोटा-मोटा अंदाज़ा भी चलेगा।",
  "",
  "और जानने के लिए",
  "• इसके बारे में थोड़ा और बताइए?",
  "• वह मुश्किल क्यों था?",
  "• उसके बाद क्या हुआ?",
  "",
  "अगर वे आपका आइडिया पूछें",
  "“आख़िर में ज़रूर बताऊँगा/बताऊँगी। अभी आपके जवाबों पर असर नहीं डालना चाहता/चाहती।”",
  "",
  "आख़िर में",
  "• इस बारे में मुझे और किससे बात करनी चाहिए?",
  "• “बहुत-बहुत धन्यवाद, इससे सच में मदद मिली।”",
].join("\n");

/* ------------------------------------------------------------------ */
/* Facilitator kit for E-Cells, innovation councils and faculty        */
/* ------------------------------------------------------------------ */

export const facilitatorKitSlug = "facilitator-kit" as const satisfies ToolkitSlug;

export const facilitatorOutcomes = [
  "Tell the difference between what people say and what they do.",
  "Write customer questions about past behaviour, not opinions about the future.",
  "Design a ₹0–₹500 test with a pass mark set in advance.",
  "Make a continue, change or stop decision from evidence, and treat an honest stop as a success.",
] as const;

export const facilitatorSessionPlan = [
  {
    minutes: "0–10",
    title: "The one question",
    activity:
      "Ask: “Will real people act on your idea, not just say they like it?” Show the signal ladder and ask pairs to rank three signals from weakest to strongest.",
    tool: "test-playbooks",
    anchor: "signals",
  },
  {
    minutes: "10–25",
    title: "Idea filter in pairs",
    activity:
      "Each student fills in the one-page idea filter for their own idea, or a problem from campus life. Partners challenge anything vague, like “everyone”.",
    tool: "idea-filter",
    anchor: "filter",
  },
  {
    minutes: "25–40",
    title: "Fix the questions",
    activity:
      "Students write five interview questions, run them through the question checker and rewrite anything flagged. Read two good rewrites aloud.",
    tool: "talk-to-customers",
    anchor: "checker",
  },
  {
    minutes: "40–55",
    title: "Rehearse the conversation",
    activity:
      "In pairs, one plays the customer and one uses the word-for-word script, then swap. Remind everyone that rehearsal is practice, not evidence.",
    tool: "talk-to-customers",
    anchor: "script",
  },
  {
    minutes: "55–70",
    title: "Commit to a real test",
    activity:
      "Each student picks one ₹0–₹500 playbook, fills in a test card with a pass mark, and commits to three real conversations in the next three days.",
    tool: "test-playbooks",
    anchor: "cards",
  },
  {
    minutes: "70–75",
    title: "Close",
    activity:
      "Each student says their next step out loud. Share the 14-day plan link and agree the Day 7 check-in and the Day 14 share-out.",
    tool: "idea-filter",
    anchor: "",
  },
] as const satisfies readonly {
  minutes: string;
  title: string;
  activity: string;
  tool: ToolkitSlug;
  anchor: string;
}[];

export const facilitatorFollowUps = [
  {
    when: "Day 7 check-in · 15 minutes",
    what: "Quick round: how many conversations happened, what surprised you, show your test card. Help anyone stuck on access to customers find a warmer route.",
  },
  {
    when: "Day 14 share-out · 30–45 minutes",
    what: "Each student shares their one-page record in two minutes: pass mark, result as X of Y, and the decision. Applaud honest stops as loudly as continues.",
  },
] as const;

export const facilitatorSlides = [
  "SLIDE OUTLINE — 75-minute customer-test session",
  "1. Title: Will real people act on your idea, not just say they like it?",
  "2. Why most first ideas stall: building first, asking friends, counting likes",
  "3. The signal ladder: from compliments (counts as zero) to repeat use",
  "4. The one-page idea filter: one person, one problem, one route to reach five of them",
  "5. Good and bad questions: ask about the last time, never “would you buy?”",
  "6. Rehearsal: the word-for-word script (practice, not evidence)",
  "7. Six ₹0–₹500 tests and the test card: “At least X of Y will Z by [date]”",
  "8. Your next 14 days: 3 conversations, 1 test, 1 decision. Stopping counts.",
  "Links: swapnilsahoo.com/learning-lab/toolkit and swapnilsahoo.com/learning-lab/venture-experiment",
].join("\n");

export const facilitatorReportTemplate = [
  "ACTIVITY SUMMARY — adapt to your E-Cell or innovation council's reporting format",
  "Activity: Customer-test workshop (based on the free Swapnil Sahoo Learning Lab founder toolkit)",
  "Date and mode: [date] · [in person / online]",
  "Facilitator(s): [name, role]",
  "Participants: [number] students from [departments / years]",
  "Objective: help first-time student founders test whether real people will act on their ideas, at ₹0–₹500.",
  "Learning outcomes: (1) say-versus-do evidence, (2) past-behaviour questions, (3) a test with a pre-set pass mark, (4) an evidence-based continue/change/stop decision.",
  "What students produced: [number] idea filters, [number] test cards, [number] conversation commitments",
  "Follow-up: Day 7 check-in on [date]; Day 14 share-out on [date]",
  "Results at Day 14 (self-reported): [number] tests run · [number] continue · [number] change · [number] stop",
  "Notes: no customer names or personal data were collected. Photos only with participants' consent.",
].join("\n");

export const facilitatorGradingGuidance = [
  "Grade the quality of evidence and reasoning, never whether the idea “succeeded”. A well-evidenced stop can earn full marks.",
  "Ask for the one-page record plus anonymous notes (Customer A, B, C). Never require customer names, numbers or screenshots.",
  "Offer an alternative task for any student who cannot safely do outreach, such as analysing a classmate's anonymised notes.",
  "Keep it fair: the same four criteria, scored 0–2 each, out of 8.",
  "The Lab's optional founder-feedback pilot is separate and voluntary. Do not make submission to it part of a grade.",
] as const;

export const facilitatorUseNote =
  "You may use and adapt this kit free of charge in your own non-commercial sessions, with credit to the Swapnil Sahoo Learning Lab. No registration with the Lab is needed. It is not an official MoE, IIC or E-Cell format, and no partnership is implied.";

/* ------------------------------------------------------------------ */
/* Calendar reminders (.ics), built in the browser                    */
/* ------------------------------------------------------------------ */

const icsEscape = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

/** Folds long lines at 73 characters, as the iCalendar format asks for. */
const icsFold = (line: string) => {
  const parts: string[] = [];
  let rest = line;
  while (rest.length > 73) {
    parts.push(rest.slice(0, 73));
    rest = " " + rest.slice(73);
  }
  parts.push(rest);
  return parts.join("\r\n");
};

const ymd = (date: Date) =>
  `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`;

/**
 * Builds 14 daily 30-minute reminders as an .ics file in the device's local time.
 * Returns null for an invalid date, time or timestamp. Nothing is sent anywhere.
 */
export function buildVentureCalendar(
  startDate: string,
  time: string,
  days: readonly { day: number; title: string }[],
  pageUrl: string,
  stamp: string
) {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(startDate);
  const timeMatch = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);
  if (!dateMatch || !timeMatch || !/^\d{8}T\d{6}Z$/.test(stamp)) return null;
  const [year, month, dayOfMonth] = dateMatch.slice(1).map(Number);
  const start = new Date(Date.UTC(year, month - 1, dayOfMonth));
  if (
    Number.isNaN(start.getTime()) ||
    start.getUTCMonth() !== month - 1 ||
    start.getUTCDate() !== dayOfMonth ||
    year < 2020 ||
    year > 2100
  )
    return null;
  const pad = (value: number) => String(value).padStart(2, "0");
  const hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);
  const endTotal = hour * 60 + minute + 30;
  const endHour = Math.floor(endTotal / 60) % 24;
  const endMinute = endTotal % 60;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Swapnil Sahoo Learning Lab//14-day venture experiment//EN",
    "CALSCALE:GREGORIAN",
  ];
  for (const item of days) {
    const date = new Date(start.getTime() + (item.day - 1) * 86_400_000);
    const endDate = endTotal >= 24 * 60 ? new Date(date.getTime() + 86_400_000) : date;
    const help = ventureDayHelp[item.day];
    const description = [
      ...(help ? help.doToday.map((task) => `- ${task}`) : []),
      help ? `Watch out: ${help.watchOut}` : "",
      `${pageUrl}#venture-day-${item.day}`,
    ]
      .filter(Boolean)
      .join("\n");
    lines.push(
      "BEGIN:VEVENT",
      `UID:venture-day-${item.day}-${startDate}@swapnilsahoo.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${ymd(date)}T${pad(hour)}${pad(minute)}00`,
      `DTEND:${ymd(endDate)}T${pad(endHour)}${pad(endMinute)}00`,
      icsFold(`SUMMARY:${icsEscape(`Day ${item.day} of 14: ${item.title}`)}`),
      icsFold(`DESCRIPTION:${icsEscape(description)}`),
      icsFold(`URL:${pageUrl}#venture-day-${item.day}`),
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      icsFold(`DESCRIPTION:${icsEscape(`Day ${item.day}: ${item.title}`)}`),
      "TRIGGER:-PT0M",
      "END:VALARM",
      "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}
