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
      const existingCategory = await ctx.db
        .select()
        .from(categories)
        .where(eq(categories.categoryName, input.categoryName));

      if (existingCategory.length > 0) {
        return existingCategory[0]?.categoryId ?? "";
      }

      const newCategory = await ctx.db
        .insert(categories)
        .values({
          categoryName: input.categoryName,
        })
        .returning();

      console.log(newCategory);

      return newCategory[0]?.categoryId ?? "";
    }),
  getCategories: publicProcedure.query(async () => {
    const categories = db.query.categories.findMany();
    return categories;
  }),

  /* complex api for blogs based on category with pagination for infinite scrolling*/

  getBlogsByCategoryInfinite: publicProcedure
    .input(
      z.object({
        categoryName: z.string(),
        limit: z.number().default(10),
        cursor: z.string().nullish(), // cursor is blog ID
      }),
    )
 .query(async ({ input, ctx }) => {
  const category = await ctx.db.query.categories.findFirst({
    where: (categories, { ilike }) =>
      ilike(categories.categoryName, input.categoryName),
  });

  if (!category) {
    return { blogs: [], nextCursor: null };
  }

  const blogs = await ctx.db.query.blogs.findMany({
    where: (blogs, { eq, and, lt }) =>
      and(
        eq(blogs.categoryId, category.categoryId),
        input.cursor ? lt(blogs.createdAt, new Date(input.cursor)) : undefined
      ),
    orderBy: (blogs, { desc }) => [desc(blogs.createdAt)],
    limit: input.limit + 1,
    columns: {
      id: true,
      title: true,
      description: true,
      blogImage: true,
      createdAt: true,
    },
  });

  let nextCursor: string | undefined = undefined;
  if (blogs.length > input.limit) {
    const next = blogs.pop();
    nextCursor = next?.createdAt.toISOString();
  }

  return {
    blogs,
    nextCursor,
  };
})
});
