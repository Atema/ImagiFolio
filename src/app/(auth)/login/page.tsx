import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Log in - ImagiFolio",
};

/**
 * Empty login page to make the route available
 */
const LoginPage: FC<{}> = () => null;

export default LoginPage;
