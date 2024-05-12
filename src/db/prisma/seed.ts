import { takeAndProcessPhoto } from "@/files/convert-photo";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { hashPassword } from "../user";
import prisma from "./client";

const seedDir = process.env.SEED_IMAGE_DIR;
if (!seedDir) process.exit();

const seedType =
  process.env.SEED_TYPE == "hardlink"
    ? "hardlink"
    : process.env.SEED_TYPE == "symlink"
      ? "symlink"
      : process.env.SEED_TYPE == "rename"
        ? "rename"
        : "copy";

const admin = await prisma.user.create({
  data: {
    email: "admin@example.com",
    displayName: "Admin user",
    password: await hashPassword("admin admin"),
  },
});

const seedAlbums = (await readdir(seedDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory)
  .map((entry) => entry.name);

const albums = await Promise.all(
  seedAlbums.map((name) =>
    prisma.album.create({
      data: {
        name,
        ownerId: admin.id,
      },
    }),
  ),
);

for (const album of albums) {
  console.info(`Seed - converting: ${album.name}`);
  
  const seedImages = (
    await readdir(join(seedDir, album.name), { withFileTypes: true })
  )
    .filter((entry) => entry.isFile)
    .map((entry) => entry.name);

  await Promise.all(
    seedImages.map((image) =>
      takeAndProcessPhoto(
        album.id,
        join(seedDir, album.name, image),
        seedType,
        image,
      ),
    ),
  );
}
