import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
  async rewrites() {
    return [
      {
        source: "/teaching/2-year-mba",
        destination: "/teaching/2-year-mba/index.html",
      },
      {
        source: "/teaching/2-year-mba/",
        destination: "/teaching/2-year-mba/index.html",
      },
      {
        source: "/teaching/1-year-mba",
        destination: "/teaching/1-year-mba/index.html",
      },
      {
        source: "/teaching/1-year-mba/",
        destination: "/teaching/1-year-mba/index.html",
      },
    ];
  },
};

export default nextConfig;
