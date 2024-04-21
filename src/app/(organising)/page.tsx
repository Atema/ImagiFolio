import AlbumList from "@/components/album-list/AlbumList";
import { getAlbumList } from "@/db/album";

export default async function HomePage() {
  const albums = await getAlbumList();

  return (
    <>
      <h1 className="text-3xl mb-4">Albums</h1>
      <AlbumList showDates albums={albums} />
    </>
  );
}
