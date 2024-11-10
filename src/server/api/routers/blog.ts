import { blogs } from "~/server/db/schema";
import { createTRPCRouter,protectedProcedure } from "~/server/api/trpc";
import { BlogPostSchema } from "~/utils/schemas";


export const blogRouter = createTRPCRouter({
    createBlog:protectedProcedure
    .input(BlogPostSchema)
    .mutation(async({ctx,input})=>{
        console.log(input)
        await ctx.db.insert(blogs).values({
            title:input.title,
            description:input.description,
            category:input.category,
            blogImage:input.blogImage
        })
    })
})