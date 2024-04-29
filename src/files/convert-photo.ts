import prisma from "@/db/prisma/client";
import exif from "exif-reader";
import { randomUUID } from "node:crypto";
import { copyFile, link, mkdir, rename, symlink, unlink } from "node:fs/promises";
import { dirname } from "node:path";
import sharp, { Sharp } from "sharp";
import { FileVariation, getFilePath, getUploadPath } from "./file-paths";

// eslint-disable-next-line jsdoc/require-param, jsdoc/require-returns
/** Variations of the input photo to create with {@link sharp} */
const photoVariations: [FileVariation, (img: Sharp) => Sharp][] = [
  ["preview", (img) => img.resize(2500, 2500, { fit: "inside" })],
  ["thumbnail", (img) => img.resize(400, 300, { fit: "cover" })],
];

/**
 * Create resized variations of an image, based on the variations specified in
 * {@link photoVariations}
 *
 * @param imageIn - Input image to create variations of
 * @param id - Id of the image
 */
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

/**
 * Combines a make and model for a camera or lens into a single string, ensuring
 * the make is not duplicated
 *
 * @param make - Optional make (brand)
 * @param model - Optinal model
 * @returns Combined string of make and model
 */
const makeModel = (make?: string, model?: string) => {
  if (!make || !model) return make || model;
  if (model.startsWith(make)) return model;
  return `${make} ${model}`;
};

/**
 * Parses a coordinate from the exif data into decimal format
 *
 * @param degrees - Degrees, minutes and seconds of the coordinate
 * @param ref - Direction of the coordinate (N/E/S/W)
 * @returns Coordinates in decimal format
 */
const parseCoord = (degrees?: number[], ref?: string) => {
  if (!ref || !degrees || degrees.length < 3) return null;

  return (
    (ref == "S" || ref == "W" ? -1 : 1) *
    (degrees[0] + degrees[1] / 60 + degrees[2] / 3600)
  );
};

/** Photo types allowed as input format, as detected by {@link sharp} */
const allowedTypes = ["jpeg", "png", "webp", "tiff", "gif", "heif"];

/**
 * Processes an input photo by reading its metadata, converting it into
 * variations, and adding it to the database
 *
 * @param albumId - Id of the album to add the photo to
 * @param uploadPath - Path where the input photo was uploaded
 * @param filename - Original filename of the photo
 */
export const processPhoto = async (
  albumId: string,
  uploadPath: string,
  filename?: string,
) => {
  try {
    const id = randomUUID();
    const image = sharp(uploadPath);
    const metadata = await image.metadata();

    if (!metadata.format || !allowedTypes.includes(metadata.format))
      throw new Error("Format not allowed");

    await convertPhotoVariations(image, id);
    const exifdata = metadata.exif && exif(metadata.exif);
    const { dominant } = await image.stats();

    await prisma.photo.create({
      data: {
        id,
        albumId,
        filename,
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
        camera: makeModel(exifdata?.Image?.Make, exifdata?.Image?.Model),
        lens: makeModel(exifdata?.Photo?.LensMake, exifdata?.Photo?.LensModel),
        focal: exifdata?.Photo?.FocalLength,
        shutter: exifdata?.Photo?.ExposureTime,
        aperture: exifdata?.Photo?.FNumber,
        iso: exifdata?.Photo?.ISOSpeedRatings,
        lat: parseCoord(
          exifdata?.GPSInfo?.GPSLatitude,
          exifdata?.GPSInfo?.GPSLatitudeRef,
        ),
        long: parseCoord(
          exifdata?.GPSInfo?.GPSLongitude,
          exifdata?.GPSInfo?.GPSLongitudeRef,
        ),
      },
    });

    await rename(uploadPath, getFilePath("original", id));
  } catch (err) {
    await unlink(uploadPath);
    throw err;
  }
};

/**
 * Takes an external photo file as an upload before processing it with
 * {@link processPhoto}
 *
 * @param albumId - Id of the album to add the photo to
 * @param path - Path of the image to copy
 * @param takeType - Whether to hardlink, symlink, rename or copy the file
 * @param filename - Original filename of the photo
 */
export const takeAndProcessPhoto = async (
  albumId: string,
  path: string,
  takeType: "hardlink" | "symlink" | "rename" | "copy",
  filename?: string,
) => {
  const uploadPath = getUploadPath();
  await mkdir(dirname(uploadPath), { recursive: true });

  switch (takeType) {
    case "hardlink":
      await link(path, uploadPath);
      break;

    case "symlink":
      await symlink(path, uploadPath);
      break;

    case "rename":
      await rename(path, uploadPath);
      break;

    case "copy":
      await copyFile(path, uploadPath);
      break;
  }
  await processPhoto(albumId, uploadPath, filename);
};
