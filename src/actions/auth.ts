"use server";

import { checkUserLogin, createUser } from "@/db/user";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { SuccessErrorFormAction } from "../utils/actions/action-state";
import { createSession, deleteSession } from "./session";

const loginUserSchema = zfd.formData({
  email: zfd.text(z.string({ required_error: "email address is required" })),
  password: zfd.text(z.string({ required_error: "password is required" })),
});

export const loginUser: SuccessErrorFormAction = async (_, formData) => {
  const { data, error } = loginUserSchema.safeParse(formData);

  if (error)
    return {
      error: `The entered data is invalid: ${error.issues[0].message}`,
    };

  const userId = await checkUserLogin(data.email, data.password);
  if (!userId) return { error: "The email address or password is incorrect" };

  await createSession({ userId });
  redirect("/");
};

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

export const signupUser: SuccessErrorFormAction = async (_, formData) => {
  const { data, error } = signupUserSchema.safeParse(formData);

  if (error)
    return {
      error: `The entered data is invalid: ${error.issues[0].message}`,
    };

  const userId = await createUser(data.email, data.displayName, data.password);
  if (!userId) return { error: "Could not create a new user" };

  await createSession({ userId });
  redirect("/");
};

export const logoutUser = async (): Promise<never> => {
  await deleteSession();
  redirect("/login");
};
