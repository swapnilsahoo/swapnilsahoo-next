/**
 * Free founder toolkit for first-time student entrepreneurs.
 * Pure data and helpers only: pages render this on the server, client tools import the helpers,
 * and scripts/test-learning-lab-founder-toolkit.mjs checks it without a browser.
 * External resources are linked and paraphrased in our own words; no partnership is implied.
 */

export const toolkitPath = "/learning-lab/toolkit";

export const toolkitSummary =
  "Free, copy-ready tools for first-time student founders: sharpen your idea, talk to customers without the fear, run a ₹0 test and dodge the classic beginner mistakes.";

export const toolkitFreeStatement =
  "Free to use. No sign-up, no payment and no paid version of this toolkit. Your answers stay on your device.";

export const toolkitCheckedOn = "24 November 2026";

export const toolkitTools = [
  {
    slug: "idea-filter",
    title: "One-page idea filter",
    short: "Turn a big, vague idea into one person, one problem and one thing to test.",
    when: "Day 3",
    minutes: "15 min",
  },
  {
    slug: "talk-to-customers",
    title: "Customer conversation kit",
    short:
      "Word-for-word messages, five questions that get honest answers and a checker that flags bad questions.",
    when: "Days 4–6",
    minutes: "20 min",
  },
  {
    slug: "test-playbooks",
    title: "₹0–₹500 test playbooks",
    short: "Six small tests you can run this week, with steps, what to count and a pass mark.",
    when: "Days 7–11",
    minutes: "10 min to pick",
  },
  {
    slug: "mistakes",
    title: "Beginner mistakes to dodge",
    short: "Twelve traps first-time founders fall into, and what to do instead.",
    when: "Any day",
    minutes: "8 min",
  },
  {
    slug: "ai-practice-prompts",
    title: "Free AI practice prompts",
    short:
      "Copy-paste prompts to rehearse a conversation, check your questions and stress-test your plan.",
    when: "Any day",
    minutes: "5 min",
  },
  {
    slug: "free-tools",
    title: "Free tools list",
    short: "Free apps for forms, posters, notes and calls, so you never pay for software to test.",
    when: "Days 7–8",
    minutes: "5 min",
  },
  {
    slug: "learn-from-yc",
    title: "Learn from Y Combinator, free",
    short: "The best free YC talks and essays for beginners, each with the one idea to take away.",
    when: "Any day",
    minutes: "Your pace",
  },
  {
    slug: "facilitator-kit",
    title: "Kit for E-Cells and faculty",
    short:
      "Run it with a group: a 75-minute session plan, slide outline, report template and grading rubric.",
    when: "For facilitators",
    minutes: "75-min session",
  },
] as const;

export type ToolkitSlug = (typeof toolkitTools)[number]["slug"];

export function toolkitHref(slug: ToolkitSlug, anchor = "") {
  return `${toolkitPath}/${slug}${anchor ? `#${anchor}` : ""}`;
}

export function toolkitTool(slug: ToolkitSlug) {
  return toolkitTools.find((tool) => tool.slug === slug)!;
}

/* ------------------------------------------------------------------ */
/* Start here                                                          */
/* ------------------------------------------------------------------ */

export const toolkitStartSteps = [
  {
    step: "01",
    title: "Filter your idea",
    text: "Fifteen minutes. Name one person, one problem and how you will reach five of them.",
    slug: "idea-filter",
    cta: "Open the idea filter",
  },
  {
    step: "02",
    title: "Talk to three people",
    text: "Copy a ready-made message, ask five questions about the last time the problem happened, write their exact words.",
    slug: "talk-to-customers",
    cta: "Open the conversation kit",
  },
  {
    step: "03",
    title: "Run one ₹0 test",
    text: "Pick a playbook, set your pass mark first, then count what people actually do.",
    slug: "test-playbooks",
    cta: "Pick a test",
  },
] as const satisfies readonly {
  step: string;
  title: string;
  text: string;
  slug: ToolkitSlug;
  cta: string;
}[];

export const playFairRules = [
  "Be honest about who you are and what you are offering. Label mock-ups.",
  "Ask before you message, add anyone to a group or put up a poster.",
  "Spend only what you can afford to lose. ₹0 is a great budget.",
  "Keep people's details private. Write “Customer A”, not names or numbers.",
  "Take no for an answer. No follow-ups after a no.",
] as const;

/* ------------------------------------------------------------------ */
/* Idea filter                                                         */
/* ------------------------------------------------------------------ */

export const ideaFilterFields = [
  {
    id: "who",
    label: "Who exactly has the problem?",
    placeholder: "e.g. first-year hostel students without a kitchen",
    help: "One specific group you could point to. Not “everyone” or “students”.",
    max: 160,
  },
  {
    id: "problem",
    label: "What do they struggle with?",
    placeholder: "e.g. getting a cheap, healthy snack after the mess closes",
    help: "Describe the problem, not your solution.",
    max: 200,
  },
  {
    id: "when",
    label: "When does it happen?",
    placeholder: "e.g. late at night during exam weeks",
    help: "A real moment makes the problem easy to ask about.",
    max: 160,
  },
  {
    id: "workaround",
    label: "What do they do about it today?",
    placeholder: "e.g. order instant noodles or skip eating",
    help: "Everyone does something. That something is your real competition.",
    max: 200,
  },
  {
    id: "cost",
    label: "What does that cost them?",
    placeholder: "e.g. ₹80 a night, poor sleep, feeling unwell before exams",
    help: "Time, money, stress or missed chances.",
    max: 160,
  },
  {
    id: "reach",
    label: "How will you reach five of them this week?",
    placeholder: "e.g. my floor's WhatsApp group, with the floor rep's OK",
    help: "If you cannot reach them, you cannot test it in 14 days.",
    max: 200,
  },
  {
    id: "wrong",
    label: "What would make you drop or change the idea?",
    placeholder: "e.g. fewer than 2 of 5 people had this problem last week",
    help: "Decide this now, before you fall in love with the idea.",
    max: 200,
  },
] as const;

/** Browser storage key, written only when the student presses "Save on this device". */
export const ideaFilterStorageKey = "learning-lab-idea-filter-v1";

export type IdeaFieldId = (typeof ideaFilterFields)[number]["id"];
export type IdeaFields = Partial<Record<IdeaFieldId, string>>;

export const ideaFilterChecks = [
  "I have seen this problem happen to real people in the last month.",
  "I can name five people, by role, who have it.",
  "They already spend time or money dealing with it.",
  "I can talk to at least three of them this week.",
  "I can test it in 14 days with ₹0–₹500 and without building an app.",
  "I would happily spend 14 days on this even if the answer turns out to be no.",
] as const;

const blank = (value: string | undefined, fallback: string) => {
  const text = (value ?? "").replace(/\s+/g, " ").trim();
  return text ? text.replace(/[.\s]+$/, "") : fallback;
};

/** Builds the one-paragraph problem statement students carry into the conversation kit. */
export function buildIdeaStatement(fields: IdeaFields) {
  return [
    `I think ${blank(fields.who, "[who]")} struggle with ${blank(fields.problem, "[problem]")}, especially ${blank(fields.when, "[when it happens]")}.`,
    `Today they ${blank(fields.workaround, "[what they do now]")}, which costs them ${blank(fields.cost, "[time, money or stress]")}.`,
    `This week I will reach five of them through ${blank(fields.reach, "[how you will reach them]")}.`,
    `I will drop or change the idea if ${blank(fields.wrong, "[what would prove you wrong]")}.`,
  ].join(" ");
}

export type IdeaVerdict = "test" | "narrow" | "rethink";

/** For each unticked check, the guess to check first (same order as ideaFilterChecks). */
export const ideaRiskiestGuesses = [
  "That the problem really happens. Ask three people about the last time it happened to them.",
  "That you can find people who have it. List five by role before anything else.",
  "That it matters enough to act on. Ask what they spend on it today, in time or money.",
  "That you can reach them. Find one route this week: a group admin, a club, a senior.",
  "That a ₹0–₹500 test is possible. Pick the simplest playbook and cut the offer down to one day.",
  "That you care enough to keep going. If not, try another problem; that is a fine decision.",
] as const;

/** Six yes/no checks. Anything that is not exactly true counts as "not yet". */
export function scoreIdeaFilter(checks: readonly unknown[]) {
  const score = ideaFilterChecks.reduce(
    (total, _, index) => total + (checks[index] === true ? 1 : 0),
    0
  );
  const verdict: IdeaVerdict = score >= 5 ? "test" : score >= 3 ? "narrow" : "rethink";
  const advice = {
    test: "Ready to test. Take your statement into the conversation kit and talk to three people this week.",
    narrow:
      "Promising, but narrow it. Pick a smaller group you can reach this week, or a moment when the problem clearly happens, then check again.",
    rethink:
      "Not ready yet. Either talk to three people first to see whether the problem is real, or pick another problem from your own daily life.",
  }[verdict];
  const firstGap = ideaFilterChecks.findIndex((_, index) => checks[index] !== true);
  const riskiestGuess = firstGap === -1 ? null : ideaRiskiestGuesses[firstGap];
  return { score, total: ideaFilterChecks.length, verdict, advice, riskiestGuess };
}

export const ideaAlertRules = [
  {
    id: "build-first",
    pattern: /\b(apps?|website|web ?site|platform|software|portal|marketplace|ai tool|chatbot)\b/i,
    title: "Watch out: building first",
    text: "You do not need an app to test an app idea. Do the service by hand for three to five people first. If they keep coming back, then build.",
  },
  {
    id: "too-broad",
    pattern: /\b(everyone|everybody|anyone|all students|all people|every student|the public)\b/i,
    title: "Watch out: “everyone” is not a customer",
    text: "Pick the one group who feels the problem most often. You can widen later.",
  },
  {
    id: "spend-first",
    pattern:
      /\b(logo|branding|register(ing)? (a |my )?company|registration|investors?|funding|loan|trademark)\b/i,
    title: "Watch out: spending before evidence",
    text: "A logo, a company or a loan will not tell you whether anyone wants this. Test with ₹0 first.",
  },
  {
    id: "friends",
    pattern: /\b(friends?|family|cousins?|parents?|relatives?)\b/i,
    title: "Watch out: friends are kind",
    text: "Friends are fine for practice, but they say nice things. Aim for people who actually have the problem, including friends of friends.",
  },
] as const;

/** Simple keyword alerts that appear while a student types their idea. */
export function ideaAlerts(fields: IdeaFields) {
  const text = Object.values(fields).join(" ");
  return ideaAlertRules
    .filter((rule) => rule.pattern.test(text))
    .map(({ id, title, text: body }) => ({ id, title, text: body }));
}

export const problemSpottingPrompts = [
  "What do you or your friends complain about every week?",
  "What do people in your hostel or PG keep asking each other for?",
  "Where do you queue, wait or waste time on campus?",
  "What do students pay too much for, or travel far to get?",
  "What do local shops near your college struggle with?",
  "What did you have to work out the hard way in your first month?",
  "What skill do people keep asking you to help with?",
  "What happens during exams, fests or placements that could be easier?",
] as const;

export const ideaPaths = [
  {
    id: "food",
    label: "Food or snacks",
    playbook: "sample-then-order",
    tip: "Start with a tasting and an order list for one day. Check FSSAI registration before you sell food regularly.",
  },
  {
    id: "resale",
    label: "Thrift, resale or handmade goods",
    playbook: "dm-to-reserve",
    tip: "Photograph five real items and ask people to reserve one at a stated price. Do not buy stock first.",
  },
  {
    id: "service",
    label: "A service for students",
    playbook: "do-it-by-hand",
    tip: "Do the service yourself for three to five people this week and time how long it takes.",
  },
  {
    id: "skills",
    label: "Tutoring or teaching a skill",
    playbook: "slot-sign-up",
    tip: "Offer one session with real time slots. Count who books a slot and who turns up.",
  },
  {
    id: "digital",
    label: "An app, website or digital product",
    playbook: "do-it-by-hand",
    tip: "Run the app's job manually with WhatsApp and a spreadsheet. If people keep using the manual version, the app is worth building.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Customer conversation kit                                           */
/* ------------------------------------------------------------------ */

export const fearLadder = [
  {
    rung: "Easiest",
    title: "People you know who have the problem",
    text: "Classmates, floor-mates or club members who you have seen deal with it. Practise your questions here first.",
  },
  {
    rung: "Next",
    title: "Friends of friends",
    text: "Ask one person: “Who do you know who deals with this?” A warm introduction makes the first message easy.",
  },
  {
    rung: "Then",
    title: "Strangers who have the problem",
    text: "Seniors, people in relevant groups, shopkeepers. Use a short, honest message and make it easy to say no.",
  },
] as const;

export const fearTips = [
  "Say the true, disarming line: “I'm a student working on a project. I'm not selling anything.”",
  "Ask for ten minutes, not “a chat”. Small requests get more yeses.",
  "Go with a friend: one asks, one writes down exact words.",
  "Set a tiny goal: three conversations, not thirty.",
  "Expect noes. Most people are busy, not rude. Every no is one step closer to a yes, and it counts as data.",
  "Practise once with a friend first. Treat it as a rehearsal, not evidence.",
] as const;

export const outreachMessages = [
  {
    id: "whatsapp-dm",
    channel: "WhatsApp message",
    situation: "Someone you know a little, or a friend's contact who agreed to be introduced",
    message:
      "Hi [name], I'm [your name], a [year] student at [college]. I'm trying to understand how [who] deal with [problem]. I'm not selling anything. Could I ask you five quick questions? It takes about 10 minutes, by call or in person. Totally fine to say no!",
  },
  {
    id: "instagram-dm",
    channel: "Instagram DM",
    situation: "Someone who posts about the problem or the topic",
    message:
      "Hi! I'm a student doing a small project on [problem]. I saw your post about [topic] and would love to hear how you handle it. Could I ask you a few questions here or on a 10-minute call? No pressure at all.",
  },
  {
    id: "in-person",
    channel: "In person",
    situation: "Canteen, hostel common room, a shop near campus",
    message:
      "Hi, sorry to interrupt. I'm a student working on a project about [problem]. Do you have five minutes for a few questions? I'm not selling anything. If now's a bad time, no problem at all.",
  },
  {
    id: "group-post",
    channel: "Group post (after the admin says yes)",
    situation: "A hostel, class or club group, with the admin's permission",
    message:
      "Hi everyone, [admin] said it's OK to post this. I'm researching how students deal with [problem]. If this has happened to you recently, could you spare 10 minutes for a few questions? Reply or message me. Thank you!",
  },
  {
    id: "ask-intro",
    channel: "Asking for an introduction",
    situation: "A senior, club head or teacher who knows the right people",
    message:
      "Hi [name], I'm working on a small student project about [problem]. Do you know one or two people who deal with this often? If they're happy to be introduced, I'd like to ask them a few questions. Thanks so much!",
  },
  {
    id: "after-no",
    channel: "When someone says no",
    situation: "Always reply kindly, then stop",
    message: "No problem at all. Thanks for replying, and all the best!",
  },
  {
    id: "thank-you",
    channel: "Thank-you after a chat",
    situation: "Send the same day",
    message:
      "Thank you for your time today. It really helped. If you think of anyone else who deals with [problem], I'd be grateful for an introduction.",
  },
] as const;

export const conversationTarget =
  "Start with three conversations on Day 5 and aim for five by Day 6. You have heard enough for now when three people describe the same problem with a recent example, or when five in a row do not have it.";

/** Signs in a conversation that the problem is real, strongest last. */
export const conversationSignals = [
  "It happened to them recently, and they can describe exactly when.",
  "They already rigged their own workaround: a spreadsheet, a WhatsApp group, a friend who helps.",
  "They have spent money or real time trying to fix it.",
  "They ask when they can try your solution, without you pitching it.",
  "They offer to introduce you to someone else who has the problem.",
] as const;

export const coreQuestions = [
  "Tell me about the last time you [situation]. What happened?",
  "What was the hardest part about that?",
  "What did you do about it? What else have you tried?",
  "What don't you like about the way you handle it now?",
  "What did it cost you, in time or money? A rough amount is fine.",
] as const;

export const followUpQuestions = [
  "Can you tell me more about that?",
  "Why was that hard?",
  "What happened next?",
  "When did that last happen?",
  "Can you show me how you do it now?",
] as const;

export const closingQuestions = [
  "Is there anything I should have asked but didn't?",
  "Who else should I talk to about this?",
  "Can I get back to you if I try something to fix this?",
] as const;

export const badToBetterQuestions = [
  {
    bad: "Would you buy a late-night snack delivery service?",
    why: "Asks them to predict the future. Polite people say yes.",
    better: "Tell me about the last time you were hungry after the mess closed. What did you do?",
  },
  {
    bad: "Do you think my app is a good idea?",
    why: "Asks for an opinion about your idea. You will hear compliments.",
    better: "How do you keep track of [task] today?",
  },
  {
    bad: "How much would you pay for this?",
    why: "People guess low or high to be nice. Guesses are not prices.",
    better: "What do you spend on [problem] now? When did you last pay for it?",
  },
  {
    bad: "Isn't it annoying when laundry takes forever?",
    why: "Leads them to agree with you.",
    better: "Walk me through how you did your laundry last week.",
  },
  {
    bad: "Do you usually buy second-hand clothes?",
    why: "“Usually” gets an idealised answer, and yes/no tells you little.",
    better: "When did you last buy something second-hand? How did you find it?",
  },
] as const;

export type QuestionFlag = {
  id: string;
  label: string;
  why: string;
  tryInstead: string;
};

const questionRules: (QuestionFlag & { pattern: RegExp })[] = [
  {
    id: "future",
    pattern:
      /\b(would|will|could|might) you\b|\bif (there (was|were)|you (had|could)|i (made|built|offered))\b/i,
    label: "Asks about the future",
    why: "People are bad at predicting what they will do, and “would you…?” invites a polite yes.",
    tryInstead: "Ask about the past: “Tell me about the last time you…”",
  },
  {
    id: "price-guess",
    pattern:
      /\bhow much (would|will|could|might|do you think)\b|\bwhat would you pay\b|\bwilling to pay\b/i,
    label: "Asks them to guess a price",
    why: "A guessed price is not a real price.",
    tryInstead: "Ask what they spend now: “What do you pay for this today?”",
  },
  {
    id: "opinion",
    pattern:
      /\b(do|did|would) you (like|love|think|feel|agree|prefer)\b|\bwhat do you think\b|\bgood idea\b|\bis (it|this) (a )?(good|useful|helpful)\b/i,
    label: "Asks for an opinion",
    why: "Opinions are cheap and usually kind.",
    tryInstead: "Ask what they did: “What did you do when that happened?”",
  },
  {
    id: "pitch",
    pattern: /\b(my|our) (idea|app|product|service|startup|business|website|platform|solution)\b/i,
    label: "Mentions your idea",
    why: "Once people hear your idea, they start protecting your feelings.",
    tryInstead: "Keep your idea for the end. Ask about their life and their problem.",
  },
  {
    id: "leading",
    pattern:
      /\b(isn'?t (it|that)|don'?t you (think|agree|feel|find)|wouldn'?t you|aren'?t you|surely|obviously)\b|,\s*right\s*\?/i,
    label: "Leads them to an answer",
    why: "It tells them what you want to hear.",
    tryInstead: "Ask neutrally: “What was that like?” or “What happened next?”",
  },
  {
    id: "generic",
    pattern: /\b(usually|generally|typically|normally|ever|always|in general)\b/i,
    label: "Too general",
    why: "General questions get idealised answers, not what really happens.",
    tryInstead: "Anchor it to one real moment: “The last time you…”",
  },
  {
    id: "double",
    pattern: /\b(and|or) (do|did|would|will|how|what|why|is|are|can|could|have)\b/i,
    label: "Two questions in one",
    why: "People answer the easier half.",
    tryInstead: "Split it into two separate questions.",
  },
  {
    id: "closed",
    pattern:
      /^(?!is there anything\b|(can|could|may) i\b)(do|does|did|is|are|was|were|would|will|can|could|have|has|should|shall)\b(?!\s+you\s+(tell|show|walk|talk|describe)\b)/i,
    label: "Yes/no question",
    why: "A yes or no tells you very little.",
    tryInstead: "Start with “How…”, “What…” or “Tell me about…”.",
  },
];

const goodQuestionPattern =
  /^(tell me about|walk me through|talk me through|describe)\b|\blast time\b|\bwhat (did|do) you (do|use|try|spend)\b|\bwhat happened\b|\bhow (did|do) you (currently |now )?(handle|deal|manage|do|find|choose|decide)\b|\bwhat was the hardest\b|\bwhy was that\b/i;

/** Rule-based question checker. Runs in the browser; nothing is sent anywhere. */
export function checkQuestion(input: string) {
  const question = input.replace(/\s+/g, " ").trim().slice(0, 300);
  const flags: QuestionFlag[] = questionRules
    .filter((rule) => rule.pattern.test(question))
    .map(({ id, label, why, tryInstead }) => ({ id, label, why, tryInstead }));
  const anchored = goodQuestionPattern.test(question);
  const verdict: "good" | "fix" | "ok" = flags.length ? "fix" : anchored ? "good" : "ok";
  return { question, flags, anchored, verdict };
}

export function checkQuestions(text: string) {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(\d+[.)]|[-*•])\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 20)
    .map(checkQuestion);
}

/** Word-for-word conversation script for the student's own customer and situation. */
export function buildConversationScript(who: string, situation: string) {
  const group = blank(who, "[who]");
  const moment = blank(situation, "[faced the problem]");
  const questions = coreQuestions.map(
    (question, index) => `${index + 1}. ${question.replace("[situation]", moment)}`
  );
  return [
    "CUSTOMER CONVERSATION SCRIPT",
    `Talking to: ${group}`,
    "",
    "OPEN (30 seconds)",
    "“Thanks for making time. I'm a student working on a project about this. I'm not selling anything. There are no right or wrong answers. Is it OK if I write down a few notes? I won't use your name.”",
    "",
    "ASK (8 minutes) — about real past moments, not opinions",
    ...questions,
    "",
    "DIG DEEPER — use after any interesting answer",
    ...followUpQuestions.map((question) => `• ${question}`),
    "",
    "IF THEY ASK ABOUT YOUR IDEA",
    "“Happy to tell you at the end. I don't want to steer your answers.”",
    "",
    "CLOSE (1 minute)",
    ...closingQuestions.map((question) => `• ${question}`),
    "“Thank you, this really helped.”",
    "",
    "WRITE DOWN STRAIGHT AFTER",
    "Their exact words (quotes):",
    "What they actually did (past behaviour):",
    "What they use today and what it costs them:",
    "What surprised me or contradicted my idea:",
    "Who they suggested I talk to next:",
    "",
    "Use “Customer A”, not names or phone numbers. A conversation is evidence about one person, not proof of demand.",
  ].join("\n");
}

export const notesTemplate = [
  "CONVERSATION NOTES — Customer A",
  "Date:",
  "Who (role only, e.g. 2nd-year hostel student):",
  "Last time the problem happened:",
  "Exact words worth remembering:",
  "What they did about it:",
  "What it cost them (time / money / stress):",
  "What surprised me:",
  "Did anything contradict my idea?",
  "Next person they suggested:",
].join("\n");

/* ------------------------------------------------------------------ */
/* ₹0–₹500 test playbooks                                              */
/* ------------------------------------------------------------------ */

export const signalLadder = [
  {
    signal: "“Maybe”, “sounds cool” or no reply",
    strength: "Counts as zero",
    costs: "Nothing",
    note: "Politeness, not interest.",
  },
  {
    signal: "A like, a compliment or “nice idea!”",
    strength: "Very weak",
    costs: "Nothing",
    note: "Kindness, not demand.",
  },
  {
    signal: "“I would definitely buy that”",
    strength: "Weak",
    costs: "Nothing",
    note: "A prediction, not an action.",
  },
  {
    signal: "Joins a group or follows a page",
    strength: "Weak",
    costs: "One tap",
    note: "Free and easy to undo.",
  },
  {
    signal: "Fills in a form with their details",
    strength: "Some",
    costs: "A little time",
    note: "Better, but still easy to forget.",
  },
  {
    signal: "Introduces you to a friend who has the problem",
    strength: "Good",
    costs: "Their reputation",
    note: "People only vouch for things they take seriously.",
  },
  {
    signal: "Books a time slot or reserves at a stated price",
    strength: "Good",
    costs: "A promise of time or money",
    note: "A real commitment to a real offer.",
  },
  {
    signal: "Turns up, collects or uses it",
    strength: "Strong",
    costs: "Real time, often money",
    note: "They gave something up to get it.",
  },
  {
    signal: "Comes back again or brings a friend",
    strength: "Strongest",
    costs: "Repeated time, money and reputation",
    note: "The best sign you have something.",
  },
] as const;

export const whoCountsRule =
  "Count close friends and family separately. They can take part, but your pass mark should be met by people who would not say yes just to be kind.";

export const testPlaybooks = [
  {
    id: "reserve-by-friday",
    title: "WhatsApp “reserve by Friday”",
    cost: "₹0",
    time: "3–4 days",
    bestFor: "Food, small products and services you can deliver on one day.",
    steps: [
      "Write a two-line offer: what it is, for whom, the price, and the day you will deliver.",
      "Send it to people who agreed to hear about it, or post it in a group once the admin says yes.",
      "Ask people to reply “reserve” by a clear deadline.",
      "Write down how many people saw the offer and how many reserved.",
      "On the day, note how many actually collected it.",
    ],
    count: "Reservations and collections out of the number of people who saw the offer.",
    passMark: "At least 5 of 25 people reserve, and at least 4 collect.",
    watchOut:
      "Reactions and “interested!” replies are not reservations. Do not add people to groups without asking.",
  },
  {
    id: "slot-sign-up",
    title: "Sign-up sheet with real time slots",
    cost: "₹0",
    time: "3–5 days",
    bestFor: "Tutoring, workshops, practice sessions, any service that happens at a set time.",
    steps: [
      "Make a free form (Google Forms or Tally) with two or three real time slots.",
      "Ask only for a first name or nickname and a slot. Say why, and that you will delete it after the test.",
      "Share the link with the people you planned to reach.",
      "Run the session for whoever books.",
      "Count bookings and turn-ups, then delete the form data.",
    ],
    count: "People who booked a slot, and people who turned up, out of the people you invited.",
    passMark: "At least 6 of 20 invited book a slot, and at least 4 turn up.",
    watchOut:
      "Sign-ups without a time slot are weak. A booked time is a real commitment. Collect as little personal data as you can.",
  },
  {
    id: "poster-qr",
    title: "Poster with a QR code",
    cost: "₹50–₹300 for printing",
    time: "4–5 days",
    bestFor: "Reaching people beyond your friends on campus or in your area.",
    steps: [
      "Get permission for the notice board or shop window first.",
      "Make a simple poster in a free design tool: the problem in big words, your offer, a deadline.",
      "Add a QR code that opens a short form or a WhatsApp chat.",
      "Put up a few copies where your customers actually go.",
      "Count sign-ups or messages, not scans.",
    ],
    count: "Sign-ups or messages per poster location.",
    passMark: "At least 8 sign-ups from 5 posters in 4 days.",
    watchOut: "Never use your college's name or logo, and take posters down when the test ends.",
  },
  {
    id: "sample-then-order",
    title: "Free sample, then “order for Saturday”",
    cost: "₹100–₹500 for materials",
    time: "4–5 days",
    bestFor: "Food, crafts, anything people need to taste or touch.",
    steps: [
      "Make a small batch you can make safely and afford to give away.",
      "Offer samples to people in your target group, with their OK.",
      "After the sample, show the price and ask: “Want me to keep one for you on Saturday?”",
      "Write down every yes and no.",
      "On Saturday, count who actually collects.",
    ],
    count: "Orders placed after tasting, and orders collected, out of samples given.",
    passMark: "At least 6 of 20 tasters order, and at least 5 collect.",
    watchOut:
      "Free samples always go fast; they prove nothing on their own. For food, follow hygiene basics and check FSSAI registration before selling regularly.",
  },
  {
    id: "do-it-by-hand",
    title: "Do it by hand for five people",
    cost: "₹0",
    time: "5–7 days",
    bestFor: "App ideas and services: deliveries, reminders, matching, booking, laundry runs.",
    steps: [
      "Describe what the app or service would do, in one sentence.",
      "Offer to do that job yourself, by hand, for three to five people this week.",
      "Use WhatsApp and a spreadsheet instead of an app.",
      "Time every task and note every problem.",
      "At the end of the week, count who asks you to do it again.",
    ],
    count: "Repeat requests out of the people you served, plus your hours per person.",
    passMark: "At least 3 of 5 people ask for it again within a week.",
    watchOut:
      "If nobody asks twice, an app will not fix that. Only deliver what is safe and legal for you to do.",
  },
  {
    id: "dm-to-reserve",
    title: "Instagram or WhatsApp Status “DM to reserve”",
    cost: "₹0",
    time: "3–4 days",
    bestFor: "Thrift, resale, handmade items, anything visual.",
    steps: [
      "Photograph five real items you already have. Do not buy stock.",
      "Post them with the price and “DM to reserve by Thursday”.",
      "Share with people who follow you and relevant groups that allow it.",
      "Reply to everyone and log each reservation.",
      "Count reservations and handovers.",
    ],
    count: "Reservations out of people who viewed the post or Status.",
    passMark: "At least 3 of 5 items reserved within 3 days.",
    watchOut: "Views and likes are not demand. Be honest about condition and size in every photo.",
  },
] as const;

export type PlaybookId = (typeof testPlaybooks)[number]["id"];

/** Fill in before the test (Day 7) and after it (Day 11). A common habit in lean experimentation. */
export const testCardTemplate = [
  "TEST CARD — fill this in before you start (Day 7)",
  "I believe that: [who] will [action, e.g. reserve a snack box at ₹40]",
  "To find out, I will: [playbook and offer, e.g. post a reserve-by-Friday message in my floor group]",
  "I will count: [what people do] out of [how many people see the offer]",
  "My pass mark: At least [X] of [Y people, e.g. 25 people in my floor group] will [do what, e.g. reserve at ₹40] by [deadline].",
  "Close friends and family: counted separately, not towards the pass mark.",
  "My limit: [₹ amount] and [hours]. I stop on the deadline whatever happens.",
].join("\n");

/** A self-made, one-page record of the experiment. Not a certificate or a Lab assessment. */
export const experimentRecordTemplate = [
  "MY 14-DAY CUSTOMER EXPERIMENT — one-page record (self-reported)",
  "Name: [your name]            Dates: [start] to [end]",
  "Problem I explored: [one sentence, in customers' words]",
  "My limits: [₹ budget] and [minutes a day]",
  "Conversations: [number] people, [number] said no or did not reply",
  "Test I ran: [playbook and offer]",
  "Pass mark set before the test: At least [X] of [Y] will [action] by [date]",
  "Result: [X] of [Y] actually [action]. Close friends/family counted separately: [number]",
  "Time and money spent: [hours] and ₹[amount]",
  "My decision: continue / change / stop, because [one or two reasons]",
  "Biggest thing I learned: [one sentence]",
  "Self-reported record of my own work, made with the free Swapnil Sahoo Learning Lab toolkit. Not a certificate.",
].join("\n");

export const learningCardTemplate = [
  "LEARNING CARD — fill this in when the test ends (Day 11)",
  "I believed that: [copy from your test card]",
  "What happened: [X] of [Y] people [action]. Pass mark was [pass mark].",
  "What surprised me: [one thing]",
  "What this cannot tell me yet: [e.g. only friends replied; nobody paid yet]",
  "So I will: continue / change / stop, because [reason]",
].join("\n");

export const playbookHonestyNote =
  "This guide does not ask you to take money. A reservation at a clearly stated price, followed by people turning up, is strong evidence for a first test. If you later decide to sell, deliver only what you can safely provide, never take money for something you cannot deliver, and check the rules for your product (for food, FSSAI registration).";

export const campusExamples = [
  {
    id: "hostel-snacks",
    title: "Late-night snacks in a hostel",
    path: "Food",
    test: "Tasting on one floor, then “reserve for Friday” on WhatsApp with the floor rep's OK.",
    numbers:
      "30 people saw the offer · pass mark 5 reservations · 7 reserved at ₹40 · 6 collected.",
    decision:
      "Continue: run it for two more Fridays and check FSSAI registration before selling regularly.",
  },
  {
    id: "thrift",
    title: "Thrift clothes on Instagram",
    path: "Resale",
    test: "Five pieces already owned, posted with prices and “DM to reserve by Thursday”.",
    numbers: "About 200 views · pass mark 3 reserved · 9 messages, but only 2 reserved.",
    decision:
      "Change: better photos, clearer sizes and one specific college group, then test again.",
  },
  {
    id: "laundry",
    title: "A laundry pickup app",
    path: "App idea",
    test: "Did pickups by hand for 4 rooms for one week, using WhatsApp and a spreadsheet.",
    numbers: "Pass mark 3 repeat requests · 2 asked again · about 40 minutes per pickup.",
    decision: "Change: test a fixed weekly slot for one floor before writing any code.",
  },
  {
    id: "tutoring",
    title: "Exam-week help for first-years",
    path: "Teaching a skill",
    test: "A form with three real time slots for one revision session.",
    numbers: "15 invited · pass mark 5 bookings · 8 booked · 6 turned up.",
    decision: "Continue: run a second session and ask attendees what topic they want next.",
  },
  {
    id: "print-runs",
    title: "Printing runs for a PG",
    path: "Service",
    test: "Three posters with a QR code to a short form, with the PG owner's permission.",
    numbers:
      "Pass mark 6 sign-ups · 0 sign-ups in 3 days · two residents said they print at college.",
    decision:
      "Stop: the problem was not real for these residents. A clear, cheap and useful result.",
  },
] as const;

export const campusExamplesNote =
  "Illustrative examples. The people, places and numbers are invented for teaching; they are not real students or Lab results.";

/** Where to go after Day 14, depending on the decision. Independent resources; no partnership implied. */
export const nextStepLadder = [
  {
    decision: "Continue",
    advice:
      "Run the same test again with people who are not your friends, or for one more week. Then take it further:",
    links: [
      {
        label: "Your college E-Cell or Institution's Innovation Council (IIC)",
        url: "https://iic.mic.gov.in/",
        note: "Campus mentoring, idea competitions and demo days.",
      },
      {
        label: "YC Startup School",
        url: "https://www.startupschool.org/",
        note: "A free, structured online course for building further.",
      },
      {
        label: "IIMBx Do Your Venture",
        url: "https://iimbx.iimb.ac.in/catalogue/do-your-venture-entrepreneurship-for-everyone/",
        note: "IIM Bangalore's free-to-audit course on affordable-loss entrepreneurship.",
      },
    ],
  },
  {
    decision: "Change",
    advice:
      "Keep the problem, change one thing (the customer group, the offer or the price), and run a new 7-day test with a new pass mark.",
    links: [
      {
        label: "Startup India Learning Program",
        url: "https://www.startupindia.gov.in/content/sih/en/learning-and-development_v2.html",
        note: "Free, in English and Hindi, for the wider startup journey.",
      },
      {
        label: "eChai idea-validation answers",
        url: "https://echai.ventures/explore/idea-validation",
        note: "Indian Q&A on interviews, pre-orders and pricing.",
      },
    ],
  },
  {
    decision: "Stop",
    advice:
      "An honest stop after a real test is a success: you saved months. Keep your record, pick another problem from your daily life and start again at Day 1.",
    links: [],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Beginner mistakes                                                   */
/* ------------------------------------------------------------------ */

export const beginnerMistakes = [
  {
    id: "build-first",
    mistake: "Building the app or website first",
    why: "Weeks of building before anyone has shown they want it. Most first ideas change after five conversations.",
    instead: "Do the job by hand for five people. Build only when they keep coming back.",
    when: "Days 1–8",
    tool: "test-playbooks",
  },
  {
    id: "asking-friends",
    mistake: "Asking friends and family if it's a good idea",
    why: "People who love you protect your feelings. You hear what you hope to hear.",
    instead: "Talk to people who have the problem. Friends of friends are a good start.",
    when: "Days 4–6",
    tool: "talk-to-customers",
  },
  {
    id: "would-you-buy",
    mistake: "Asking “Would you buy this?”",
    why: "Predictions are not purchases. Almost everyone says yes to be polite.",
    instead: "Ask about the last time the problem happened, then test with a real offer.",
    when: "Days 4–5",
    tool: "talk-to-customers",
  },
  {
    id: "vanity",
    mistake: "Counting likes, views and followers",
    why: "They cost people nothing. A post can go viral while nobody reserves.",
    instead: "Count actions that cost time or commitment: reservations, bookings, turn-ups.",
    when: "Days 9–11",
    tool: "test-playbooks",
  },
  {
    id: "spend-first",
    mistake: "Spending on a logo, branding or a company first",
    why: "It feels like progress but teaches you nothing about customers, and it uses money you may need.",
    instead: "Keep it to ₹0–₹500 until a test passes. A clear handwritten offer is enough.",
    when: "Days 1–3",
    tool: "free-tools",
  },
  {
    id: "survey",
    mistake: "Sending a 100-person survey instead of having 10 conversations",
    why: "Surveys collect quick, shallow answers to questions you already thought of.",
    instead: "Have three to five real conversations first. They show you what to ask.",
    when: "Days 4–6",
    tool: "talk-to-customers",
  },
  {
    id: "pitching",
    mistake: "Pitching instead of listening",
    why: "The moment you describe your idea, people react to it instead of telling you about their life.",
    instead: "Talk 20% of the time. Keep your idea for the last two minutes, if they ask.",
    when: "Day 5",
    tool: "talk-to-customers",
  },
  {
    id: "no-pass-mark",
    mistake: "Not setting a pass mark before the test",
    why: "Without one, any result can be made to look good.",
    instead: "Write it before you start, e.g. “at least 5 of 25 reserve by Friday”.",
    when: "Day 7",
    tool: "test-playbooks",
  },
  {
    id: "giving-up",
    mistake: "Quitting after two noes",
    why: "Most people are simply busy. Two replies tell you almost nothing.",
    instead: "Send at least ten messages before judging. Count every no as data.",
    when: "Days 5–9",
    tool: "talk-to-customers",
  },
  {
    id: "hiding-zero",
    mistake: "Hiding a zero result",
    why: "A zero is real information. It can save you months.",
    instead: "Write it down as “0 of 20”. Then decide: change or stop.",
    when: "Day 11",
    tool: "test-playbooks",
  },
  {
    id: "no-competition",
    mistake: "Thinking “we have no competition”",
    why: "People always do something about a problem, even if it is nothing. That is your competition.",
    instead: "Ask what they use today, and why. Beat that, not an imaginary empty market.",
    when: "Days 4–6",
    tool: "idea-filter",
  },
  {
    id: "perfect-idea",
    mistake: "Waiting for the perfect idea",
    why: "Ideas get good by testing them. Waiting just means you learn nothing.",
    instead: "Pick the idea you can test with real people this week, then let the evidence decide.",
    when: "Day 1",
    tool: "idea-filter",
  },
] as const satisfies readonly {
  id: string;
  mistake: string;
  why: string;
  instead: string;
  when: string;
  tool: ToolkitSlug;
}[];

/* ------------------------------------------------------------------ */
/* Free AI practice prompts                                            */
/* ------------------------------------------------------------------ */

export const aiPrompts = [
  {
    id: "rehearse",
    title: "Rehearse a conversation",
    useWhen: "Before your first real chat, to beat the nerves.",
    prompt:
      'Act as a busy [type of customer, e.g. second-year hostel student] in India. I am a student practising a 10-minute customer conversation about [problem]. Answer my questions the way a real person would: sometimes short, sometimes off-topic, and never pretend to love my idea. Do not help me unless I ask. After I type "END", tell me which of my questions were leading, hypothetical or about my idea, and suggest better ones.',
  },
  {
    id: "check-questions",
    title: "Check my interview questions",
    useWhen: "After you build your script, alongside the question checker.",
    prompt:
      "Here are my customer interview questions about [problem]:\n[paste your questions]\nFor each one, tell me if it is hypothetical, leading, an opinion question, a yes/no question or mentions my idea. Rewrite weak ones so they ask about a specific past event. Keep each rewrite under 20 words.",
  },
  {
    id: "poke-holes",
    title: "Poke holes in my idea",
    useWhen: "After the idea filter, before you plan a test.",
    prompt:
      "Here is my problem statement:\n[paste your one-paragraph statement]\nList the five assumptions it depends on, from riskiest to safest. For the riskiest two, suggest a test I could run this week for ₹0 that would show whether I am wrong. Do not tell me whether the idea is good.",
  },
  {
    id: "read-notes",
    title: "Make sense of my notes",
    useWhen: "After three or more conversations.",
    prompt:
      "Here are my anonymised conversation notes (Customer A, B, C):\n[paste notes with no names or phone numbers]\nSeparate what people actually did from what they said they think. Point out patterns, contradictions and anything that challenges my idea. Tell me what these few conversations cannot tell me.",
  },
  {
    id: "design-test",
    title: "Design a ₹0 test",
    useWhen: "On Day 7, before you write your offer.",
    prompt:
      "I want to test whether [who] will [action, e.g. reserve a snack box at ₹40] within [days]. My budget is ₹[amount] and I can reach about [number] people through [channel]. Suggest two honest test designs. For each, tell me exactly what to count, a pass mark I should set before starting, and what could make the result misleading.",
  },
  {
    id: "challenge-decision",
    title: "Challenge my decision",
    useWhen: "On Days 13–14.",
    prompt:
      "My test: [what I offered, to whom]. Pass mark set beforehand: [pass mark]. Result: [X of Y did what]. My time and money spent: [amounts]. My decision: [continue / change / stop] because [reasons]. Act as a fair but tough reviewer: what other explanations could there be, what am I ignoring, and what is the single most useful next step?",
  },
] as const;

export const aiNotEvidence =
  "AI output is not evidence. These prompts help you prepare questions and spot weak points; only real people's actions tell you whether your idea works. None of them ask the AI for a score or a verdict.";

export const aiPromptRules = [
  "Never paste names, phone numbers, screenshots or anything private. Use “Customer A”.",
  "AI can be confidently wrong. Treat its answers as a sparring partner, not a mentor's verdict.",
  "AI answers are not customer evidence. Only real people's actions are.",
  "Use any free AI assistant you already trust, and follow its own terms and age rules.",
] as const;

/* ------------------------------------------------------------------ */
/* Free tools                                                          */
/* ------------------------------------------------------------------ */

export const freeTools = [
  {
    category: "Talk and schedule",
    tools: [
      {
        name: "WhatsApp Business app",
        url: "https://business.whatsapp.com/",
        use: "Separate your test from personal chats. Add a short catalogue, quick replies and labels to track who reserved.",
        free: "Free app.",
      },
      {
        name: "Google Meet",
        url: "https://meet.google.com/",
        use: "Ten-minute customer calls when you cannot meet in person.",
        free: "Free with a Google account; longer group calls may need a paid plan.",
      },
      {
        name: "Calendly",
        url: "https://calendly.com/",
        use: "Let people pick a time slot for a chat or a session.",
        free: "Free plan available; extra features are paid.",
      },
    ],
  },
  {
    category: "Forms and sign-ups",
    tools: [
      {
        name: "Google Forms",
        url: "https://forms.google.com/",
        use: "Time-slot sign-ups, reservations and short follow-up questions.",
        free: "Free with a Google account.",
      },
      {
        name: "Tally",
        url: "https://tally.so/",
        use: "Clean forms with a thank-you page, if you want something that looks more polished.",
        free: "Unlimited forms and submissions free, within fair-use limits.",
      },
      {
        name: "Microsoft Forms",
        url: "https://forms.office.com/",
        use: "An alternative if your college gives you a Microsoft account.",
        free: "Free with a Microsoft account.",
      },
    ],
  },
  {
    category: "Notes and tracking",
    tools: [
      {
        name: "Google Sheets",
        url: "https://sheets.google.com/",
        use: "Your evidence log: who was asked, who acted, time and money spent.",
        free: "Free with a Google account.",
      },
      {
        name: "Notion",
        url: "https://www.notion.com/",
        use: "Keep conversation notes, quotes and your daily checklist in one place.",
        free: "Free plan for individuals.",
      },
      {
        name: "Trello",
        url: "https://trello.com/",
        use: "A simple board for the 14 days: to do, doing, done.",
        free: "Free plan for individuals and small teams.",
      },
    ],
  },
  {
    category: "Make your offer look real",
    tools: [
      {
        name: "Canva",
        url: "https://www.canva.com/",
        use: "Posters, menu cards, Instagram posts and a simple product mock-up.",
        free: "Free plan with templates; some elements are paid.",
      },
      {
        name: "Google Sites",
        url: "https://sites.google.com/",
        use: "A one-page description of your offer, if you really need a page.",
        free: "Free with a Google account.",
      },
      {
        name: "Carrd",
        url: "https://carrd.co/",
        use: "A simple one-page site with a sign-up button.",
        free: "Free account; custom domains and advanced forms are paid.",
      },
      {
        name: "Figma",
        url: "https://www.figma.com/",
        use: "Clickable screens to show what an app would look like, labelled as a mock-up.",
        free: "Free Starter plan with limited access.",
      },
    ],
  },
] as const;

export const freeToolsNote = `Free plans checked on ${toolkitCheckedOn}. Free plans change, so check each tool's own pricing page before you rely on it. We have no affiliate links or partnerships with any of these companies. You never need a paid tool to finish the 14 days.`;

/* ------------------------------------------------------------------ */
/* Learn from Y Combinator                                             */
/* ------------------------------------------------------------------ */

export const ycResources = [
  {
    stage: "Before you start",
    items: [
      {
        title: "Startup School",
        by: "Y Combinator",
        url: "https://www.startupschool.org/",
        format: "Free online course",
        takeaway:
          "A free, structured course on starting a company. Use it alongside the 14 days when you want depth.",
      },
      {
        title: "Before the Startup",
        by: "Paul Graham",
        url: "https://paulgraham.com/before.html",
        format: "Essay",
        takeaway:
          "Written for students. Startups are counterintuitive, so follow your curiosity, learn deeply and notice problems before chasing an idea.",
      },
      {
        title: "A Student's Guide to Startups",
        by: "Paul Graham",
        url: "https://paulgraham.com/mit.html",
        format: "Essay",
        takeaway:
          "Why college is a good time to try, why classmates make good co-founders, and why a small, cheap start is fine.",
      },
    ],
  },
  {
    stage: "Days 1–3: find a real problem",
    items: [
      {
        title: "How to Get Startup Ideas",
        by: "Paul Graham",
        url: "https://paulgraham.com/startupideas.html",
        format: "Essay",
        takeaway:
          "The best ideas usually come from problems you have yourself. A few people who need it badly beat many who like it a little.",
      },
      {
        title: "How to get startup ideas",
        by: "YC Startup Library",
        url: "https://www.ycombinator.com/library/8g-how-to-get-startup-ideas",
        format: "Talk",
        takeaway:
          "Start from what you know unusually well, and don't reject an idea just because it looks boring, hard to start or already has competitors.",
      },
    ],
  },
  {
    stage: "Days 4–6: talk to customers",
    items: [
      {
        title: "How to talk to users",
        by: "YC Startup Library",
        url: "https://www.ycombinator.com/library/Iq-how-to-talk-to-users",
        format: "Talk",
        takeaway:
          "Ask about their life and specific past moments, not your idea. Listen far more than you talk, and avoid “would you use…?”.",
      },
    ],
  },
  {
    stage: "Days 7–11: run a small test",
    items: [
      {
        title: "How to plan an MVP",
        by: "YC Startup Library",
        url: "https://www.ycombinator.com/library/6f-how-to-plan-an-mvp",
        format: "Talk",
        takeaway:
          "Your first version is a quick way to learn from real users, not your final product. Time-box it and don't fall in love with it.",
      },
      {
        title: "Do things that don't scale",
        by: "Paul Graham",
        url: "https://paulgraham.com/ds.html",
        format: "Essay",
        takeaway:
          "Recruit your first users by hand, one by one, and look after them personally. Manual work early is normal, not a failure.",
      },
      {
        title: "Founder FAQ: How did you get your first customer?",
        by: "YC Startup Library",
        url: "https://www.ycombinator.com/library/JE-founder-faq-how-did-you-get-your-first-customer",
        format: "Short answers",
        takeaway:
          "Founders describe their first customers. Notice how often it started with personal, manual effort.",
      },
    ],
  },
  {
    stage: "Days 12–14 and beyond",
    items: [
      {
        title: "YC's essential startup advice",
        by: "YC Startup Library",
        url: "https://www.ycombinator.com/library/4D-yc-s-essential-startup-advice",
        format: "Short list",
        takeaway:
          "A one-page checklist of YC's core advice. Reread it when you decide whether to continue, change or stop.",
      },
      {
        title: "Startup Playbook",
        by: "Sam Altman",
        url: "https://playbook.samaltman.com/",
        format: "Short book",
        takeaway:
          "Written by YC's former president: idea, product, execution and growth, in plain language.",
      },
    ],
  },
] as const;

export const ycNote =
  "Independent resources, linked and summarised in our own words. The Swapnil Sahoo Learning Lab is not affiliated with or endorsed by Y Combinator, Paul Graham or Sam Altman.";

/* ------------------------------------------------------------------ */
/* Daily help for the 14-day plan                                      */
/* ------------------------------------------------------------------ */

export type DayHelp = {
  doToday: readonly string[];
  watchOut: string;
  tool?: { label: string; href: string };
};

export const ventureDayHelp: Readonly<Record<number, DayHelp>> = {
  1: {
    doToday: [
      "Set a 15-minute timer and write your idea in one paragraph. Messy is fine.",
      "Add who has the problem, the test you would run and what result would convince you.",
      "Date it and keep it unchanged. You will compare it with Day 14.",
    ],
    watchOut: "Waiting for the perfect idea. Any problem you care about is enough to start.",
  },
  2: {
    doToday: [
      "List three skills you already have and three kinds of people you can reach.",
      "Choose your daily minutes and the most you will spend. ₹0 is a great answer.",
      "Write one line on what you will not risk: fees, loans or savings.",
    ],
    watchOut: "Spending on a logo, a website or a company. You need none of them to test.",
    tool: { label: "Beginner mistakes to dodge", href: toolkitHref("mistakes") },
  },
  3: {
    doToday: [
      "Run the one-page idea filter (15 minutes).",
      "Pick the version you can test with real people this week.",
      "List five people, by role, you could talk to.",
    ],
    watchOut: "“Everyone” is not a customer. Name one specific group.",
    tool: { label: "One-page idea filter", href: toolkitHref("idea-filter") },
  },
  4: {
    doToday: [
      "Build your script in the conversation kit.",
      "Paste your questions into the question checker and fix anything it flags.",
      "Rehearse once with a friend or a free AI prompt. Practice is not evidence.",
    ],
    watchOut: "“Would you buy this?” gets polite yeses. Ask about the last time it happened.",
    tool: { label: "Customer conversation kit", href: toolkitHref("talk-to-customers") },
  },
  5: {
    doToday: [
      "Send five short messages using a ready-made opener.",
      "Have up to three ten-minute chats and write down their exact words.",
      "Count the noes too. They are data.",
    ],
    watchOut: "Pitching in the first minute. Listen first; share your idea at the end if they ask.",
    tool: { label: "Ready-made messages", href: toolkitHref("talk-to-customers", "messages") },
  },
  6: {
    doToday: [
      "Highlight what surprised you or proved you wrong.",
      "Rewrite your problem in one sentence, using their words.",
      "Pick the one thing you most need to test.",
    ],
    watchOut: "Only noticing the quotes that agree with you.",
    tool: {
      label: "AI prompt: make sense of my notes",
      href: toolkitHref("ai-practice-prompts", "read-notes"),
    },
  },
  7: {
    doToday: [
      "Pick one ₹0–₹500 playbook.",
      "Write your offer in two lines: what, for whom, the price, and when.",
      "Fill in a test card and set your pass mark now, e.g. “at least 5 of 25 reserve by Friday”.",
    ],
    watchOut: "Setting the pass mark after you see the results.",
    tool: { label: "₹0–₹500 test playbooks", href: toolkitHref("test-playbooks") },
  },
  8: {
    doToday: [
      "Make the simplest version: a photo, a menu card, a sample or a one-page description.",
      "Label anything that is a mock-up.",
      "Check you can actually deliver what you show.",
    ],
    watchOut: "Spending days making it look perfect. Rough and honest beats polished.",
    tool: { label: "Free tools list", href: toolkitHref("free-tools") },
  },
  9: {
    doToday: [
      "Share your offer with the people you planned to reach, with permission.",
      "Write down how many people actually saw it.",
      "Thank anyone who says no, and do not chase them.",
    ],
    watchOut:
      "Adding people to groups without asking, or messaging the same person again and again.",
  },
  10: {
    doToday: [
      "Count reservations, bookings or turn-ups, and the no-replies.",
      "If someone takes you up, deliver only what you can safely do, and time it.",
      "Note the real time and money you spent.",
    ],
    watchOut: "Counting likes, views or “I'd buy that” as demand.",
    tool: {
      label: "What counts as a strong signal",
      href: toolkitHref("test-playbooks", "signals"),
    },
  },
  11: {
    doToday: [
      "Stop the test on its deadline and keep every promise you made.",
      "Write the result as a number: X of Y.",
      "Note anything that limits it, e.g. only friends replied.",
    ],
    watchOut: "Hiding a zero. A zero is a real and useful result.",
    tool: { label: "Learning card", href: toolkitHref("test-playbooks", "learning-card") },
  },
  12: {
    doToday: [
      "Add up your time and money per person served.",
      "Compare your offer with what people use today.",
      "Write what your small test cannot tell you yet.",
    ],
    watchOut: "Assuming free sign-ups mean people will pay.",
    tool: {
      label: "Free course: read your unit economics",
      href: "/learning-lab/free-courses/read-your-unit-economics",
    },
  },
  13: {
    doToday: [
      "Write one page: assumption, test, pass mark, result and your provisional call.",
      "Ask one person, or the AI prompt below, to poke holes in it.",
      "Write down their feedback and your answer.",
    ],
    watchOut: "Only asking people who will say it's great.",
    tool: {
      label: "AI prompt: challenge my decision",
      href: toolkitHref("ai-practice-prompts", "challenge-decision"),
    },
  },
  14: {
    doToday: [
      "Choose continue, change or stop, and give your reasons.",
      "Name one next step you can afford.",
      "Compare with your Day 1 page: what changed?",
    ],
    watchOut: "Feeling that stopping means failing. An honest stop is a good result.",
    tool: {
      label: "One-page experiment record",
      href: toolkitHref("test-playbooks", "experiment-record"),
    },
  },
};

/** WhatsApp share link with pre-filled text; opens the student's own app, nothing is tracked. */
export function whatsappShareHref(text: string, url: string) {
  return `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
}

export const siteOrigin = "https://www.swapnilsahoo.com";
