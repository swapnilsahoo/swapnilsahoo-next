export type ResearchIcon = "bricolage" | "compass" | "spark" | "network";

export interface ResearchMechanismStep {
  label: string;
  title: string;
  detail: string;
}

export interface ResearchBranch {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  status: string;
  summary: string;
  centralQuestion: string;
  thesisConnection: string;
  context: string;
  icon: ResearchIcon;
  keywords: string[];
  concepts: string[];
  mechanism: ResearchMechanismStep[];
  contributions: string[];
  openQuestions: string[];
  collaborationFits: string[];
  evidenceNote: string;
  methodNote: string;
}

export interface ThesisCommitteeMember {
  name: string;
  role: string;
}

export interface ThesisFoundation {
  eyebrow: string;
  title: string;
  status: string;
  institution: string;
  manuscriptDate: string;
  submittedDate: string;
  description: string;
  citation: string;
  committee: ThesisCommitteeMember[];
  acknowledgement: string;
  questions: string[];
}
