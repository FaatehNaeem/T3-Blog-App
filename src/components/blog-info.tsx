"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  Heart, 
  Share2, 
  Bookmark,
  ArrowLeft,
  MessageCircle,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

export default function BlogInfo() {
  const params = useParams();
  const id = params.slug as string;
  const { data: blog, isLoading, isError } = api.blog.getBlogById.useQuery({ id });
  const [readingTime, setReadingTime] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (blog?.description) {
      const wordsPerMinute = 200;
      const words = blog.description.split(' ').length;
      setReadingTime(Math.ceil(words / wordsPerMinute));
    }
    // Simulate engagement metrics
    setLikes(Math.floor(Math.random() * 1000) + 50);
    setViews(Math.floor(Math.random() * 5000) + 100);
  }, [blog]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Blog Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog you're looking for doesn't exist.</p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
            >
              Go Home
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-none px-6 py-3 text-sm font-bold shadow-lg shadow-primary/25">
                {blog.category?.categoryName || "Technology"}
              </Badge>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground bg-clip-text text-transparent leading-tight">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10 border-2 border-primary/20">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${blog.creator.username}`} />
                  <AvatarFallback>{blog.creator.username[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">{blog.creator.username}</span>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readingTime} min read
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {views.toLocaleString()} views
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20 border border-border/50">
            <div className="aspect-[21/9] bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10">
              <img
                src={blog.blogImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-12"
        >
          {/* Blog Content */}
          <div className="bg-card/30 backdrop-blur-sm rounded-3xl border border-border/50 shadow-xl p-8 md:p-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl md:text-2xl leading-relaxed text-foreground font-light">
                {blog.description}
              </p>
            </div>

            {/* Engagement Bar */}
            <div className="flex items-center justify-between pt-12 border-t border-border/30">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLikes(prev => prev + 1)}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 transition-all border border-red-500/30"
                >
                  <Heart className={`w-5 h-5 ${likes > 0 ? 'fill-red-500 text-red-500' : 'text-red-500'}`} />
                  <span className="font-medium">{likes.toLocaleString()}</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all border border-blue-500/30"
                >
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">24</span>
                </motion.button>
              </div>
              
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="p-3 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 transition-all border border-amber-500/30"
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : 'text-amber-500'}`} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 transition-all border border-green-500/30"
                >
                  <Share2 className="w-5 h-5 text-green-500" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Author Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl border border-border/50 shadow-xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-primary/30 shadow-xl shadow-primary/20">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${blog.creator.username}`} />
                    <AvatarFallback className="text-3xl">{blog.creator.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-background" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-foreground mb-3">{blog.creator.username}</h3>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                    Passionate writer and technology enthusiast. Sharing insights and experiences through engaging content that inspires and educates.
                  </p>
                  <div className="flex flex-wrap gap-6 justify-center md:justify-start text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="font-medium">12.5K followers</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-medium">{Math.floor(Math.random() * 50) + 10} articles</span>
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full font-semibold shadow-lg shadow-primary/25"
                  >
                    Follow Author
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}