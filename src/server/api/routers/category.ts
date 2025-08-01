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

    getCatgoryByName:publicProcedure
    .input(z.object({
      categoryName: z.string()
    }))
    .query(async({input})=>{
    return await db.query.categories.findMany({
        where:(categories,{eq})=>(eq(categories.categoryName,input.categoryName)),
        with:{
          blogs:{
            columns:{
            id:true,
            blogImage:true,
            title:true,
            description:true
            }
          }
        }
      })
    })
});
