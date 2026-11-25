import { labShareCard, ogContentType, ogSize } from "@/features/learning-lab/og-card";

export const alt = "AI Viva Bot by Swapnil Sahoo Learning Lab: an AI oral examiner with a live demo.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return labShareCard(
    "AI Viva Bot: an AI oral examiner you can try today.",
    "Questions each student on their own submission, then prepares an evaluation for faculty.",
    ["Working prototype", "Live demo", "Learning Lab products"]
  );
}
