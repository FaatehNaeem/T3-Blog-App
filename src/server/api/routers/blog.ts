import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { blogs, users } from "~/server/db/schema";
import { BlogPostSchema } from "~/utils/schemas";


export const blogRouter = createTRPCRouter({
  createBlog: protectedProcedure
    .input(BlogPostSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      if (!userId) {
        throw new Error("User is not authenticated.");
      }

      try {
        await ctx.db
          .insert(blogs)
          .values({
            title: input.title,
            description: input.description,
            category: input.category,
            blogImage: input.blogImage,
            userId,
          })
          .onConflictDoNothing();
          
      } catch (error) {
        console.error("Error inserting blog:", error);
        throw new Error("Failed to create blog post");
      }
    }),
    getAll:publicProcedure
    .query(async({ctx})=>{
      return (await ctx.db.query.blogs.findMany())
    }),

    getBlogById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select({
          blogId: blogs.id,
          title: blogs.title,
          description: blogs.description,
          categories: blogs.category,
          blogImage: blogs.blogImage,
          creator: {
            username: users.username,
          },
        })
        .from(blogs)
        .where(eq(blogs.id, input.id))
        .rightJoin(users, eq(blogs.userId, users.id))
        .limit(1);
  
      return result[0] ?? null;
    }),
  
});
