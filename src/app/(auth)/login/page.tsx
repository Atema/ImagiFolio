import { AppPage } from "@/app/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in - ImagiFolio",
};

/**
 * Empty login page to make the route available
 */
const LoginPage: AppPage = () => null;

export default LoginPage;
