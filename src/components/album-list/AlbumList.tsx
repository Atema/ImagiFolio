import { Album, Picture } from "@/db/prisma/generated";
import { getImageUrl } from "@/utils/images/image-url";
import Image from "next/image";
import Link from "next/link";

export type AlbumListProps = {
  albums: (Album & { pictures: Picture[] })[];
};

export default function AlbumList(props: AlbumListProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {props.albums.map((album) => (
        <Link key={album.id} href={`/album/${album.id}`}>
          <div className="aspect-4/3 relative hover:brightness-90">
            <Image
              src={getImageUrl(album.pictures[0].id)}
              unoptimized
              fill
              alt=""
              className="object-cover"
            />
          </div>
          {album.name}
        </Link>
      ))}
    </div>
  );
}
