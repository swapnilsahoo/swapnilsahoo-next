import type { NextConfig } from "next";

import {
  API_SECURITY_HEADERS,
  APP_CSP_HEADER,
  APP_SOURCE,
  BASE_SECURITY_HEADERS,
  DECK_CSP_HEADER,
  STATIC_DECK_SOURCE,
} from "./security-headers";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./content/scriptures/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "swapnilsahoo.com",
        pathname: "/wp-content/**",
      },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: BASE_SECURITY_HEADERS },
      // Exactly one of the next two matches any given path, so a response never
      // carries two Content-Security-Policy headers.
      { source: STATIC_DECK_SOURCE, headers: [DECK_CSP_HEADER] },
      { source: APP_SOURCE, headers: [APP_CSP_HEADER] },
      { source: "/api/:path*", headers: API_SECURITY_HEADERS },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blogs",
        destination: "https://swapnilsahoo.substack.com/",
        permanent: true,
      },
      {
        source: "/spirituality/hanuman-chalisa.html",
        destination: "/spirituality/hanuman-chalisa",
        permanent: true,
      },
      {
        source: "/case-study-preparation",
        destination: "/placements/case-study-preparation",
        permanent: true,
      },
      {
        source: "/teaching/phd-coursework",
        destination: "/research/phd-coursework",
        permanent: true,
      },
      {
        source: "/teaching/phd-coursework/how-to-read-a-research-paper",
        destination: "/research/phd-coursework/how-to-read-a-research-paper",
        permanent: true,
      },
      {
        source: "/teaching/ai-for-educators",
        destination: "/ai-initiatives/ai-for-educators",
        permanent: true,
      },
      {
        source: "/teaching/ai-hackathon",
        destination: "/ai-initiatives/ai-hackathon",
        permanent: true,
      },
      {
        source: "/teaching/ai-hackathon/side-quests",
        destination: "/ai-initiatives/ai-hackathon/side-quests",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
