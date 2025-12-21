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

# Prisma 생성 및 마이그레이션
echo "🔄 Running Prisma migrations..."
pnpm prisma generate
pnpm prisma migrate deploy

# Next.js 빌드
echo "🔨 Building Next.js application..."
pnpm build

# PM2로 애플리케이션 재시작
echo "🔄 Restarting application with PM2..."
pm2 restart team-draft-app || pm2 start npm --name "team-draft-app" -- start

# PM2 상태 확인
echo "✅ Application status:"
pm2 status

# 로그 확인 (5초간)
echo "📋 Checking logs..."
pm2 logs team-draft-app --lines 20 --nostream

echo "🎉 Deployment completed!"
echo "📍 Application running at: http://localhost:3000"
