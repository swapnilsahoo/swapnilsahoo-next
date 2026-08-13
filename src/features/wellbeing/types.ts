export interface ProtocolStep {
  step: string;
  action: string;
  detail: string;
  duration: string;
}

export interface Practice {
  slug: string;
  number: string;
  title: string;
  framework: string;
  why: string;
  steps: ProtocolStep[];
  evidence?: string;
}

export interface WeekPhase {
  slug: string;
  weeks: string;
  title: string;
  goal: string;
  rationale: string;
  practices: Practice[];
}

export interface CriticalRule {
  title: string;
  summary: string;
  detail: string;
  actions: string[];
}

export interface ScheduleRow {
  time: string;
  practice: string;
  why: string;
  duration: string;
}

export interface Milestone {
  weeks: string;
  expectedShifts: string;
  focus: string;
  marker: string;
  watchFor: string;
}

export interface AssessmentItem {
  id: string;
  prompt: string;
}

export interface AffirmationCategory {
  slug: string;
  title: string;
  useWhen: string;
  affirmations: string[];
}

export interface DeepDiveSection {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  body: DeepDiveBlock[];
}

export type DeepDiveBlock =
  | { kind: "text"; heading?: string; text: string }
  | { kind: "list"; heading?: string; items: string[] }
  | { kind: "steps"; heading?: string; framework?: string; steps: ProtocolStep[] }
  | { kind: "table"; heading?: string; columns: string[]; rows: string[][] }
  | { kind: "callout"; tone: "info" | "warning" | "quote"; text: string; attribution?: string };

export interface ReferenceGroup {
  heading: string;
  entries: string[];
}
