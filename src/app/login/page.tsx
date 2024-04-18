import { createSession } from "@/actions/session";
import Button from "@/components/basic/Button";
import InputField from "@/components/basic/InputField";
import { checkUserLogin } from "@/db/user";
import { redirect } from "next/navigation";

async function authenticateUser(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const id = await checkUserLogin(email, password);

  if (!id) return "ERROR";

  await createSession({ userId: id });
  return redirect("/");
}

export default async function LoginPage() {
  return (
    <main className="2xl:container mx-auto px-2 md:px-4 mt-16">
      <div className="sm:w-96 sm:mx-auto">
        <form action={authenticateUser} className="space-y-6">
          <h1 className="text-3xl">Log in</h1>
          <InputField
            name="email"
            type="text"
            label="Email address"
            placeholder="user@example.com"
          />
          <InputField
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••••"
          />
          <Button style="primary" type="submit" label="Sign in" />
        </form>
      </div>
    </main>
  );
}
