import {NextConfig} from "next";

/**
 * Next.js configuration with TypeScript
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  typescript: {
    // Disable TypeScript type checking during builds
    ignoreBuildErrors: true,
  },

  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },

  // Image configuration to allow images from all domains
  images: {
    // Option 1: Disable optimization and allow all domains
    unoptimized: true,

    // Option 2: Use remote patterns to allow all domains (uncomment to use)
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**',
    //   },
    //   {
    //     protocol: 'http',
    //     hostname: '**',
    //   },
    // ],
  },

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
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },

  // You can add more Next.js configuration options here
  // swcMinify: true,
  // i18n: { ... },
  // rewrites: async () => { ... },
};

export default nextConfig;
