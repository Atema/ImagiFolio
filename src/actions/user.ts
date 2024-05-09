"use server";

import { checkUserPassword, updateUser, updateUserPassword } from "@/db/user";
import { SuccessErrorFormAction } from "@/utils/actions/action-state";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { uuidSchema } from "./common";
import { revalidatePath } from "next/cache";

const changePasswordSchema = zfd
  .formData({
    id: uuidSchema,
    passCurr: zfd.text(
      z.string({ required_error: "The current password is required" }),
    ),
    passNew: zfd.text(
      z.string({ required_error: "The new password is required" }).min(8, {
        message: "The new password must be at least 8 characters long",
      }),
    ),
    passNew2: zfd.text(z.string().default("")),
  })
  .refine((data) => checkUserPassword(data.id, data.passCurr), {
    message: "The current password is incorrect",
  })
  .refine((data) => data.passNew === data.passNew2, {
    message: "The password confirmation does not match",
  });

export const changePassword: SuccessErrorFormAction = async (_, formData) => {
  const { data, error } = await changePasswordSchema.safeParseAsync(formData);

  if (error) {
    return {
      error: error.issues[0].message,
    };
  }

  const updateResult = await updateUserPassword(data.id, data.passNew);

  if (!updateResult) {
    return {
      error: "An unexpected error occurred: the password could not be updated",
    };
  }

  return { success: true };
};

const changeUserProfileSchema = zfd.formData({
  id: uuidSchema,
  displayName: zfd.text(
    z
      .string({ required_error: "The name is required" })
      .min(5, { message: "The name must be at least 5 characters long" }),
  ),
  email: zfd.text(
    z
      .string({ required_error: "The email is required" })
      .email({ message: "The email does not have a valid format" }),
  ),
});

export const changeUserProfile: SuccessErrorFormAction = async (
  _,
  formData,
) => {
  const { data, error } =
    await changeUserProfileSchema.safeParseAsync(formData);

  if (error) {
    return {
      error: error.issues[0].message,
    };
  }

  const updateResult = await updateUser(data.id, {
    displayName: data.displayName,
    email: data.email,
  });

  if (!updateResult) {
    return {
      error: "An unexpected error occurred: the user could not be updated",
    };
  }

  revalidatePath("/");

  return { success: true };
};
