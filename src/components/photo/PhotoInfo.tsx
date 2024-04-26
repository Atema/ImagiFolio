import { Photo } from "@/db/prisma/generated";
import coordinatesString from "@/utils/friendly-text/degree-coordinates";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FC, ReactNode } from "react";
import HoverIcon from "../basic/HoverIcon";

type PhotoInfoItemProps = {
  /** The label of the metadata item */
  name: string;

  /** The value or values to show beneath the label */
  children: ReactNode;
};

/**
 * A combination of label and values to show in the info list
 *
 * @component
 * @param props - See {@link PhotoInfoItemProps}.
 */
const PhotoInfoItem: FC<PhotoInfoItemProps> = ({ name, children }) => (
  <div>
    <div className="text-gray-dim">{name}</div>
    <div className="space-x-4">{children}</div>
  </div>
);

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

    <PhotoInfoItem name="Date">
      {photo.dateTaken.toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      })}
    </PhotoInfoItem>
    {photo.lat && photo.long && (
      <PhotoInfoItem name="Location">
        <span>{coordinatesString(photo.lat, "lat")}</span>
        <span>{coordinatesString(photo.long, "long")}</span>
      </PhotoInfoItem>
    )}
    {photo.camera && (
      <PhotoInfoItem name="Camera">{photo.camera}</PhotoInfoItem>
    )}
    {photo.lens && <PhotoInfoItem name="Lens">{photo.lens}</PhotoInfoItem>}
    {(photo.focal || photo.shutter || photo.aperture || photo.iso) && (
      <PhotoInfoItem name="Exposure">
        {photo.focal !== null && <span>{photo.focal} mm</span>}
        {photo.shutter !== null &&
          (photo.shutter < 1 ? (
            <span>1/{1 / photo.shutter} s</span>
          ) : (
            <span>{photo.shutter} s</span>
          ))}
        {photo.aperture !== null && <span>f/{photo.aperture}</span>}
        {photo.iso !== null && <span>ISO {photo.iso}</span>}
      </PhotoInfoItem>
    )}
    <PhotoInfoItem name="Size">
      <span>{((photo.width * photo.height) / 1000000).toFixed(1)} MP</span>
      <span>
        {photo.width} × {photo.height}
      </span>
    </PhotoInfoItem>
    {photo.filename && (
      <PhotoInfoItem name="Original filename">{photo.filename}</PhotoInfoItem>
    )}
  </div>
);

export default PhotoInfo;
