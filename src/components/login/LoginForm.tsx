"use client";

import { loginUser } from "@/actions/auth";
import { useAction } from "@/actions/types";
import Link from "next/link";
import Button from "../basic/Button";
import InputField from "../basic/InputField";
import { useSelectedLayoutSegment } from "next/navigation";

export type LoginFormProps = {};

export default function LoginForm({}: LoginFormProps) {
  const signup = useSelectedLayoutSegment() === "signup";
  let { error, action, pending, resetError } = useAction(loginUser);

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="signup" value={+signup} />
      <h1 className="text-3xl">{signup ? "Register" : "Log in"}</h1>
      <InputField
        name="email"
        type="email"
        label="Email address"
        placeholder="joe-bloggs@example.com"
        required
      />
      {signup && (
        <InputField
          name="displayName"
          type="text"
          label="Display name"
          placeholder="Joe Bloggs"
          required
        />
      )}
      <InputField
        name="password"
        type="password"
        label="Password"
        placeholder="••••••••••"
        required
        minLength={8}
      />
      {signup && (
        <InputField
          name="password2"
          type="password"
          label="Password (confirm)"
          placeholder="••••••••••"
          required
          minLength={8}
        />
      )}
      {error && <p className="text-sm leading-6 text-red-dim">{error}</p>}
      <Button
        styleType="primary"
        type="submit"
        label={signup ? "Sign up" : "Sign in"}
        disabled={pending}
        className="w-full"
      />
      <div className="text-sm">
        {signup ? "Already a member? " : "Not a member yet? "}
        <Link
          href={signup ? "/login" : "/signup"}
          className="text-plum-11 dark:text-plumdark-11"
          onClick={resetError}
        >
          {signup ? "Sign in" : "Sign up"}
        </Link>{" "}
        instead.
      </div>
    </form>
  );
}
