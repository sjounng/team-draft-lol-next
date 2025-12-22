#!/bin/bash

# EC2 서버에서 실행할 배포 스크립트 (직접 배포)

set -e  # 에러 발생 시 스크립트 중단

echo "🚀 Starting deployment..."

# 프로젝트 디렉토리로 이동
cd ~/team-draft-lol-next

# 최신 코드 가져오기
echo "📥 Pulling latest code from git..."
git pull origin main

# 의존성 설치
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Prisma 생성 및 스키마 적용
echo "🔄 Running Prisma schema push..."
pnpm prisma generate
pnpm prisma db push --accept-data-loss

# Next.js 빌드
echo "🔨 Building Next.js application..."
pnpm build

# Standalone 빌드를 위한 정적 파일 복사
echo "📋 Copying static files for standalone build..."
cp -r public .next/standalone/ 2>/dev/null || true
cp -r .next/static .next/standalone/.next/ 2>/dev/null || true

# PM2로 애플리케이션 재시작
echo "🔄 Restarting application with PM2..."
pm2 restart team-draft-app || pm2 start node --name "team-draft-app" -- .next/standalone/server.js

# PM2 상태 확인
echo "✅ Application status:"
pm2 status

# 로그 확인 (5초간)
echo "📋 Checking logs..."
pm2 logs team-draft-app --lines 20 --nostream

echo "🎉 Deployment completed!"
echo "📍 Application running at: http://localhost:3000"
