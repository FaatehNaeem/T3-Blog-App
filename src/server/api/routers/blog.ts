import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { blogs } from "~/server/db/schema";
import { BlogPostSchema } from "~/utils/schemas";

export const blogRouter = createTRPCRouter({
  createBlog: protectedProcedure
  .input(BlogPostSchema)
  .mutation(async({ctx,input }) => {

      await ctx.db
        .insert(blogs)
        .values({
          title: input.title,
          description: input.description,
          blogImage: input.blogImage,
          userId: ctx.session?.user?.id,
          categoryId:input.categoryId,
        })
        .onConflictDoNothing();
  }),

    getAll:publicProcedure
    .query(async({ctx})=>{
      return (await ctx.db.query.blogs.findMany({with:{
        creator:{columns:{
          username:true
        }}
      }}))
    }),

    getBlogById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.blogs.findFirst({
      where:(blogs,{eq})=>eq(blogs.id,input.id),
      with:{
        creator:{columns:{
          username:true
        }}
      }
      })
    }),
  
});
