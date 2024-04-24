/*
  Warnings:

  - Added the required column `color` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "color" INTEGER NOT NULL;
