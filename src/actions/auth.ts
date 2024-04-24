"use server";

import { checkUserLogin, createUser } from "@/db/user";
import { redirect } from "next/navigation";
import { ZodError, z } from "zod";
import { zfd } from "zod-form-data";
import { createSession, deleteSession } from "./session";
import { SuccessErrorFormAction } from "./types";

const emailSchema = zfd.text(
  z
    .string({ required_error: "email address is required" })
    .email({ message: "email address is incorrect" })
);

const nameSchema = zfd.text(
  z.string({ required_error: "display name is required" })
);

const passwordSchema = zfd.text(
  z
    .string({ required_error: "password is required" })
    .min(8, { message: "password must be at least 8 characters long" })
);

const loginUserSchema = zfd
  .formData({
    signup: zfd.numeric(z.literal(0).transform<false>(() => false)),
    email: emailSchema,
    password: passwordSchema,
  })
  .or(
    zfd
      .formData({
        signup: zfd.numeric(z.literal(1).transform<true>(() => true)),
        email: emailSchema,
        displayName: nameSchema,
        password: passwordSchema,
        password2: zfd.text(z.string().default("")),
      })
      .refine((data) => data.password === data.password2, {
        message: "password confirmation doesn't match",
      })
  );

export const loginUser: SuccessErrorFormAction = async (_, formData) => {
  let data: z.output<typeof loginUserSchema>;

  try {
    data = await loginUserSchema.parseAsync(formData);
  } catch (err: unknown) {
    return {
      error: `The entered data is invalid: ${(err as ZodError).issues[0].message}`,
    };
  }

  let id: string | null;

  if (data.signup) {
    id = await createUser(data.email, data.displayName, data.password);
    if (!id) return { error: "Could not create your new user" };
  } else {
    id = await checkUserLogin(data.email, data.password);
    if (!id) return { error: "The email address or password is incorrect" };
  }

  await createSession({ userId: id });
  redirect("/");
};

export async function logoutUser(): Promise<never> {
  await deleteSession();
  redirect("/login");
}
