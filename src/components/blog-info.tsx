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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] min-h-[500px] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${blog.blogImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-8 left-8 z-20"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full border border-border/50 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-md border-none px-4 py-2 text-sm font-bold">
                  {blog.category?.categoryName || "Technology"}
                </Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {readingTime} min read
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {views.toLocaleString()} views
                  </span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                {blog.title}
              </h1>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${blog.creator.username}`} />
                    <AvatarFallback>{blog.creator.username[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{blog.creator.username}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="prose prose-lg max-w-none"
        >
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl p-8 md:p-12">
            <div className="space-y-8">
              <p className="text-lg md:text-xl leading-relaxed text-foreground font-serif">
                {blog.description}
              </p>
              
              {/* Engagement Bar */}
              <div className="flex items-center justify-between pt-8 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setLikes(prev => prev + 1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="text-sm font-medium">{likes.toLocaleString()}</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">24</span>
                  </motion.button>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Author Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-border/50 p-8">
            <div className="flex items-start gap-6">
              <Avatar className="w-20 h-20 border-4 border-primary/20">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${blog.creator.username}`} />
                <AvatarFallback className="text-2xl">{blog.creator.username[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">{blog.creator.username}</h3>
                <p className="text-muted-foreground mb-4">
                  Passionate writer and technology enthusiast. Sharing insights and experiences through engaging content.
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    12.5K followers
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {Math.floor(Math.random() * 50) + 10} articles
                  </span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold"
              >
                Follow
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}