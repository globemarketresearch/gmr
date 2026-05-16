import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.globemarketresearch.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/sitemap-reports-:page.xml',
          destination: '/api/sitemap-reports/:page',
        },
        {
          source: '/sitemap-statistics-:page.xml',
          destination: '/api/sitemap-statistics/:page',
        },
        {
          source: '/sitemap-press-releases-:page.xml',
          destination: '/api/sitemap-press-releases/:page',
        },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'globemarketresearch.com',
          },
        ],
        destination: 'https://www.globemarketresearch.com/:path*',
        permanent: true,
      },
      {
        source: '/statistics/:category',
        destination: '/statistics',
        permanent: true,
      },
      {
        source: '/press-releases/:category',
        destination: '/press-releases',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;