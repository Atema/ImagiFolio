import Link from "next/link";
import prisma from "@/db/prisma/client";
import { deleteSession } from "@/actions/session";
import { redirect } from "next/navigation";
import AlbumList from "@/components/album-list/AlbumList";

async function logoutUser() {
  "use server";
  deleteSession();
  redirect("/login");
}

async function getAlbums() {
  return await prisma.album.findMany({ include: { pictures: { take: 1 } } });
}

export default async function HomePage() {
  const albums = await getAlbums();

  return (
    <main className="2xl:container mx-auto px-2 md:px-4">
      <h1 className="text-4xl">Albums</h1>
      <form action={logoutUser}>
        <button type="submit">Log out</button>
      </form>
      <AlbumList albums={albums} />
    </main>
  );
}
