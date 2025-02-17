"use client";
import React from "react";
import { Badge } from "~/components/ui/badge";
import { api } from "~/trpc/react";
import { useParams } from "next/navigation";


export default function BlogInfo() {
  const params = useParams();
  const id = params.slug as string; // Ensure `id` is typed as string
  const { data: blog, isLoading, isError } = api.blog.getBlogById.useQuery({ id });

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (isError || !blog) {
    return <p className="text-center">Error fetching blog data.</p>;
  }

  return (
    <section className="p-8">
      <img
        src={blog.blogImage}
        alt="Blog cover"
        className="mx-auto h-64 w-full object-cover"
      />
      <h2 className="mt-4 text-center text-2xl font-bold">{blog.title}</h2>
      <div className="mt-2 flex justify-center gap-2">
        <Badge variant="destructive">{blog.categories}</Badge>
      </div>
      <div className="mx-auto mt-4 w-[90%] bg-background2 p-12">
        <p className="text-center">{blog.description}</p>
        {blog.creator && (
          <p className="mt-8 text-right font-bold text-zinc-950">
            Created by {blog.creator.username}
          </p>
        )}
      </div>
    </section>
  );
}