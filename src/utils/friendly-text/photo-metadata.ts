import { Photo } from "@/db/prisma/generated";
import coordinatesString from "./degree-coordinates";

/**
 * Rewrites the metadata of a photo into friendly texts to display
 *
 * @param photo - Photo to take the metadata from
 * @returns An array of metadata items (arrays) with their name (first index)
 * and values (remainder)
 */
const friendlyPhotoMetadata = (photo: Photo) =>
  [
    [
      "Date",
      photo.dateTaken.toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      }),
    ],
    [
      "Location",
      photo.lat !== null && coordinatesString(photo.lat, "lat"),
      photo.long !== null && coordinatesString(photo.long, "long"),
    ],
    ["Camera", photo.camera],
    ["Lens", photo.lens],
    [
      "Exposure",
      photo.focal !== null && `${photo.focal} mm`,
      photo.shutter !== null &&
        (photo.shutter < 1
          ? `1/${(1 / photo.shutter).toFixed()} s`
          : `${photo.shutter} s`),
      photo.aperture !== null && `f/${photo.aperture.toFixed(1)}`,
      photo.iso !== null && `ISO ${photo.iso.toFixed(0)}`,
    ],
    [
      "Size",
      `${((photo.width * photo.height) / 1000000).toFixed(1)} MP`,
      `${photo.width} × ${photo.height}`,
    ],
    ["Original filename", photo.filename],
  ].map((arr) => arr.filter((el): el is string => typeof el == "string"));

export default friendlyPhotoMetadata;
