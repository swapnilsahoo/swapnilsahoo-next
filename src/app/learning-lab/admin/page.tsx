import type { Metadata } from "next";
import { requirePageActor } from "@/features/learning-lab/server/auth";
import { AdminWorkspace } from "@/features/learning-lab/components/AdminWorkspace";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { labPublicConfig } from "@/features/learning-lab/config";
export const metadata: Metadata = {
  title: "Administration | Learning Lab",
  robots: { index: false, follow: false },
};
export default async function AdminPage() {
  const actor = await requirePageActor("admin");
  return (
    <>
      <LabHero
        eyebrow="Protected operator area"
        title="Pilot administration"
        description="Manage enquiries, assigned learners, programme content and instructor decisions."
      />
      <LabSection>
        <AdminWorkspace actor={actor} launchApproved={labPublicConfig.launchApproved} />
      </LabSection>
    </>
  );
}
