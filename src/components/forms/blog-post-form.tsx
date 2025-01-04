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
import { api } from "~/trpc/react";

export default function BlogPostForm() {
  const [submitting, setSubmitting] = useState(false);
  const utils = api.useUtils();

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
    const formData = new FormData();
    formData.append("file", values.blogImage);
    formData.append("upload_preset",process.env.NEXT_PUBLIC_UPLOAD_PRESET); 

    setSubmitting(true);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.log("Oops! Something went wrong with the image upload.");
        return;
      }

      const data = await res.json();

      await mutate({
        title: values.title,
        category: values.category,
        description: values.description,
        blogImage: data.secure_url
      });

    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-screen w-2/4 rounded-2xl border border-background bg-foreground p-6 text-background"
      >
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
              <FormLabel>Category</FormLabel>
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
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      field.onChange(e.target.files[0]); // Set the file object in the field
                    }
                  }}
                  // {...field}
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
          disabled={submitting} // Disable the button while submitting
        >
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
