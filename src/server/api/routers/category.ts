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


// Backend procedure (fixed)

// Backend procedure (fixed for tRPC infinite query)
getBlogsByCategoryInfinite: publicProcedure
  .input(
    z.object({
      categoryName: z.string(),
      limit: z.number().default(10),
      cursor: z.string().nullish(),
    }),
  )
  .query(async ({ input, ctx }) => {
    try {

      const category = await ctx.db.query.categories.findFirst({
        where: (categories, { or, eq, ilike }) => 
          or(
            eq(categories.categoryName, input.categoryName),
            ilike(categories.categoryName, `%${input.categoryName}%`)
          ),
      });

      if (!category) {
        return { 
          blogs: [], 
          nextCursor: null 
        };
      }

      const blogs = await ctx.db.query.blogs.findMany({
        where: (blogs, { and, eq, lt }) => {
          const conditions = [eq(blogs.categoryId, category.categoryId)];
          if (input.cursor) {
            conditions.push(lt(blogs.createdAt, new Date(input.cursor)));
          }
          return and(...conditions);
        },
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

      let nextCursor: string | null = null;
      if (blogs.length > input.limit) {
        const next = blogs[input.limit];
        nextCursor = next?.createdAt.toISOString() ?? null;
      }

      return {
        blogs: blogs.slice(0, input.limit),
        nextCursor,
      };
    } catch (error) {
      console.error('Error in getBlogsByCategoryInfinite:', error);
      return { 
        blogs: [], 
        nextCursor: null 
      };
    }
  })
});
