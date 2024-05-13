"use server";

import { checkUserLogin, createUser } from "@/db/user";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import {
  schemaEmail,
  schemaMinLength,
  schemaRequired,
  validateSchemaFormAction,
} from "./common";
import { createSession, deleteSession } from "./session";

const loginUserSchema = zfd.formData({
  email: schemaEmail("Email address"),
  password: schemaRequired("password"),
});

export const loginUser = validateSchemaFormAction(
  loginUserSchema,
  async (_, data) => {
    const userId = await checkUserLogin(data.email, data.password);
    if (!userId) throw "The email address or password is incorrect";

    await createSession({ userId });
    redirect("/");
  },
);

const signupUserSchema = zfd
  .formData({
    email: schemaEmail("Email address"),
    displayName: schemaMinLength("Display name", 5),
    password: schemaMinLength("Password", 8),
    password2: schemaRequired("Password confirmation"),
  })
  .refine((data) => data.password === data.password2, {
    message: "Password confirmation doesn't match",
  });

export const signupUser = validateSchemaFormAction(
  signupUserSchema,
  async (_, data) => {
    const userId = await createUser(
      data.email,
      data.displayName,
      data.password,
    );
    if (!userId) throw "Could not create a new user";

    await createSession({ userId });
    redirect("/");
  },
);

export const logoutUser = async (): Promise<never> => {
  await deleteSession();
  redirect("/login");
};
