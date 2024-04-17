/*
  Warnings:

  - You are about to drop the `AlbumPermission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AlbumPermission" DROP CONSTRAINT "AlbumPermission_albumId_fkey";

-- DropForeignKey
ALTER TABLE "AlbumPermission" DROP CONSTRAINT "AlbumPermission_userId_fkey";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "ownerId" UUID NOT NULL;

-- DropTable
DROP TABLE "AlbumPermission";

-- DropEnum
DROP TYPE "AlbumPermissionType";

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
