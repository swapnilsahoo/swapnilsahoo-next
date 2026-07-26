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
