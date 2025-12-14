import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  // Allow next-pwa webpack config to work with Turbopack default
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nativeads-assets.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "creative-workflows.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
      },
    ],
  },
};

export default withPWA(nextConfig);
