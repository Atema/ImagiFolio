import LoginForm from "@/components/login/LoginForm";

export default async function LoginPage() {
  return (
    <main className="2xl:container mx-auto px-2 md:px-4 mt-16">
      <div className="sm:w-96 sm:mx-auto">
        <LoginForm />
      </div>
    </main>
  );
}
