"use server";

import { checkUserLogin } from "@/db/user";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { createSession, deleteSession } from "./session";

const loginUserSchema = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string({ description: "Password" })),
});

export type LoginFormState = { num: number } & Partial<
  z.inferFlattenedErrors<typeof loginUserSchema>
>;

export async function loginUser(
  { num: count }: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const parsed = await loginUserSchema.safeParseAsync(formData);
  if (!parsed.success)
    return { num: count + 1, ...parsed.error.flatten() } as LoginFormState;

  const { email, password } = parsed.data;

  const id = await checkUserLogin(email, password);
  if (!id)
    return {
      num: count + 1,
      formErrors: ["The email address or password is incorrect"],
      fieldErrors: {},
    };

  await createSession({ userId: id });
  redirect("/");
}

export async function logoutUser(): Promise<never> {
  "use server";
  await deleteSession();
  redirect("/login");
}
