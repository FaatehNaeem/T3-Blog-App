import { blogs } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { BlogPostSchema } from "~/utils/schemas";

export const blogRouter = createTRPCRouter({
  createBlog: protectedProcedure
    .input(BlogPostSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id; // Ensure user ID comes from the session
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
            userId, // Directly from the session
          })
          .onConflictDoNothing();

        console.log("Insert query executed");
      } catch (error) {
        console.error("Error inserting blog:", error);
        throw new Error("Failed to create blog post");
      }
    }),
});
