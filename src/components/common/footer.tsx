import Image from "next/image";
import Link from "next/link";

const techStack = ["T", "E", "C", "H", "S", "T", "A", "C", "K"];
export default function Footer() {
  return (
    <>
      <div className="flex h-2/3 w-screen flex-row bg-background2 text-white">
        {/* tech stack 1 */}
        <div className="mx-auto my-auto h-[80%] flex-col">
          <div className="flex h-2/4 w-[300px] flex-col items-center justify-center">
            <Image
              src="https://static-00.iconduck.com/assets.00/nextjs-icon-512x512-y563b8iq.png"
              alt="Image"
              width="120"
              height="120"
            />
          </div>

          <div className="mt-4 flex h-2/4 w-[300px] flex-col items-center justify-center">
            <Image
              src="https://www.svgrepo.com/show/374144/typescript.svg"
              alt="TypeScript Logo"
              width={120}
              height={120}
              priority
            />
            {/* <h3>MY Blog App</h3> */}
          </div>
        </div>

        {/* Tech stack container  */}
        <div className="flex h-full w-16 flex-col items-center justify-center bg-foreground">
          {techStack.map((stack, index) => (
            <h1 key={index} className="mt-[6px] font-extrabold">
              {stack}
            </h1>
          ))}
        </div>

        {/* tech stack 2 */}
        <div className="mx-auto my-auto h-[80%] flex-col">
          <div className="flex h-2/4 w-[300px] flex-col items-center justify-center">
            <Image
              src="https://trpc.io/img/logo.svg"
              alt="Image"
              width="120"
              height="120"
            />
            {/* <h3>MY Blog App</h3> */}
          </div>

          <div className="mt-4 flex h-2/4 w-[300px] flex-col items-center justify-center">
            <Image
              src="https://static-00.iconduck.com/assets.00/postgresql-plain-wordmark-icon-1024x1021-3tzxcisn.png"
              alt="Image"
              width="120"
              height="120"
            />
            {/* <h3>MY Blog App</h3> */}
          </div>
        </div>

        {/* border between  */}
        <div className="flex h-full w-16 flex-col items-center justify-center gap-2 bg-foreground">
          <Image
            src="https://icons.veryicon.com/png/o/internet--web/color-social-media-icon/github-36.png"
            alt="Image"
            width="60"
            height="60"
            className="bg-red-600"
          />
            <Image
              src="https://www.svgrepo.com/show/353184/linkedin-with-circle.svg"
              alt="Image"
              width="60"
              height="60"
              className="bg-red-600"
            />
          <Image
            src="https://static.vecteezy.com/system/resources/previews/018/930/473/non_2x/instagram-logo-instagram-icon-transparent-free-png.png"
            alt="Image"
            width="60"
            height="60"
            className="bg-red-600"
          />
        </div>

        {/* second section  */}
        <div className="mx-auto my-auto h-[80%] w-[48%] flex-col">
          {/* logo + web name */}
          <div className="flex h-1/3 w-[95%] flex-row items-center justify-center gap-4 bg-black">
            <Image src="/favicon.ico" alt="Image" width="20" height="20" />
            <h3>MY Blog App Logo</h3>
          </div>

          {/* menu items  */}
          <div className="mt-2 flex h-1/3 w-[95%] flex-row items-center justify-center gap-4 bg-black">
            <Link
              href="#"
              className="text-white transition-colors hover:text-zinc-300"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-white transition-colors hover:text-zinc-300"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-white transition-colors hover:text-zinc-300"
            >
              Categories
            </Link>
          </div>

          {/* copyrights         */}
          <div className="mt-2 flex h-1/3 w-[95%] flex-row items-center justify-center bg-black">
            <h3>&copy;Copyright. All Rights Reserved</h3>
          </div>
        </div>
      </div>
    </>
  );
}
