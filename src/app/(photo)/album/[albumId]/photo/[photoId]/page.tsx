import { checkSession } from "@/actions/session";
import { AppPage } from "@/app/types";
import PhotoView from "@/components/photo/PhotoView";
import { checkPhotoPermission } from "@/db/permissions";
import { getPhotoInAlbum } from "@/db/photo";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

const getData = cache(async (albumId: string, photoId: string) => {
  const userId = await checkSession();
  (await checkPhotoPermission(userId, albumId, photoId)) || notFound();
  return (await getPhotoInAlbum(photoId, albumId)) || notFound();
});

export const metadata: Metadata = {
  title: "Photo - ImagiFolio",
};

type PhotoPageParams = {
  albumId: string;
  photoId: string;
};

const PhotoPage: AppPage<PhotoPageParams> = async ({ params }) => {
  const { photo, prevPhoto, nextPhoto } = await getData(
    params.albumId,
    params.photoId,
  );

  return (
    <main>
      <PhotoView
        photo={photo}
        prevHref={prevPhoto && `/album/${photo.albumId}/photo/${prevPhoto.id}`}
        nextHref={nextPhoto && `/album/${photo.albumId}/photo/${nextPhoto.id}`}
      />
    </main>
  );
};

export default PhotoPage;
