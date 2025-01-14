import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Menu, Package2 } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import SessionToggleBtn from "./session-toggle-btn";

export default function Navbar() {
  return (
    <header className="t1op-0 flex h-16 w-full items-center gap-4 border-b-[1px] bg-gradient-to-b from-foreground to-card-foreground px-4 md:px-6">
      <nav className="hidden w-2/3 flex-col justify-center gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6 text-background2" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/"
          className="text-background transition-colors text-white hover:text-zinc-300 font-bold"
        >
          Home
        </Link>
        <Link
          href="#"
          className="text-background2 transition-colors text-white hover:text-zinc-300"
        >
          About
        </Link>
        <Link
          href="#"
          className="text-background2 transition-colors text-white hover:text-zinc-300"
        >
          Categories
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
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
          </nav>
        </SheetContent>
      </Sheet>
      <div className="mr-12 flex w-full items-center justify-end gap-6 md:ml-auto md:gap-2 lg:gap-4">
        <SessionToggleBtn />
      </div>
    </header>
  );
}
