import PhotoList from "@/components/photo-list/PhotoList";
import { getAlbum } from "@/db/album";
import dateRangeString from "@/utils/date-time/dateRangeString";
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
      <p className="text-sm">
        {dateRangeString(
          album.photos[0].dateTaken,
          album.photos[album.photos.length - 1].dateTaken,
          "long"
        )}
      </p>
      <h1 className="text-3xl mb-4">{album.name}</h1>
      <PhotoList baseUrl={`/album/${albumId}`} photos={album.photos} />
    </>
  );
}
