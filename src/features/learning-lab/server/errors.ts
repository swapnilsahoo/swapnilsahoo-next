export class LabHttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public fields?: Record<string, string>
  ) {
    super(message);
  }
}
export type LabActor = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "learner";
  isDemo: boolean;
  mustChangePassword: boolean;
};
