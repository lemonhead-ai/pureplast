import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        // Cloudinary CDN — covers all delivery sub-paths:
        // https://res.cloudinary.com/<cloud-name>/image/upload/...
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
