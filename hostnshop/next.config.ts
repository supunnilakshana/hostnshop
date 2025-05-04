import {NextConfig} from "next";

/**
 * Next.js configuration with TypeScript
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,

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

  // You can add more Next.js configuration options here
  // swcMinify: true,
  // i18n: { ... },
  // rewrites: async () => { ... },
};

export default nextConfig;
