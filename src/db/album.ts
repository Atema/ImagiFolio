import prisma from "./prisma/client";

export const getAlbum = async (id: string) =>
  await prisma.album.findUnique({
    where: { id },
    include: { photos: { orderBy: { dateTaken: "asc" } } },
  });

export const getAlbumList = async () => {
  const [albums, lastPhotos] = await Promise.all([
    prisma.album.findMany({
      orderBy: { name: "asc" },
      include: { photos: { orderBy: { dateTaken: "asc" }, take: 1 } },
    }),
    prisma.album.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        photos: {
          orderBy: { dateTaken: "desc" },
          take: 1,
        },
      },
    }),
  ]);

  return albums.map((album, i) => ({
    ...album,
    photos: [...album.photos, ...lastPhotos[i].photos],
  }));
};
