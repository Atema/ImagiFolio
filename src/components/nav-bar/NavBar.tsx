import Link from "next/link";
import Menu from "../basic/Menu";

export type NavBarProps = {
  userName: string;
};

export default function NavBar({ userName }: NavBarProps) {
  return (
    <>
      <div className="w-full py-4 border-b border-gray-dim mb-8">
        <nav className="2xl:container 2xl:mx-auto px-2 md:px-4 flex flex-row">
          <div className="flex-grow">
            <Link href="/">ImagiFolio</Link>
          </div>

          <Menu
            trigger={<button className="focus:outline-0">{userName}</button>}
          >
            {/* TODO: Re-add when have settings page
            <Link href="/settings">Settings</Link>
            --- 
            */}
            <Link href="/logout">Sign out</Link>
          </Menu>
        </nav>
      </div>
    </>
  );
}
