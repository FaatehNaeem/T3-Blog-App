import Link from "next/link";
import React from "react";
import { Input } from "~/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Menu, Package2, Search } from "lucide-react";

export default function Header() {
  return (
    // <div className="flex min-h-screen w-full flex-col">
    <>
      <header className="t1op-0 flex h-16 w-full items-center gap-4 border-b-[1px] border-foreground2 bg-foreground px-4 md:px-6">
        <nav className="hidden w-2/3 flex-col justify-center gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-12">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6 text-background2" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="#"
            className="text-background2 transition-colors hover:text-zinc-300"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-background2 transition-colors hover:text-zinc-300"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-background2 transition-colors hover:text-zinc-300"
          >
            Categories
          </Link>
        </nav>
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
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="mr-12 flex w-full items-center justify-end gap-6 md:ml-auto md:gap-2 lg:gap-4">
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          <Button className="bg-background2 text-foreground hover:bg-foreground hover:text-background font-bold">
            Login
          </Button>
        </div>
      </header>

      <form className="mt-2 flex h-12 items-center justify-center">
        <div className="relative rounded-lg bg-background2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground" />
          <Input
            type="search"
            placeholder="Search Blogs..."
            className="pl-8 text-foreground placeholder:text-foreground focus-visible:ring-0 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
        </div>
      </form>
    </>
  );
}

