import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
      <div className="flex w-screen flex-row bg-background text-foreground border-t border-black">
       
       <div className="flex flex-row w-full justify-around p-12">

<div className="flex flex-row h-24 items-center">
  <img src="/blog-nest.png" alt="" width={120} height={120} className="contain"/>
<p className="text-foreground text-xl">Blog <span className="text-primary">Nest</span></p>
</div>

<div className="flex flex-col gap-4">
  <p className="text-primary">Quick Links</p>
  <Link href={'/'}>Home</Link>
  <Link href={'/about'}>About</Link>
  <Link href={'/'}>Categories</Link>
</div>

<div className="flex flex-col gap-4">
  <p className="text-primary">Tech Stack Used</p>
  <p>TRPC</p>
  <p>NEXT</p>
  <p>TAILWIND</p>
  <p>DRIZZLE</p>
  <p>POSTGRESQL</p>
</div>


       </div>
      </div>
  );
}
