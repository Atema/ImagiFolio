import { getSession } from "@/actions/session";
import { getUser } from "@/db/user";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";
import Menu, { MenuItem, MenuSeparator } from "../basic/Menu";
import LogoutButton from "./LogoutButton";
import PasswordChangeDialog from "./PasswordChangeDialog";
import ProfileSettingsDialog from "./ProfileSettingsDialog";

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
 * Component for the user menu shown in navigation bars
 *
 * @component
 */
const UserMenu: FC = async () => {
  const user = await getCurrentUser();

  return (
    <Menu
      trigger={<button className="focus:outline-0">{user.displayName}</button>}
    >
      {user.role == "admin" && (
        <>
          <MenuItem>
            <Link href="/admin">Administration</Link>
          </MenuItem>
          <MenuSeparator />
        </>
      )}

      <MenuItem noCloseOnSelect>
        <ProfileSettingsDialog user={user} />
      </MenuItem>
      <MenuItem noCloseOnSelect>
        <PasswordChangeDialog user={user} />
      </MenuItem>

      <MenuSeparator />

      <MenuItem>
        <LogoutButton />
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
