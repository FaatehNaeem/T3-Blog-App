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
      textColor: "text-black",
    },
    {
      badgebackground: "bg-foreground",
      badgeText: "Next.js",
      textColor: "text-white",
    },
    {
      badgebackground: "bg-primary",
      badgeText: "T3 Stack",
      textColor: "text-white",
    },
    {
      badgebackground: "bg-foreground",
      badgeText: "Trpc",
      textColor: "text-white",
    },
    {
      badgebackground: "bg-card",
      badgeText: "Drizzle",
      textColor: "text-black",
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-around py-12 lg:py-20 bg-background overflow-hidden relative">
      <div className="flex flex-col items-center gap-8 max-w-4xl px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          <span className="text-primary">AI</span> POWERED{" "}
          <span className="text-primary">BLOGS</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Create blogs almost instantenously utilizing AI, get smart suggestions,
          integrate tip tap form for proper styling of content...
        </p>

        <div className="h-[1px] w-48 bg-border/50" />

        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {badges.map((item, index) => (
            <Badge
              key={index}
              className={`${item.badgebackground} ${item.textColor} rounded-full px-6 py-2 text-sm font-bold border-none shadow-lg shadow-black/5 hover:scale-105 transition-transform cursor-default`}
            >
              {item.badgeText}
            </Badge>
          ))}
        </div>
      </div>

      <HeroCarousel />
    </div>
  );
}
