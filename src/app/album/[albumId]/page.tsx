import Link from "next/link";
import prisma from "@/db/prisma/client";
import { notFound } from "next/navigation";

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
    <main>
      <Link href="/">Go back to home</Link>
      <h1>Album: {album.name}</h1>
      <h2>Pictures:</h2>
      <ul>
        {album.pictures.map((pic) => (
          <li key={pic.id}>
            <Link href={`/album/${albumId}/photo/${pic.id}`}>{pic.id}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
