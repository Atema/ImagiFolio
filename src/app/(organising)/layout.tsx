import { getSession } from "@/actions/session";
import Menu from "@/components/basic/Menu";
import { getUser } from "@/db/user";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AppLayout } from "../types";

/**
 * Takes the user-id from the session and retrieves the user from the database
 * 
 * @returns The active user
 */
const getCurrentUser = async () => {
  const userId = (await getSession())?.userId;
  if (!userId) redirect("/login");

  const user = await getUser(userId);
  if (!user) redirect("/logout");

  return user;
};

/**
 * Layout for the organising group (overviews of photos and albums).
 * Renders a navigation bar and containerises its children as the main layout
 * 
 * @component
 * @param props - See {@link AppLayout}
 */
const OrganisingGroupLayout: AppLayout = async ({ children }) => (
  <>
    <div className="w-full py-4 border-b border-gray-dim mb-8">
      <nav className="2xl:container 2xl:mx-auto px-2 md:px-4 flex flex-row">
        <div className="flex-grow">
          <Link href="/">ImagiFolio</Link>
        </div>

        <Menu
          trigger={
            <button className="focus:outline-0">
              {(await getCurrentUser()).displayName}
            </button>
          }
        >
          {/* TODO: Re-add when have settings page
        <Link href="/settings">Settings</Link>
        ---
        */}
          <Link href="/logout">Sign out</Link>
        </Menu>
      </nav>
    </div>
    <main className="2xl:container mx-auto px-2 md:px-4">{children}</main>
  </>
);

export default OrganisingGroupLayout;
