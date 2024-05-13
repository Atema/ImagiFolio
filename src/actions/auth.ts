"use server";

import { checkUserLogin, createUser } from "@/db/user";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { validateSchemaFormAction } from "./common";
import { createSession, deleteSession } from "./session";

const loginUserSchema = zfd.formData({
  email: zfd.text(z.string({ required_error: "email address is required" })),
  password: zfd.text(z.string({ required_error: "password is required" })),
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
    email: zfd.text(
      z
        .string({ required_error: "email address is required" })
        .email({ message: "email address is incorrect" }),
    ),
    displayName: zfd.text(
      z.string({ required_error: "display name is required" }),
    ),
    password: zfd.text(
      z
        .string({ required_error: "password is required" })
        .min(8, { message: "password must be at least 8 characters long" }),
    ),
    password2: zfd.text(z.string().default("")),
  })
  .refine((data) => data.password === data.password2, {
    message: "password confirmation doesn't match",
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
