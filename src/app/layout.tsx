import "~/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import SessionWrapper from "~/components/providers/providers";
import { Jacquarda_Bastarda_9_Charted,Noto_Serif } from 'next/font/google'
import { Toaster } from "~/components/ui/sonner";


export const metadata: Metadata = {
  title: "My Blog App",
  description: "A blog app created through T3 tech stack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const jacquardaBastarda9Charted = Jacquarda_Bastarda_9_Charted({
  subsets:['latin'],
  display:"swap",
  weight:"400",
  variable:'--font-jacquardaBastarda9Charted'
})

const notoSerif = Noto_Serif({
  preload:true,
  subsets:["greek"],
  variable:'--font-notoSerif'
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) { 
  return (
    <html lang="en" className={`${jacquardaBastarda9Charted.variable} ${notoSerif.variable} font-notoSerif`}>
      <body className="h-screen w-screen overflow-x-hidden bg-background">
        <SessionWrapper>
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster/>
        </SessionWrapper>
      </body>
    </html>
  );
}
