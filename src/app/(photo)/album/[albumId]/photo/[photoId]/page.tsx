import PhotoView from "@/components/photo/PhotoView";
import { getPhoto } from "@/db/photo";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Photo - ImagiFolio",
};

type PhotoPageProps = {
  params: {
    albumId: string;
    photoId: string;
  };
};

const PhotoPage: FC<PhotoPageProps> = async ({ params }) => {
  const { photo, prevPhoto, nextPhoto } =
    (await getPhoto(params.photoId, params.albumId)) ?? notFound();

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
};

export default PhotoPage;
