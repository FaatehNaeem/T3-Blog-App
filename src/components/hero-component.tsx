"use client"

import React from "react";
import { Badge } from "~/components/ui/badge";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { HeroCarousel } from "./hero-carousel";


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
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <h1 className="text-6xl font-bold text-center">
        <span className="text-primary">AI</span> POWERED{" "}
        <span className="text-primary">BLOGS</span>
      </h1>

      <h3 className="w-full px-4 md:px-0 md:w-1/2 text-wrap text-center text-lg">
        Create blogs almost instantenously utilizing AI, get smart suggestions,
        integrate tip tap form for proper styling of content...
      </h3>

      <div className="h-[1px] w-2/5 bg-secondary"></div>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {badges.map((item, index) => (
          <Badge
            key={index}
            className={`${item.badgebackground} black-shadow rounded-full px-4 py-2 text-sm font-bold hover:border-black hover:text-foreground`}
          >
            {item.badgeText}
          </Badge>
        ))}
      </div>
      <HeroCarousel/>
      <Link href={'#scrollId'}>
        <ArrowDown className="animate-bounce w-8 h-8 bg-foreground text-background py-1 px-1 rounded-full shadow-sm shadow-primary"/>
      </Link>
    </div>
  );
}
