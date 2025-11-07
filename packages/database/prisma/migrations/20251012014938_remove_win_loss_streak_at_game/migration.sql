/*
  Warnings:

  - You are about to drop the column `win_loss_streak_at_game` on the `user_game_records` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_game_records" DROP COLUMN "win_loss_streak_at_game";
