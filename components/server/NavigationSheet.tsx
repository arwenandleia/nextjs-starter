import { IconMenu2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavMenu from "@/components/client/NavMenu";
import LightDarkButton from "@/components/client/LightDarkButton";
import LoginLogoutButton from "@/components/client/login/LoginLogoutButton";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <h2 className="sr-only">Navigation Menu</h2>

      <SheetTrigger
        render={
          <Button size="icon" variant="outline">
            <IconMenu2 />
          </Button>
        }
      ></SheetTrigger>
      <SheetContent
        className="px-6 py-3 flex flex-col items-end"
        showCloseButton={false}
      >
        <LightDarkButton />
        <NavMenu
          className="mt-6 [&>div]:h-full  [&>div]:w-full"
          orientation="vertical"
        />
        <LoginLogoutButton />
      </SheetContent>
    </Sheet>
  );
};
