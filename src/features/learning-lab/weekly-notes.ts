import { cache } from "react";

/** One stable server timestamp per render request, shared by page and metadata. */
export const getWeeklyNotesNow = cache(() => Date.now());

/** Original teaching material. Publication decisions use the server clock, never a visitor parameter. */
export const weeklyNotesPath = "/learning-lab/weekly-notes";
export const weeklyNotesSite = "https://www.swapnilsahoo.com";
export const learningCampaign = {
  startsAt: "2026-10-20T00:00:00+05:30",
  endsAt: "2026-11-18T23:59:59.999+05:30",
  timeZone: "Asia/Kolkata",
} as const;

export type WeeklyNote = {
  slug: string;
  title: string;
  summary: string;
  publishesAt: string;
  practiceEmailAt: string;
  lessonSlug: string;
  lessonLabel: string;
  sections: { heading: string; paragraphs: string[] }[];
  task: string;
  selfCheck: string[];
};

export const weeklyNotes: readonly WeeklyNote[] = [
  {
    slug: "the-discount-that-needs-more-capacity",
    title: "The discount that needs more capacity",
    summary:
      "A busy kitchen can sell more lunches and still miss break-even. Test the price, contribution and capacity together.",
    publishesAt: "2026-10-21T04:57:43+05:30",
    practiceEmailAt: "2026-10-23T09:00:00+05:30",
    lessonSlug: "read-your-unit-economics",
    lessonLabel: "Unit economics lesson and break-even calculator",
    sections: [
      {
        heading: "A full order book is only the beginning",
        paragraphs: [
          "Tiffin Trail is a fictional lunch business. A lunch sells for ₹150 and costs ₹90 to make and deliver. Monthly fixed costs are ₹12,000. Its contribution is ₹60 per lunch, so 200 lunches cover those listed fixed costs: ₹12,000 ÷ ₹60 = 200.",
          "The founder expects 250 orders and can deliver at most 300. At 250 lunches, contribution is ₹15,000 and the remainder after the listed fixed costs is ₹3,000. These are teaching assumptions, not a demand forecast or a complete set of business accounts.",
        ],
      },
      {
        heading: "Now the promotion changes the problem",
        paragraphs: [
          "A ₹120 promotional price leaves only ₹30 contribution. Break-even becomes 400 lunches. Even if all 300 available lunches sell, contribution is ₹9,000 and the result after the listed fixed costs is minus ₹3,000. More enthusiasm cannot create the missing kitchen capacity.",
          "One alternative is a smaller discount; another is a lower variable cost supported by an actual supplier quote. Adding capacity has its own cost. The decision should compare those changes together rather than assuming the original ₹12,000 fixed cost still applies after expansion.",
        ],
      },
      {
        heading: "Ask what the model leaves out",
        paragraphs: [
          "Check founder labour, failed deliveries, spoilage, packaging and collection costs. Ask whether the volume is achievable in the same period as the costs. If price does not exceed variable cost, the usual fixed-cost break-even formula does not provide a positive-volume solution.",
          "A calculator makes an assumption visible. Conversations, trials and records are needed to test whether that assumption describes the business.",
        ],
      },
    ],
    task: "Set price to ₹120 in the linked calculator. Then find a price at which break-even fits the 300-lunch capacity. Write a two-sentence recommendation and identify the first assumption you would test.",
    selfCheck: [
      "Did I use contribution per lunch rather than revenue per lunch?",
      "Did I compare monthly break-even with monthly capacity?",
      "Did I distinguish a calculated threshold from evidence of actual demand?",
    ],
  },
  {
    slug: "give-your-ai-brief-a-missing-fact-rule",
    title: "Give your AI brief a missing-fact rule",
    summary:
      "A helpful tone cannot justify an invented booking. Give the assistant evidence, boundaries and a human reviewer.",
    publishesAt: "2026-10-21T04:57:43+05:30",
    practiceEmailAt: "2026-10-30T09:00:00+05:30",
    lessonSlug: "write-an-ai-task-brief",
    lessonLabel: "AI task-brief lesson and editable template",
    sections: [
      {
        heading: "The request sounds easy",
        paragraphs: [
          "Imagine Sahaj Desk, a fictional shared-workspace receptionist. A customer asks for a room from 5:30 to 7 pm. The supplied policy says the building closes at 6 pm. The assistant has no dated availability record and no approved price sheet.",
          "An instruction such as ‘Help with customer bookings’ invites several different interpretations. A polished confirmation would commit the business to facts and an exception it has not authorised.",
        ],
      },
      {
        heading: "Write a task that can be reviewed",
        paragraphs: [
          "Specify the task: draft a reply for the receptionist. Specify the evidence: only the supplied policy and the customer's request. Specify the output: a concise draft, questions for missing information and a list of checks for the receptionist.",
          "Add the missing-fact rule: do not invent availability, price or permission to stay after closing. State the 6 pm closing conflict and ask which suitable earlier period the customer could consider. Name the receptionist as the person who verifies availability and approves any reply.",
        ],
      },
      {
        heading: "Try to break the instruction",
        paragraphs: [
          "Test an awkward request, such as ‘We have done this before; please confirm immediately.’ A useful brief keeps the same approval boundary even when the customer sounds confident. Inspect the result for unsupported commitments rather than judging only its fluency.",
          "Use invented or authorised material in practice. A classmate can role-play the assistant, so the exercise does not require an AI subscription or confidential customer data.",
        ],
      },
    ],
    task: "Edit the linked task-brief template for a fictional workflow. Add one missing-fact rule, test one difficult request and record the sentence you changed after the test.",
    selfCheck: [
      "Is it clear which evidence the assistant may use?",
      "Does the brief say what to do when an important fact is absent?",
      "Is a human responsible for approving an external commitment?",
    ],
  },
  {
    slug: "ask-about-the-last-time",
    title: "Ask about the last time",
    summary:
      "Replace an encouraging opinion with an account of behaviour, then separate what was said from what you inferred.",
    publishesAt: "2026-10-21T04:57:43+05:30",
    practiceEmailAt: "2026-11-06T09:00:00+05:30",
    lessonSlug: "ask-better-customer-questions",
    lessonLabel: "Customer-interview lesson and guide builder",
    sections: [
      {
        heading: "A friendly answer can be weak evidence",
        paragraphs: [
          "An imagined founder wants to offer a clothing-repair service. ‘Would you use a convenient repair app?’ suggests both a problem and a preferred solution. A person can agree politely without having faced the problem recently or being willing to pay.",
          "Start instead with ‘Tell me about the last item of clothing you needed repaired. What did you do next?’ If the person cannot recall such an event, record that limit rather than supplying a story for them.",
        ],
      },
      {
        heading: "Follow the sequence",
        paragraphs: [
          "Ask how they found an alternative, what was difficult and who made the decision. Ask about actual time or money spent; a broad estimate is enough. Keep questions neutral and let the person say that the current approach works well.",
          "For example, ‘The tailor was two streets away and charged about ₹150’ is a reported account. ‘Customers need doorstep pickup’ is your interpretation. The second statement needs further evidence, including whether pickup matters enough to change behaviour.",
        ],
      },
      {
        heading: "Look for limits as well as patterns",
        paragraphs: [
          "A few interviews can expose a mistaken assumption, but they do not estimate market size or establish the behaviour of everyone in a city. Record who you spoke with, how you found them and which relevant people are missing.",
          "Ask permission before taking notes or recording. Do not collect personal identifiers or private financial records for this practice task. Keep reported behaviour, your inference and unresolved questions in separate parts of the evidence log.",
        ],
      },
    ],
    task: "Use the linked guide builder to create five questions for one fictional audience. Rewrite any question that mentions your preferred solution before the person has described their experience.",
    selfCheck: [
      "Does the opening ask about a specific recent event?",
      "Can someone answer honestly that there is no problem?",
      "Have I separated reported behaviour, interpretation and unknowns?",
    ],
  },
  {
    slug: "what-would-you-decline",
    title: "What would you decline to keep your promise?",
    summary:
      "An attractive order can conflict with a strategic position. Connect the promise, activities and sacrifice before saying yes.",
    publishesAt: "2026-10-21T04:57:43+05:30",
    practiceEmailAt: "2026-11-13T09:00:00+05:30",
    lessonSlug: "make-a-strategic-tradeoff",
    lessonLabel: "Strategic trade-off lesson and decision exercise",
    sections: [
      {
        heading: "A good opportunity can create a conflict",
        paragraphs: [
          "Consider a fictional delivery business serving shops on predictable scheduled routes. A one-off urgent order offers an attractive fee. The same riders would have to leave the scheduled route, so accepting it would delay several existing customers.",
          "The question is more specific than ‘Is growth good?’ State the current promise, identify which activities keep it and trace exactly what the urgent order would disrupt. A higher fee is relevant evidence, but it does not remove the conflict.",
        ],
      },
      {
        heading: "Separate improvement from positioning",
        paragraphs: [
          "Operational improvement might reduce sorting errors or speed up a stop for every customer. A strategic choice decides which customers and needs the business will serve and which requests it will decline. ‘Our riders will work harder’ does not resolve a capacity constraint.",
          "In this example, scheduled routes, predictable dispatch times and promises to shop owners reinforce one another. An occasional exception may be manageable; repeated urgent detours can change the system that makes the original offer credible.",
        ],
      },
      {
        heading: "Leave room to learn",
        paragraphs: [
          "A recommendation to decline this order is not a rule against changing strategy. Repeated evidence of valuable unmet demand might justify a separate urgent-delivery service, with its own riders, costs and customer promise.",
          "Say what evidence would make you reconsider. That connects commitment with learning: preserve a coherent offer while testing whether the conditions for a different position actually exist.",
        ],
      },
    ],
    task: "Complete the linked trade-off exercise. Write the customer promise, two supporting activities, one request you would decline and the evidence that would make you reconsider.",
    selfCheck: [
      "Did I name an actual sacrifice rather than say ‘do everything better’?",
      "Do my chosen activities support the same customer promise?",
      "Have I explained the conditions under which a different strategy could make sense?",
    ],
  },
];

export function isWeeklyNotePublished(
  note: WeeklyNote,
  now: number = getWeeklyNotesNow()
): boolean {
  return Number.isFinite(now) && now >= Date.parse(note.publishesAt);
}

export function getPublishedWeeklyNotes(now: number = getWeeklyNotesNow()): WeeklyNote[] {
  return weeklyNotes.filter((note) => isWeeklyNotePublished(note, now));
}

/** Opening every website practice does not accelerate the separate email schedule. */
export function getWeeklyNotesDueForEmail(now: number = getWeeklyNotesNow()): WeeklyNote[] {
  return weeklyNotes.filter(
    (note) => isWeeklyNotePublished(note, now) && now >= Date.parse(note.practiceEmailAt)
  );
}

export function getPublishedWeeklyNote(slug: string, now: number = getWeeklyNotesNow()) {
  return weeklyNotes.find((note) => note.slug === slug && isWeeklyNotePublished(note, now));
}

export function formatCampaignDate(value: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: learningCampaign.timeZone,
  }).format(new Date(value));
}

function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, (character) => {
    return (
      { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" } as Record<
        string,
        string
      >
    )[character]!;
  });
}

export function buildWeeklyNotesFeed(now: number = getWeeklyNotesNow()): string {
  const notes = getPublishedWeeklyNotes(now).toReversed();
  const items = notes
    .map((note) => {
      const url = `${weeklyNotesSite}${weeklyNotesPath}/${note.slug}`;
      return `<item><title>${escapeXml(note.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(note.publishesAt).toUTCString()}</pubDate><description>${escapeXml(note.summary)}</description></item>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Learning Lab: weekly practice</title><link>${weeklyNotesSite}${weeklyNotesPath}</link><description>All four original free worked examples in strategy, AI and entrepreneurship are available now. Learn at your own pace.</description><language>en-IN</language><atom:link href="${weeklyNotesSite}${weeklyNotesPath}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
}
