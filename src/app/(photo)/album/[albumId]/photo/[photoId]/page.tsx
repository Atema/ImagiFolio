import PhotoView from "@/components/photo/PhotoView";
import { getPhoto } from "@/db/photo";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Photo - ImagiFolio",
};

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
      <PhotoView
        photo={photo}
        backHref={`/album/${photo.albumId}`}
        prevHref={prevPhoto && `/album/${photo.albumId}/photo/${prevPhoto.id}`}
        nextHref={nextPhoto && `/album/${photo.albumId}/photo/${nextPhoto.id}`}
      />
    </main>
  );
}
