/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [];
  },
  // Ensure proper assetPrefix for production
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,
  
  // Add additional security headers to prevent interference
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
    ];
  },
  
  // Simplified experimental settings to avoid configuration errors
  experimental: {
    // Disable document preloading to help with hostname-related worker issues
    appDocumentPreloading: false
  },
};

module.exports = nextConfig; 