import Image from "next/image";
import Link from "next/link";

const tech = ["T", "E", "C", "H"];
const stack = ["S", "T", "A", "C", "K"];
export default function Footer() {
  return (
      <div className="flex h-2/3 w-screen flex-row bg-foreground text-white">
        {/* tech stack 1 */}
        <div className="mx-auto my-auto h-[80%] flex-col">
          <div className="flex h-2/4 w-[300px] flex-col items-center justify-center hover:bg-background2">
            <Image
              src="https://static-00.iconduck.com/assets.00/nextjs-icon-512x512-y563b8iq.png"
              alt="Image"
              width="120"
              height="120"
            />
          </div>

          <div className="mt-4 flex h-2/4 w-[300px] flex-col items-center justify-center hover:bg-background2">
            <Image
              src="https://www.svgrepo.com/show/374144/typescript.svg"
              alt="TypeScript Logo"
              width={120}
              height={120}
              priority
            />
          </div>
        </div>

        {/* Tech stack container  */}
        <div className="flex h-full w-16 flex-col items-center justify-center bg-background text-foreground border-t-4 border-purple-950">
          {tech.map((stack, index) => (
            <h1 key={index} className="mt-[14px] font-extrabold">
              {stack}
            </h1>
          ))}
          <div className="mt-4 h-1 w-full bg-foreground"></div>
          {stack.map((stack, index) => (
            <h1 key={index} className="mt-[14px] font-extrabold">
              {stack}
            </h1>
          ))}
        </div>

        {/* tech stack 2 */}
        <div className="mx-auto my-auto h-[80%] flex-col">
          <div className="flex h-2/4 w-[300px] flex-col items-center justify-center hover:bg-background2">
            <Image
              src="https://trpc.io/img/logo.svg"
              alt="Image"
              width="120"
              height="120"
            />
            {/* <h3>MY Blog App</h3> */}
          </div>

          <div className="mt-4 flex h-2/4 w-[300px] flex-col items-center justify-center hover:bg-background2">
            <Image
              src="https://static-00.iconduck.com/assets.00/postgresql-plain-wordmark-icon-1024x1021-3tzxcisn.png"
              alt="Image"
              width="120"
              height="120"
            />
            {/* <h3>MY Blog App</h3> */}
          </div>
        </div>

        {/* social links */}
        <div className="flex h-full w-16 flex-col items-center justify-center gap-6 bg-background text-foreground border-t-4 border-purple-950">
          <Image
            src="https://www.svgrepo.com/show/521688/github.svg"
            alt="Image"
            width="50"
            height="50"
          />
          <Image
            src="https://www.svgrepo.com/show/521725/linkedin.svg"
            alt="Image"
            width="50"
            height="50"
          />
          <div className="mb-5 h-1 w-full bg-foreground"></div>
          <Image
            src="https://www.svgrepo.com/show/521711/instagram.svg"
            alt="Image"
            width="50"
            height="50"
          />
          <Image
            src="https://www.svgrepo.com/show/501561/facebook-boxed.svg"
            alt="Image"
            width="50"
            height="50"
          />
        </div>

        {/* second section  */}
        <div className="mx-auto my-auto ml-3 h-[80%] w-[48%] flex-col bg-foreground">
          {/* logo + web name */}
          <div className="flex h-1/3 w-[95%] flex-row items-center justify-center gap-0 text-background hover:bg-background2 hover:text-foreground">
            {/* <Image
              src="https://pngimg.com/d/firefox_PNG47.png"
              alt="Image"
              width="60"
              height="60"
            /> */}
            <h3 className="text-lg font-extrabold">My Blog App</h3>
          </div>

          {/* menu items  */}
          <div className="group mt-2 flex h-1/3 w-[95%] flex-row items-center justify-center gap-6 pl-8 hover:bg-background2">
            <Link
              href="/"
              className="text-lg font-bold text-background transition-colors group-hover:text-foreground"
            >
              Home
            </Link>

            <Link
              href="#"
              className="text-lg font-bold text-background transition-colors group-hover:text-foreground"
            >
              About
            </Link>

            <Link
              href="#"
              className="text-lg font-bold text-background transition-colors hover:text-foreground hover:text-zinc-300 group-hover:text-foreground"
            >
              Categories
            </Link>
          </div>

          {/* copyrights*/}
          <div className="group mt-2 flex h-1/3 w-[95%] flex-row items-center justify-center pl-4 text-foreground hover:bg-background2">
            <h3 className="text-lg font-bold text-background group-hover:text-foreground">
              &copy; Copyright. All Rights Reserved
            </h3>
          </div>
        </div>
      </div>
  );
}
