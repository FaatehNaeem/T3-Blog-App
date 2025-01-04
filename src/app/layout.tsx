import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import SessionWrapper from "~/components/providers/providers";

export const metadata: Metadata = {
  title: "My Blog App",
  description: "A blog app created through T3 tech stack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
          <SessionWrapper>
        <TRPCReactProvider>
            {children}
        </TRPCReactProvider>
          </SessionWrapper>
      </body>
    </html>
  );
}
