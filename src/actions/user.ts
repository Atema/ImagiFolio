"use server";

import { checkUserPassword, updateUser, updateUserPassword } from "@/db/user";
import { revalidatePath } from "next/cache";
import { zfd } from "zod-form-data";
import {
  schemaEmail,
  schemaMinLength,
  schemaRequired,
  schemaUuid,
  validateSchemaFormAction,
} from "./common";

const changePasswordSchema = zfd
  .formData({
    id: schemaUuid("Hidden unique id"),
    passCurr: schemaRequired("Current password"),
    passNew: schemaMinLength("New password", 8),
    passNew2: schemaRequired("Password confirmation"),
  })
  .refine(async (data) => await checkUserPassword(data.id, data.passCurr), {
    message: "Current password is incorrect",
  })
  .refine((data) => data.passNew === data.passNew2, {
    message: "Password confirmation does not match",
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
  id: schemaUuid("Hidden unique id"),
  displayName: schemaMinLength("Display name", 5),
  email: schemaEmail("Email address"),
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
