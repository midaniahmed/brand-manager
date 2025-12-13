const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'nativeads-assets.s3.amazonaws.com',
      'creative-workflows.s3.amazonaws.com',
      's3.amazonaws.com',
    ],
  },
};

module.exports = withPWA(nextConfig);
