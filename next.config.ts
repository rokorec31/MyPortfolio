import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/MyPortfolio",
  images: { unoptimized: true },
};

export default nextConfig;
