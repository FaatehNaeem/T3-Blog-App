"use client";
import * as React from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "~/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { Loader2Icon } from "lucide-react";

export function BlogCard() {
  const { data: blogs } = api.blog.getAll.useQuery();
  
  const router = useRouter();

  const [isloading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (blogs) {
      setIsLoading(false);
    }
  }, [blogs]);

  const handleClick = (blogId:string) => {
    router.push(`/blog/${blogId}`);
  };

  return (
    <>
      {isloading ? (
        <Loader2Icon className="h-8 w-8 animate-spin text-foreground" />
      ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 p-6 justify-center items-center">
          {blogs?.map((blog, index) => (
          
            <Card
              key={index}
              className="cursor-pointer rounded-md bg-background text-foreground shadow-card"
              onClick={()=>handleClick(blog.id)}>
              <img src={blog.blogImage} alt="error loading image" className="w-full rounded-sm"/>

              <CardHeader className="p-6 h-36">
                <CardTitle className="font-bold text-foreground drop-shadow-sm">
                  {blog.title}
                </CardTitle>
                <CardDescription className="break-words">{blog.description.length>=100 ? blog.description.slice(0,100) + "..." : blog.description}</CardDescription>

              </CardHeader>

              <CardFooter className="m-0 flex w-full flex-row items-center py-0">
                <Avatar className="bottom-3">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col items-center">
                  <CardTitle className="text-foreground">{blog.creator.username}</CardTitle>
                  <CardContent className="text-sm text-zinc-900">
                    October 8, 2023
                  </CardContent>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        </>
      )}
    </>
  );
}
