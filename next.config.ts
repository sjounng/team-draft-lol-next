import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // standalone 빌드
  typescript: {
    ignoreBuildErrors: false, // TypeScript 에러는 체크
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ddragon.leagueoflegends.com',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
