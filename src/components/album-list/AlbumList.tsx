import { Album, Photo } from "@/db/prisma/generated";
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
            <div className="aspect-4/3 relative group-hover:brightness-90">
              <Image
                src={getImageUrl(album.photos[0].id)}
                unoptimized
                fill
                alt=""
                className="object-cover rounded-xl shadow"
              />
            </div>
            <div className="mt-2">{album.name}</div>
            {showDates && (
              <div className="text-neutral-400 dark:text-neutral-500">
                {album.photos.length > 0 &&
                  dateRangeString(
                    album.photos[0].dateTaken,
                    album.photos[album.photos.length - 1].dateTaken,
                    "short"
                  )}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
