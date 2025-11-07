-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "lol_id" TEXT,
    "main_lane" TEXT,
    "sub_lane" TEXT,
    "score" INTEGER NOT NULL DEFAULT 0,
    "win_loss_streak" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pools" (
    "pool_id" BIGSERIAL NOT NULL,
    "owner_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pools_pkey" PRIMARY KEY ("pool_id")
);

-- CreateTable
CREATE TABLE "game_records" (
    "game_id" BIGSERIAL NOT NULL,
    "creator_id" UUID NOT NULL,
    "pool_id" BIGINT NOT NULL,
    "team1_won" BOOLEAN NOT NULL,
    "team1_kills" INTEGER NOT NULL DEFAULT 0,
    "team2_kills" INTEGER NOT NULL DEFAULT 0,
    "team1_gold" INTEGER NOT NULL DEFAULT 0,
    "team2_gold" INTEGER NOT NULL DEFAULT 0,
    "is_applied" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_records_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "user_game_records" (
    "record_id" BIGSERIAL NOT NULL,
    "game_id" BIGINT NOT NULL,
    "user_id" UUID NOT NULL,
    "team_number" INTEGER NOT NULL,
    "assigned_position" TEXT NOT NULL,
    "kills" INTEGER NOT NULL DEFAULT 0,
    "deaths" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "cs" INTEGER NOT NULL DEFAULT 0,
    "win_loss_streak_at_game" INTEGER,

    CONSTRAINT "user_game_records_pkey" PRIMARY KEY ("record_id")
);

-- CreateTable
CREATE TABLE "pool_members" (
    "pool_id" BIGINT NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "pool_members_pkey" PRIMARY KEY ("pool_id","user_id")
);

-- CreateTable
CREATE TABLE "_PoolMembers" (
    "A" BIGINT NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_PoolMembers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "_PoolMembers_B_index" ON "_PoolMembers"("B");

-- AddForeignKey
ALTER TABLE "pools" ADD CONSTRAINT "pools_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_records" ADD CONSTRAINT "game_records_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "pools"("pool_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_game_records" ADD CONSTRAINT "user_game_records_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game_records"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_game_records" ADD CONSTRAINT "user_game_records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PoolMembers" ADD CONSTRAINT "_PoolMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "pools"("pool_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PoolMembers" ADD CONSTRAINT "_PoolMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
