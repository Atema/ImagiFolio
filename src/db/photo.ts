import prisma from "./prisma/client";

export async function getPhoto(photoId: string, albumId: string) {
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
}
