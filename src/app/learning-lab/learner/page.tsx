import type { Metadata } from "next";
import { requirePageActor } from "@/features/learning-lab/server/auth";
import { LearnerWorkspace } from "@/features/learning-lab/components/LearnerWorkspace";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
export const metadata: Metadata = {
  title: "My learning | Learning Lab",
  robots: { index: false, follow: false },
};
export default async function LearnerPage() {
  const actor = await requirePageActor();
  return (
    <>
      <LabHero
        eyebrow="Private learner area"
        title="Your learning workspace"
        description="Assigned programmes, practice, capstone submission and instructor feedback."
      />
      <LabSection>
        <LearnerWorkspace actor={actor} />
      </LabSection>
    </>
  );
}
