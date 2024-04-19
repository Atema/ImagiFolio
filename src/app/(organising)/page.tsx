import AlbumList from "@/components/album-list/AlbumList";
import prisma from "@/db/prisma/client";

async function getAlbums() {
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
}

export default async function HomePage() {
  const albums = await getAlbums();

  return (
    <>
      <h1 className="text-3xl mb-4">Albums</h1>
      <AlbumList showDates albums={albums} />
    </>
  );
}
