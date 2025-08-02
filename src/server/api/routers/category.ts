import z from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { categories } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";

export const categoryRouter = createTRPCRouter({
  createCategory: protectedProcedure
    .input(
      z.object({
        categoryName: z.string().min(1, "Category is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingCategory = await ctx
        .db
        .select()
        .from(categories)
        .where(eq(categories.categoryName, input.categoryName));

      if (existingCategory.length>0) {
        return existingCategory[0]?.categoryId??"";
      }

      const newCategory = await ctx.db.insert(categories).values({
        categoryName: input.categoryName,
      })
      .returning();
      
      console.log(newCategory)

      return newCategory[0]?.categoryId??"";
    }),
    getCategories: publicProcedure
    .query(async()=>{
     const categories = db.query.categories.findMany()
     return categories;
    }),

getBlogsByCategoryInfinite: publicProcedure
  .input(z.object({
    categoryName: z.string(),
    limit: z.number().default(10),
    cursor: z.string().nullish(), // Use blog ID as cursor
  }))
  .query(async ({ input, ctx }) => {
    const blogs = await ctx.db.blog.findMany({
      where: (blog, { eq, and }) => and(
        eq(blog.categoryName, input.categoryName)
      ),
      orderBy: (blog, { desc }) => [desc(blog.createdAt)],
      take: input.limit + 1,
    });

    let nextCursor: string | undefined = undefined;
    if (blogs.length > input.limit) {
      const next = blogs.pop();
      nextCursor = next?.id;
    }

    return {
      blogs,
      nextCursor,
    };
  });

});
