-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "metaAperture" DOUBLE PRECISION,
ADD COLUMN     "metaCamera" TEXT,
ADD COLUMN     "metaFocalLength" DOUBLE PRECISION,
ADD COLUMN     "metaISO" DOUBLE PRECISION,
ADD COLUMN     "metaLens" TEXT,
ADD COLUMN     "metaShutterSpeed" DOUBLE PRECISION;
