import { Photo } from "@/db/prisma/generated";
import { FC, ReactNode } from "react";

type PhotoInfoItemProps = {
  name: string;
  children: ReactNode;
};

const PhotoInfoItem: FC<PhotoInfoItemProps> = ({ name, children }) => (
  <div>
    <div className="text-neutral-500 dark:text-neutral-400">{name}</div>
    <div className="space-x-4">{children}</div>
  </div>
);

type PhotoInfoProps = {
  photo: Photo;
};

const coordToDeg = (num: number, type: "lat" | "long") => {
  let dir;

  if (num < 0) {
    num *= -1;
    dir = type === "lat" ? "S" : "W";
  } else {
    dir = type === "lat" ? "N" : "E";
  }

  const deg = Math.floor(num);
  const min = Math.floor((num % 1) * 60);
  const sec = (num - deg) * 3600 - min * 60;

  return `${deg}°${min}'${sec.toFixed(1)}" ${dir}`;
};

const PhotoInfo: FC<PhotoInfoProps> = ({ photo }) => {
  return (
    <>
      <div className="text-sm space-y-4 border p-4">
        <h2 className="text-2xl">Info</h2>
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
            <span>{coordToDeg(photo.lat, "lat")}</span>
            <span>{coordToDeg(photo.long, "long")}</span>
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
      </div>
    </>
  );
};

export default PhotoInfo;
