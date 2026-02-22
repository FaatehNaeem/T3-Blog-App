import "~/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import SessionWrapper from "~/components/providers/providers";
import { Noto_Serif } from 'next/font/google'
import { Toaster } from "~/components/ui/sonner";


export const metadata: Metadata = {
  title: "My Blog App",
  description: "A blog app created through T3 tech stack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: '--font-notoSerif'
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${notoSerif.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SessionWrapper>
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster />
        </SessionWrapper>
      </body>
    </html>
  );
}
