import Link from "next/link";
import prisma from "@/db/prisma/client";
import { deleteSession } from "@/actions/session";
import { redirect } from "next/navigation";

async function logoutUser() {
  "use server";
  deleteSession();
  redirect("/login");
}

export default async function HomePage() {
  const albums = await prisma.album.findMany();

  return (
    <main className="2xl:container mx-auto px-2 md:px-4">
      <h1 className="text-4xl">Albums</h1>
      <form action={logoutUser}>
        <button type="submit">Log out</button>
      </form>
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
