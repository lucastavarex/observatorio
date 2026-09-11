import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: process.env.BUILD_STANDALONE === 'false' ? undefined : 'standalone',
};

export default nextConfig;
