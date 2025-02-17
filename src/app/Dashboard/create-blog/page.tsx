import React from "react";
import BlogPostForm from "~/components/forms/blog-post-form";

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-x-hidden bg-background">
      <BlogPostForm />
    </div>
  );
}
