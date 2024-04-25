import { yeet } from "@/utils/errors/yeet";
import { randomUUID } from "node:crypto";
import { join } from "node:path";

export type FileOriginal = "original";
export type FileVariation = "preview" | "thumbnail" | "blur" | "thumbblur";

const fileDir: { [key in FileOriginal | FileVariation]: string } = {
  original: process.env.IMAGE_DIR_ORIGINALS!,
  preview: process.env.IMAGE_DIR_PREVIEWS!,
  thumbnail: process.env.IMAGE_DIR_THUMBNAILS!,
  blur: process.env.IMAGE_DIR_THUMBNAILS!,
  thumbblur: process.env.IMAGE_DIR_THUMBNAILS!,
};

export const getFilePath = (type: FileOriginal | FileVariation, id: string) =>
  join(fileDir[type] || yeet("Invalid variation"), `${id}-${type}`);

export const getUploadPath = () =>
  join(process.env.IMAGE_DIR_ORIGINALS!, "uploads", randomUUID());
