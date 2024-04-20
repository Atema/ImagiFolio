import Link from "next/link";
import UserMenu from "./UserMenu";

export type NavBarProps = {
  userName: string;
};

export default function NavBar({ userName }: NavBarProps) {
  return (
    <>
      <div className="w-full py-4 border-b border-neutral-200 dark:border-neutral-800 mb-8">
        <nav className="2xl:container 2xl:mx-auto px-2 md:px-4 flex flex-row">
          <div className="flex-grow">
            <Link href="/">ImagiFolio</Link>
          </div>
          <UserMenu displayName={userName} />
        </nav>
      </div>
    </>
  );
}
