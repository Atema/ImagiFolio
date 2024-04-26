import { AppPage } from "@/app/types";
import PhotoView from "@/components/photo/PhotoView";
import { getPhotoInAlbum } from "@/db/photo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Photo - ImagiFolio",
};

type PhotoPageParams = {
  albumId: string;
  photoId: string;
};

const PhotoPage: AppPage<PhotoPageParams> = async ({ params }) => {
  const { photo, prevPhoto, nextPhoto } =
    (await getPhotoInAlbum(params.photoId, params.albumId)) ?? notFound();

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
