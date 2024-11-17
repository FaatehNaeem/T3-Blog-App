import { relations, type Table } from "drizzle-orm";
import {
  pgTableCreator,
  text,
  timestamp,
  varchar,
  pgEnum,
  pgTable
} from "drizzle-orm/pg-core";

/**
 * Enums for categorizing blogs and roles
 */
export const blogEnum = pgEnum("blogCategories", ["Fashion", "Technology", "Health", "Lifestyle", "Coding"]);
export const roleEnum = pgEnum("roles", ["user", "admin"]);

/**
 * Schema for the Users table
 */
export const users: Table = pgTable("mb_users", {
  id: varchar("id", { length: 255 }).primaryKey().$default(() => crypto.randomUUID()),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email").notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  profileImage: varchar("profileImage", { length: 300 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  role: roleEnum("roles").notNull().$default(() => "user"),
});

/**
 * Schema for the Blogs table
 */
export const blogs: Table = pgTable("mb_blogs", {
  id: varchar("blogId", { length: 255 }).primaryKey().$default(() => crypto.randomUUID()),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  category: blogEnum("blogCategories"),
  blogImage: varchar("blogImage", { length: 255 }).notNull(),
  userId: varchar("userId", { length: 255 }) // Ensures correct foreign key length
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // References `users.id`
});

/**
 * Relationships between Users and Blogs
 * One user can have many blogs, but each blog has one user (creator).
 */
export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
}));

export const blogsRelations = relations(blogs, ({ one }) => ({
  creator: one(users, {
    fields: [blogs.userId],       // Foreign key in `blogs`
    references: [users.id],       // Primary key in `users`
  }),
}));

