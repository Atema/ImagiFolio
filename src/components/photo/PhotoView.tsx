"use client";

import { usePhotoInfoOpen } from "@/context/PhotoInfoOpen";
import { Photo } from "@/db/prisma/generated";
import { getImageUrl } from "@/utils/images/image-url";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import PhotoInfo from "./PhotoInfo";

type PhotoViewProps = {
  photo: Photo;
  backHref: string;
  prevHref?: string | null;
  nextHref?: string | null;
};

const PhotoView: FC<PhotoViewProps> = ({
  photo,
  backHref,
  prevHref,
  nextHref,
}) => {
  const [infoOpen, setInfoOpen] = usePhotoInfoOpen();

  return (
    <div className="h-screen flex flex-row">
      <div className="flex-grow flex flex-col">
        <div className="space-x-8">
          <Link href={backHref}>Back</Link>
          {prevHref && <Link href={prevHref}>Previous</Link>}
          {nextHref && <Link href={nextHref}>Next</Link>}
          <button onClick={() => setInfoOpen(!infoOpen)}>Info</button>
        </div>
        <div className="bg-black flex-grow relative">
          <Image
            src={getImageUrl(photo.id)}
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
      {infoOpen && <PhotoInfo photo={photo} />}
    </div>
  );
};

export default PhotoView;
