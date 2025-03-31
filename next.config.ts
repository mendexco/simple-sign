import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: './empty-module.ts'
      }
    }
  },
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https'
      },
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https'
      }
    ]
  }
}

export default nextConfig
