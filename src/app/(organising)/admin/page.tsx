import { checkSession } from "@/actions/session";
import { AppPage } from "@/app/types";
import Button from "@/components/basic/Button";
import SelectField from "@/components/basic/SelectField";
import { checkAdminPermission } from "@/db/permissions";
import { DefaultRole, getDefaultRole, setDefaultRole } from "@/db/settings";
import { getUsers, updateUser } from "@/db/user";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

const getData = async () => {
  const userId = await checkSession();
  (await checkAdminPermission(userId)) || notFound();
  return await Promise.all([getUsers(), getDefaultRole()]);
};

const changeGlobalSettings = async (formdata: FormData) => {
  "use server";

  const defaultRole = formdata.get("defaultRole") as DefaultRole;

  await setDefaultRole(defaultRole);

  revalidatePath("/admin");
};

const changeUserRole = async (formdata: FormData) => {
  "use server";

  const id = formdata.get("id") as string;
  const role = formdata.get("role") as "admin" | "editor" | "viewer";

  await updateUser(id, { role });

  revalidatePath("/admin");
};

export const metadata: Metadata = {
  title: "Administration - ImagiFolio",
};

const AdminPage: AppPage = async () => {
  const [users, defaultRole] = await getData();

  return (
    <div className="space-y-16 mb-16">
      <div>
        <h1 className="text-3xl mb-4">Global settings</h1>

        <form action={changeGlobalSettings} className="space-y-4 max-w-96">
          <SelectField
            name="defaultRole"
            label="Default new user role"
            options={{
              admin: "Administrator",
              editor: "Editor",
              viewer: "Viewer",
            }}
            defaultValue={defaultRole}
          />
          <Button styleType="primary" label="Save" />
        </form>
      </div>
      <div>
        <h2 className="text-3xl mb-4">Users</h2>
        <div className="w-full overflow-x-auto">
          <table className="table-fixed text-left min-w-full text-nowrap">
            <thead className="text-sm uppercase text-gray-dim">
              <tr className="border-b border-gray-4 dark:border-graydark-4">
                <th scope="col" className="py-2 pr-8">
                  Name
                </th>
                <th scope="col" className="py-2 pr-8">
                  Email
                </th>
                <th scope="col" className="py-2 pr-8">
                  Role
                </th>
                <th scope="col" className="py-2 w-8"></th>
              </tr>
            </thead>
            <tbody className="">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-4 dark:border-graydark-4"
                >
                  <th scope="row" className="font-normal py-2 pr-8">
                    {user.displayName}

                    <form id={`user-${user.id}`} action={changeUserRole}>
                      <input type="hidden" name="id" value={user.id} />
                    </form>
                  </th>
                  <td className="py-2 pr-8 text-gray-dim">{user.email}</td>
                  <td className="py-2 pr-8">
                    <SelectField
                      name="role"
                      options={{
                        admin: "Administrator",
                        editor: "Editor",
                        viewer: "Viewer",
                      }}
                      defaultValue={user.role}
                      form={`user-${user.id}`}
                    />
                  </td>
                  <td className="py-2">
                    <Button
                      label="Save"
                      styleType="ghost"
                      form={`user-${user.id}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
