import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { signupSchema } from "~/utils/schemas";

import bcrypt from "bcrypt"


export const userRouter = createTRPCRouter({
  createUser: publicProcedure
  .input(signupSchema)
  .mutation(async ({ ctx, input }) => {
    console.log("Input received:", input); // Log input data
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(input.password, salt)
    // console.log(hashedPassword)
    await ctx.db.insert(users).values({
      username: input.username,
      email: input.email,
      password: hashedPassword,
    });
    })
});
