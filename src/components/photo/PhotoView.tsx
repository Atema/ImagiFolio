"use client";

import { usePhotoInfoOpen } from "@/context/PhotoInfoOpen";
import { Photo } from "@/db/prisma/generated";
import cx from "@/utils/class-names/cx";
import { getImageUrl } from "@/utils/images/image-url";
import {
  ArrowLeftIcon,
  DotsVerticalIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import PhotoInfo from "./PhotoInfo";
import PhotoNavigation from "./PhotoNavigation";

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
    <div className="h-screen flex flex-row" onKeyUp={(e) => console.dir(e)}>
      <div className="flex-grow flex flex-col">
        <div className="bg-black text-white flex-grow relative">
          <div
            className={cx(
              "absolute z-20 w-full p-4 space-x-6 flex items-center justify-end",
              "bg-gradient-to-b from-black/40 to-transparent"
            )}
          >
            <Link href={backHref}>
              <ArrowLeftIcon className="size-8" />
            </Link>
            <div className="flex-grow" />
            <button onClick={() => setInfoOpen(!infoOpen)}>
              <InfoCircledIcon className="size-8" />
            </button>
            <DotsVerticalIcon className="size-8 peer" />
          </div>
          <PhotoNavigation prevHref={prevHref} nextHref={nextHref} />
          <Image
            src={getImageUrl(photo.id)}
            alt="Photo"
            fill
            className="object-contain"
          />
        </div>
      </div>
      {infoOpen && (
        <PhotoInfo photo={photo} onClose={() => setInfoOpen(false)} />
      )}
    </div>
  );
};

export default PhotoView;
