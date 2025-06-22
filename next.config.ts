import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssl.pstatic.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
