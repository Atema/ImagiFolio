import { AppPage } from "@/app/types";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Register - ImagiFolio",
};

/**
 * Empty registration page to make the route available
 */
const SignupPage: AppPage = () => null;

export default SignupPage;
