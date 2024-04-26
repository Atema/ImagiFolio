import prisma from "./prisma/client";

/**
 * Retrieves a photo in an album from the database, as well as its surrounding
 * photos
 *
 * @param photoId - The id of the photo to retrieve
 * @param albumId - The id of the photo's album
 * @returns The select, previous and next photo.
 */
export const getPhotoInAlbum = async (photoId: string, albumId: string) => {
  const [photo, prevPhoto, nextPhoto] = await Promise.all([
    prisma.photo.findUnique({
      where: { id: photoId, albumId },
      include: { album: true },
    }),
    prisma.photo.findFirst({
      select: { id: true },
      where: { albumId },
      orderBy: { dateTaken: "desc" },
      cursor: {
        id: photoId,
      },
      skip: 1,
    }),
    prisma.photo.findFirst({
      select: { id: true },
      where: { albumId },
      orderBy: { dateTaken: "asc" },
      cursor: {
        id: photoId,
      },
      skip: 1,
    }),
  ]);

  if (!photo) return null;

  return { photo, prevPhoto, nextPhoto };
};
