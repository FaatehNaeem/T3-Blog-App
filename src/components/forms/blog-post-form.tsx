"use client";
import React from "react";
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

export default function BlogPostForm() {
  const form = useForm<z.infer<typeof BlogPostSchema>>({
    resolver: zodResolver(BlogPostSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      blogImage: "",
    },
  });

  function onSubmit(values: z.infer<typeof BlogPostSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-3/2 w-2/4 overflow-x-hidden rounded-2xl border border-background bg-foreground text-background p-12"
      >
        <h1 className="text-background mb-4">Create your blog post</h1>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Title</FormLabel>
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="blogImage"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Blog Image</FormLabel>
              <FormControl>
                <Input
                  placeholder="Upload an image"
                  type="file"
                  {...field}
                  className="text-center"
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-background text-foreground hover:bg-background hover:opacity-90 mt-4 w-full"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
