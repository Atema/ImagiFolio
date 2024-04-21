import { getPhoto } from "@/db/photo";
import { getImageUrl } from "@/utils/images/image-url";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PhotoPageProps = {
  params: {
    albumId: string;
    photoId: string;
  };
};

export async function generateMetadata({
  params: { albumId, photoId },
}: PhotoPageProps) {
  const { photo } = (await getPhoto(photoId, albumId)) ?? notFound();

  return {
    title: `${photo.album.name} - ImagiFolio`,
  };
}

export default async function PhotoPage({
  params: { albumId, photoId },
}: PhotoPageProps) {
  const { photo, prevPhoto, nextPhoto } =
    (await getPhoto(photoId, albumId)) ?? notFound();

  return (
    <main>
      <Link href={`/album/${photo.albumId}`}>Go back to album</Link>
      <h1>Photo: {photo.id}</h1>
      <p>Date taken: {photo.dateTaken.toLocaleString()}</p>
      <Image src={getImageUrl(photo.id)} width="800" height="600" alt="" />
      <p>
        <span>Previous: </span>
        {prevPhoto ? (
          <Link href={`/album/${photo.albumId}/photo/${prevPhoto.id}`}>
            {prevPhoto.id}
          </Link>
        ) : (
          "None"
        )}
      </p>
      <p>
        <span>Next: </span>
        {nextPhoto ? (
          <Link href={`/album/${photo.albumId}/photo/${nextPhoto.id}`}>
            {nextPhoto.id}
          </Link>
        ) : (
          "None"
        )}
      </p>
    </main>
  );
}
