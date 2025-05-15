// Import the withContentlayer function
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [];
  },
  // Ensure proper assetPrefix for production
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,
  
  // Add image configuration to allow picsum.photos
  images: {
    domains: ['picsum.photos'],
  },
  
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
    appDocumentPreloading: false,
    appDir: true,
  },

  webpack: (config, { isServer }) => {
    // Add SWC dependencies
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        url: require.resolve('url'),
        zlib: require.resolve('browserify-zlib'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        assert: require.resolve('assert'),
        os: require.resolve('os-browserify'),
        path: require.resolve('path-browserify'),
        'process/browser': require.resolve('process/browser'),
      };
    }
    return config;
  },
};

// Export the config with Contentlayer
module.exports = withContentlayer(nextConfig); 