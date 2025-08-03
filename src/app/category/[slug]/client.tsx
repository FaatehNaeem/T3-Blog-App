'use client';

import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';
import {
  Card, CardHeader, CardTitle, CardDescription, CardFooter
} from '~/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { api } from '~/trpc/react';
import { useInfiniteQuery } from '@tanstack/react-query';

type Props = {
  categoryName: string;
};

export default function BlogClient({ categoryName }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['blogs-by-category', categoryName],
    initialPageParam:10,
    queryFn: async ({ pageParam }) => {
      return await api.category.getBlogsByCategoryInfinite.query({
        categoryName,
        cursor: pageParam,
        limit: 10,
      });
    },
getNextPageParam: (lastPage) => {
  if (!lastPage.nextCursor) return undefined;
  return lastPage.nextCursor; // now this should be createdAt of last blog
},
  });

  const allBlogs = data?.pages.flatMap((page) => page.blogs) ?? [];

  console.log(allBlogs)

  return (
    <div className="p-6">
      <p className="text-center text-4xl font-black">
        {categoryName}
      </p>

      {allBlogs.length == 0 && !isFetching && (
        <p className="text-center text-black mt-4">No blogs found in this category.</p>
      )}

      <InfiniteScroll
        dataLength={allBlogs.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4 className="text-center text-black mt-4">Loading...</h4>}
        endMessage={
          <p className="text-center text-black mt-4">
            Yay! You have seen it all.
          </p>
        }
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
