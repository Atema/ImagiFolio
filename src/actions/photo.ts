"use server";

import prisma from "@/db/prisma/client";
import { redirect } from "next/navigation";

export const deletePhoto = async (data: FormData) => {
  const id = data.get("id") as string;
  const albumId = data.get("albumId") as string;

  await prisma.photo.delete({
    where: {
      id,
      albumId,
    },
  });

  redirect(`/album/${albumId}`);
};
