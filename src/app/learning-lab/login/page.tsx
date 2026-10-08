import type { Metadata } from "next";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { LoginForm } from "@/features/learning-lab/components/LoginForm";
import { isLabServiceConfigured } from "@/features/learning-lab/server/capabilities";

export const metadata: Metadata = {
  title: "Sign in | Learning Lab",
  description: "Access an assigned Learning Lab pilot programme.",
  robots: { index: false, follow: false },
};
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ unavailable?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <LabHero
        eyebrow="Assigned participants and operators"
        title="Sign in to the Lab"
        description="Access your assigned lessons, submissions and instructor feedback."
      />
      <LabSection>
        {params.unavailable && (
          <p role="status" className="lab-callout">
            The workspace is awaiting persistent storage and secure configuration. Public
            demonstration lessons remain available; no account has been created.
          </p>
        )}
        <LoginForm available={isLabServiceConfigured()} />
      </LabSection>
    </>
  );
}
