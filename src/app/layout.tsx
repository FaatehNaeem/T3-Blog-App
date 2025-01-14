import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import SessionWrapper from "~/components/providers/providers";
import Header from "~/components/common/header";
import SearchBar from "~/components/search-bar";
import Footer from "~/components/common/footer";

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
      <body className="h-screen w-screen overflow-x-hidden bg-background">
        <SessionWrapper>
          <Header />
          {/* <SearchBar /> */}
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
