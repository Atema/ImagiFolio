/*
  Warnings:

  - You are about to drop the column `metaAperture` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `metaCamera` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `metaFocal` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `metaISO` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `metaLens` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `metaShutter` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "metaAperture",
DROP COLUMN "metaCamera",
DROP COLUMN "metaFocal",
DROP COLUMN "metaISO",
DROP COLUMN "metaLens",
DROP COLUMN "metaShutter",
ADD COLUMN     "aperture" DOUBLE PRECISION,
ADD COLUMN     "camera" TEXT,
ADD COLUMN     "focal" DOUBLE PRECISION,
ADD COLUMN     "iso" DOUBLE PRECISION,
ADD COLUMN     "lens" TEXT,
ADD COLUMN     "shutter" DOUBLE PRECISION;
