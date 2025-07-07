import React from 'react'
import { BlogCard } from './blog-card';

export default function Blogs() {

  return (
    <div className="w-screen overflow-x-hidden bg-background py-8" id='scrollId'>
    <p className="font-bold text-4xl text-center">BLOGS</p>
    <div className="flex w-screen flex-wrap items-center justify-center gap-6">
      <BlogCard />
    </div>
    </div>
  );
}

