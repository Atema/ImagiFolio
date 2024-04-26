import { AppPage, MetadataGenerator } from "@/app/types";
import AlbumSettingsDialog from "@/components/album/AlbumSettingsDialog";
import HoverIcon from "@/components/basic/HoverIcon";
import PhotoList from "@/components/photo-list/PhotoList";
import { getAlbum } from "@/db/album";
import dateRangeString from "@/utils/friendly-text/date-range";
import { UploadIcon } from "@radix-ui/react-icons";
import { notFound } from "next/navigation";

type AlbumPageParams = {
  albumId: string;
};

export const generateMetadata: MetadataGenerator<AlbumPageParams> = async ({
  params,
}) => ({
  title: `${((await getAlbum(params.albumId)) ?? notFound()).name} - ImagiFolio`,
});

const AlbumPage: AppPage<AlbumPageParams> = async ({ params }) => {
  const album = (await getAlbum(params.albumId)) ?? notFound();

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
        </div>
        <HoverIcon>
          <UploadIcon className="size-8" />
        </HoverIcon>
        <AlbumSettingsDialog album={album} />
      </div>
      <PhotoList baseUrl={`/album/${album.id}`} photos={album.photos} />
    </>
  );
};

export default AlbumPage;
