"use client";

import { loginUser, signupUser } from "@/actions/auth";
import { useAction } from "@/utils/actions/use-action";
import Link from "next/link";
import { FC } from "react";
import Button from "../basic/Button";
import InputField from "../basic/InputField";

type LoginFormProps = {
  signup?: boolean;
};

/**
 * Shows a login or signup form to the user
 *
 * @component
 * @param props - See {@link LoginFormProps}
 */
const LoginForm: FC<LoginFormProps> = ({ signup }) => {
  const { error, action, pending, reset } = useAction(
    signup ? signupUser : loginUser,
  );

  return (
    <form action={action} className="space-y-6">
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
          onClick={reset}
        >
          {signup ? "Sign in" : "Sign up"}
        </Link>{" "}
        instead.
      </div>
    </form>
  );
};

export default LoginForm;
