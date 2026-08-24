export const newFieldTip = {
  title: "New to this field? Don't start with the paper that made you curious.",
  description:
    "The paper that first caught your interest usually assumes a field's worth of shared vocabulary you don't have yet. Find a recent review or survey article in the area first — its whole job is to map the live debates, the settled questions and the standard jargon before you ever touch a primary study. Read one or two of those before you go back to the paper you actually wanted to read; it will take a fraction of the time it would have taken cold.",
} as const;

export const triageQuestions: readonly string[] = [
  "What's the actual research question — can you state it in one sentence without using any word from the title?",
  "Why does this paper claim to be novel — is it a new question, a new method on an old question, or a new setting for an established finding?",
  "Does this bear on what you're actually trying to figure out, or only on the same general topic?",
  "If the answer turns out to be exactly what the abstract says, does that change anything you currently believe or plan to do?",
] as const;

export const legitimateAccessMethods: readonly string[] = [
  "Check your institution's library access first — most journal subscriptions cover far more than students realise, and a librarian can usually find a route to almost anything.",
  "Search for a preprint version on an open server for your field (arXiv, SSRN, bioRxiv and similar) — many published papers have a free, nearly identical preprint sitting in public view.",
  "Email the corresponding author directly and ask for a copy. This is completely normal academic practice — most researchers are glad someone wants to read their work, and a short, specific request gets answered far more often than you'd expect.",
] as const;

export const practiceNote = {
  title: "This is a skill, not a talent — it gets faster with repetition.",
  description:
    "The first few papers in a new area will genuinely take hours and still feel incomplete; that's normal, not a sign you're doing it wrong. Expect to reread anything that matters to your own work more than once — a dense paper rarely gives up its weakest assumption on the first pass. AI summarisers can speed up the triage in pass one, but treat a summary as a rough map, not the territory: the errors a summary tool tends to make — flattening a hedge into a certainty, missing a caveat buried in a footnote — are exactly the kind of thing this whole guide is trying to teach you to catch yourself. Do your own second and third pass on anything you intend to cite, extend or argue against.",
} as const;

export interface ReadingPass {
  pass: string;
  time: string;
  whatYouDo: string;
  goal: string;
}

/**
 * The three-pass approach to reading a paper, in my own words. The
 * underlying idea — read in deliberate passes rather than start to
 * finish, once — is a well-known, named technique in computer-science
 * and research-methods pedagogy (S. Keshav, "How to Read a Paper,"
 * ACM SIGCOMM Computer Communication Review, 2007), cited here by name
 * rather than presented as something I invented.
 */
export const readingPasses: readonly ReadingPass[] = [
  {
    pass: "First pass",
    time: "5–10 minutes",
    whatYouDo:
      "Title, abstract, section headings, conclusion. Skim the reference list for names you recognise. Do not open a single figure yet.",
    goal:
      "Decide one thing only: does this paper deserve a second pass, right now, later, or never? Most papers you sample should honestly end here.",
  },
  {
    pass: "Second pass",
    time: "About an hour",
    whatYouDo:
      "Read in order, but skip proofs and derivations on the first read. Spend real time on figures and tables — that is usually where a paper's actual evidence lives, independent of how the prose frames it. Mark unfamiliar references worth chasing later.",
    goal:
      "Grasp the paper's content and evidence well enough to summarise it accurately to someone else, without yet being able to defend every methodological choice in it.",
  },
  {
    pass: "Third pass",
    time: "Several hours — reserve this for papers that matter to your own work",
    whatYouDo:
      "Mentally re-implement the paper: re-derive the assumptions, reconstruct the argument as if you were writing it yourself, and note every point where you would have made a different choice.",
    goal:
      "Full command of the paper — including its hidden assumptions and its weakest link — the level you need before citing it, extending it, or arguing against it.",
  },
] as const;

export const readingOrder: readonly { step: string; why: string }[] = [
  {
    step: "Abstract",
    why: "Tells you the claim the authors want you to remember. Note it, but don't yet trust it — you're about to check it.",
  },
  {
    step: "Conclusion",
    why: "Often more honest than the abstract about what the paper actually established versus what it merely suggests or leaves open.",
  },
  {
    step: "Figures & tables",
    why: "The evidence, stripped of the narrative built around it. If you can't tell what a figure shows without reading the caption twice, that's worth noting as a criticism.",
  },
  {
    step: "Introduction",
    why: "Now read the authors' framing of why the problem matters — with the actual findings already in your head, so you can spot where the framing oversells what follows.",
  },
  {
    step: "Results & discussion",
    why: "Read for the gap between what was measured and what is claimed. This gap is where most defensible criticism of empirical work actually lives.",
  },
  {
    step: "Methods",
    why: "Read last among the main sections, once you already know what the paper found — you're now checking whether the design could actually produce that finding.",
  },
  {
    step: "Related work",
    why: "Useful mainly as a map of adjacent papers and a check on whether this paper positions itself honestly against what came before it.",
  },
] as const;

export const interrogationQuestions: readonly string[] = [
  "What's the actual claim, stripped of hedge words like 'may,' 'could,' or 'is associated with'?",
  "What would have to be false for this finding to be wrong — and did the authors check for it?",
  "Is this assumed, cited from elsewhere, or actually demonstrated in this paper?",
  "What's the smallest additional study that would break this result if it exists?",
  "If I remember exactly one sentence from this paper a year from now, which sentence should it be, and is that the sentence the authors would pick?",
] as const;

export const paperLogFields: readonly string[] = [
  "Full citation, entered the moment you open the paper — not after you've decided it's worth keeping",
  "The claim, in one sentence, in your own words rather than the abstract's words",
  "One genuine strength — the thing this paper does that most others in its area don't",
  "One genuine weakness or open question — this is usually the seed of your own contribution later",
  "Where it sits relative to two or three papers you've already logged",
] as const;

export const readingMistakes: readonly string[] = [
  "Reading every paper start to finish out of a self-imposed obligation to finish what you start, instead of triaging after the first pass.",
  "Accepting the abstract's framing of the contribution without checking it against what the results section actually shows.",
  "Treating every citation in the paper as equally load-bearing, instead of noticing which ones the argument would collapse without.",
  "Reading in isolation for months before writing anything down — a running log is what turns scattered reading into an actual literature review later.",
] as const;
