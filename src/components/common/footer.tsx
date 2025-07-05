import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex w-screen flex-col border-t border-secondary bg-background text-foreground">
      <div className="flex w-full flex-row justify-around p-8">
        <div className="flex w-4/12 flex-col items-start px-6">
          <div className="flex flex-row items-center justify-start">
            <p className="text-4xl text-foreground">
              Blog <span className="font-bold text-primary">Nest</span>
            </p>
          </div>
          <div className="mt-2 flex flex-col text-justify">
            <p>
              Blog Nest – Smarter Blogging with AI Built with the T3 Stack
              (Next.js, Tailwind, PostgreSQL, Drizzle & tRPC), Blog Nest is your
              AI-powered platform for effortless, intelligent content creation.
              Write better, faster—with smart suggestions and Gemini API
              integration.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-bold text-primary">Social Links</p>
          <div className="mt-4 flex w-full flex-row items-center justify-center gap-2">
            <Link href={"/"}>
              <InstagramLogoIcon className="h-6 w-6" />
            </Link>
            <Link href={"/"}>
              <LinkedInLogoIcon className="h-6 w-6" />
            </Link>
            <Link href={"/"}>
              <GitHubLogoIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-bold text-primary">Quick Links</p>
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/"}>Categories</Link>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-bold text-primary">Tech Stack Used</p>
          <Link href={"https://trpc.io/"}>Trpc</Link>
          <Link href={"https://nextjs.org/"}>Next</Link>
          <Link href={"https://tailwindcss.com/"}>Tailwind</Link>
          <Link href={"https://orm.drizzle.team/"}>Drizzle</Link>
          <Link href={"https://www.postgresql.org/"}>Postgresql</Link>
        </div>
      </div>
      <div className="border-t border-secondary p-2">
        <p className="text-center">
          <span className="text-primary">©</span> 2025 Blog Nest. All rights
          reserved
        </p>
      </div>
    </div>
  );
}
