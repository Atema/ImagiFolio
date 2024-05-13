import { AppPage } from "@/app/types";
import LoginForm from "@/components/login/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in - ImagiFolio",
};

/**
 * Page with a login form
 *
 * @component
 */
const LoginPage: AppPage = () => <LoginForm />;

export default LoginPage;
