import { entrepreneurshipJourney } from "@/features/learning-lab/entrepreneurship-journey";
import { labShareCard, ogContentType, ogSize } from "@/features/learning-lab/og-card";

export const alt = entrepreneurshipJourney.shareAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return labShareCard(
    "From startup idea to venture growth, in seven free modules.",
    "Start with a 14-day test with real customers. Free and self-paced.",
    ["Free", "Seven modules", "Adults 18+"]
  );
}
