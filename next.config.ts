import type { NextConfig } from "next";

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
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
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
