"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { Loader2Icon, ArrowUpRight } from "lucide-react";
import { Badge } from "./ui/badge";

export function BlogCard() {
  const { data: blogs } = api.blog.getAll.useQuery();
  const router = useRouter();
  const [isloading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (blogs) {
      setIsLoading(false);
    }
  }, [blogs]);

  const handleClick = (blogId: string) => {
    router.push(`/blog/${blogId}`);
  };

  if (isloading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <Loader2Icon className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {blogs?.map((blog, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
          className="group relative"
        >
          <Card
            className="overflow-hidden border-none bg-card/50 shadow-2xl shadow-black/5 backdrop-blur-sm transition-all duration-500 hover:shadow-primary/10"
            onClick={() => handleClick(blog.id)}
          >
            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                src={blog.blogImage}
                alt={blog.title}
                className="h-full w-full object-cover transition-all"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              <div className="absolute top-4 left-4 z-20">
                <Badge className="bg-primary/90 text-white backdrop-blur-md border-none px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                  {blog.category?.categoryName ?? "Tech"}
                </Badge>
              </div>

              <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <div className="rounded-full bg-primary p-2 text-white shadow-lg">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <CardHeader className="space-y-4 p-6">
              <div className="space-y-2">
                <CardTitle className="line-clamp-2 text-xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {blog.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {blog.description}
                </CardDescription>
              </div>

              {/* Author & Info */}
              <div className="flex items-center justify-between border-t border-border/50 pt-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 border-2 border-primary/20 ring-2 ring-background">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${blog.creator.username}`} />
                    <AvatarFallback>{blog.creator.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">
                      {blog.creator.username}
                    </span>
                    <span className="text-[10px] uppercase tracking-tighter text-muted-foreground/60">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Subtle 3D Depth Layer */}
          <div className="absolute -bottom-2 -left-2 -z-10 h-full w-full rounded-2xl bg-primary/5 blur-2xl transition-all group-hover:bg-primary/20 group-hover:blur-3xl" />
        </motion.div>
      ))}
    </div>
  );
}
