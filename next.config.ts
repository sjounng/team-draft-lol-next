import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Docker 배포를 위한 standalone 빌드
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 ESLint 무시
  },
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
