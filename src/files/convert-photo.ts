import prisma from "@/db/prisma/client";
import exif from "exif-reader";
import { randomUUID } from "node:crypto";
import { copyFile, mkdir, rename } from "node:fs/promises";
import { dirname } from "node:path";
import sharp, { Sharp } from "sharp";
import { FileVariation, getFilePath, getUploadPath } from "./file-paths";

const convertPhotoVariation = async (
  variation: FileVariation,
  id: string,
  image: Sharp
) => {
  const path = getFilePath(variation, id);
  await mkdir(dirname(path), { recursive: true });
  return image.toFile(path);
};

const convertPhotoVariations = (image: Sharp, id: string) =>
  Promise.all([
    convertPhotoVariation(
      "preview",
      id,
      image.clone().resize(2500, 2500, { fit: "inside" })
    ),
    convertPhotoVariation(
      "thumbnail",
      id,
      image.clone().resize(400, 300, { fit: "cover" })
    ),
    convertPhotoVariation(
      "blur",
      id,
      image.clone().resize(25, 25, { fit: "inside" })
    ),
    convertPhotoVariation(
      "thumbnail-blur",
      id,
      image.clone().resize(20, 15, { fit: "cover" })
    ),
  ]);

export const processPhoto = async (albumId: string, uploadPath: string) => {
  const id = randomUUID();
  const image = sharp(uploadPath);
  await convertPhotoVariations(image, id);
  const metadata = await image.metadata();
  const exifdata = metadata.exif && exif(metadata.exif);
  await rename(uploadPath, getFilePath("original", id));

  const exifLat = exifdata?.GPSInfo?.GPSLatitude;
  const exifLatRef = exifdata?.GPSInfo?.GPSLatitudeRef;
  const exifLong = exifdata?.GPSInfo?.GPSLongitude;
  const exifLongRef = exifdata?.GPSInfo?.GPSLongitudeRef;
  let lat = null,
    long = null;

  if (exifLat && exifLatRef && exifLong && exifLongRef) {
    lat =
      (exifLatRef == "S" ? -1 : 1) *
      (exifLat[0] + exifLat[1] / 60 + exifLat[2] / 3600);

    long =
      (exifLongRef == "W" ? -1 : 1) *
      (exifLong[0] + exifLong[1] / 60 + exifLong[2] / 3600);
  }

  await prisma.photo.create({
    data: {
      id,
      albumId,
      dateTaken:
        exifdata?.Photo?.DateTimeOriginal ||
        exifdata?.Photo?.DateTimeDigitized ||
        exifdata?.Image?.DateTime ||
        exifdata?.Image?.DateTimeOriginal ||
        new Date(),
      width: metadata.width!,
      height: metadata.height!,
      camera: exifdata?.Image?.Model,
      lens: exifdata?.Photo?.LensModel,
      focal: exifdata?.Photo?.FocalLength,
      shutter: exifdata?.Photo?.ExposureTime,
      aperture: exifdata?.Photo?.FNumber,
      iso: exifdata?.Photo?.ISOSpeedRatings,
      lat,
      long,
    },
  });
};

export const copyAndProcessPhoto = async (albumId: string, path: string) => {
  const uploadPath = getUploadPath();
  await mkdir(dirname(uploadPath), { recursive: true });
  await copyFile(path, uploadPath);
  await processPhoto(albumId, uploadPath);
};
