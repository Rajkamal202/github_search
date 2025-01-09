/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
    unoptimized: true
  },
  // Ensure assets are served from the correct path
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  // Handle trailing slashes consistently
  trailingSlash: false,
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Ensure proper error handling
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
}

module.exports = nextConfig


