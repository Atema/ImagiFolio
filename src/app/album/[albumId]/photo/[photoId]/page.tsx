import PhotoInfo from "@/components/photo/PhotoInfo";
import { getPhoto } from "@/db/photo";
import { getImageUrl } from "@/utils/images/image-url";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { albumId, photoId },
}: PhotoPageProps) {
  const { photo } = (await getPhoto(photoId, albumId)) ?? notFound();

  return {
    title: `${photo.album.name} - ImagiFolio`,
  };
}

type PhotoPageProps = {
  params: {
    albumId: string;
    photoId: string;
  };
};

export default async function PhotoPage({
  params: { albumId, photoId },
}: PhotoPageProps) {
  const { photo, prevPhoto, nextPhoto } =
    (await getPhoto(photoId, albumId)) ?? notFound();

  return (
    <main>
      <Link href={`/album/${photo.albumId}`}>Go back to album</Link>
      <h1 className="text-3xl">Photo: {photo.id}</h1>
      <h2 className="text-xl">Navigation</h2>
      <ul className="ml-4 list-disc list-inside">
        <li>
          <span>Previous: </span>
          {prevPhoto ? (
            <Link href={`/album/${photo.albumId}/photo/${prevPhoto.id}`}>
              {prevPhoto.id}
            </Link>
          ) : (
            "None"
          )}
        </li>
        <li>
          <span>Next: </span>
          {nextPhoto ? (
            <Link href={`/album/${photo.albumId}/photo/${nextPhoto.id}`}>
              {nextPhoto.id}
            </Link>
          ) : (
            "None"
          )}
        </li>
      </ul>
      <PhotoInfo photo={photo} />
      <h2 className="text-xl">Picture</h2>
      <Image src={getImageUrl(photo.id)} width="800" height="600" alt="" />
    </main>
  );
}
