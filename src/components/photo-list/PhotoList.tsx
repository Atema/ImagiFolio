import { Photo } from "@/db/prisma/generated";
import Image from "next/image";
import Link from "next/link";

export type PhotoListProps = {
  baseUrl: string;
  photos: Photo[];
};

export default function PhotoList(props: PhotoListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
      {props.photos.map((pic) => (
        <Link key={pic.id} href={`${props.baseUrl}/photo/${pic.id}`}>
          <div className="aspect-4/3 relative hover:brightness-90 shadow-md">
            <Image
              src={`/image/${pic.id}/thumbnail`}
              placeholder="blur"
              blurDataURL={`/image/${pic.id}/thumbnail-blur`}
              unoptimized
              fill
              alt=""
              className="object-cover"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
