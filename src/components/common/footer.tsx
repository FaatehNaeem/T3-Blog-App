import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
      <div className="flex w-screen flex-col bg-background text-foreground border-t border-secondary">
       
       <div className="flex flex-row w-full justify-around p-8">

<div className="flex flex-col w-4/12 items-start px-6">
<div className="flex flex-row items-center justify-start">
<p className="text-foreground text-4xl">Blog <span className="text-primary font-bold">Nest</span></p>
</div>
<div className="flex flex-col text-justify mt-2">
<p>Blog Nest – Smarter Blogging with AI
Built with the T3 Stack (Next.js, Tailwind, PostgreSQL, Drizzle & tRPC), Blog Nest is your AI-powered platform for effortless, intelligent content creation. Write better, faster—with smart suggestions and Gemini API integration.</p>
</div>
</div>

<div className="flex flex-col items-center">
<p className="text-primary font-bold">Social Links</p>
<div className="flex flex-row items-center justify-center w-full gap-2 mt-4">
<Link href={'/'}>
<InstagramLogoIcon className="w-6 h-6"/>
</Link>
<Link href={'/'}>
<LinkedInLogoIcon className="w-6 h-6"/>
</Link>
<Link href={'/'}>
<GitHubLogoIcon className="w-6 h-6"/>
</Link>
</div>
</div>


<div className="flex flex-col gap-4">
  <p className="text-primary font-bold">Quick Links</p>
  <Link href={'/'}>Home</Link>
  <Link href={'/about'}>About</Link>
  <Link href={'/'}>Categories</Link>
</div>

<div className="flex flex-col gap-4">
  <p className="text-primary font-bold">Tech Stack Used</p>
  <Link href={'https://trpc.io/'}>Trpc</Link>
  <Link href={'https://nextjs.org/'}>Next</Link>
  <Link href={'https://tailwindcss.com/'}>Tailwind</Link>
  <Link href={'https://orm.drizzle.team/'}>Drizzle</Link>
  <Link href={'https://www.postgresql.org/'}>Postgresql</Link>

</div>


       </div>
       <div className="border-t border-secondary p-2">
        <p className="text-center"><span className="text-primary">©</span> 2025 Blog Nest. All rights reserved</p>
       </div>
      </div>
  );
}
