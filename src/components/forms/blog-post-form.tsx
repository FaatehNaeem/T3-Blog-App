"use client";

import React, { useState, useRef } from "react";
import { BlogPostSchema } from "~/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
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
import { Badge } from "../ui/badge";
import { Sparkles, ImagePlus, Loader2, Wand2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { type JsonObject } from "next-auth/adapters";
import { Card, CardContent } from "~/components/ui/card";

export default function BlogPostForm() {
  const [data, setData] = useState<string[]>();
  const [userPrompt, setUserPrompt] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const utils = api.useUtils();

  const TitleRef = useRef<HTMLInputElement>(null);
  const DescRef = useRef<HTMLTextAreaElement>(null);

  const { mutateAsync: createCategory } =
    api.category.createCategory.useMutation({
      onSuccess: async () => {
        await utils.category.invalidate();
      },
    });

  const { mutateAsync: createBlog } = api.blog.createBlog.useMutation({
    onSuccess: async () => {
      await utils.blog.invalidate();
    },
  });

  const form = useForm<z.infer<typeof BlogPostSchema>>({
    resolver: zodResolver(BlogPostSchema),
    defaultValues: {
      title: "",
      description: "",
      blogImage: "",
      category: "",
      categoryId: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof BlogPostSchema>) => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET ?? "");

    setSubmitting(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) return;

      const data = (await res.json()) as JsonObject;
      const imageUrl: string = data.secure_url as string;

      let categoryId: string | undefined;
      try {
        const category = await createCategory({
          categoryName: values.category ?? "",
        });
        categoryId = category;
      } catch (error) {
        console.error(error);
      }

      await createBlog({
        title: values.title,
        description: values.description,
        blogImage: imageUrl,
        categoryId: categoryId ?? "",
      });

      form.reset();
      setPreviewUrl(null);
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSuggestTitles = async () => {
    if (!userPrompt) return;
    try {
      setIsLoading(true);
      const response = await fetch("/api/gemini-ai-model/create-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Suggest 5 better alternative blog titles based on this partial input: ${userPrompt}. Only return the 5 titles as a single line, separated by commas...`,
        }),
      });
      const output = await response.json();
      const promptArray = output.data.split(",");
      setData(promptArray);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIDescription = async () => {
    const title = form.getValues("title");
    if (!title) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/gemini-ai-model/create-desc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Write a high-quality description for this title: ${title}...`,
        }),
      });
      const output = await response.json();
      form.setValue("description", output.data);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAICategory = async () => {
    const title = form.getValues("title");
    const desc = form.getValues("description");
    if (!title) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/gemini-ai-model/create-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `One word category for: ${title} - ${desc}`,
        }),
      });
      const output = await response.json();
      form.setValue("category", output.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-none bg-card/40 shadow-2xl backdrop-blur-md">
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {/* Title Section */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-base font-semibold">Blog Title</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="subtle"
                            size="sm"
                            className="h-8 gap-2 bg-primary/10 text-primary hover:bg-primary/20"
                            onClick={handleSuggestTitles}
                            disabled={!field.value || isLoading}
                          >
                            <Sparkles className="h-4 w-4" />
                            AI Suggestions
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Generate better titles</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Start typing your title..."
                      className="h-12 text-lg border-border/50 focus:ring-primary/20"
                      {...field}
                      ref={TitleRef}
                      onChange={(e) => {
                        field.onChange(e);
                        setUserPrompt(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />

                  {/* Suggestions List */}
                  {data && data.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      {data.map((suggestion, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="cursor-pointer border-none bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground/80 hover:bg-primary hover:text-white transition-all"
                          onClick={() => {
                            form.setValue("title", suggestion);
                            setData(undefined);
                          }}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  )}
                </FormItem>
              )}
            />

            {/* Description Section */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-base font-semibold">Content Description</FormLabel>
                    <Button
                      type="button"
                      variant="subtle"
                      size="sm"
                      className="h-8 gap-2 bg-primary/10 text-primary hover:bg-primary/20"
                      onClick={generateAIDescription}
                      disabled={!form.getValues("title") || isLoading}
                    >
                      <Wand2 className="h-4 w-4" />
                      Auto-Generate
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="What is your blog about? (Hint: Use AI to help expand your thoughts)"
                      className="min-h-[160px] resize-none border-border/50 text-base leading-relaxed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-base font-semibold">Category</FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10"
                        onClick={generateAICategory}
                        disabled={!form.getValues("title") || isLoading}
                      >
                        Suggest
                      </Button>
                    </div>
                    <FormControl>
                      <Input placeholder="e.g. Technology, Lifestyle" className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload */}
              <FormItem className="space-y-3">
                <FormLabel className="text-base font-semibold">Cover Image</FormLabel>
                <FormControl>
                  <div className="relative group overflow-hidden rounded-xl border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors">
                    {previewUrl ? (
                      <div className="relative aspect-video w-full overflow-hidden">
                        <img src={previewUrl} className="h-full w-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            type="button"
                            variant="secondary"
                            className="gap-2"
                            onClick={() => {
                              setPreviewUrl(null);
                              setSelectedFile(null);
                            }}
                          >
                            Change Image
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-video w-full flex flex-col items-center justify-center bg-muted/30">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                          <ImagePlus className="h-10 w-10 stroke-1" />
                          <span className="text-sm font-medium">Click to upload cover</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 cursor-pointer opacity-0"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setSelectedFile(file);
                              const url = URL.createObjectURL(file);
                              setPreviewUrl(url);
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all"
              disabled={submitting || !selectedFile}
            >
              {submitting ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Publishing your story...
                </div>
              ) : (
                "Publish Blog Post"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
