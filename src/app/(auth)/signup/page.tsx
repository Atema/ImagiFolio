import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Register - ImagiFolio",
};

/**
 * Empty registration page to make the route available
 */
const SignupPage: FC<{}> = () => null;

export default SignupPage;
