/*
  Warnings:

  - You are about to drop the `_PoolMembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_PoolMembers" DROP CONSTRAINT "_PoolMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PoolMembers" DROP CONSTRAINT "_PoolMembers_B_fkey";

-- DropTable
DROP TABLE "public"."_PoolMembers";

-- AddForeignKey
ALTER TABLE "pool_members" ADD CONSTRAINT "pool_members_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "pools"("pool_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pool_members" ADD CONSTRAINT "pool_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
