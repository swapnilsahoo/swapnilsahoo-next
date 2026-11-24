import { labShareCard, ogContentType, ogSize } from "@/features/learning-lab/og-card";

export const alt =
  "Free founder toolkit: idea filter, customer scripts, low-cost test playbooks and more.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return labShareCard(
    "Stop overthinking. Start testing your idea this week.",
    "Idea filter, customer scripts in English and Hindi, and six low-cost test playbooks.",
    ["Free founder toolkit", "No sign-up", "No paid version"]
  );
}
