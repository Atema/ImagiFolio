import { deleteSession, getSession } from "@/actions/session";
import NavBar from "@/components/nav-bar/NavBar";
import { getUser } from "@/db/user";
import { redirect } from "next/navigation";

async function getCurrentUser() {
  const userId = (await getSession())?.userId;
  if (!userId) redirect("/login");

  const user = await getUser(userId);
  if (!user) redirect("/logout");

  return user;
}

type OrganisingLayoutProps = {
  children: React.ReactNode;
};

export default async function OrganisingLayout({
  children,
}: OrganisingLayoutProps) {
  return (
    <>
      <NavBar userName={(await getCurrentUser()).displayName} />
      <main className="2xl:container mx-auto px-2 md:px-4">{children}</main>
    </>
  );
}
