import { labShareCard, ogContentType, ogSize } from "@/features/learning-lab/og-card";

export const alt =
  "The services of Swapnil Sahoo Learning Lab: free learning, tools and programmes for adults aged 18 and over.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return labShareCard(
    "What we offer, and who it is for. All of it free.",
    "A 14-day venture experiment, a seven-module journey, free tools and courses, and a kit for E-Cells.",
    ["Free", "Adults 18+", "Online"]
  );
}
