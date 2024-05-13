"use server";

import prisma from "@/db/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SuccessErrorFormAction } from "./common";
import { getSession } from "./session";

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

export const updateAlbum: SuccessErrorFormAction = async (_, data) => {
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

export const deleteAlbum: SuccessErrorFormAction = async (_, data) => {
  // FIXME: Add validation
  const id = data.get("id") as string;

  try {
    await prisma.album.delete({
      where: { id },
    });
  } catch (e) {
    console.error(e);
    return {
      error: "The album could not be deleted",
    };
  }

  redirect("/");
};
