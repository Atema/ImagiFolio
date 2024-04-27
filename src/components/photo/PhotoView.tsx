"use client";

import { deletePhoto } from "@/actions/photo";
import { Photo } from "@/db/prisma/generated";
import cx from "@/utils/class-names/cx";
import {
  ArrowLeftIcon,
  DotsVerticalIcon,
  DownloadIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import ConfirmationBox from "../basic/ConfirmationBox";
import HoverIcon from "../basic/HoverIcon";
import Menu from "../basic/Menu";
import { usePhotoInfoOpen } from "../context/GlobalStateProvider";
import PhotoInfo from "./PhotoInfo";
import PhotoNavigation from "./PhotoNavigation";

type PhotoViewProps = {
  /** The photo to show */
  photo: Photo;

  /** URL to the previous picture */
  prevHref?: string | null;

  /** URL to the next picture */
  nextHref?: string | null;
};

/**
 * View to show a photo, metadata and navigation to adjacent photos
 *
 * @component
 * @param props - See {@link PhotoViewProps}.
 */
const PhotoView: FC<PhotoViewProps> = ({ photo, prevHref, nextHref }) => {
  const [infoOpen, setInfoOpen] = usePhotoInfoOpen();

  return (
    <div className="h-screen flex flex-row">
      <div className="flex-grow flex flex-col">
        <div
          className={cx(
            "bg-black text-white flex-grow relative",
            infoOpen && "hidden sm:block",
          )}
        >
          <div
            className={cx(
              "absolute z-20 w-full p-4 space-x-6 flex items-center justify-end",
              "bg-gradient-to-b from-blacka-6 to-transparent",
            )}
          >
            <HoverIcon white>
              <Link href={{ pathname: "..", hash: photo.id }}>
                <ArrowLeftIcon className="size-8" />
              </Link>
            </HoverIcon>
            <div className="flex-grow" />
            <HoverIcon white>
              <button onClick={() => setInfoOpen(!infoOpen)}>
                <InfoCircledIcon className="size-8" />
              </button>
            </HoverIcon>
            <HoverIcon white>
              <a href={`/image/${photo.id}/original`} target="_blank" download>
                <DownloadIcon className="size-8" />
              </a>
            </HoverIcon>
            <Menu
              trigger={
                <HoverIcon white>
                  <button>
                    <DotsVerticalIcon className="size-8" />
                  </button>
                </HoverIcon>
              }
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
            priority
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
