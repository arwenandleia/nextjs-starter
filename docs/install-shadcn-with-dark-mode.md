# Shadcn with Dark Mode

- This is merely a scaffolding of file. For this to work correctly, we will have to modify the main `layout.tsx` file. We will do so later after installing a few more components and libraries

## Shadcn Create

- Select your preffered layout with [shadcn create](https://ui.shadcn.com/create)
- Add some commonly used components
- _NOTE_ : I will be using [Tabler Icons](https://tabler.io/icons). Adjust your code according if you are using something else

```bash
npx shadcn@latest init --preset b1dnn1Zmm8 --template next --pointer
npx shadcn@latest add sonner separator input card field tabs navigation-menu sheet
```

## Dark Mode

- We will be using [Next Themes](https://ui.shadcn.com/docs/dark-mode/next)
- Since the providers are globally used, they go in `components/client`
- We will use a single `GlobalProviders` export to avoid cluttering the main `layout.tsx` file
- We will use [sonner](https://ui.shadcn.com/docs/components/radix/sonner) to display toasts througout the app and hence add it to the `GlobalProviders` component.
- _NOTE_ : I am using a `LightDarkButton`, but feel free to modify this to your liking

```bash
touch components/client/GlobalProviders.tsx components/client/ThemeProvider.tsx components/client/LightDarkButton.tsx
```

### `components/client/ThemeProvider.tsx`

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### `components/client/Providers.tsx`

```tsx
"use client";

import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const GlobalProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster position="top-center" richColors closeButton expand={true} />
      {children}
    </ThemeProvider>
  );
};
export default GlobalProviders;
```

### `components/client/LightDarkButton.tsx`

```tsx
"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
export function LightDarkButton() {
  const { theme, setTheme } = useTheme();
  const toggleMode = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("dark");
    }
  };
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleMode}
      className="cursor-pointer"
    >
      <IconMoon className="h-fit w-fit scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <IconSun className="absolute h-fit w-fit scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
export default LightDarkButton;
```
