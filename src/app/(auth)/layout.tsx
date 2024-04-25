import LoginForm from "@/components/login/LoginForm";
import { FC, ReactNode } from "react";

type AuthGroupLayoutProps = {
  children: ReactNode;
};

const AuthGroupLayout: FC<AuthGroupLayoutProps> = ({ children }) => (
  <main className="2xl:container mx-auto px-2 md:px-4 mt-16">
    <div className="sm:w-96 sm:mx-auto">
      <LoginForm />
    </div>
    {children}
  </main>
);

export default AuthGroupLayout;
