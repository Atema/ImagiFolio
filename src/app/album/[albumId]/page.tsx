import Link from "next/link";
import prisma from "@/db/prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import PhotoList from "@/components/photo-list/PhotoList";

type AlbumPageProps = {
  params: {
    albumId: string;
  };
};

export default async function AlbumPage({
  params: { albumId },
}: AlbumPageProps) {
  const album = await prisma.album.findUnique({
    where: { id: albumId },
    include: {
      pictures: true,
    },
  });

  if (!album) return notFound();

  return (
    <main className="2xl:container mx-auto px-2 md:px-4">
      <Link href="/">Go back to home</Link>
      <h1 className="text-4xl">Album: {album.name}</h1>
      <PhotoList baseUrl={`/album/${albumId}`} photos={album.pictures} />
    </main>
  );
}
