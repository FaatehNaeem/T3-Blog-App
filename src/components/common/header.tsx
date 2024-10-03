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
      <header className="top-0 flex h-16 w-full items-center gap-4 border-b-4 border-red-700 bg-zinc-800 px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-12 w-2/3 justify-center">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" color="red"/>
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="#"
            className="text-white transition-colors hover:text-zinc-300"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-white transition-colors hover:text-zinc-300"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-white transition-colors hover:text-zinc-300"
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
        <div className="flex w-full items-center gap-6 md:ml-auto md:gap-2 lg:gap-4 justify-end mr-12">
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
          <Button>Login</Button>
        </div>
      </header>
      <form className="mt-2 flex h-12 items-center justify-center">
        <div className="relative rounded-lg bg-zinc-800">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Blogs..."
            className="pl-8 text-white sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
        </div>
      </form>
    </>
    // </div>
  );
}

