"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function SessionToggleBtn() {
    const { data: session } = useSession();

    if (session) {
      return (
        <>
          <h3 className="text-background">Signed in as {session.user.email} </h3>
          <Button
            className="bg-background2 font-bold text-foreground hover:bg-foreground hover:text-background"
            onClick={() => signOut()}>
            Sign out
          </Button>
        </>
      );
    }
    return (
      <>
        <Button
          className="bg-background2 font-bold text-foreground hover:bg-foreground hover:text-background"
          onClick={() => signIn()}>
          Sign In
        </Button>
      </>
    );

}
