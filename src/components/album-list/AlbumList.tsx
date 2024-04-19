import { Album, Photo } from "@/db/prisma/generated";
import { getImageUrl } from "@/utils/images/image-url";
import Image from "next/image";
import Link from "next/link";

export type AlbumListProps = {
  albums: (Album & { photos: Photo[] })[];
};

export default function AlbumList(props: AlbumListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {props.albums.map((album) => (
        <Link key={album.id} href={`/album/${album.id}`}>
          <div className="aspect-4/3 relative hover:brightness-90">
            <Image
              src={getImageUrl(album.photos[0].id)}
              unoptimized
              fill
              alt=""
              className="object-cover rounded-xl shadow"
            />
          </div>
          {album.name}
        </Link>
      ))}
    </div>
  );
}
