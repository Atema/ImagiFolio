import { Photo } from "@/db/prisma/generated";
import friendlyPhotoMetadata from "@/utils/friendly-text/photo-metadata";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FC } from "react";
import HoverIcon from "../basic/HoverIcon";

type PhotoInfoProps = {
  /** The photo to show the info of */
  photo: Photo;

  /** Event handler for the close button */
  onClose: () => void;
};

/**
 * Component to show a list of metadata information about a photo
 *
 * @component
 * @param props - See {@link PhotoInfoProps}.
 */
const PhotoInfo: FC<PhotoInfoProps> = ({ photo, onClose }) => (
  <div className="w-full sm:w-80 text-sm space-y-4 p-6">
    <div className="flex flex-row items-center">
      <h2 className="text-2xl flex-grow">Info</h2>

      <HoverIcon>
        <button onClick={onClose}>
          <Cross2Icon className="size-6" />
        </button>
      </HoverIcon>
    </div>

    {friendlyPhotoMetadata(photo).map(
      ([name, ...values]) =>
        values.length > 0 && (
          <div key={name}>
            <div className="text-gray-dim">{name}</div>
            <div className="space-x-4">
              {values.map((v) => (
                <span key={v}>{v}</span>
              ))}
            </div>
          </div>
        ),
    )}
  </div>
);

export default PhotoInfo;
