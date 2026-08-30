export interface ValidityType {
  id: string;
  title: string;
  question: string;
  failureLooksLike: string;
}

/**
 * The four validity types every design defense eventually gets tested on,
 * described by the question each one actually asks — not the textbook
 * definition, which is easy to recite and hard to apply under questioning.
 */
export const validityTypes: readonly ValidityType[] = [
  {
    id: "construct",
    title: "Construct validity",
    question: "Does your measure actually capture the thing you claim it captures?",
    failureLooksLike:
      "You call a four-item scale \"organizational commitment\" because a prior paper did, without checking whether your sample understood the items the same way that paper's sample did.",
  },
  {
    id: "internal",
    title: "Internal validity",
    question: "Can you rule out the other explanations for what you observed?",
    failureLooksLike:
      "You find that firms with a practice perform better, and stop — without asking whether better-performing firms were simply more able to afford the practice in the first place.",
  },
  {
    id: "external",
    title: "External validity",
    question: "Does the finding generalize past the exact sample and setting you studied?",
    failureLooksLike:
      "A result from one industry, one country, or one time period gets written up with language that implies it applies everywhere, because the paper never names the boundary.",
  },
  {
    id: "statistical-conclusion",
    title: "Statistical conclusion validity",
    question: "Is the relationship you found real, or an artifact of how you tested for it?",
    failureLooksLike:
      "A significant result survives only because of an underpowered sample, an unreported number of model specifications tried, or a violated assumption the test quietly depends on.",
  },
] as const;

export const constructMeasurementGap = {
  title: "The construct-measurement gap",
  description:
    "A construct is the abstract idea you actually care about — leadership, trust, absorptive capacity. A measure is the specific instrument you used to stand in for it in this one study. The two are never identical, and the gap between them is the single most common thing a design defense probes. The tell is language: if you catch yourself writing \"leadership was 4.2\" instead of \"scores on this leadership instrument averaged 4.2,\" you've quietly treated the measure as the construct itself — a slide reviewers will not let pass.",
  checkQuestion:
    "Ask this of your own instrument before anyone else does: which facets of the construct does this measure simply not reach, and have you said so?",
} as const;

export interface CausalThreat {
  id: string;
  name: string;
  definition: string;
  diagnosticQuestion: string;
}

export const causalThreats: readonly CausalThreat[] = [
  {
    id: "confounding",
    name: "Confounding",
    definition:
      "A third variable causes both your predictor and your outcome, creating a relationship between them that isn't causal at all.",
    diagnosticQuestion: "What else could explain both variables moving together?",
  },
  {
    id: "selection",
    name: "Selection bias",
    definition:
      "The units in your sample ended up there through a process related to your outcome — so the comparison you're making was never fair to begin with.",
    diagnosticQuestion: "Why did these specific cases end up in your data, and not others?",
  },
  {
    id: "reverse-causality",
    name: "Reverse causality",
    definition:
      "Your outcome may be causing your predictor, not the other way around — a risk that's easy to miss with cross-sectional data measured at a single point in time.",
    diagnosticQuestion: "If you only have one snapshot in time, how do you know which variable moved first?",
  },
  {
    id: "omitted-variable",
    name: "Omitted variable / endogeneity",
    definition:
      "A variable that belongs in your model is missing, and its absence is correlated with something you did include — biasing the coefficient you actually report.",
    diagnosticQuestion: "What would a reviewer say you left out, and why might that omission matter?",
  },
] as const;

export interface DesignOption {
  id: string;
  name: string;
  answersBest: string;
  cannotTellYou: string;
}

export const designOptions: readonly DesignOption[] = [
  {
    id: "experimental",
    name: "Experimental (randomized)",
    answersBest:
      "Whether a specific manipulation causes a specific effect, with the strongest possible claim to internal validity.",
    cannotTellYou:
      "Whether the effect holds outside the artificial setting you created to isolate it.",
  },
  {
    id: "quasi-experimental",
    name: "Quasi-experimental",
    answersBest:
      "Causal questions in field settings where you can't randomize, using a naturally occurring comparison instead.",
    cannotTellYou:
      "As clean a causal claim as a true experiment — you're always one assumption away from a confound your design didn't rule out.",
  },
  {
    id: "survey-correlational",
    name: "Survey / correlational",
    answersBest:
      "Whether variables are associated, and how strongly, across a broad or hard-to-manipulate sample.",
    cannotTellYou:
      "Which variable caused which — association is not, by itself, a causal claim, no matter how large the sample.",
  },
  {
    id: "qualitative-case",
    name: "Qualitative / case study",
    answersBest:
      "How and why a process unfolds the way it does, especially when the mechanism itself is what's poorly understood.",
    cannotTellYou:
      "How common the pattern is, or how it would hold up against a large, representative sample.",
  },
  {
    id: "mixed-methods",
    name: "Mixed methods",
    answersBest:
      "Both the size of an effect and the mechanism behind it, when a single method would leave one of those questions unanswered.",
    cannotTellYou:
      "A shortcut — done well, it's two designs' worth of rigor, not half of each.",
  },
] as const;

export const designMistakes: readonly string[] = [
  "Choosing the design you're most comfortable coding before choosing the design your question actually needs.",
  "Using cross-sectional data collected at a single point in time, then writing about the results in causal language anyway.",
  "Running a confirmatory quantitative test without having pre-registered the hypothesis, so post-hoc pattern-finding gets described as if it had been predicted.",
  "Comparing groups on a multi-item scale without first checking measurement invariance — whether the instrument means the same thing to every group being compared.",
] as const;

export const designPracticeNote = {
  title: "Before your first design defense",
  description:
    "Take the design chapter of a paper you admire in your area and rewrite its validity threats from scratch, without looking at the paper's own limitations section. Then compare your list to theirs. The gaps in your list — the threats you didn't think to name — are exactly what a committee will ask you about first.",
} as const;
