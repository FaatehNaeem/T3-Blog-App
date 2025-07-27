import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { categories } from "~/server/db/schema";

export const categoryRouter = createTRPCRouter({
    createCategory: protectedProcedure
    .input(z.object({
    categoryName: z.string().min(1,"Category is required"),
    }))
    .mutation(async({ctx,input})=>{
        await ctx.db.insert(categories)
        .values({
        categoryName: input.categoryName
    })
    })  

})