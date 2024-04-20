"use client";

import { logoutUser } from "@/actions/auth";

export type UserMenuProps = {
  displayName: string;
};

const UserMenu: React.FC<UserMenuProps> = ({ displayName }) => {
  return (
    <form action={logoutUser}>
      <button type="submit">{displayName}</button>
    </form>
  );
};

export default UserMenu;
