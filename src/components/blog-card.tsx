"use client"
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

export function BlogCard() {

  const {data:blogs} = api.blog.getAll.useQuery()

  const router = useRouter(); 

  const handleClick = () => {
    router.push('/blog/1')
  }

    return (
      
      <>
      {blogs?.map((blog,index)=>(

      <Card key={index} className="h-[400px] w-[350px] cursor-pointer rounded-md bg-background text-foreground shadow-md shadow-foreground" onClick={handleClick}>
  
      <img
        src={blog.blogImage}
        alt="error loading image"
        />
          
      <CardHeader>
        <CardTitle className="text-foreground font-bold drop-shadow-sm">{blog.title}</CardTitle>
        <CardDescription>
         {blog.description}
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
          ))}
          </>
  );
}
