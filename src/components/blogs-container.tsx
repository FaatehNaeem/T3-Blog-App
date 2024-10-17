import React from 'react'
import { BlogCard } from './blog-card';

export default function Blogs() {
  return (
    <div className="flex w-screen flex-wrap items-center justify-center gap-6">
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
}

