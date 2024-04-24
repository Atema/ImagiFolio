import { copyAndProcessPhoto } from "@/files/convert-photo";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { generate } from "random-words";
import prisma from "./client";

const seedDir = process.env.SEED_IMAGE_DIR;
if (!seedDir) process.exit();
const seedImages = (await readdir(seedDir)).map((name) => join(seedDir, name));

const user = await prisma.user.create({
  data: {
    email: "martijn@atema.one",
    displayName: "Martijn Atema",
    password: Buffer.from(
      "002a8c129aa8e605bdd19bdbb2eb8cb0326f4c51c38545b900df4277df5a910211f8b5bc2c9c05623d1f980cdb11108796ed5d68e0a99d9ea2e5da5c43a08c1290ec89246ea953a9c0219b7cba8cdcae93",
      "hex"
    ),
  },
});

const albumNames = generate({
  exactly: 10,
  minLength: 4,
  maxLength: 10,
  wordsPerString: 3,
  formatter: (word, idx) =>
    idx === 0 ? word.slice(0, 1).toUpperCase().concat(word.slice(1)) : word,
}) as string[];

const albums = await Promise.all(
  albumNames.map((name) =>
    prisma.album.create({
      data: {
        name,
        ownerId: user.id,
      },
    })
  )
);

for (const album of albums) {
  const albumSeedImages = seedImages
    .map((image) => [image, Math.random()] as const)
    .sort(([_a, a], [_b, b]) => a - b)
    .map(([image]) => image)
    .slice(0, Math.random() * Math.min(100, seedImages.length));

  await Promise.all(
    albumSeedImages.map((image) => copyAndProcessPhoto(album.id, image))
  );
}
