# Team Draft LoL - Next.js

League of Legends 내전 팀 생성 및 전적 관리 시스템

리그 오브 레전드(LoL) 팀 구성 및 게임 기록 관리를 위한 웹 애플리케이션입니다. 사용자들이 풀(Pool)을 생성하고, 자동으로 밸런스 잡힌 팀을 구성하며, 게임 결과를 기록하고 Elo 기반 MMR 점수를 관리할 수 있습니다.

## 📚 목차

- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [주요 기능](#-주요-기능)
- [데이터베이스 스키마](#-데이터베이스-스키마)
- [API 엔드포인트](#-api-엔드포인트)
- [MMR 점수 계산 알고리즘](#-mmr-점수-계산-알고리즘)
- [최근 업데이트](#-최근-업데이트)
- [다음 개발 계획](#-다음-개발-계획)

---

## 🛠 기술 스택

### Monorepo 구조

- **Package Manager**: pnpm (v9.0.0)
- **Build System**: Turborepo (v2.3.3)
- **Node Version**: >=18

### Frontend (apps/web)

- **Framework**: Next.js 15.5.4 (App Router)
- **React**: 19.1.0
- **Styling**: Tailwind CSS v4
- **TypeScript**: v5
- **Validation**: Zod v4.1.12

### Backend

- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma v6.17.1
- **Authentication**: JWT (jsonwebtoken v9.0.2)
- **Password Hashing**: bcryptjs v3.0.2

### Packages

1. **@repo/database**: Prisma 클라이언트 및 데이터베이스 스키마 관리
2. **@repo/typescript-config**: 공통 TypeScript 설정
3. **@repo/ui**: UI 컴포넌트 패키지 (예정)

---

## 🚀 시작하기

### 환경 변수 설정

```env
# Database
DATABASE_URL=         # PostgreSQL 연결 URL
DIRECT_URL=          # Direct database connection URL

# JWT
JWT_SECRET=          # JWT 서명 키

# Riot API (선택)
RIOT_API_KEY=        # Riot Games API 키
```

### 개발 서버 실행

```bash
# 의존성 설치
pnpm install

# 데이터베이스 초기화
pnpm db:generate     # Prisma 클라이언트 생성
pnpm db:push         # 스키마를 DB에 푸시

# 개발 서버 시작
pnpm dev
```

개발 서버가 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 기타 명령어

```bash
# 빌드
pnpm build

# 린트
pnpm lint

# 타입 체크
pnpm type-check

# 데이터베이스 마이그레이션
pnpm db:migrate
```

---

## 📁 프로젝트 구조

```
team-draft-lol-next/
├── apps/
│   └── web/                    # Next.js 웹 애플리케이션
│       ├── app/
│       │   ├── api/           # API Routes
│       │   │   ├── auth/      # 인증 관련 API
│       │   │   ├── pools/     # 풀 관리 API
│       │   │   ├── game-records/ # 게임 기록 API
│       │   │   ├── invitations/  # 초대 시스템 API
│       │   │   ├── teams/     # 팀 생성 API
│       │   │   ├── profile/   # 프로필 API
│       │   │   └── users/     # 유저 검색 API
│       │   ├── components/    # 공통 컴포넌트
│       │   ├── contexts/      # React Context (AuthContext)
│       │   ├── lib/          # 유틸리티 함수들
│       │   ├── dashboard/    # 대시보드 페이지
│       │   ├── profile/      # 프로필 페이지
│       │   ├── pools/        # 풀 관련 페이지
│       │   ├── login/        # 로그인 페이지
│       │   ├── register/     # 회원가입 페이지
│       │   └── invitations/  # 초대 관리 페이지
│       └── package.json
├── packages/
│   ├── database/             # Prisma 스키마 및 클라이언트
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── generated/        # Prisma 생성 파일
│   ├── typescript-config/    # 공통 TS 설정
│   └── ui/                   # UI 컴포넌트 패키지
├── turbo.json               # Turborepo 설정
├── pnpm-workspace.yaml      # pnpm workspace 설정
└── package.json             # 루트 package.json
```

---

## ✨ 주요 기능

### 1. 인증 시스템

- JWT 기반 인증
- 회원가입/로그인/로그아웃
- 세션 관리 (쿠키 기반)
- AuthContext를 통한 전역 상태 관리

### 2. 풀(Pool) 관리

- 풀 생성 (고유 태그 자동 생성)
- 풀 검색 (태그 기반)
- 풀 가입 요청/승인 시스템
- 멤버 초대 시스템
- 멤버 관리 (추방 등)

### 3. 팀 생성 시스템

#### 자동 팀 생성

- 플레이어 점수 기반 자동 밸런싱
- 포지션 선호도 우선 고려 (주 라인 > 부 라인 > 필 라인)
- 점수 조정: 주 라인 100%, 부 라인 95%/90%, 필 라인 90%/80%
- 점수 차이 800점 이내 유지
- 최대 10개 조합 생성
- 정렬 우선순위:
  1. 점수 차이 800점 이내
  2. 선호 포지션 플레이어 수 (주+부)
  3. 낮은 점수 플레이어의 선호 포지션 배치
  4. 점수 차이 최소화
- Reroll 기능 (다른 조합 보기)
- 위치: `apps/web/app/lib/team-generation.ts`

#### 수동 팀 편집

- 드래그 앤 드롭으로 플레이어 위치 변경
- 같은 팀 내 교환 / 팀 간 교환
- 실시간 점수 계산
- 포지션 변경 시 자동 점수 재계산
- 시각적 피드백:
  - 드래그 중인 카드: 반투명 효과
  - 드롭 타겟: 하이라이트, scale-up, 그림자
  - 색상 코드: 주 라인(초록), 부 라인(노랑), 필 라인(빨강)
- 위치: `apps/web/app/pools/[poolId]/teams/create/page.tsx`

### 4. 전적 관리 시스템

#### 전적 생성 흐름

1. **팀 생성** (DRAFT_PENDING)

   - 자동/수동으로 10명 팀 구성
   - 팀 데이터 저장 (team1Data, team2Data)

2. **밴픽 진행** (DRAFT_COMPLETE)

   - Riot Data Dragon API로 챔피언 목록 불러오기
   - BanPickSession 생성 (30분 제한)
   - 단계별 진행:
     - 밴 단계: Team1 → Team2 → Team1 → Team2 → Team1 → Team2 (총 10밴)
     - 픽 단계: Team1 → Team2 → Team2 → Team1 → Team1 → Team2 → Team2 → Team1 → Team1 → Team2 (총 10픽)
   - 각 픽 시 플레이어 할당
   - 실시간 폴링으로 세션 상태 동기화
   - 완료 시 banPickData에 JSON 저장 및 상태 변경

3. **결과 입력** (RESULT_PENDING)

   - 승패 팀 선택
   - 게임 시간 입력 (MM:SS 형식)
   - 플레이어별 KDA, CS 입력
   - 팀별 킬/골드 입력
   - 입력 필드 초기값 없음 (placeholder="0")

4. **결과 반영** (COMPLETED)
   - 관리자 승인 페이지에서 예상 점수 변화 미리보기
   - 10명 모두의 K/D/A, CS, 원점수, 예상 변화량 표시
   - 승인 시:
     - Elo 기반 MMR 자동 계산
     - User.score 업데이트
     - adjustedScore 저장
     - isApplied = true
     - 챔피언 통계 업데이트 (UserChampionStat, GlobalChampionStat)
   - 거부 시: DRAFT_COMPLETE로 되돌림, 결과 데이터 초기화

#### Riot Data Dragon API 통합

- **버전 정보**: `https://ddragon.leagueoflegends.com/api/versions.json`
- **챔피언 목록 (한국어)**: `https://ddragon.leagueoflegends.com/cdn/{version}/data/ko_KR/champion.json`
- **챔피언 이미지**: `https://ddragon.leagueoflegends.com/cdn/{version}/img/champion/{championId}.png`
- API 키 불필요 (공개 CDN)

### 5. 프로필 관리

- 라이엇 계정 연동
- 선호 포지션 설정
- 통계 조회

### 6. Riot API 연동

- 소환사 정보 조회
- 티어 정보 가져오기
- 위치: `apps/web/app/lib/riot-api.ts`

---

## 🗄️ 데이터베이스 스키마

### User (사용자)

- `id`: UUID (Primary Key)
- `username`: 고유 사용자명
- `email`: 고유 이메일
- `password`: 해시된 비밀번호
- `name`: 게임 내 표시 이름
- `riotId`, `riotTag`: 라이엇 계정 (예: HideOnBush#KR1)
- `mainLane`, `subLane`: 메인/서브 포지션 (TOP/JGL/MID/ADC/SUP)
- `score`: 사용자 점수
- `winLossStreak`: 연승/연패 수

### Pool (풀)

- `poolId`: BigInt (Primary Key)
- `ownerId`: 풀 소유자 (User)
- `name`: 풀 이름
- `tag`: 고유 태그 (예: A1B2)
- **관계**:
  - PoolMember를 통한 다대다 관계 (멤버들)
  - GameRecord (게임 기록들)
  - Invitation (초대/요청들)

### GameRecord (게임 기록)

- `gameId`: BigInt (Primary Key)
- `creatorId`: 생성자 ID
- `poolId`: 풀 ID
- `status`: 전적 상태 (DRAFT_PENDING, DRAFT_COMPLETE, RESULT_PENDING, COMPLETED)
- `team1Data`, `team2Data`: 팀 구성 정보 (JSON)
- `banPickData`: 밴픽 정보 (JSON, optional)
  - team1Bans, team2Bans: 각 팀 밴 5개
  - team1Picks, team2Picks: 각 팀 픽 5개 (챔피언 + 플레이어 정보)
- `team1Won`: 팀1 승리 여부 (nullable)
- `team1Kills`, `team2Kills`: 팀별 킬 수
- `team1Gold`, `team2Gold`: 팀별 골드
- `gameDuration`: 게임 시간 (초 단위)
- `isApplied`: 점수 적용 여부
- `createdAt`, `updatedAt`: 생성/수정 시간
- **관계**: UserGameRecord (개별 플레이어 기록들), BanPickSession (밴픽 세션)

### UserGameRecord (개별 플레이어 게임 기록)

- `recordId`: BigInt (Primary Key)
- `gameId`: 게임 ID
- `userId`: 플레이어 ID
- `teamNumber`: 팀 번호 (1 or 2)
- `assignedPosition`: 할당된 포지션
- `originalScore`: 게임 당시 유저 점수 (변경 전)
- `adjustedScore`: 계산된 MMR 변화량
- `championId`: 챔피언 ID (Data Dragon, e.g., "Ahri")
- `championName`: 챔피언 이름 (한국어, e.g., "아리")
- `kills`, `deaths`, `assists`: KDA
- `cs`: 미니언 처치 수

### BanPickSession (밴픽 세션)

- `sessionId`: BigInt (Primary Key)
- `gameId`: 게임 ID (1:1 관계)
- `status`: IN_PROGRESS, COMPLETED
- `currentPhase`: 현재 단계 (TEAM1_BAN1 ~ TEAM2_PICK5)
- `sessionData`: 밴픽 진행 상태 (JSON)
- `createdAt`, `expiresAt`: 생성 시간, 만료 시간

### PoolMember (풀 멤버십)

- 복합 Primary Key: (poolId, userId)
- Pool과 User의 다대다 관계 Join 테이블

### Invitation (초대/요청)

- `invitationId`: BigInt (Primary Key)
- `poolId`: 풀 ID
- `senderId`: 발신자 ID
- `receiverId`: 수신자 ID
- `type`: INVITATION (풀주→유저) 또는 REQUEST (유저→풀주)
- `status`: PENDING, ACCEPTED, REJECTED

---

## 🔌 API 엔드포인트

### 인증 (`/api/auth`)

- `POST /auth/register`: 회원가입
- `POST /auth/login`: 로그인
- `POST /auth/logout`: 로그아웃
- `GET /auth/me`: 현재 사용자 정보

### 풀 (`/api/pools`)

- `GET /pools`: 풀 목록 조회
- `POST /pools`: 풀 생성
- `GET /pools/search?tag=`: 태그로 풀 검색
- `POST /pools/join`: 풀 가입 요청
- `GET /pools/[poolId]`: 풀 상세 조회
- `DELETE /pools/[poolId]`: 풀 삭제
- `POST /pools/[poolId]/invite`: 멤버 초대
- `DELETE /pools/[poolId]/members/[userId]`: 멤버 제거
- `GET /pools/[poolId]/requests`: 가입 요청 목록
- `GET /pools/[poolId]/players`: 풀 플레이어 목록
- `DELETE /pools/[poolId]/players/[playerId]`: 플레이어 제거
- `GET /pools/[poolId]/matches/count`: 전적 개수 조회
- `GET /pools/[poolId]/matches`: 전적 목록 조회
- `POST /pools/[poolId]/matches`: 전적 생성 (팀 구성 저장)

### 전적 (`/api/pools/[poolId]/matches`)

- `GET /matches`: 전적 목록 조회 (상태별 필터 지원)
- `GET /matches/count`: 전적 개수 조회
- `GET /matches/[matchId]`: 전적 상세 조회 (RESULT_PENDING시 연승/연패 포함)
- `DELETE /matches/[matchId]`: 전적 삭제 (isApplied=false만 가능)

### 밴픽 (`/api/pools/[poolId]/matches/[matchId]/banpick`)

- `POST /banpick/session`: 밴픽 세션 시작
- `GET /banpick/session`: 세션 상태 조회
- `POST /banpick/action`: 밴/픽 선택
- `POST /reset-draft`: 밴픽 초기화

### 결과 관리 (`/api/pools/[poolId]/matches/[matchId]`)

- `POST /result`: 경기 결과 입력/수정 (승패, 게임시간, KDA, CS)
  - DRAFT_COMPLETE 또는 RESULT_PENDING 상태에서 호출 가능
  - 결과 입력 시 즉시 MMR 계산 및 `adjustedScore`에 저장
  - 재제출 시 자동 재계산
- `POST /approve`: 결과 승인 (관리자 전용, 점수 적용)
  - `user.score` 업데이트
  - 챔피언 통계 업데이트
  - `isApplied = true`
- `POST /reject`: 결과 거부 (관리자 전용, DRAFT_COMPLETE로 되돌림)

### 챔피언 (`/api/champions`)

- `GET /champions`: 챔피언 목록 조회 (Data Dragon 프록시)
- `GET /champions/version`: 최신 버전 조회

### 초대 (`/api/invitations`)

- `GET /invitations`: 내 초대 목록
- `POST /invitations/[invitationId]/accept`: 초대 수락
- `POST /invitations/[invitationId]/reject`: 초대 거절

### 팀 생성 (`/api/teams`)

- `POST /teams/generate`: 팀 자동 생성
- `POST /teams/reroll`: 팀 재생성

### 프로필 (`/api/profile`)

- `PUT /profile`: 프로필 업데이트

### 유저 (`/api/users`)

- `GET /users/search?username=`: 유저 검색

---

## 🎯 MMR 점수 계산 알고리즘

### 개요

League of Legends 내전 결과에 대한 플레이어별 MMR(Matchmaking Rating) 점수 계산은 Elo 랭킹 시스템을 기반으로 합니다. 승패뿐만 아니라 **게임 시간 정규화**, **개인 퍼포먼스**, **라인 상대와의 비교**, **킬 참여율**, **연승/연패** 등을 종합적으로 고려합니다.

- **평균 목표**: 승리 +30점, 패배 -30점
- **실제 범위**: 승리 +10~+50점, 패배 -50~-10점

### 기본 점수

| 결과 | 기본 점수 |
| ---- | --------- |
| 승리 | +30점     |
| 패배 | -30점     |

### 알고리즘 단계

#### 1. 게임 시간 정규화

입력된 게임 시간("MM:SS")을 **분(minutes)** 단위로 변환합니다.

- 예: "25:30" → 25.5분 (1530초)
- 이를 기준으로 **시간당 지표**를 계산하여 게임 길이에 따른 차이를 보정합니다.

#### 2. 성능 지표(Perf) 계산

각 플레이어의 성능을 다음 공식으로 계산합니다:

```
Perf = (kills/min × 2.0) + (assists/min × 1.0) + (cs/min × 0.1) - (deaths/min × 3.0)
```

**가중치 설명:**

| 지표        | 가중치 | 설명                           |
| ----------- | ------ | ------------------------------ |
| kills/min   | 2.0    | 킬의 중요도 높음               |
| assists/min | 1.0    | 어시스트 기본 가중치           |
| cs/min      | 0.1    | CS는 수치가 크므로 가중치 낮춤 |
| deaths/min  | 3.0    | 데스는 큰 페널티로 작용        |

**예시 계산:**

```
게임 시간: 25분
킬: 10, 어시스트: 8, CS: 250, 데스: 3

kills/min = 10/25 = 0.4
assists/min = 8/25 = 0.32
cs/min = 250/25 = 10
deaths/min = 3/25 = 0.12

Perf = (0.4 × 2.0) + (0.32 × 1.0) + (10 × 0.1) - (0.12 × 3.0)
     = 0.8 + 0.32 + 1.0 - 0.36
     = 1.76
```

#### 3. 라인별 플레이어 매칭

GameRecord에 저장된 포지션 정보를 사용하여 각 팀의 같은 역할별 상대 선수를 매칭합니다.

- TOP vs TOP
- JGL vs JGL
- MID vs MID
- ADC vs ADC
- SUP vs SUP

#### 4. 킬 참여율(KP) 계산

```
KP = (킬 + 어시스트) / 팀 전체 킬수
```

**KP 보너스:**

```
KP 보너스 = (내 KP - 평균 KP) × 10
평균 KP = 0.5 (10명 중 5명 참여 가정)
```

#### 5. 최종 점수 계산

```
최종 점수 = 기본 점수 + (K_perf × Perf 차이) + KP 보너스 + 연승/연패 보너스
```

**공식:**

- **승리**: `30 + 8 × (내 Perf - 상대 Perf) + KP 보너스`
- **패배**: `-30 + 8 × (내 Perf - 상대 Perf) + KP 보너스`

**K 계수:**

- `K_perf = 8`: 성능 차이 계수
- `K_kp = 10`: 킬 참여율 계수

#### 6. 연승/연패 보너스

| 조건                 | 점수 변화  |
| -------------------- | ---------- |
| n연승(n>2) + 또 승리 | +(n × 2)점 |
| n연패(n>2) + 또 패배 | -(n × 2)점 |
| 그 외                | 0점        |

#### 7. 최소/최대 점수 보장

극단적인 점수 변화를 방지합니다.

| 결과 | 점수 범위   |
| ---- | ----------- |
| 승리 | +10 ~ +50점 |
| 패배 | -50 ~ -10점 |

### 계산 예시

#### 예시 1: 압도적 승리

**상황**:

- 결과: 승리
- 게임 시간: 25분
- 내 성적: 10/1/8 (킬/데스/어시), CS 250
- 상대 성적: 2/5/3 (킬/데스/어시), CS 180
- 팀 전체 킬: 40
- 연승 상태: 3연승

**계산**:

```
1. Perf 계산 (나)
   Perf = (0.4×2.0) + (0.32×1.0) + (10×0.1) - (0.04×3.0)
        = 0.8 + 0.32 + 1.0 - 0.12 = 2.0

2. Perf 계산 (상대)
   Perf = (0.08×2.0) + (0.12×1.0) + (7.2×0.1) - (0.2×3.0)
        = 0.16 + 0.12 + 0.72 - 0.6 = 0.4

3. Perf 차이 = 2.0 - 0.4 = 1.6

4. KP 보너스
   KP = (10+8)/40 = 0.45
   KP 보너스 = (0.45 - 0.5) × 10 = -0.5

5. 연승 보너스 = 3 × 2 = 6

최종 점수 = 30 + (8 × 1.6) + (-0.5) + 6
          = 30 + 12.8 - 0.5 + 6
          = 48.3 → 48점
```

#### 예시 2: 선전한 패배

**상황**:

- 결과: 패배
- 게임 시간: 30분
- 내 성적: 8/5/12 (킬/데스/어시), CS 280
- 상대 성적: 7/6/8 (킬/데스/어시), CS 250
- 팀 전체 킬: 25
- 특별한 연속 기록 없음

**계산**:

```
1. Perf 계산 (나): 1.366
2. Perf 계산 (상대): 0.966
3. Perf 차이 = 1.366 - 0.966 = 0.4
4. KP 보너스 = (0.8 - 0.5) × 10 = 3
5. 연패 없음 = 0

최종 점수 = -30 + (8 × 0.4) + 3 + 0
          = -30 + 3.2 + 3
          = -23.8 → -24점
```

### 구현 위치

- **공유 계산 로직**: `/apps/web/app/lib/score-calculator.ts`
- **승인 시 적용**: `/apps/web/app/api/pools/[poolId]/matches/[matchId]/approve/route.ts`
- **프론트엔드 미리보기**: 전적 목록 페이지, 승인 페이지

### 데이터베이스

- **저장 테이블**: `UserGameRecord`
- **저장 필드**:
  - `adjustedScore` (계산된 최종 MMR 변화량)
  - `kills`, `deaths`, `assists`, `cs` (개별 플레이어 통계)
- **점수 반영**: `User.score`에 `adjustedScore` 값이 더해짐
- **게임 정보**: `GameRecord.gameDuration` (게임 시간, 초 단위)

### 주요 특징

1. **Elo 기반 설계**

   - 승자가 패자로부터 점수를 가져가는 구조
   - 상대적 성능 차이가 점수 변화에 직접 반영

2. **게임 시간 정규화**

   - 모든 지표를 시간당(per minute) 기준으로 계산
   - 짧은 게임과 긴 게임을 공정하게 비교

3. **라인별 상대 비교**

   - 같은 포지션끼리만 비교 (TOP vs TOP, MID vs MID 등)
   - 역할별 플레이 스타일 차이 반영

4. **킬 참여율(KP) 반영**

   - 팀 전체 킬에 대한 기여도 측정
   - 팀플레이 중요도 강조

5. **적응형 점수 범위**
   - 승리: +10 ~ +50점
   - 패배: -50 ~ -10점
   - 평균 ±30점 목표

### 주의사항

1. 점수는 **관리자 승인 시**에만 계산 및 적용됩니다
2. 거부된 결과는 다시 입력할 수 있으며, 점수는 재계산됩니다
3. 한 번 승인된 결과는 되돌릴 수 없으므로 신중하게 승인해야 합니다
4. 모든 플레이어는 **같은 포지션의 상대**와만 비교됩니다
5. 연승/연패는 **해당 Pool 내에서만** 계산됩니다
6. **게임 시간을 반드시 입력**해야 정확한 계산이 가능합니다

### 통계적 안정성

이 알고리즘은 플레이어의 실력이 **정규분포**를 따른다고 가정합니다. MMR 범위를 0~3000으로 설정하면:

- 평균 MMR: 1500
- 표준편차: 약 500
- 대부분의 플레이어: 500~2500 범위
- 상위 0.1%: 2500 이상
- 하위 0.1%: 500 이하

### 향후 개선 가능성

- [ ] 포지션별 가중치 동적 조정 (메타에 따라)
- [ ] 팀 전체 골드/타워 등 추가 지표
- [ ] 빠른 승리 보너스 (20분 이내)
- [ ] MVP 선정 및 추가 보너스
- [ ] 시즌별 MMR 초기화 및 랭킹 시스템
- [ ] K 계수 동적 조정 (게임 수에 따라)

---

## 🙏 Credits

- [Next.js](https://nextjs.org)
- [Prisma](https://www.prisma.io)
- [Riot Games Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon)
- [Tailwind CSS](https://tailwindcss.com)
