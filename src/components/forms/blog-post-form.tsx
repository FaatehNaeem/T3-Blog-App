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
import { IconBulbFilled } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Loader2 } from "lucide-react";
import { type JsonObject } from "next-auth/adapters";


export default function BlogPostForm() {
  const [data, setData] = useState<[string]>();
  const [userPrompt, setUserPrompt] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to hold the File object
  const [isLoading, setIsLoading] = useState(false);

  const utils = api.useUtils();

  const TitleRef = useRef<HTMLInputElement>(null);
  const DescRef = useRef<HTMLTextAreaElement>(null);
  const BadgeRef = useRef<HTMLDivElement>(null);

  const mutateCategory = api.category.createCategory.useMutation({
    onSuccess: async () => {
      await utils.category.invalidate();
    },
  });

  const { mutateAsync } = api.blog.createBlog.useMutation({
    onSuccess: async () => {
      await utils.blog.invalidate();
    },
  });

  const form = useForm<z.infer<typeof BlogPostSchema>>({
    resolver: zodResolver(BlogPostSchema),
    defaultValues: {
      title: "",
      description: "",
      blogImage: "", // This will store the Cloudinary URL after upload
      category: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof BlogPostSchema>) => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile); // Append the File object to FormData
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_UPLOAD_PRESET ?? "",
    );

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

      const data = await res.json() as JsonObject;

      const imageUrl:string = data.secure_url as string; // Get the secure URL from Cloudinary

      let categoryId:string | undefined;
      // Submit blog post data with the image URL
      try {
        const category = await mutateCategory.mutateAsync({
            categoryName:values.category??""
          })  
          categoryId = category
        
      } catch (error) {
        console.error(error)
      }

      await mutateAsync({
        title: values.title,
        description: values.description,
        blogImage: imageUrl, // Use the Cloudinary URL
        categoryId: categoryId??"",

        
      });

    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/gemini-ai-model/create-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Suggest 5 better alternative blog titles based on this partial input: ${userPrompt}. Only return the 5 titles as a single line, separated by commas with no extra spaces before or after the commas or quotes. Do not include numbers, bullets, brackets, or line breaks. Titles must be trimmed — no leading or trailing whitespace inside the quotes. Only output in this exact format: Title1,Title2,Title3,Title4,Title5... and dont give any response in which there are commmas required in commas instead use |... only use comma to separate titles.`,
        }),
      });
      const output = await response.json();
      const out = output.data;
      const promptArray = out.split(",");
      setData(promptArray);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBadgeClick = (prompt: string) => {
    form.setValue("title", prompt);
    if(BadgeRef.current)
    BadgeRef.current.style.display = 'none';
  };

  const handleDescriptionClick = async () => {
    const response = await fetch("/api/gemini-ai-model/create-desc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Write a description for this title: ${TitleRef.current?.value}. just the description dont give any options.... choose the best option yourself... and generate the description.... dont give any thing less and anything more. you can write a minimum of a 100 characters and a maximum of 1000 characters,,, but every time try to pick a random range. sometimes do, 200, 300 and so on...`,
      }),
    });
    const output = await response.json();
    const out = output.data;
    form.setValue("description", out);
  };


   const handleCategoryClick = async () => {
    const response = await fetch("/api/gemini-ai-model/create-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Write a category for this title: ${TitleRef.current?.value}. This is the description ${DescRef.current?.value}.... Just One word category looking at the title and the description.... or it can be three words as well like - Generative Artificial Intelligence... But the category must be exactly categorizing the title and the description exactly......Dont give options - Here are a few options that closely match your criteria:
        just give the category name... and nothing else...`,
      }),
    });
    const output = await response.json();
    const out = output.data;
    form.setValue("category", out);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 w-auto rounded-2xl p-6 text-foreground md:w-3/4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter a title"
                    {...field}
                    ref={TitleRef}
                    onChange={(e) => {
                      field.onChange(e); // update react-hook-form
                      setUserPrompt(e.target.value); // update your own state
                    }}
                  />

           
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger
                            asChild
                            className="group absolute bottom-0 right-0 h-9 w-9 border-none bg-black hover:bg-foreground"
                            onClick={handleClick}
                            disabled={!TitleRef.current?.value}
                          >
                            <Button variant="outline">
                              <IconBulbFilled
                                className="h-9 w-9 cursor-pointer text-background group-hover:text-primary"
                              />
                            </Button>
                 
                          </TooltipTrigger>
                                     
                          <TooltipContent>
                            <p>Generate AI suggestions</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

                     {isLoading ?
                     (  
                      <div className="w-full flex justify-center mt-1">
                       <Loader2 className="animate-spin w-6 h-6 text-center"/>
                       </div>
                     ):(

        <div className="mt-1 flex flex-row flex-wrap items-center justify-center gap-2" ref={BadgeRef}>


          {data?.map((suggestions, index) => (
            <Badge
              className="cursor-pointer bg-zinc-900 px-2 py-2 text-white hover:bg-primary"
              key={index}
              onClick={() => handleBadgeClick(suggestions)}
            >
              {suggestions}
            </Badge>
          ))}
        </div>
                     )
                            }

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    placeholder="Write blog description"
                    className="resize-none placeholder:text-white"
                    {...field}
                    ref={DescRef}
                  />

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        asChild
                        className="group absolute right-0 top-0 h-9 w-9 border-none bg-black hover:bg-foreground"
                        onClick={handleDescriptionClick}
                        disabled={!TitleRef.current?.value}

                      >
                        <Button variant="outline">
                          <IconBulbFilled
                            className="h-9 w-9 cursor-pointer text-background group-hover:text-primary"
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Generate AI description</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter a category"
                    {...field}
                  />


                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        asChild
                        className="group absolute right-0 top-0 h-9 w-9 border-none bg-black hover:bg-foreground"
                        onClick={handleCategoryClick}
                        disabled={!TitleRef.current?.value}

                      >
                        <Button variant="outline">
                          <IconBulbFilled
                            className="h-9 w-9 cursor-pointer text-background group-hover:text-primary"
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Generate AI Category</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </FormControl>
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
          className="mt-4 w-full bg-foreground text-background hover:text-foreground hover:opacity-95"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
