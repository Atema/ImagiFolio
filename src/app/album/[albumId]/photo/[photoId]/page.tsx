import Link from "next/link";
import prisma from "@/db/prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getImageUrl } from "@/utils/images/image-url";

async function getPhotoAndAlbum(photoId: string, albumId: string) {
  const [photo, album] = await Promise.all([
    prisma.photo.findUnique({
      where: { id: photoId },
    }),
    prisma.album.findUnique({
      where: { id: albumId },
    }),
  ]);

  if (!photo || !album) return notFound();

  return { photo, album };
}

type PhotoPageProps = {
  params: {
    albumId: string;
    photoId: string;
  };
};

export async function generateMetadata({
  params: { albumId, photoId },
}: PhotoPageProps) {
  const { photo, album } = await getPhotoAndAlbum(photoId, albumId);

  return {
    title: `${album.name} - ImagiFolio`,
  };
}

export default async function PhotoPage({
  params: { albumId, photoId },
}: PhotoPageProps) {
  const { photo, album } = await getPhotoAndAlbum(photoId, albumId);

  return (
    <main>
      <Link href={`/album/${album.id}`}>Go back to album</Link>
      <h1>Photo: {photo.id}</h1>
      <Image src={getImageUrl(photo.id)} width="800" height="600" alt="" />
    </main>
  );
}
