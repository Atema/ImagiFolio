import { deleteSession } from "@/actions/session";
import Link from "next/link";
import { redirect } from "next/navigation";

async function logoutUser() {
  "use server";
  deleteSession();
  redirect("/login");
}

type OrganisingLayoutProps = {
  children: React.ReactNode;
};

export default async function OrganisingLayout({
  children,
}: OrganisingLayoutProps) {
  return (
    <>
      <div className="w-full py-4 border-b border-neutral-200 dark:border-neutral-800 mb-8">
        <nav className="2xl:container 2xl:mx-auto px-2 md:px-4 flex flex-row">
          <div className="flex-grow">
            <Link href="/">ImagiFolio</Link>
          </div>
          <form action={logoutUser} className="">
            <button type="submit">Log out</button>
          </form>
        </nav>
      </div>
      <main className="2xl:container mx-auto px-2 md:px-4">{children}</main>
    </>
  );
}
