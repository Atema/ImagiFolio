import PhotoList from "@/components/photo-list/PhotoList";
import prisma from "@/db/prisma/client";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getAlbum(id: string) {
  return await prisma.album.findUnique({
    where: { id },
    include: { photos: { orderBy: { dateTaken: "desc" } } },
  });
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

  if (!album) return notFound();

  return (
    <main className="2xl:container mx-auto px-2 md:px-4">
      <Link href="/">Go back to home</Link>
      <h1 className="text-4xl">Album: {album.name}</h1>
      <PhotoList baseUrl={`/album/${albumId}`} photos={album.photos} />
    </main>
  );
}
