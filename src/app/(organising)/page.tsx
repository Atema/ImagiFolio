import { checkSession } from "@/actions/session";
import AddAlbumDialog from "@/components/album-list/AddAlbumDialog";
import AlbumList from "@/components/album-list/AlbumList";
import { getUserAlbums } from "@/db/album";
import {
  checkCreateAlbumPermission,
  checkUserPermission,
} from "@/db/permissions";
import { notFound } from "next/navigation";
import { AppPage } from "../types";

const HomePage: AppPage = async () => {
  const userId = await checkSession();
  (await checkUserPermission(userId)) || notFound();
  const albums = await getUserAlbums(userId);
  const canCreate = await checkCreateAlbumPermission(userId);

  return (
    <>
      <div className="flex mb-4 items-center">
        <h1 className="flex-grow text-3xl">Albums</h1>
        {canCreate && <AddAlbumDialog />}
      </div>
      <AlbumList showDates albums={albums} />
    </>
  );
};

export default HomePage;
