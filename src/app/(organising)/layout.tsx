import UserMenu from "@/components/user/UserMenu";
import Link from "next/link";
import { AppLayout } from "../types";

/**
 * Layout for the organising group (overviews of photos and albums).
 * Renders a navigation bar and containerises its children as the main layout
 *
 * @component
 * @param props - See {@link AppLayout}
 */
const OrganisingGroupLayout: AppLayout = async ({ children }) => {
  return (
    <>
      <div className="w-full py-4 border-b border-gray-dim mb-8">
        <nav className="2xl:container 2xl:mx-auto px-2 md:px-4 flex flex-row">
          <div className="flex-grow">
            <Link href="/">ImagiFolio</Link>
          </div>

          <UserMenu />
        </nav>
      </div>
      <main className="2xl:container mx-auto px-2 md:px-4">{children}</main>
    </>
  );
};

export default OrganisingGroupLayout;
