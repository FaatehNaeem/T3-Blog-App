"use client";
import React, { useState } from "react";
import { BlogPostSchema } from "~/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {ChevronDown} from "lucide-react"
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";

export default function BlogPostForm() {
  const [submitting,isSubmitted] = useState(false)
  const utils = api.useUtils()
  // const {data:session} = useSession()
  // const userId = session?.user.id;


  const {mutate} = api.blog.createBlog.useMutation({
    onSuccess:async()=>{
      await utils.blog.invalidate();
    }
  })

  const form = useForm<z.infer<typeof BlogPostSchema>>({
    resolver: zodResolver(BlogPostSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      blogImage: ""
    },
  });

   const onSubmit=async(values: z.infer<typeof BlogPostSchema>) =>{
    // if (!session?.user?.id) {
    //   alert("User not logged in");
    //   return;
    // }
    // console.log(session.user.id)
    await mutate({
          title:values.title,
          category:values.category,
          description:values.description,
          blogImage:values.blogImage,
        });

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-screen w-2/4 rounded-2xl border border-background bg-foreground text-background p-6"
      >
        {/* <h1 className="text-background mb-4">Create your blog post</h1> */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="h-28">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title" {...field} />
              </FormControl>
              <FormMessage className="h-6"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="h-28">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="h-6"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="mt-4 h-28">
              <FormLabel>Catgory</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex flex-row items-start w-full">
                      <Input
                        type="text"
                        placeholder="Select a category"
                        className="w-screen"
                        {...field}
                      />
                      <ChevronDown className="relative right-6 top-1"/>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Fashion</DropdownMenuItem>
                      <DropdownMenuItem>Technology</DropdownMenuItem>
                      <DropdownMenuItem>Health</DropdownMenuItem>
                      <DropdownMenuItem>Lifestyle</DropdownMenuItem>
                      <DropdownMenuItem>Coding</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage className="h-6"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="blogImage"
          render={({ field }) => (
            <FormItem className="mt-2 h-28">
              <FormLabel>Blog Image</FormLabel>
              <FormControl>
                <Input
                  placeholder="Upload an image"
                  type="file"
                  {...field}
                  className="text-center"
                />
              </FormControl>
              <FormMessage className="h-6"/>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-background text-foreground hover:bg-background hover:opacity-90 mt-2 w-full"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
