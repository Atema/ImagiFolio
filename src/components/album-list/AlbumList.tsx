import { Album, Photo } from "@/db/prisma/generated";
import cx from "@/utils/class-names/cx";
import dateRangeString from "@/utils/date-time/dateRangeString";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export type AlbumListProps = {
  /** Whether to show date ranges in the list */
  showDates: boolean;

  /** The albums to show, with their first and last photos included (if any) */
  albums: (Album & { photos: Photo[] })[];
};

/**
 * Displays a styled list of photo albums
 * @component
 * @param props See {@link AlbumListProps}.
 */
const AlbumList: FC<AlbumListProps> = ({ showDates, albums }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
    {albums.map((album) => (
      <Link key={album.id} href={`/album/${album.id}`}>
        <div className="group text-sm">
          <div
            className={cx(
              "aspect-4/3 relative group-hover:brightness-90 rounded-xl",
              "bg-plum-4 dark:bg-plumdark-4 shadow-md",
            )}
            style={
              album.photos[0] && {
                backgroundColor: `#${album.photos[0].color.toString(16).padStart(6, "0")}`,
              }
            }
          >
            {album.photos[0] && (
              <Image
                src={`/image/${album.photos[0].id}/thumbnail`}
                unoptimized
                fill
                alt=""
                className="object-cover rounded-xl"
              />
            )}
          </div>
          <div className="mt-2">{album.name}</div>
          {showDates && (
            <div className="text-gray-dim">
              {album.photos.length > 0
                ? dateRangeString(
                    album.photos[0].dateTaken,
                    album.photos[album.photos.length - 1].dateTaken,
                    "short",
                  )
                : "No photos"}
            </div>
          )}
        </div>
      </Link>
    ))}
  </div>
);

export default AlbumList;
