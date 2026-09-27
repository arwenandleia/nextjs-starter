import "server-only";

import Link from "next/link";
import LightDarkButton from "@/components/client/LightDarkButton";
import LoginLogoutButton from "@/components/client/login/LoginLogoutButton";
import NavMenu from "@/components/client/NavMenu";
import { NavigationSheet } from "@/components/server/NavigationSheet";

const RootHeader = () => {
  return (
    <header className="w-full sticky top-0 z-50 border-b-2 py-2">
      <nav className="max-w-container flex justify-between items-center">
        <h2 className="text-primary text-lg">
          <Link href="/">NextJS Starter</Link>
        </h2>

        <NavMenu className="hidden sm:block" />

        <ul className="flex items-center gap-x-4">
          <li className="hidden sm:inline-flex">
            <LoginLogoutButton />
          </li>
          <li className="hidden sm:inline-flex">
            <LightDarkButton />
          </li>
          <li className="sm:hidden">
            <NavigationSheet />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default RootHeader;
