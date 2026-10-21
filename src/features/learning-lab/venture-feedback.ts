// Public types only. Private access codes never belong in a URL or public record.
export type VentureRubric = {
  boundary: 0 | 1 | 2;
  customerEvidence: 0 | 1 | 2;
  testDesign: 0 | 1 | 2;
  decision: 0 | 1 | 2;
};

export type VentureConstraints = {
  skills: string;
  relationships: string;
  minutesPerDay: number;
  affordableCommitment: number;
  customerAccess: "none" | "indirect" | "direct";
};

export type VentureReview = {
  feedback: string;
  rubric: VentureRubric;
  mentoringMinutes: number;
  workRevision: number;
  reviewRevision: number;
  workSnapshot: string;
  reviewedAt: number;
};

export type VentureStage = {
  stage: 1 | 2 | 3 | 4;
  work: string;
  revision: number;
  updatedAt: number | null;
  reviews: VentureReview[];
};

export type VentureWorkspace = {
  id: string;
  name: string;
  college: string;
  idea: string;
  constraints: VentureConstraints;
  createdAt: number;
  accessExpiresAt: number;
  stages: VentureStage[];
};

export type VentureAdminWorkspace = VentureWorkspace & { email: string };
