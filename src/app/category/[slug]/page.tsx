import { api } from "~/trpc/server";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const slugIntoArray = slug.split("%20");
  const modifiedSlug = slugIntoArray.join(" ");
  
  const category = await api.category.getCatgoryByName({
    categoryName: modifiedSlug,
  });

  return (
    <div className="p-6">
      <p className="text-center text-4xl font-black">
        {modifiedSlug.toLocaleUpperCase()}
      </p>

      <div className="grid w-full grid-cols-1 items-center justify-center gap-4 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category?.map((blog, index) =>
          blog.blogs.map((blogg) => (
            <Link href={`/blog/${blogg.id}`} key={index}>
            <Card
           
              className="cursor-pointer rounded-md bg-background text-foreground shadow-card"
            >
              <img
                src={blogg.blogImage}
                alt="error loading image"
                className="w-full rounded-sm"
              />

              <CardHeader className="h-36 p-6">
                <CardTitle className="font-bold text-foreground drop-shadow-sm">
                  {blogg.title}
                </CardTitle>
                <CardDescription className="break-words">
                  {blogg.description.length >= 100
                    ? blogg.description.slice(0, 100) + "..."
                    : blogg.description}
                </CardDescription>
              </CardHeader>

              <CardFooter className="m-0 flex w-full flex-row items-center py-0">
                <Avatar className="bottom-3">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                {/* <div className="flex flex-col items-center">
                        <CardTitle className="text-foreground">{blogg.creator.username}</CardTitle>
                        <CardContent className="text-sm text-zinc-900">
                          October 8, 2023
                        </CardContent>
                      </div> */}
              </CardFooter>
            </Card>
            </Link>
          )),
        )}
      </div>
    </div>
  );
}
