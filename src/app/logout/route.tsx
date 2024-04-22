import { logoutUser } from "@/actions/auth";

export const GET = async () => {
  await logoutUser();
};
