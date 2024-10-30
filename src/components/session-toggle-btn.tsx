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
              Welcome {session.user.username}!
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/Dashboard"}>Dashboard</Link>
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
        className="bg-background font-bold text-foreground hover:bg-background2 hover:text-foreground"
        onClick={() => router.push("/login")}
      >
        Sign In
      </Button>
    </>
  );
}
