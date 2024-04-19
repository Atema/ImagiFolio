"use server";

import { checkUserLogin } from "@/db/user";
import { redirect } from "next/navigation";
import { createSession } from "./session";
import { z } from "zod";
import { zfd } from "zod-form-data";

const loginUserSchema = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string({ description: "Password" })),
});

export type LoginFormState = Partial<
  z.inferFlattenedErrors<typeof loginUserSchema>
>;

export async function loginUser(
  _: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const parsed = await loginUserSchema.safeParseAsync(formData);
  if (!parsed.success) return parsed.error.flatten() as LoginFormState;

  const { email, password } = parsed.data;

  const id = await checkUserLogin(email, password);
  if (!id)
    return {
      formErrors: ["The email address or password is incorrect"],
      fieldErrors: {},
    };

  await createSession({ userId: id });
  return redirect("/");
}
