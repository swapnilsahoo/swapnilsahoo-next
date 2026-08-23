export interface FunctionTrack {
  id: string;
  function: string;
  whatIsAssessed: string;
  typicalPrompt: string;
  redFlag: string;
}

export const functionTracks: readonly FunctionTrack[] = [
  {
    id: "sales",
    function: "Sales & business development",
    whatIsAssessed:
      "Whether you can build a pipeline, qualify it honestly and close without over-promising.",
    typicalPrompt:
      "Walk me through how you would build a sales plan for a new product with no existing customer base.",
    redFlag: "Talking only about closing skill and never mentioning qualification or pipeline math.",
  },
  {
    id: "marketing",
    function: "Marketing & brand",
    whatIsAssessed:
      "Whether you connect a campaign or brand choice back to a measurable business outcome.",
    typicalPrompt:
      "How would you decide whether a brand campaign actually worked?",
    redFlag: "Describing creative execution with no mention of what metric it was meant to move.",
  },
  {
    id: "operations",
    function: "Operations & supply chain",
    whatIsAssessed: "Whether you can trade off cost, speed and quality explicitly, not just optimise one.",
    typicalPrompt: "A warehouse is missing its delivery-time target. How do you diagnose why?",
    redFlag: "Recommending more capacity without first isolating whether the bottleneck is capacity at all.",
  },
  {
    id: "finance",
    function: "Finance & strategy",
    whatIsAssessed: "Whether you can read a P&L or unit-economics table and say what it means for a decision.",
    typicalPrompt: "This business is profitable on paper but burning cash. How is that possible?",
    redFlag: "Reciting formulas without connecting them to the specific decision being asked.",
  },
  {
    id: "hr",
    function: "HR & people",
    whatIsAssessed: "Whether you see people decisions as business decisions with real trade-offs, not just process.",
    typicalPrompt: "A high performer on a team is disruptive to others. What do you do?",
    redFlag: "Treating it as purely a policy question with no acknowledgment of the business cost either way.",
  },
] as const;
