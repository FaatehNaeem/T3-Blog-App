import React from "react";
import { Badge } from "~/components/ui/badge";
import { HeroCards } from "./hero-cards";

export default function HeroComponent() {

  const badges = [
    {
    badgebackground:'bg-card',
    badgeText:'Typescript',
    },
        {
    badgebackground:'bg-foreground',
    badgeText:'Next.js',
    },
        {
    badgebackground:'bg-primary',
    badgeText:'T3 Stack',
    },
        {
    badgebackground:'bg-foreground',
    badgeText:'Trpc',
    },
        {
    badgebackground:'bg-card',
    badgeText:'Drizzle',
    },
  ]
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 h-screen">
      <h1 className="text-6xl font-bold">
        <span className="text-primary">AI</span> POWERED{" "}
        <span className="text-primary">BLOGS</span>
      </h1>

      <h3 className="text-wrap text-center w-1/2 text-lg">Create blogs almost instantenously utilizing AI, get smart suggestions, integrate tip tap form for proper styling of content...</h3>

<div className="w-2/5 h-[1px] bg-secondary">

</div>
      <div className="flex flex-row gap-4">
        {badges.map((item,index)=>(
          <Badge key={index} className={`${item.badgebackground} px-4 py-2 text-sm font-bold rounded-full hover:text-foreground hover:border-black black-shadow`}>{item.badgeText}</Badge>
        ))}
      </div>
      {/* <img src="blog-background-2.jpg" alt="" className="w-64 h-36"/> */}
      <HeroCards/>
    </div>
  );
}
