"use client"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import SessionToggleBtn from "./session-toggle-btn";
import { usePathname, useRouter } from "next/navigation";


export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navlinks = [
    {
      pathUrl: "/",
      navLinkName:'Home'
    },

    {
      pathUrl: "/about",
      navLinkName:'About'

    },

    {
      pathUrl: "/categories",
      navLinkName:'Categories'
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

        <div className="hidden active md:flex w-3/5 justify-center gap-12">
        {navlinks.map((item,index)=>(
          <Link href={item.pathUrl} key={index} className={`${pathname!==item.pathUrl?"text-foreground":"text-primary"}`}>{item.navLinkName}</Link>
        ))}
        </div>

        <div className="hidden md:flex mr-12 items-center justify-end gap-6 md:ml-auto md:gap-2 lg:gap-4">
          <SessionToggleBtn />
        </div>

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

        <div className="flex flex-col px-2 gap-2">
        {navlinks.map((item,index)=>(
          <Link href={item.pathUrl} key={index} className={`${pathname!==item.pathUrl?"text-foreground":"text-primary"}`}>{item.navLinkName}</Link>
        ))}

        {/* <div className="hidden md:flex mr-12  items-center justify-end gap-6 md:ml-auto md:gap-2 lg:gap-4"> */}
        {/* </div> */}

        </div>
          </nav>
          <SessionToggleBtn/>
        </SheetContent>
      </Sheet>
      </nav>

    </header>
  );
}
