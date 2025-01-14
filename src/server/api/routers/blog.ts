import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { blogs } from "~/server/db/schema";
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
      return await ctx.db.query.blogs.findMany()
    }),
})