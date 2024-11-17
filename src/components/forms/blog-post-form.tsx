"use client";
import React, { useState } from "react";
import { BlogPostSchema } from "~/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "~/components/ui/select";

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
import { ChevronDown } from "lucide-react";
import { api } from "~/trpc/react";

export default function BlogPostForm() {
  const [submitting, isSubmitted] = useState(false);
  const utils = api.useUtils();
  // const {data:session} = useSession()
  // const userId = session?.user.id;

  const { mutate } = api.blog.createBlog.useMutation({
    onSuccess: async () => {
      await utils.blog.invalidate();
    },
  });

  const form = useForm<z.infer<typeof BlogPostSchema>>({
    resolver: zodResolver(BlogPostSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      blogImage: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof BlogPostSchema>) => {
    // if (!session?.user?.id) {
    //   alert("User not logged in");
    //   return;
    // }
    // console.log(session.user.id)
    await mutate({
      title: values.title,
      category: values.category,
      description: values.description,
      blogImage: values.blogImage,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-screen w-2/4 rounded-2xl border border-background bg-foreground p-6 text-background"
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
              <FormMessage className="h-6" />
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
              <FormMessage className="h-6" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="mt-4 h-28">
              <FormLabel>Catgory</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="Coding">Coding</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FormMessage className="h-6" />
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
              <FormMessage className="h-6" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-2 w-full bg-background text-foreground hover:bg-background hover:opacity-90"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
