export interface CourseworkComponent {
  id: string;
  title: string;
  purpose: string;
  doneWell: string;
}

/**
 * The mandatory coursework phase of a research doctorate, described by
 * what each component is actually for — not as a specific institution's
 * credit schedule, since that varies by programme and changes over time.
 */
export const courseworkComponents: readonly CourseworkComponent[] = [
  {
    id: "methodology",
    title: "Research methodology & design",
    purpose:
      "Before you can defend a research design, you need the vocabulary to argue about one: validity, reliability, causal identification, what a construct actually is versus how you're measuring it.",
    doneWell:
      "You can read someone else's methods section and immediately spot the design choice they made and the alternative they gave up.",
  },
  {
    id: "statistics",
    title: "Statistical & analytical tools",
    purpose:
      "Whether your work ends up qualitative, quantitative or mixed, you need enough fluency in the tools of the other camp to read their evidence critically, not just your own.",
    doneWell:
      "You can explain, in plain language, what a specific statistical or analytical choice in a paper assumes — and what breaks if that assumption is wrong.",
  },
  {
    id: "theory",
    title: "Theory seminars & literature immersion",
    purpose:
      "This is where you build the mental map of your field: which debates are live, which are settled, which papers every reviewer in your area will expect you to have read.",
    doneWell:
      "You can place a new paper you've never seen before onto that map within a few minutes of reading its abstract.",
  },
  {
    id: "qualifying",
    title: "Comprehensive / qualifying assessment",
    purpose:
      "The checkpoint exists to confirm one thing before you're allowed to commit years to a dissertation: that you can independently identify a real gap, not just describe a topic.",
    doneWell:
      "Your written or oral answer identifies a specific, checkable gap in the literature — not a restatement of what several papers already say.",
  },
] as const;

export const beforeCourseworkChecklist: readonly string[] = [
  "Read the five most-cited papers in your intended area closely enough to summarise each one's actual contribution in a sentence, not just its topic.",
  "Set up a reference manager before week one — the habit of logging every paper as you read it is far easier to start early than to retrofit after a hundred PDFs have piled up.",
  "Write down, honestly, which methodological camp you're weaker in, and treat that course as the one you can least afford to coast through.",
  "Talk to at least two current or recent doctoral students about which seminars changed how they think, versus which ones they just endured.",
] as const;

export const courseworkToSupervisionBridge = {
  eyebrow: "Why this page exists",
  title: "Coursework is not a formality standing between you and your dissertation.",
  description:
    "It's where the dissertation gets easier or harder, months before you've written a single chapter of it. A student who leaves coursework with a real map of the literature and a genuine methodological range proposes a sharper dissertation, defends it more calmly, and revises less painfully when a reviewer pushes back. A student who treated it as a set of boxes to check usually discovers the gap during the proposal defense instead — which is a much more expensive place to discover it.",
} as const;
