"use server";

import prisma from "@/db/prisma/client";
import { redirect } from "next/navigation";
import { SuccessErrorFormAction } from "../utils/actions/action-state";

export const deletePhoto: SuccessErrorFormAction = async (_, data) => {
  // FIXME: Validate data

  const id = data.get("id") as string;
  const albumId = data.get("albumId") as string;

  try {
    await prisma.photo.delete({
      where: {
        id,
        albumId,
      },
    });
  } catch (e: unknown) {
    return {
      error: "The photo could not be deleted",
    };
  }

  redirect(`/album/${albumId}`);
};
