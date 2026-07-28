import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dr. Swapnil Sahoo — Strategy, Entrepreneurship & Innovation",
    short_name: "Swapnil Sahoo",
    description:
      "Research, teaching and field practice in strategy, entrepreneurship, innovation and AI-enabled management education.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fbff",
    theme_color: "#0a2540",
    icons: [
      {
        src: "/icon.svg?v=superman",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
