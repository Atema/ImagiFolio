"use server";

import { checkUserPassword, updateUser, updateUserPassword } from "@/db/user";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { validateSchemaFormAction } from "./common";

const uuidSchema = zfd.text(
  z
    .string({
      required_error: "An unexpected error occurred: no user id found",
    })
    .uuid({
      message: "An unexpected error occurred: incorrect format of user-id.",
    }),
);

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
  .refine(async (data) => await checkUserPassword(data.id, data.passCurr), {
    message: "The current password is incorrect",
  })
  .refine((data) => data.passNew === data.passNew2, {
    message: "The password confirmation does not match",
  });

export const changePassword = validateSchemaFormAction(
  changePasswordSchema,
  async (_, data) => {
    if (!(await updateUserPassword(data.id, data.passNew)))
      throw "An unexpected error occurred: the password could not be updated";

    return { success: true };
  },
);

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

export const changeUserProfile = validateSchemaFormAction(
  changeUserProfileSchema,
  async (_, { id, displayName, email }) => {
    if (!(await updateUser(id, { displayName, email })))
      throw "An unexpected error occurred: the user could not be updated!";

    revalidatePath("/", "layout");
    return { success: true };
  },
);
