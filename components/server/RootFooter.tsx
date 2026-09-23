import "server-only";

import Link from "next/link";
import { IconBrandX, IconBrandGithub } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const RootFooter = () => {
  return (
    <footer className="w-full sticky bottom-0 z-50 border-t-2 pt-2 pb-1 text-xs">
      <nav className="max-w-container flex justify-between items-center">
        <p>© 2026 Aditya Dixit</p>
        <p>site under construction...</p>
        <ul className="flex items-center gap-x-4">
          <li className="hidden md:block">
            <Button variant="outline" size="icon-xs">
              <Link href="https://x.com/arwenandleia" target="_blank">
                <IconBrandX />
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="outline" size="icon-xs">
              <Link
                href="https://github.com/adityadixit-dev/adityadixit-dev"
                target="_blank"
              >
                <IconBrandGithub />
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default RootFooter;
