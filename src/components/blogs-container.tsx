import React from 'react'
import { BlogCard } from './blog-card';

export default function Blogs() {
  return (
    <div className="flex h-screen w-screen flex-wrap items-center justify-center gap-6 p-6">
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
}

