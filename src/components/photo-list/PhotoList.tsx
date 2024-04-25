import { Photo } from "@/db/prisma/generated";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export type PhotoListProps = {
  baseUrl: string;
  photos: Photo[];
};

const PhotoList: FC<PhotoListProps> = ({ baseUrl, photos }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
    {photos.map((pic) => (
      <Link key={pic.id} href={`${baseUrl}/photo/${pic.id}`}>
        <div
          className="aspect-4/3 relative hover:brightness-90 shadow-md"
          style={{
            backgroundColor: `#${pic.color.toString(16).padStart(6, "0")}`,
          }}
        >
          <Image
            src={`/image/${pic.id}/thumbnail`}
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

export default PhotoList;
