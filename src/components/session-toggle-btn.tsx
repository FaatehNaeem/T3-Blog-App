"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Avatar from "react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SessionToggleBtn() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-2 border-white"
            >
              <Avatar
                name={session.user.username}
                size="40"
                textSizeRatio={2}
                title="user"
                round
                color="#7A1CAC"
                className="font-bold"
              />

              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              Welcome <p className="text-foreground font-black">{session.user.username}!</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={"/Dashboard"}>Dashboard</Link></DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
  return (
    <>
      <Button
        className="bg-foreground font-bold text-background hover:bg-card absolute bottom-1 w-4/5 md:bottom-0 md:w-auto md:static"
        onClick={() => router.push("/login")}>
        Get Started
      </Button>
    </>
  );
}
