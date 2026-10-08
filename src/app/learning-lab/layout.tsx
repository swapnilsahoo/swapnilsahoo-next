import type { Metadata } from "next";
import { LabShell } from "@/features/learning-lab/components/LabShell";
import { isLabServiceConfigured } from "@/features/learning-lab/server/capabilities";
import "@/features/learning-lab/components/lab.css";

export const metadata: Metadata = {
  title: { default: "Swapnil Sahoo Learning Lab", template: "%s | Swapnil Sahoo Learning Lab" },
  description:
    "A founder-led professional education initiative hosted on swapnilsahoo.com. Explore proposed programmes in applied AI, strategy and entrepreneurship.",
  openGraph: {
    type: "website",
    siteName: "Swapnil Sahoo Learning Lab",
    title: "Swapnil Sahoo Learning Lab",
    description: "A founder-led professional education initiative hosted on swapnilsahoo.com.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Swapnil Sahoo Learning Lab",
    description: "Proposed programmes in applied AI, strategy and entrepreneurship.",
    images: [],
  },
};

export default function LearningLabLayout({ children }: { children: React.ReactNode }) {
  return <LabShell learnerAccessAvailable={isLabServiceConfigured()}>{children}</LabShell>;
}
