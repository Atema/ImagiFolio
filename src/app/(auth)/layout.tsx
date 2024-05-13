import { AppLayout } from "../types";

/**
 * Layout for the auth routing group. Ensures the form is the right size.
 *
 * @component
 * @param props - See {@link AppLayout}
 */
const AuthGroupLayout: AppLayout = ({ children }) => {
  return (
    <main className="2xl:container mx-auto px-2 md:px-4 mt-16">
      <div className="sm:w-96 sm:mx-auto">{children}</div>
    </main>
  );
};

export default AuthGroupLayout;
