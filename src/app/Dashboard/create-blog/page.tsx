import React from "react";
import BlogPostForm from "~/components/forms/blog-post-form";

export default function Page() {
  return (
    <div className="flex mt-2 w-screen items-center justify-center overflow-x-hidden bg-background flex-col">
      <p className="font-black text-xl">Create a Blog Post</p>
      <BlogPostForm />
    </div>
  );
}
