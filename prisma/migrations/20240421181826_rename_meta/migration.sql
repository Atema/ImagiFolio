/*
  Warnings:

  - You are about to drop the column `metaFocalLength` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `metaShutterSpeed` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "metaFocalLength",
DROP COLUMN "metaShutterSpeed",
ADD COLUMN     "metaFocal" DOUBLE PRECISION,
ADD COLUMN     "metaShutter" DOUBLE PRECISION;
