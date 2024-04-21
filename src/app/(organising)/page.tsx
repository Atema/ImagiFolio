import AddAlbumButton from "@/components/album-list/AddAlbumButton";
import AlbumList from "@/components/album-list/AlbumList";
import { getAlbumList } from "@/db/album";

export default async function HomePage() {
  const albums = await getAlbumList();

  return (
    <>
      <div className="flex mb-4">
        <h1 className="flex-grow text-3xl">Albums</h1>
        <AddAlbumButton />
      </div>
      <AlbumList showDates albums={albums} />
    </>
  );
}
