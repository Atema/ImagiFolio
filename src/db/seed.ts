import { PrismaClient } from "./generated";
const prisma = new PrismaClient();
import { generate } from "random-words";

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "atema",
      displayName: "Martijn Atema",
      email: "martijn@atema.one",
      password: "atema",
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
