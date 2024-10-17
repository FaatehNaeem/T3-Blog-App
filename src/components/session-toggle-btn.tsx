"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function SessionToggleBtn() {
    const { data: session } = useSession();

    if (session) {
      return (
        <>
          <h3 className="text-background">Signed in as {session.user.username}</h3>
          <Button
            className="bg-background font-bold text-foreground hover:bg-background2 hover:text-foreground"
            onClick={() => signOut()}>
            Sign out
          </Button>
        </>
      );
    }
    return (
      <>
        <Button
          className="bg-background font-bold text-foreground hover:bg-background2 hover:text-foreground"
          onClick={() => signIn()}
        >
          Sign In
        </Button>
      </>
    );

}
