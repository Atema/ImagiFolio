import Link from "next/link";
import prisma from "@/db/prisma/client";

export default async function HomePage() {
  const albums = await prisma.album.findMany();

  return (
    <main>
      <h1>Albums</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link href={`/album/${album.id}`}>{album.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
