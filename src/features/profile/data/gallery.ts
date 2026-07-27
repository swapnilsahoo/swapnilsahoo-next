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
