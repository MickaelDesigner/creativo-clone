import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Multiple lockfiles exist in the monorepo; pin Turbopack to this project.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
