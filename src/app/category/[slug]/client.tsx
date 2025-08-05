'use client';

import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';
import {
  Card, CardHeader, CardTitle, CardDescription, CardFooter
} from '~/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { api } from '~/trpc/react';

type Props = {
  categoryName: string;
};

export default function BlogClient({ categoryName }: Props) {
  console.log('🔍 Frontend categoryName:', categoryName);
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    error,
  } = api.category.getBlogsByCategoryInfinite.useInfiniteQuery(
    {
      categoryName,
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    }
  );

  // Safely extract blogs from pages
  const allBlogs = data?.pages?.flatMap((page) => page?.blogs ?? []) ?? [];

  console.log('All blogs:', allBlogs);
  console.log('Has next page:', hasNextPage);
  console.log('Is fetching:', isFetching);
  console.log('Error:', error);

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-center text-4xl font-black">{categoryName}</p>
        <h4 className="text-center text-black mt-4">Loading...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-center text-4xl font-black">{categoryName}</p>
        <p className="text-center text-red-500 mt-4">Error: {error.message}</p>
      </div>
    );
  }

  if (!allBlogs || allBlogs.length === 0) {
    return (
      <div className="p-6">
        <p className="text-center text-4xl font-black">{categoryName}</p>
        <p className="text-center text-black mt-4">No blogs found in this category.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-center text-4xl font-black">
        {categoryName}
      </p>

      <InfiniteScroll
        dataLength={allBlogs.length}
        next={() => {
          console.log('📜 Fetching next page...');
          fetchNextPage().catch(console.error);
        }}
        hasMore={!!hasNextPage && !isFetching}
        loader={<h4 className="text-center text-black">Loading more...</h4>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {allBlogs.map((blog) => (
            <Link href={`/blog/${blog.id}`} key={blog.id}>
              <Card className="cursor-pointer rounded-md bg-background text-foreground shadow-card">
                <img
                  src={blog.blogImage}
                  alt={blog.title}
                  className="w-full rounded-sm"
                />
                <CardHeader className="h-36 p-6">
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription>
                    {blog.description.length > 100
                      ? blog.description.slice(0, 100) + '...'
                      : blog.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </CardFooter>
              </Card>
            </Link>
          ))}
         </div>
      </InfiniteScroll>
    </div>
  );
}