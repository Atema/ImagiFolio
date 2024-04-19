import { Photo } from "@/db/prisma/generated";
import { getImageUrl } from "@/utils/images/image-url";
import Image from "next/image";
import Link from "next/link";

export type PhotoListProps = {
  baseUrl: string;
  photos: Photo[];
};

export default function PhotoList(props: PhotoListProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {props.photos.map((pic) => (
        <Link key={pic.id} href={`${props.baseUrl}/photo/${pic.id}`}>
          <div className="aspect-4/3 relative hover:brightness-90">
            <Image
              src={getImageUrl(pic.id)}
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
