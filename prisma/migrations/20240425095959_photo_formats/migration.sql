/*
  Warnings:

  - Added the required column `format` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "format" TEXT NOT NULL;
