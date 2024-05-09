"use client";

import { loginUser } from "@/actions/auth";
import Button from "@/components/basic/Button";
import InputField from "@/components/basic/InputField";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { AppLayout } from "../types";
import { useAction } from "@/utils/actions/action-state";

/**
 * Layout for the auth routing group.
 * Renders a log in or sign up form, depending on the current route.
 * 
 * @component
 * @param props - See {@link AppLayout}
 */
const AuthGroupLayout: AppLayout = ({ children }) => {
  const signup = useSelectedLayoutSegment() === "signup";
  const { error, action, pending, reset } = useAction(loginUser);

  return (
    <main className="2xl:container mx-auto px-2 md:px-4 mt-16">
      <div className="sm:w-96 sm:mx-auto">
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
              onClick={reset}
            >
              {signup ? "Sign in" : "Sign up"}
            </Link>{" "}
            instead.
          </div>
        </form>
      </div>
      {children}
    </main>
  );
};

export default AuthGroupLayout;
