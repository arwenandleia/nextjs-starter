# Headers and Footers

- I want to use a simple sticky header and footer that shows be the toggle button for dark mode

```bash
touch components/server/RootHeader.tsx components/server/RootFooter.tsx
```

### `components/server/RootHeader.tsx`

```tsx
import "server-only";

import Link from "next/link";
import LightDarkButton from "@/components/client/LightDarkButton";

const RootHeader = () => {
  return (
    <header className="w-full sticky top-0 z-50 border-b-2 py-2">
      <nav className="max-w-container flex justify-between items-center">
        <h2 className="text-primary text-lg">
          <Link href="/">NextJS Starter</Link>
        </h2>
        <ul className="flex items-center gap-x-4">
          <li>
            <LightDarkButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default RootHeader;
```

### `components/server/RootFooter.tsx`

```tsx
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
```
