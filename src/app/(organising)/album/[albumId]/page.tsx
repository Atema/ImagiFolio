import AlbumSettingsDialog from "@/components/album/AlbumSettingsDialog";
import HoverIcon from "@/components/basic/HoverIcon";
import PhotoList from "@/components/photo-list/PhotoList";
import { getAlbum } from "@/db/album";
import dateRangeString from "@/utils/date-time/dateRangeString";
import { UploadIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC } from "react";

type AlbumPageProps = {
  params: {
    albumId: string;
  };
};

export const generateMetadata = async ({
  params,
}: AlbumPageProps): Promise<Metadata> => {
  const album = (await getAlbum(params.albumId)) ?? notFound();

  return {
    title: `${album.name} - ImagiFolio`,
  };
};

const AlbumPage: FC<AlbumPageProps> = async ({ params }) => {
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
