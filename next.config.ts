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
};

export default nextConfig;
