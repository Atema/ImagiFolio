import AddAlbumDialog from "@/components/album-list/AddAlbumDialog";
import AlbumList from "@/components/album-list/AlbumList";
import { getAlbumList } from "@/db/album";
import { AppPage } from "../types";

const HomePage: AppPage = async () => (
  <>
    <div className="flex mb-4 items-center">
      <h1 className="flex-grow text-3xl">Albums</h1>
      <AddAlbumDialog />
    </div>
    <AlbumList showDates albums={await getAlbumList()} />
  </>
);

export default HomePage;
