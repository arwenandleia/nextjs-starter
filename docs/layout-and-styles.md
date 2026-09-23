# Layout and Styles

- We will create a general layout with a global header and footer. Feel free to modify this as needed
- Shadcn typeset to create a standardized layout across the app.
- Add standard [NextJS Routing Files](https://nextjs.org/docs/app/getting-started/project-structure#routing-files) at the root/global level.
- **NOTE** : Remember to modify `app/layout.tsx` for the changes to actually take effect.

## Shadcn typeset

```bash
touch app/typeset.css
```

- Copy the `typeset.css` file from [Build your typeset](https://ui.shadcn.com/typeset). Feel free to modify as per the [Typeset Docs](https://ui.shadcn.com/docs/typeset).
- There is a provision to add a [custom typeset](https://ui.shadcn.com/docs/typeset#custom-typesets) if needed, but we will just go with the defaults here
- We need to modify `app/layout.tsx`, which will do at the end of these steps

### Modify `app/globals.css`

- [ ] **ENSURE THAT YOU ADD TYPESET OR ELSE YOU WILL NOT GET STYLES FROM TYPESET**
- [ ] You can add some helper classes that are used by me later if you like. I have added them right at the bottom of my css file.

```css
@import "tailwindcss"; /* This should already be there. add the typeset import after this line */
@import "./typeset.css";
/*....rest of you css....*/
/* some helper classes */
@utility no-scrollbar {
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;

  @apply scrollbar-none;
  @apply overflow-y-auto;
}

@utility max-w-container {
  @apply container mx-auto;
}
```

## Headers and Footers

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

## Modify the root layout file - `app/layout.tsx`

- [ ] Add `suppressHydrationWarning` to the `html` tag for the dark mode theme provider to work correctly. More info [here](https://github.com/shadcn-ui/ui/discussions/6449) and [here](https://github.com/pacocoursey/next-themes)
- [ ] Make sure your fonts that are being passed to the html and the ones from typeset are correct
- [ ] My `body` tag looks something like this. Feel free to ammend as needed. I have purposely not added the `typeset` class to the header and footer as I would like them to have customized styles.

```
<body>
    <GlobalProviders>
        <div className="flex flex-col h-screen no-scrollbar justify-between">
            <RootHeader />
            <main className="max-w-container typeset w-full h-full no-scrollbar">
              {children}
            </main>
            <RootFooter />
        </div>
    </GlobalProviders>
</body>
```

## Routing Files - `loading.tsx`, `not-found.tsx` and `error.tsx`

```bash
touch app/loading.tsx app/not-found.tsx app/error.tsx
```

### `app/loading.tsx`

```tsx
import { IconRotateClockwise } from "@tabler/icons-react";

export default function loading() {
  return (
    <div className="h-screen w-screen absolute top-0 left-0 z-50 bg-secondary opacity-10">
      <div className="flex h-full justify-center items-center ">
        <IconRotateClockwise className="animate-spin" size={64} />
      </div>
    </div>
  );
}
```

### `app/not-found.tsx`

```tsx
export default function notfound() {
  return (
    <div className="h-screen flex flex-col gap-y-8 items-center justify-center">
      <h2 className="text-xl">404 - Not Found</h2>
      <p className="text-3xl">
        The Page You were looking for could not be found
      </p>
    </div>
  );
}
```

### `app/error.tsx`

```tsx
"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { toast } from "sonner";

const RootErrorPage = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    toast.error(error.message);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
    </div>
  );
};

export default RootErrorPage;
```
