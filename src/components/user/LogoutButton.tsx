"use client";

import { logoutUser } from "@/actions/auth";
import { ButtonHTMLAttributes, forwardRef } from "react";

/**
 * Button that logs out the user when pressed
 *
 * @component
 * @param props - Props and ref will be forwarded to the underlying button
 * element
 */
const LogoutButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
  <button {...props} ref={ref} onClick={async () => await logoutUser()}>
    Sign out
  </button>
));

LogoutButton.displayName = "LogoutButton";

export default LogoutButton;
