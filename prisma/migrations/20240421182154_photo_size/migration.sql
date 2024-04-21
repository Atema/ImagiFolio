/*
  Warnings:

  - Added the required column `height` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL;
