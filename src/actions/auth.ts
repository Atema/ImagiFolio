"use server";

import { checkUserLogin } from "@/db/user";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { createSession, deleteSession } from "./session";
import { SuccessErrorFormAction } from "./types";

const loginUserSchema = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string()),
});

export const loginUser: SuccessErrorFormAction = async (_, data) => {
  const parsed = await loginUserSchema.safeParseAsync(data);
  if (!parsed.success)
    return {
      error: "The entered data is invalid",
      fullError: parsed.error.message,
    };

  const id = await checkUserLogin(parsed.data.email, parsed.data.password);
  if (!id) return { error: "The email address or password is incorrect" };


  await createSession({ userId: id });
  redirect("/");
};

export async function logoutUser(): Promise<never> {
  await deleteSession();
  redirect("/login");
}
