import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { categories } from "~/server/db/schema";
import { eq } from "drizzle-orm";

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

      if (existingCategory) {
        return existingCategory;
      }

      const newCategory = await ctx.db.insert(categories).values({
        categoryName: input.categoryName,
      });

      return newCategory;
    }),
});
