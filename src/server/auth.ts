import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";

import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt";
import { env } from "~/env";


/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      username: string;
    } & DefaultSession["user"];
  }


  interface User {
    id: string;
    role: string;
    username: string;
    // ...other properties
    // role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    username: string;
    // ...other properties
    // role: UserRole;
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  adapter: DrizzleAdapter(db) as Adapter,
  secret:env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        const email = credentials?.email!;
        const password = credentials?.password!;

        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

      if (!user) {
        return null;
        }
        // console.log(user)

  // Compare the provided plain password with the hashed password in the database
  const passwordMatch = await compare(password, user.password);

  // If the passwords don't match, return null (fail authentication)
  if (!passwordMatch) {
    return null;
  }

  // Authentication succeeded, return the user
        return {username:user.username,email:user.email,id:user.id,role:user.role}
      }
    }),
  ],
    callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          username: user.username,
          id:user.id
        }
        }
        return token
      },
      session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          id:token.id
        }
      } 
    },
        async redirect({ url, baseUrl }) {
      // Example: Redirect new users to the profile page
      if (url === "/signup") {
        return url;
      }
      return baseUrl; // Default to homepage after login
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
