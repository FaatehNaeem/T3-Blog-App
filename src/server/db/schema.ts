import { relations, type Table } from "drizzle-orm";
import {
  pgTableCreator,
  text,
  timestamp,
  varchar,
  pgEnum,
  pgTable
} from "drizzle-orm/pg-core";
// import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const blogEnum = pgEnum('blogCategories', ['Fashion', 'Technology', 'Health', 'Lifestyle', 'Coding'])
export const roleEnum = pgEnum('roles', ['user', 'admin'])

export const createTable = pgTableCreator((name) => `my-blog-app_${name}`);


export const users: Table = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey().$default(() => crypto.randomUUID()),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar('email').notNull().unique(),
  password: varchar('password', { length: 20 }).notNull().unique(),
  profileImage: varchar('profileImage', { length: 300 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  role: roleEnum('roles').notNull().$default(() => 'user'),
  // blogs: varchar('blogs').references(() => blogs.id)
})

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs)
}))

export const blogs: Table = pgTable("blogs", {
  id: varchar('blogId', { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description').notNull(),
  category: blogEnum('blogCategories'),
  blogImage: varchar('blogImage', { length: 255 }).notNull(),
  userId: varchar('userId',{length:255}).references(() => users.id)
})


export const blogsRelations = relations(blogs, ({ one }) => ({
  userId: one(users, {
    fields: [blogs.userId],
    references: [users.id]
  })
})
)

/* one user can have many blogs
but many blogs can only have one user
- so the relation can be
one to many
*/