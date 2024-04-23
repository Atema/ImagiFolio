"use server";

import prisma from "@/db/prisma/client";
import { getSession } from "./session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const addAlbum = async (data: FormData) => {
  // FIXME: Add validation
  const name = data.get("name") as string;

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

type UpdateAlbumFormState = {
  success?: true;
};

export const updateAlbum = async (
  state: UpdateAlbumFormState,
  data: FormData
): Promise<UpdateAlbumFormState> => {
  // FIXME: Add validation
  const id = data.get("id") as string;
  const name = data.get("name") as string;

  await prisma.album.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  revalidatePath(`/album/${id}`);

  return { success: true };
};

export const deleteAlbum = async (data: FormData) => {
  // FIXME: Add validation
  const id = data.get("id") as string;

  await prisma.album.delete({
    where: { id },
  });

  redirect("/");
};
