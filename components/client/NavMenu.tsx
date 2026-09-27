"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type NavLinkType = { href: string; label: string };
const navLinks: NavLinkType[] = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
  { href: "/contact-us", label: "Contact Us" },
];

const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  const classNameOrientation =
    props.orientation === "vertical"
      ? "flex-col flex-1  items-end justify-end"
      : "";
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className={classNameOrientation}>
        {navLinks.map(({ href, label }) => (
          <NavigationMenuItem key={href}>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              render={<Link href={href} />}
            >
              {label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
