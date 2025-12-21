#!/bin/bash

# EC2 서버에서 실행할 배포 스크립트

set -e  # 에러 발생 시 스크립트 중단

echo "🚀 Starting deployment..."

# 프로젝트 디렉토리로 이동
cd ~/team-draft-lol-next

# 최신 코드 가져오기
echo "📥 Pulling latest code from git..."
git pull origin main

# 기존 컨테이너 중지 및 제거
echo "🛑 Stopping existing containers..."
docker compose down

# 새로운 이미지 빌드 및 컨테이너 시작
echo "🔨 Building and starting containers..."
docker compose up -d --build

# 로그 확인 (10초간)
echo "📋 Checking logs..."
timeout 10 docker compose logs -f app || true

# 컨테이너 상태 확인
echo "✅ Container status:"
docker compose ps

echo "🎉 Deployment completed!"
