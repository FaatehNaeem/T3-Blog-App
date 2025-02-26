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
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to hold the File object
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
      blogImage: "", // This will store the Cloudinary URL after upload
    },
  });

  const onSubmit = async (values: z.infer<typeof BlogPostSchema>) => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile); // Append the File object to FormData
    formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET ?? "");

    setSubmitting(true);
    try {
      // Upload image to Cloudinary
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        console.error("Oops! Something went wrong with the image upload.");
        return;
      }

      const data = await res.json();
      
      const imageUrl = data.secure_url; // Get the secure URL from Cloudinary

      // Submit blog post data with the image URL
      await mutate({
        title: values.title,
        category: values.category,
        description: values.description,
        blogImage: imageUrl, // Use the Cloudinary URL
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/4 rounded-2xl border border-background bg-gradient-to-b from-foreground to-card-foreground p-6 text-background"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl className="placeholder:text-white">
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
                  className="resize-none placeholder:text-white"
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="mt-2">
          <FormLabel>Blog Image</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/*" // Restrict to image files
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedFile(file); // Store the File object in state
                }
              }}
              className="text-center"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <Button
          type="submit"
          className="mt-4 w-full bg-background text-foreground hover:bg-background hover:opacity-90"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}