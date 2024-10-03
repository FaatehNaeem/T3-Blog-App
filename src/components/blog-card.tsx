import Image from "next/image";
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

export function BlogCard() {
    return (
      
      <Card className="h-[400px] w-[350px] cursor-pointer rounded-none bg-zinc-900 text-white border-red-950">
          
      <Image
        src="social/wp-content/uploads/2015/12/blog-background-2.jpg"
        alt="error loading image"
        width={350}
        height={150}
        priority/>
          
      <CardHeader>
        <CardTitle>Blog Title</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta,
          placeat quo. Facilis, veritatis ratione nostrum explicabo quisquam
          recusandae.....
        </CardDescription>
          </CardHeader>
          
        <CardFooter className="m-0 flex h-9 w-full flex-row items-center py-0">
              
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              
        <div className="flex h-full flex-col items-center">
          <CardTitle>Faateh N</CardTitle>
          <CardContent className="text-sm text-zinc-600">
            October 8, 2023
          </CardContent>
              </div>
              
        </CardFooter>
          
    </Card>
  );
}
