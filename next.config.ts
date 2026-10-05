import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // Slash normalisation is done in middleware together with legacy redirects,
  // so every old URL resolves in one 301 instead of 308 → 301.
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // The brand's current packshots, until a new product shoot replaces them.
      { protocol: "https", hostname: "static.tildacdn.one" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  poweredByHeader: false,
};

export default nextConfig;
