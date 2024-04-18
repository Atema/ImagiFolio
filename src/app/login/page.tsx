import { checkUserLogin } from "@/db/user";
import { redirect } from "next/navigation";

async function authenticateUser(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const id = await checkUserLogin(email, password);

  if (id) return redirect("/");
}

export default async function LoginPage() {
  return (
    <main>
      <form action={authenticateUser}>
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button type="submit">Log in</button>
      </form>
    </main>
  );
}
