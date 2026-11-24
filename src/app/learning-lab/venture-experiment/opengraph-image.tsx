import { labShareCard, ogContentType, ogSize } from "@/features/learning-lab/og-card";

export const alt =
  "The free 14-day venture experiment: will real people act on your idea, not just say they like it?";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return labShareCard(
    "Will real people act on your idea, not just say they like it?",
    "A free 14-day plan: talk to customers, run one small test, decide.",
    ["Free", "About 30 min a day", "Stopping counts"]
  );
}
