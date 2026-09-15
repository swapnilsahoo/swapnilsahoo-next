/**
 * Shared primitives for guesstimates, cases and frameworks.
 *
 * The point of these types is auditability. A guesstimate on this site is not a
 * paragraph ending in a number — it is a scope, a route choice, a table of
 * assumptions each carrying its own defence, and a calculation whose every line
 * can be evaluated by a script and checked against its stated result. If an
 * arithmetic line is wrong, `scripts/check-guesstimates.mjs` fails the build
 * rather than shipping a plausible-looking error to a student.
 */

export type Difficulty = "Easy" | "Medium" | "Hard";

export type Route = "Top-down" | "Bottom-up" | "Hybrid" | "Probabilistic";

/** How much weight a number can bear when an interviewer pushes on it. */
export type Confidence = "anchor" | "defensible" | "judgement" | "shaky";

/** Where a number came from — the answer to "why that number?" */
export type AssumptionBasis =
  | "census-anchor"
  | "published-benchmark"
  | "physical-constant"
  | "observed-behaviour"
  | "structural-logic"
  | "declared-judgement";

export interface Assumption {
  /** Stable id, referenced by CalcLine.uses and Sensitivity.assumptionId. */
  id: string;
  lever: string;
  /** Display form, may carry units: "35%", "₹20 / litre". */
  value: string;
  numeric?: number;
  unit?: string;
  basis: AssumptionBasis;
  /** One sentence to say out loud when challenged on this number. */
  defence: string;
  confidence: Confidence;
  /** A reasonable alternative an interviewer may prefer, and its effect. */
  contestedBy?: string;
}

/**
 * One arithmetic step.
 *
 * `expr` must contain only digits, decimal points, + - * / ( ) and whitespace —
 * no identifiers, no units, no thousands separators — so the checker can
 * evaluate it and assert it equals `result`.
 */
export interface CalcLine {
  id: string;
  label: string;
  /** Machine-evaluable, e.g. "1400000000 * 0.35". */
  expr: string;
  /** Human-readable, e.g. "140 crore × 35% urban". */
  display: string;
  /** The value `expr` must evaluate to. Asserted by the checker. */
  result: number;
  /** Allowed relative error where display rounding compounds. Default 0. */
  tolerance?: number;
  unit: string;
  /** The rounded figure actually carried forward, if different. */
  carriedForward?: string;
  /** Assumption ids consumed. Every id must exist in `assumptions`. */
  uses?: readonly string[];
  /** Why this intermediate matters. */
  soWhat?: string;
}

/** Nodes carry figures, so the tree doubles as a ledger rather than a diagram. */
export interface TreeNode {
  label: string;
  formula?: string;
  value?: string;
  note?: string;
  isCriticalPath?: boolean;
  children?: readonly TreeNode[];
}

export interface Scope {
  countingWhat: string;
  unit: string;
  /** Stock vs flow, made explicit — the first-order scope error. */
  timeBasis:
    | "stock (point in time)"
    | "flow (per day)"
    | "flow (per week)"
    | "flow (per year)";
  geography: string;
  included: readonly string[];
  excluded: readonly string[];
  /** The specific ambiguity this question is built around. */
  boundaryTrap: string;
}

export interface RouteChoice {
  chosen: Route;
  why: string;
  /** The route not taken, and why it is weaker here. */
  rejectedRoute: Route;
  rejectedWhyNot: string;
}

export interface Triangulation {
  label: string;
  route: Route;
  premise: string;
  lines: readonly CalcLine[];
  answer: string;
  /** The gap against the primary answer, and what the gap tells you. */
  verdict: string;
}

export interface SensitivityCase {
  scenario: string;
  leverValue: string;
  answer: string;
  deltaVsBase: string;
}

export interface Sensitivity {
  /** Must match an id in `assumptions`. */
  assumptionId: string;
  whyThisLever: string;
  cases: readonly SensitivityCase[];
  /** What would have to be true to flip the conclusion. */
  breakpoint: string;
  /** What to say when there is no time to run the grid. */
  oneLiner: string;
}

export interface Trap {
  trap: string;
  /** The mechanism, not just the warning. */
  whyItHappens: string;
  fix: string;
}

export interface Probe {
  question: string;
  intent: string;
  goodAnswer: string;
  /** The plausible-sounding non-answer most candidates give. */
  weakAnswer?: string;
}
