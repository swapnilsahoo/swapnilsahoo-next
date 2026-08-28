export interface PiRubricItem {
  id: string;
  category: string;
  whatIsScored: string;
  inTheRoom: readonly string[];
  prepTip: string;
}

/**
 * The ten dimensions a personal-interview panel is actually scoring,
 * written out in full — not just the headline categories, but what each
 * one looks like when it shows up in the room and how to prepare for it.
 */
export const piRubric: readonly PiRubricItem[] = [
  {
    id: "grooming-body-language",
    category: "Grooming and Body Language",
    whatIsScored:
      "The panel forms an impression before you've said anything of substance — how you enter, whether you make eye contact with everyone in the room and not just whoever is speaking, how you sit, and whether your posture holds up once the questions get harder.",
    inTheRoom: [
      "The walk-in and the greeting — rehearsed and calm, or rushed?",
      "Eye contact distributed across the whole panel, not just the senior-most person",
      "What happens to your posture on a question you can't answer",
      "What you do with your hands when you're thinking",
    ],
    prepTip:
      "Rehearse the physical thirty seconds, not just the content — walk in, sit down, and react to a question you don't know the answer to, on video if you can. Most candidates never practise this part at all.",
  },
  {
    id: "communication-skills",
    category: "Communication Skills",
    whatIsScored:
      "Not vocabulary — clarity. Can the panel follow your answer the first time, without needing to interrupt to ask what your actual point is?",
    inTheRoom: [
      "“Can you say that again, but shorter?”",
      "An interviewer checking the time mid-answer — a real signal you've lost the thread",
      "“Can you summarise that in one line?”",
      "Being cut off mid-sentence to redirect: “okay, but specifically—”",
    ],
    prepTip:
      "Time your answers. Most should land in 60–90 seconds. If a point needs three minutes, it isn't structured yet — see ‘explain in a structured manner’ below.",
  },
  {
    id: "tell-me-about-yourself",
    category: "“Tell me about yourself” — connecting with the role, relevance and fitment",
    whatIsScored:
      "Whether you can tell a two-minute story that ends at this specific role, not a chronological CV read aloud. The panel listens for the thread connecting who you were, what you did, and why this job is the next logical step.",
    inTheRoom: [
      "“Tell me about yourself.”",
      "“Walk me through your background.”",
      "“Why don't we start with your journey so far?”",
      "“In two minutes, tell me why you're sitting in this chair.”",
    ],
    prepTip:
      "Write the answer backwards. Start from the role, pick the two or three prior experiences that most directly explain the fit, and only then decide what to leave out — not the other way round from birth.",
  },
  {
    id: "defend-the-resume",
    category:
      "Ability to defend the resume content (profile summary, work experience/internship, projects, certifications)",
    whatIsScored:
      "Every line on your resume is an invitation to ask “prove it.” The panel is testing whether you actually did the work you claim, understand it deeply enough to explain trade-offs, and didn't just attach your name to a group effort.",
    inTheRoom: [
      "“Walk me through this project — what exactly was your contribution?”",
      "“You've listed [a certification] — what's one idea from it you still use?”",
      "“This internship: what's one decision you made that you'd defend today?”",
      "“What would your manager on this project say was your biggest weakness?”",
    ],
    prepTip:
      "For every bullet point, be ready to go three questions deep. If you can't explain a project past its headline, either cut it from the resume or relearn the parts you've forgotten.",
  },
  {
    id: "translate-experience-to-role",
    category: "Ability to translate past experience with specific future role requirements",
    whatIsScored:
      "The “so what” on top of defending the resume — not just what you did, but whether you can draw an explicit, credible line from a past decision to a skill this specific role needs.",
    inTheRoom: [
      "“You've never worked in [function] — what from your background transfers?”",
      "“How does your engineering background help you in a marketing role?”",
      "“Give me one thing from your internship you'd apply here on day one.”",
      "“What's the biggest gap between what you've done and what this role needs?”",
    ],
    prepTip:
      "Read the job description like a checklist. For each requirement, find one specific past moment — not a trait like ‘I'm a team player,’ but an example precise enough that the transfer is obvious without you having to explain it.",
  },
  {
    id: "structured-answers-with-metrics",
    category: "Ability to explain in a structured manner with relevant examples and metrics",
    whatIsScored:
      "Whether an answer has a shape — a clear claim, evidence, and a result — versus a stream of facts in the right general direction. A number in the answer is usually the tell that it's structured.",
    inTheRoom: [
      "“Give me a specific example” (asked after almost any general claim)",
      "“Can you quantify that?”",
      "“What was the result, and how do you know?”",
      "“What's the headline, then the reasoning?”",
    ],
    prepTip:
      "Use a repeatable shell: situation → what you specifically did → the metric or outcome → what you'd do differently now. If you can't attach a number to the outcome, sharpen the example rather than force a number in.",
  },
  {
    id: "industry-analysis-of-employers",
    category: "Industry analysis of past organizations or preferred recruiters",
    whatIsScored:
      "Whether you understand the business you worked in — or want to join — as a business: its competitors, its margin pressure, what's changed recently, not just your own role inside it.",
    inTheRoom: [
      "“Who are [your past company]'s biggest competitors, and what do they do differently?”",
      "“What's the single biggest challenge your industry faces right now?”",
      "“Why [target company] and not [its closest competitor]?”",
      "“What's one recent decision by [target company] you'd have made differently?”",
    ],
    prepTip:
      "For your last employer and your top two target recruiters, know: who else competes in that space, one piece of news less than three months old, and one number — market share, growth rate, margin — that isn't on their homepage. See Rigorous Industry Analysis for the full method.",
  },
  {
    id: "functional-interview-answers",
    category: "Functional Interview Answers (from top two functional roles applied to)",
    whatIsScored:
      "Depth in the function you're actually chasing, not general business literacy. Applying to both marketing and strategy means the panel expects two genuinely different, function-fluent answers — not one generic answer stretched across both.",
    inTheRoom: [
      "Marketing: “How would you position [a named product] against a lower-priced competitor?”",
      "Finance: “Walk me through how you'd value a company with negative earnings.”",
      "Operations: “How would you decide whether to insource or outsource this process?”",
      "Strategy: “What's the difference between a competitive advantage and competitive parity?”",
    ],
    prepTip:
      "Go deep on your top two functions, not wide across five. One well-rehearsed framework and one worked example per function beats shallow familiarity with everything.",
  },
  {
    id: "logical-analytical-caselets",
    category: "Logical thinking and analytical Approach — Caselet, guesstimates and puzzles",
    whatIsScored:
      "How you think out loud when you don't already know the answer — whether you structure an unfamiliar problem before reaching for a number, and whether you sanity-check the answer at the end.",
    inTheRoom: [
      "“Estimate the number of [X] in [city].”",
      "“A caselet: [company] wants to enter [market] — should they?”",
      "“You have 8 balls, one heavier. Find it in 2 weighings.”",
      "“How would you structure this before you start calculating?”",
    ],
    prepTip:
      "Practise the estimation and case frameworks, but remember what's actually scored is narrating your structure before the arithmetic starts. See Guesstimates and Case Frameworks for the worked methods.",
  },
  {
    id: "current-affairs-business-environment",
    category: "Understanding of current affairs & business environment",
    whatIsScored:
      "Whether you have a considered point of view on something happening right now — not headline recall, but an opinion you can defend for thirty seconds when pushed on it.",
    inTheRoom: [
      "“What's one business story from this week that caught your attention, and why?”",
      "“What's your view on [a current policy or major market move]?”",
      "“How is [a macro trend] likely to affect [your target industry]?”",
      "“Do you agree or disagree with [a stated position], and why?”",
    ],
    prepTip:
      "Pick three or four stories a week — not to memorise, but to form and rehearse an actual opinion on. Being asked ‘what do you think’ and having nothing past the headline is the single most common way this is lost.",
  },
] as const;
