import { getFirstEnv } from "@/utils/environment/get-env";
import { yeet } from "@/utils/errors/yeet";
import { randomUUID } from "node:crypto";
import { join } from "node:path";

export type FileOriginal = "original";
export type FileUpload = "upload";
export type FileVariation = "preview" | "thumbnail" | "blur" | "thumbblur";

const fileDir: { [key in FileOriginal | FileUpload | FileVariation]: string } =
  {
    upload: getFirstEnv("IMAGE_DIR_ORIGINALS", "IMAGE_DIR"),
    original: getFirstEnv("IMAGE_DIR_ORIGINALS", "IMAGE_DIR"),
    preview: getFirstEnv("IMAGE_DIR_PREVIEWS", "IMAGE_DIR"),
    thumbnail: getFirstEnv("IMAGE_DIR_THUMBNAILS", "IMAGE_DIR"),
    blur: getFirstEnv("IMAGE_DIR_THUMBNAILS", "IMAGE_DIR"),
    thumbblur: getFirstEnv("IMAGE_DIR_THUMBNAILS", "IMAGE_DIR"),
  };

export const getFilePath = (
  type: FileOriginal | FileUpload | FileVariation,
  id: string
) => join(fileDir[type] || yeet("Invalid variation"), `${id}-${type}`);

export const getUploadPath = () => getFilePath("upload", randomUUID());
