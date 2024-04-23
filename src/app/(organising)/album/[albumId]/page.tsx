import AlbumSettingsDialog from "@/components/album/AlbumSettingsDialog";
import HoverIcon from "@/components/basic/HoverIcon";
import PhotoList from "@/components/photo-list/PhotoList";
import { getAlbum } from "@/db/album";
import dateRangeString from "@/utils/date-time/dateRangeString";
import { UploadIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type AlbumPageProps = {
  params: {
    albumId: string;
  };
};

export async function generateMetadata({
  params: { albumId },
}: AlbumPageProps): Promise<Metadata> {
  const album = (await getAlbum(albumId)) ?? notFound();

  return {
    title: `${album.name} - ImagiFolio`,
  };
}

export default async function AlbumPage({
  params: { albumId },
}: AlbumPageProps) {
  const album = (await getAlbum(albumId)) ?? notFound();

  return (
    <>
      <div className="flex flex-row items-center mb-4 space-x-6 pr-2">
        <div className="flex-grow">
          {album.photos[0] && (
            <p className="text-sm text-gray-dim">
              {dateRangeString(
                album.photos[0].dateTaken,
                album.photos[album.photos.length - 1].dateTaken,
                "long"
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
      <PhotoList baseUrl={`/album/${albumId}`} photos={album.photos} />
    </>
  );
}
