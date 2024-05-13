import { AppPage } from "@/app/types";
import LoginForm from "@/components/login/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - ImagiFolio",
};

/**
 * Page with a registration form
 *
 * @component
 */
const SignupPage: AppPage = () => <LoginForm signup />;

export default SignupPage;
