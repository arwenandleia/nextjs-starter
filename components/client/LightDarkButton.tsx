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
