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
      <h2 className="text-xl">Metadata</h2>
      <ul className="ml-4 list-disc list-inside">
        <li>Date taken: {photo.dateTaken.toLocaleString()}</li>
        {photo.metaCamera && <li>Camera model: {photo.metaCamera}</li>}
        {photo.metaLens && <li>Lens model: {photo.metaLens}</li>}
        {photo.metaFocalLength && (
          <li>Focal length: {photo.metaFocalLength} mm</li>
        )}
        {photo.metaShutterSpeed && (
          <li>
            Shutter speed:{" "}
            {photo.metaShutterSpeed < 1
              ? `1/${1 / photo.metaShutterSpeed}`
              : photo.metaShutterSpeed}{" "}
            s
          </li>
        )}
        {photo.metaAperture && <li>Aperture: f/{photo.metaAperture}</li>}
        {photo.metaISO && <li>ISO: {photo.metaISO}</li>}
      </ul>
      <h2 className="text-xl">Picture</h2>
      <Image src={getImageUrl(photo.id)} width="800" height="600" alt="" />
    </main>
  );
}
