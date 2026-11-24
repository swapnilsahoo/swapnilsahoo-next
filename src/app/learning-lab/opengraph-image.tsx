import { labShareCard, ogContentType, ogSize } from "@/features/learning-lab/og-card";

export const alt =
  "Swapnil Sahoo Learning Lab: test your business idea with real customers in 14 days. Free.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return labShareCard(
    "Test your business idea with real customers in 14 days.",
    "A free guide and toolkit for first-time student entrepreneurs.",
    ["Free", "No sign-up", "14 days"]
  );
}
