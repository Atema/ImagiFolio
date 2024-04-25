import { yeet } from "../errors/yeet";

type EnvKey =
  | "SESSION_SECRET"
  | "DATABASE_URL"
  | "IMAGE_DIR"
  | "IMAGE_DIR_ORIGINALS"
  | "IMAGE_DIR_PREVIEWS"
  | "IMAGE_DIR_THUMBNAILS";

export const getEnv = (key: EnvKey) =>
  process.env[key] || yeet(`Missing environment variable '${key}'`);

export const getFirstEnv = (...keys: EnvKey[]) =>
  process.env[
    keys.find((key) => process.env[key]) ||
      yeet(`Missing environment variable '${keys.join("' or '")}'`)
  ] as string;
