"use client";

import { deletePhoto } from "@/actions/photo";
import { usePhotoInfoOpen } from "@/context/PhotoInfoOpen";
import { Photo } from "@/db/prisma/generated";
import cx from "@/utils/class-names/cx";
import {
  ArrowLeftIcon,
  DotsVerticalIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import ConfirmationBox from "../basic/ConfirmationBox";
import HoverIcon from "../basic/HoverIcon";
import Menu from "../basic/Menu";
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
    <div className="h-screen flex flex-row">
      <div className="flex-grow flex flex-col">
        <div className="bg-black text-white flex-grow relative">
          <div
            className={cx(
              "absolute z-20 w-full p-4 space-x-6 flex items-center justify-end",
              "bg-gradient-to-b from-blacka-6 to-transparent"
            )}
          >
            <HoverIcon white>
              <Link href={backHref}>
                <ArrowLeftIcon className="size-8" />
              </Link>
            </HoverIcon>
            <div className="flex-grow" />
            <HoverIcon white>
              <button onClick={() => setInfoOpen(!infoOpen)} className="block">
                <InfoCircledIcon className="size-8" />
              </button>
            </HoverIcon>
            <Menu
              trigger={
                <button>
                  <DotsVerticalIcon className="size-8" />
                </button>
              }
              hoverIconTrigger="white"
            >
              <ConfirmationBox
                trigger={<button>Delete photo</button>}
                title="Are you sure?"
                description="The photo will be deleted permanently. This cannot be undone."
                confirmText="Yes, delete"
                action={deletePhoto}
                hiddenFormData={{
                  id: photo.id,
                  albumId: photo.albumId,
                }}
              />
            </Menu>
          </div>
          <PhotoNavigation prevHref={prevHref} nextHref={nextHref} />
          <Image
            src={`/image/${photo.id}/preview`}
            placeholder="blur"
            blurDataURL={`/image/${photo.id}/blur`}
            unoptimized
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
