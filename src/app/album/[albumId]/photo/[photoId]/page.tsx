import Link from "next/link";
import prisma from "@/db/prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getImageUrl } from "@/utils/images/image-url";

type PhotoPageProps = {
  params: {
    albumId: string;
    photoId: string;
  };
};

export default async function PhotoPage({
  params: { albumId, photoId },
}: PhotoPageProps) {
  const album = await prisma.picture.findUnique({
    where: { id: photoId },
  });

  if (!album) return notFound();

  return (
    <main>
      <Link href={`/album/${albumId}`}>Go back to album</Link>
      <h1>Picture: {album.id}</h1>
      <Image src={getImageUrl(photoId)} width="800" height="600" alt="" />
    </main>
  );
}
