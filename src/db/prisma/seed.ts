import { generate } from "random-words";
import prisma from "./client";

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
    albums.map(({ id: albumId }) =>
      prisma.picture.createMany({
        data: Array.from(Array(100), () => ({
          albumId,
        })),
      })
    )
  );
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
