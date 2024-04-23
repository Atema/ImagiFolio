"use client";

import { loginUser } from "@/actions/auth";
import { useAction } from "@/actions/types";
import Button from "../basic/Button";
import InputField from "../basic/InputField";

export type LoginFormProps = {};

export default function LoginForm({}: LoginFormProps) {
  const { error, action, pending } = useAction(loginUser);

  return (
    <form action={action} className="space-y-6">
      <h1 className="text-3xl">Log in</h1>
      <InputField
        name="email"
        type="email"
        label="Email address"
        placeholder="user@example.com"
        required
      />
      <InputField
        name="password"
        type="password"
        label="Password"
        placeholder="••••••••••"
        required
      />
      {error && (
        <p className="text-sm leading-6 text-red-700 dark:text-red-300">
          {error}
        </p>
      )}
      <Button
        styleType="primary"
        type="submit"
        label="Sign in"
        disabled={pending}
        className="w-full"
      />
    </form>
  );
}
