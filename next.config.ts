import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  
  // SEO optimizations
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons'],
  },

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
  
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  typescript: {
    ignoreBuildErrors: false,
  },

  // Generate better build ID for SEO
  async generateBuildId() {
    return `seo-build-${Date.now()}`;
  },

  // SEO headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
    ];
  },

  // SEO redirects for keyword optimization
  async redirects() {
    return [
      {
        source: '/주소변환',
        destination: '/주소-위경도-변환',
        permanent: true,
      },
      {
        source: '/지도검색',
        destination: '/지도-위경도-검색',
        permanent: true,
      },
      {
        source: '/좌표찾기',
        destination: '/키워드/위경도-찾기',
        permanent: true,
      },
      {
        source: '/GPS좌표',
        destination: '/키워드/GPS-좌표',
        permanent: true,
      },
      {
        source: '/좌표변환',
        destination: '/키워드/좌표-변환',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
