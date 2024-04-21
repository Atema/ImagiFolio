import { randomInt } from "node:crypto";
import { generate } from "random-words";
import prisma from "./client";
import { Prisma } from "./generated";

function randomFrom<T>(arr: T[]) {
  return arr[randomInt(arr.length)];
}

const cameras = ["Canon EOS 80D", "Sony a660", "Xiaomi Mi 8", null];
const lenses = [
  "Canon EF-S 17-55mm f/2.8",
  "Sigma 105mm DG Macro HSM f/2.8",
  null,
];
const focalLengths = [17, 22.4, 38.5, null];
const isos = [100, 200, 400, 800, null];
const apertures = [2.8, 4.5, 7.1, null];
const shutterSpeeds = [1, 0.00625, 0.00025, null];

async function main() {
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
    minLength: 3,
    maxLength: 7,
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

  await Promise.all(
    albums.map(({ id: albumId }) => {
      const startStamp = randomInt(Date.now());
      const duration = randomInt(1000 * 3600 * 24 * 70);

      return prisma.photo.createMany({
        data: Array.from(
          Array(100),
          () =>
            ({
              albumId,
              dateTaken: new Date(startStamp + randomInt(duration)),
              metaCamera: randomFrom(cameras),
              metaLens: randomFrom(lenses),
              metaFocalLength: randomFrom(focalLengths),
              metaShutterSpeed: randomFrom(shutterSpeeds),
              metaAperture: randomFrom(apertures),
              metaISO: randomFrom(isos),
            }) satisfies Prisma.PhotoCreateManyInput
        ),
      });
    })
  );
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
