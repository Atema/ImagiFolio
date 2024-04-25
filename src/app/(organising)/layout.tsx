import { getSession } from "@/actions/session";
import NavBar from "@/components/nav-bar/NavBar";
import { getUser } from "@/db/user";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

const getCurrentUser = async () => {
  const userId = (await getSession())?.userId;
  if (!userId) redirect("/login");

  const user = await getUser(userId);
  if (!user) redirect("/logout");

  return user;
};

type OrganisingGroupLayoutProps = {
  children: ReactNode;
};

const OrganisingGroupLayout: FC<OrganisingGroupLayoutProps> = async ({
  children,
}) => (
  <>
    <NavBar userName={(await getCurrentUser()).displayName} />
    <main className="2xl:container mx-auto px-2 md:px-4">{children}</main>
  </>
);

export default OrganisingGroupLayout;
