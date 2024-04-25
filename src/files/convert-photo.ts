import prisma from "@/db/prisma/client";
import exif from "exif-reader";
import { randomUUID } from "node:crypto";
import { copyFile, mkdir, rename, unlink } from "node:fs/promises";
import { dirname } from "node:path";
import sharp, { Sharp } from "sharp";
import { FileVariation, getFilePath, getUploadPath } from "./file-paths";

const photoVariations: [FileVariation, (img: Sharp) => Sharp][] = [
  ["preview", (img) => img.resize(2500, 2500, { fit: "inside" })],
  ["thumbnail", (img) => img.resize(400, 300, { fit: "cover" })],
  ["blur", (img) => img.resize(25, 25, { fit: "inside" })],
  ["thumbblur", (img) => img.resize(20, 15, { fit: "cover" })],
];

const convertPhotoVariations = async (imageIn: Sharp, id: string) => {
  const image = imageIn.rotate().jpeg({ progressive: true });

  try {
    await Promise.all(
      photoVariations.map(async ([variation, convert]) => {
        const path = getFilePath(variation, id);
        await mkdir(dirname(path), { recursive: true });
        return await convert(image.clone()).toFile(path);
      }),
    );
  } catch (e) {
    await Promise.all(
      photoVariations.map(([variation]) =>
        unlink(getFilePath(variation, id)).catch(() => {}),
      ),
    );
    throw e;
  }
};

const allowedTypes = ["jpeg", "png", "webp", "tiff", "gif", "heif"];

export const processPhoto = async (albumId: string, uploadPath: string) => {
  try {
    const id = randomUUID();
    const image = sharp(uploadPath);
    const metadata = await image.metadata();

    if (!metadata.format || !allowedTypes.includes(metadata.format))
      throw new Error("Format not allowed");

    await convertPhotoVariations(image, id);
    const exifdata = metadata.exif && exif(metadata.exif);
    const { dominant } = await image.stats();

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
        format: metadata.format,
        width: metadata.width!,
        height: metadata.height!,
        dateTaken:
          exifdata?.Photo?.DateTimeOriginal ||
          exifdata?.Photo?.DateTimeDigitized ||
          exifdata?.Image?.DateTime ||
          exifdata?.Image?.DateTimeOriginal ||
          new Date(),
        color: (dominant.r << 16) + (dominant.g << 8) + dominant.b,
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

    await rename(uploadPath, getFilePath("original", id));
  } catch (err) {
    await unlink(uploadPath);
    throw err;
  }
};

export const copyAndProcessPhoto = async (albumId: string, path: string) => {
  const uploadPath = getUploadPath();
  await mkdir(dirname(uploadPath), { recursive: true });
  await copyFile(path, uploadPath);
  await processPhoto(albumId, uploadPath);
};
