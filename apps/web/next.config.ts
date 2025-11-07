import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false, // 개발 인디케이터 비활성화
  },
  images: {
    domains: ['ddragon.leagueoflegends.com'], // 챔피언 이미지 외부 도메인 허용
  },
  reactStrictMode: true,
};

export default nextConfig;
