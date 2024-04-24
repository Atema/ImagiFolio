import { randomUUID } from "node:crypto";
import { join } from "node:path";

export type FileOriginal = "original";
export type FileVariation = "preview" | "thumbnail" | "blur" | "thumbnail-blur";

const fileVariationPaths: {
  [key in FileVariation]: { env: string; suffix: string };
} = {
  preview: {
    env: process.env.IMAGE_DIR_PREVIEWS!,
    suffix: "-preview.jpg",
  },
  thumbnail: {
    env: process.env.IMAGE_DIR_THUMBNAILS!,
    suffix: "-thumbnail.jpg",
  },
  blur: {
    env: process.env.IMAGE_DIR_THUMBNAILS!,
    suffix: "-blur.jpg",
  },
  "thumbnail-blur": {
    env: process.env.IMAGE_DIR_THUMBNAILS!,
    suffix: "-thumbnail-blur.jpg",
  },
};

export const getFilePath = (type: FileOriginal | FileVariation, id: string) => {
  if (type === "original")
    return join(process.env.IMAGE_DIR_ORIGINALS!, id + ".jpg");

  const pathProps = fileVariationPaths[type];
  if (!pathProps) throw new Error("Invalid variation");

  return join(pathProps.env, id + pathProps.suffix);
};

export const getUploadPath = () =>
  join(process.env.IMAGE_DIR_ORIGINALS!, "uploads", randomUUID());
