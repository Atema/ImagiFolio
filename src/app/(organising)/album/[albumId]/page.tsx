import PhotoList from "@/components/photo-list/PhotoList";
import prisma from "@/db/prisma/client";
import dateRangeString from "@/utils/date-time/dateRangeString";
import { Metadata } from "next";
import { notFound } from "next/navigation";

async function getAlbum(id: string) {
  const album = await prisma.album.findUnique({
    where: { id },
    include: { photos: { orderBy: { dateTaken: "asc" } } },
  });

  if (!album) return notFound();

  return album;
}

type AlbumPageProps = {
  params: {
    albumId: string;
  };
};

export async function generateMetadata({
  params: { albumId },
}: AlbumPageProps): Promise<Metadata> {
  const album = await getAlbum(albumId);

  if (!album) return notFound();

  return {
    title: `${album.name} - ImagiFolio`,
  };
}

export default async function AlbumPage({
  params: { albumId },
}: AlbumPageProps) {
  const album = await getAlbum(albumId);

  return (
    <>
      <p className="text-sm">
        {dateRangeString(
          album.photos[0].dateTaken,
          album.photos[album.photos.length - 1].dateTaken,
          "long"
        )}
      </p>
      <h1 className="text-3xl mb-4">{album.name}</h1>
      <PhotoList baseUrl={`/album/${albumId}`} photos={album.photos} />
    </>
  );
}
