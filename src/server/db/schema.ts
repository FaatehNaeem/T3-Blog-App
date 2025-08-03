import { relations } from "drizzle-orm";
import {
  text,
  timestamp,
  varchar,
  pgEnum,
  pgTable
} from "drizzle-orm/pg-core";

/**
 * Enums for categorizing blogs and roles
 */
export const roleEnum = pgEnum("roles", ["user", "admin"]);

export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey().$default(() => crypto.randomUUID()),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email").notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  profileImage: varchar("profileImage", { length: 300 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  role: roleEnum("roles").notNull().$default(() => "user"),
});

export const categories = pgTable("categories",{
  categoryId:varchar("categoryId",{length:255}).primaryKey().$default(()=>crypto.randomUUID()),
  categoryName:varchar("categoryName",{length:255}).notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const blogs = pgTable("blogs", {
  id: varchar("id", { length: 255 }).primaryKey().$default(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  blogImage: varchar("blogImage", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
    
  categoryId:varchar("categoryId",{length:255})
  .notNull()  
  .references(()=>categories.categoryId)
});

/**
 * Relationships between Users and Blogs
 * One user can have many blogs, but each blog has one user (creator).
 */
export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
}));

export const categoryRelations = relations(categories,({many})=>({
  blogs:many(blogs)
}))


  export const blogsRelations = relations(blogs, ({ one }) => ({
    creator: one(users, {
      fields: [blogs.userId],       // Foreign key in `blogs`
      references: [users.id],       // Primary key in `users`
    }),
      category:one(categories,{
      fields:[blogs.categoryId],
      references:[categories.categoryId]
    })
  }));
