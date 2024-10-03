import Image from "next/image";
import Link from "next/link";

const techStack = ["T", "E", "C", "H", "S", "T", "A", "C", "K"];
export default function Footer() {
  return (
    <>
      <div className="flex h-2/4 w-screen flex-row bg-zinc-700 text-white">
        {/* tech stack 1 */}
        <div className="flex-col">
          <div className="flex h-2/4 w-[300px] flex-col items-center justify-center bg-black">
            <Image src="/favicon.ico" alt="Image" width="20" height="20" />
            <h3>MY Blog App</h3>
          </div>

          <div className="flex h-2/4 w-[300px] flex-col items-center justify-center bg-black">
            <Image src="/favicon.ico" alt="Image" width="20" height="20" />
            <h3>MY Blog App</h3>
          </div>
        </div>

        {/* Tech stack container  */}
        <div className="flex h-full w-11 flex-col items-center justify-center bg-red-600">
          {techStack.map((stack, index) => (
            <h1 key={index} className="mt-[6px] font-extrabold">
              {stack}
            </h1>
          ))}
        </div>

        {/* tech stack 2 */}
        <div className="flex-col">
          <div className="flex h-2/4 w-[300px] flex-col items-center justify-center bg-black">
            <Image src="/favicon.ico" alt="Image" width="20" height="20" />
            <h3>MY Blog App</h3>
          </div>

          <div className="flex h-2/4 w-[300px] flex-col items-center justify-center bg-black">
            <Image src="/favicon.ico" alt="Image" width="20" height="20" />
            <h3>MY Blog App</h3>
          </div>
        </div>

        {/* border between  */}
        <div className="border-2 border-red-600"></div>

        {/* second section  */}
        <div className="h-full w-[48%] flex-col">
          {/* logo + web name */}
          <div className="flex h-1/3 w-full flex-row items-center justify-center gap-4 bg-black">
            <Image src="/favicon.ico" alt="Image" width="20" height="20" />
            <h3>MY Blog App</h3>
          </div>

          {/* menu items  */}
          <div className="flex h-1/3 w-full flex-row items-center justify-center gap-4 bg-black">
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
          <div className="flex h-1/3 w-full flex-row items-center justify-center bg-black">
            <h3>&copy;Copyright. All Rights Reserved</h3>
          </div>
        </div>
      </div>
    </>
  );
}
