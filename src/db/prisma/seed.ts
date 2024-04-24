import { copyAndProcessPhoto } from "@/files/convert-photo";
import { readdir } from "node:fs/promises";
import { hashPassword } from "../user";
import prisma from "./client";
import { join } from "node:path";

const seedDir = process.env.SEED_IMAGE_DIR;
if (!seedDir) process.exit();

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
    })
  )
);

for (const album of albums) {
  const seedImages = (
    await readdir(join(seedDir, album.name), { withFileTypes: true })
  )
    .filter((entry) => entry.isFile)
    .map((entry) => join(entry.path, entry.name));

  await Promise.all(
    seedImages.map((image) => copyAndProcessPhoto(album.id, image))
  );
}
