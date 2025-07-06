"use client"

import React from "react";
import { Badge } from "~/components/ui/badge";
import { HeroCards } from "./hero-cards";
import { ArrowDown } from "lucide-react";
import Link from "next/link";


export default function HeroComponent() {
  const badges = [
    {
      badgebackground: "bg-card",
      badgeText: "Typescript",
    },
    {
      badgebackground: "bg-foreground",
      badgeText: "Next.js",
    },
    {
      badgebackground: "bg-primary",
      badgeText: "T3 Stack",
    },
    {
      badgebackground: "bg-foreground",
      badgeText: "Trpc",
    },
    {
      badgebackground: "bg-card",
      badgeText: "Drizzle",
    },
  ];

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 py-8">
      <h1 className="text-6xl font-bold">
        <span className="text-primary">AI</span> POWERED{" "}
        <span className="text-primary">BLOGS</span>
      </h1>

      <h3 className="w-1/2 text-wrap text-center text-lg">
        Create blogs almost instantenously utilizing AI, get smart suggestions,
        integrate tip tap form for proper styling of content...
      </h3>

      <div className="h-[1px] w-2/5 bg-secondary"></div>
      <div className="flex flex-row gap-4">
        {badges.map((item, index) => (
          <Badge
            key={index}
            className={`${item.badgebackground} black-shadow rounded-full px-4 py-2 text-sm font-bold hover:border-black hover:text-foreground`}
          >
            {item.badgeText}
          </Badge>
        ))}
      </div>
      <HeroCards />
      <Link href={'#scrollId'}>
        <ArrowDown className="animate-bounce" />
      </Link>
    </div>
  );
}
