import type { Metadata } from "next";
import { LabShell } from "@/features/learning-lab/components/LabShell";
import { isLabServiceConfigured } from "@/features/learning-lab/server/capabilities";
import "@/features/learning-lab/components/lab.css";

export const metadata: Metadata = {
  title: { default: "Swapnil Sahoo Learning Lab", template: "%s | Swapnil Sahoo Learning Lab" },
  description:
    "Free practical learning for first-time student entrepreneurs and managers: a 14-day customer experiment, a founder toolkit and short courses. Everything is free.",
  openGraph: {
    type: "website",
    siteName: "Swapnil Sahoo Learning Lab",
    title: "Swapnil Sahoo Learning Lab",
    description:
      "Free practical learning for first-time student entrepreneurs and managers. Everything is free.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Swapnil Sahoo Learning Lab",
    description:
      "Free practical learning for first-time student entrepreneurs and managers. Everything is free.",
    images: [],
  },
};

export default function LearningLabLayout({ children }: { children: React.ReactNode }) {
  return <LabShell learnerAccessAvailable={isLabServiceConfigured()}>{children}</LabShell>;
}
