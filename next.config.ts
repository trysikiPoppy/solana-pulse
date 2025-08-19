import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["assets.coingecko.com", "coin-images.coingecko.com"],
  },
};

export default nextConfig;
