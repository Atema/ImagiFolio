import LoginForm from "@/components/login/LoginForm";
import { NextPage } from "next";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: NextPage<AuthLayoutProps> = ({ children }) => (
  <main className="2xl:container mx-auto px-2 md:px-4 mt-16">
    <div className="sm:w-96 sm:mx-auto">
      <LoginForm />
    </div>
    {children}
  </main>
);

export default AuthLayout;