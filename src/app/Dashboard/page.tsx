import Link from "next/link";

export default function Page() {
  return (
    <section className="p-8">
      <div className="mt-4 flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Link href={"/Dashboard/create-blog"}>
            <div className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-b from-foreground to-card-foreground text-white hover:bg-gradient-to-t">
              <h1 className="text-3xl font-bold">CREATE A BLOG POST</h1>
            </div>
          </Link>
          <div className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-b from-foreground to-card-foreground text-white hover:bg-gradient-to-t">
            <h1 className="text-3xl font-bold">SAVED BLOGS</h1>
          </div>
          <div className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-b from-foreground to-card-foreground text-white hover:bg-gradient-to-t">
            <h1 className="text-3xl font-bold">YOUR BLOGS</h1>
          </div>
        </div>
        {/* <div className="aspect-video rounded-xl bg-gradient-to-b from-foreground to-card-foreground text-white flex items-center justify-center">
             </div> */}
      </div>
    </section>
  );
}
