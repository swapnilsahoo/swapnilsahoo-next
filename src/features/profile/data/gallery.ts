import type { GalleryImage } from "@/features/profile/types";

const base =
  "https://swapnilsahoo.com/wp-content/themes/swapnil-sahoo-theme/material%20assests/images";

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/classroom-dialogue.png",
    alt: "Swapnil Sahoo facilitating an interactive classroom dialogue",
    caption: "Ideas in motion · Interactive classroom dialogue",
    objectPosition: "center 62%",
  },
  {
    src: "/images/gallery/great-lakes-team.png",
    alt: "Swapnil Sahoo with students and colleagues at Great Lakes",
    caption: "Great Lakes community · In the field",
    objectPosition: "center 52%",
  },
  {
    src: "/images/gallery/recognition-moment.png",
    alt: "Swapnil Sahoo presenting a plant during an event at Great Lakes",
    caption: "A moment of recognition · The Gauntlet",
    objectPosition: "center 45%",
  },
  {
    src: "/images/gallery/crest-judging-panel.png",
    alt: "Swapnil Sahoo serving on the judging panel at CREST",
    caption: "At the judging table · CREST 2025",
    objectPosition: "center 46%",
  },
  {
    src: "/images/gallery/crest-2025-group.png",
    alt: "Swapnil Sahoo with participants at the CREST 2025 management fest",
    caption: "CREST 2025 · The Gauntlet",
    objectPosition: "center 48%",
  },
  {
    src: `${base}/AACSB.jpeg`,
    alt: "AACSB Peer Review Visit",
    caption: "AACSB Peer Review Visit",
  },
  {
    src: `${base}/conference.jpg`,
    alt: "Speaking at AOM 2025",
    caption: "Presenting at a Conference",
  },
  {
    src: `${base}/mdp.jpg`,
    alt: "MDP Session for IRS Officers",
    caption: "MDP Session · IRS Officers, NADT Delhi",
  },
  {
    src: `${base}/award.jpg`,
    alt: "Award at IIM Kashipur",
    caption: "Best Paper Award · IIM Kashipur (MERC 2023)",
  },
  {
    src: `${base}/SPIC.jpg`,
    alt: "SPIC MACAY Inauguration at GLIM",
    caption: "SPIC MACAY Inauguration · GLIM",
  },
];
