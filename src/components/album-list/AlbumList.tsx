import { Album, Photo } from "@/db/prisma/generated";
import cx from "@/utils/class-names/cx";
import dateRangeString from "@/utils/date-time/dateRangeString";
import { getImageUrl } from "@/utils/images/image-url";
import Image from "next/image";
import Link from "next/link";

export type AlbumListProps = {
  showDates: boolean;
  albums: (Album & { photos: Photo[] })[];
};

export default function AlbumList({ showDates, albums }: AlbumListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {albums.map((album) => (
        <Link key={album.id} href={`/album/${album.id}`}>
          <div className="group text-sm">
            <div
              className={cx(
                "aspect-4/3 relative group-hover:brightness-90 rounded-xl",
                "bg-plum-4 dark:bg-plumdark-4"
              )}
            >
              {album.photos[0] && (
                <Image
                  src={getImageUrl(album.photos[0].id)}
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
                      "short"
                    )
                  : "No photos"}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
