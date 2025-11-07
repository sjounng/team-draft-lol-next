import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 ESLint 무시
  },
  typescript: {
    ignoreBuildErrors: false, // TypeScript 에러는 체크
  },
  images: {
    domains: ['ddragon.leagueoflegends.com'], // 챔피언 이미지 외부 도메인 허용
  },
  reactStrictMode: true,
};

export default nextConfig;
