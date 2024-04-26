import prisma from "./prisma/client";

/**
 * Retrieves an album from the database
 *
 * @param id - The id of the album to retrieve
 * @returns The album corresponding to the id
 */
export const getAlbum = async (id: string) =>
  await prisma.album.findUnique({
    where: { id },
    include: { photos: { orderBy: { dateTaken: "asc" } } },
  });

/**
 * Retrieves a list of all albums from the database
 *
 * @returns All albums, ordered by the data of their first photo, and including
 * the first and last photo in the album
 */
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
