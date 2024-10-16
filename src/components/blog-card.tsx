"use client"
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
import { useRouter } from "next/navigation";

export function BlogCard() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/blog/1')
  }

    return (
      
      <Card className="h-[400px] w-[350px] cursor-pointer rounded-md bg-background text-foreground shadow-md shadow-foreground" onClick={handleClick}>
          
      <Image
        src="social/wp-content/uploads/2015/12/blog-background-2.jpg"
        alt="error loading image"
        width={350}
        height={150}
        priority/>
          
      <CardHeader>
        <CardTitle className="text-foreground font-bold drop-shadow-sm">Blog Title</CardTitle>
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
          <CardTitle className="text-foreground">Faateh N</CardTitle>
          <CardContent className="text-sm text-zinc-900">
            October 8, 2023
          </CardContent>
              </div>
              
        </CardFooter>
          
    </Card>
  );
}
