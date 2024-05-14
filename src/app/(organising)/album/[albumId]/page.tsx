import { checkSession } from "@/actions/session";
import { AppPage, MetadataGenerator } from "@/app/types";
import AlbumSettingsDialog from "@/components/album/AlbumSettingsDialog";
import UploadDialog from "@/components/album/upload-dialog/UploadDialog";
import PhotoList from "@/components/photo-list/PhotoList";
import { getAlbum } from "@/db/album";
import { checkAlbumPermission } from "@/db/permissions";
import dateRangeString from "@/utils/friendly-text/date-range";
import { notFound } from "next/navigation";
import { cache } from "react";

const getData = cache(async (albumId: string) => {
  const userId = await checkSession();
  (await checkAlbumPermission(userId, albumId)) || notFound();
  return (await getAlbum(albumId)) || notFound();
});

type AlbumPageParams = {
  albumId: string;
};

export const generateMetadata: MetadataGenerator<AlbumPageParams> = async ({
  params,
}) => ({
  title: `${(await getData(params.albumId)).name} - ImagiFolio`,
});

const AlbumPage: AppPage<AlbumPageParams> = async ({ params }) => {
  const album = await getData(params.albumId);

  return (
    <>
      <div className="flex flex-row items-center mb-4 space-x-6 pr-2">
        <div className="flex-grow">
          {album.photos[0] && (
            <p className="text-sm text-gray-dim">
              {dateRangeString(
                album.photos[0].dateTaken,
                album.photos[album.photos.length - 1].dateTaken,
                "long",
              )}
            </p>
          )}
          <h1 className="text-3xl">{album.name}</h1>
          <p className="text-sm text-gray-dim">{album.photos.length} photos</p>
        </div>
        <UploadDialog album={album} />
        <AlbumSettingsDialog album={album} />
      </div>
      <PhotoList baseUrl={`/album/${album.id}`} photos={album.photos} />
    </>
  );
};

export default AlbumPage;
