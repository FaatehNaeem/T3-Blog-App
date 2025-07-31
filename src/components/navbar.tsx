"use client";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import SessionToggleBtn from "./session-toggle-btn";
import { usePathname, useRouter } from "next/navigation";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navlinks = [
    {
      pathUrl: "/",
      navLinkName: "Home",
    },

    {
      pathUrl: "/about",
      navLinkName: "About",
    },

    {
      pathUrl: "/categories",
      navLinkName: "Categories",
    },
  ];

  return (
    <header className="flex w-full items-center gap-4 border-b-[1px] bg-background">
      <nav className="flex w-full flex-row items-center justify-around">
        <div className="md:w-1/5">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <div className="flex flex-row items-center justify-center">
              <img src="/blog-nest.png" alt="" width={60} height={60} />
              <p className="text-xl text-foreground">
                Blog <span className="text-primary">Nest</span>
              </p>
            </div>
          </Link>
        </div>

        <div className="active hidden w-3/5 justify-center gap-12 md:flex">
          <NavigationMenu viewport={false}>
            {navlinks.map((item, index) => (
              <NavigationMenuList key={index}>
                {item.navLinkName !== "Categories" ? (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link
                        href={item.pathUrl}
                        className={`${pathname !== item.pathUrl ? "text-foreground" : "text-primary"}`}
                      >
                        {item.navLinkName}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ) 
                : 
                (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      {item.navLinkName}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {components.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            ))}
          </NavigationMenu>
        </div>

        <div className="mr-12 hidden items-center justify-end gap-6 md:ml-auto md:flex md:gap-2 lg:gap-4">
          <SessionToggleBtn />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <div className="flex flex-row items-center justify-center">
                  <img src="/blog-nest.png" alt="" width={60} height={60} />
                  <p className="text-xl text-foreground">
                    Blog <span className="text-primary">Nest</span>
                  </p>
                </div>
              </Link>

              <div className="flex flex-col gap-2 px-2">
                {navlinks.map((item, index) => (
                  <Link
                    href={item.pathUrl}
                    key={index}
                    className={`${pathname !== item.pathUrl ? "text-foreground" : "text-primary"}`}
                  >
                    {item.navLinkName}
                  </Link>
                ))}

                {/* <div className="hidden md:flex mr-12  items-center justify-end gap-6 md:ml-auto md:gap-2 lg:gap-4"> */}
                {/* </div> */}
              </div>
            </nav>
            <SessionToggleBtn />
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
