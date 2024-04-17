import Link from "next/link";
import prisma from "@/db/prisma";
import { notFound } from "next/navigation";

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
    </main>
  );
}
