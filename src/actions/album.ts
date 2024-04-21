"use server";

import prisma from "@/db/prisma/client";
import { getSession } from "./session";
import { redirect } from "next/navigation";

export const addAlbum = async (data: FormData) => {
  // FIXME: Add validation
  const name = data.get("name") as string;
  console.log(name);

  const session = await getSession();
  const userId = session?.userId as string;

  const { id } = await prisma.album.create({
    data: {
      name,
      ownerId: userId,
    },
  });

  redirect(`/album/${id}`);
};
