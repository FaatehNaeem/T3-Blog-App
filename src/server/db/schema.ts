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


export const users :Table = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey().$default(() => crypto.randomUUID()),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar('email').notNull().unique(),
  password: varchar('password', { length: 20 }).notNull().unique(),
  profileImage: varchar('profileImage', { length: 300 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  role: roleEnum('roles').notNull().$default(() => 'user'),
  blogs: varchar('blogs').references(() => blogs.id)
})

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs)
}))

export const blogs :Table= pgTable("blogs", {
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
}))

/* one user can have many blogs
but many blogs can only have one user
- so the relation can be
one to many
*/



// export const posts = createTable(
//   "post",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 256 }),
//     createdById: varchar("created_by", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
//       () => new Date()
//     ),
//   },
//   (example) => ({
//     createdByIdIdx: index("created_by_idx").on(example.createdById),
//     nameIndex: index("name_idx").on(example.name),
//   })
// );



// export const users = createTable("user", {
//   id: varchar("id", { length: 255 })
//     .notNull()
//     .primaryKey()
//     .$defaultFn(() => crypto.randomUUID()),
//   name: varchar("name", { length: 255 }),
//   email: varchar("email", { length: 255 }).notNull(),
//   emailVerified: timestamp("email_verified", {
//     mode: "date",
//     withTimezone: true,
//   }).default(sql`CURRENT_TIMESTAMP`),
//   image: varchar("image", { length: 255 }),
// });



// export const usersRelations = relations(users, ({ many }) => ({
//   accounts: many(accounts),
// }));

// export const accounts = createTable(
//   "account",
//   {
//     userId: varchar("user_id", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     type: varchar("type", { length: 255 })
//       .$type<AdapterAccount["type"]>()
//       .notNull(),
//     provider: varchar("provider", { length: 255 }).notNull(),
//     providerAccountId: varchar("provider_account_id", {
//       length: 255,
//     }).notNull(),
//     refresh_token: text("refresh_token"),
//     access_token: text("access_token"),
//     expires_at: integer("expires_at"),
//     token_type: varchar("token_type", { length: 255 }),
//     scope: varchar("scope", { length: 255 }),
//     id_token: text("id_token"),
//     session_state: varchar("session_state", { length: 255 }),
//   },
//   (account) => ({
//     compoundKey: primaryKey({
//       columns: [account.provider, account.providerAccountId],
//     }),
//     userIdIdx: index("account_user_id_idx").on(account.userId),
//   })
// );

// export const accountsRelations = relations(accounts, ({ one }) => ({
//   user: one(users, { fields: [accounts.userId], references: [users.id] }),
// }));

// export const sessions = createTable(
//   "session",
//   {
//     sessionToken: varchar("session_token", { length: 255 })
//       .notNull()
//       .primaryKey(),
//     userId: varchar("user_id", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     expires: timestamp("expires", {
//       mode: "date",
//       withTimezone: true,
//     }).notNull(),
//   },
//   (session) => ({
//     userIdIdx: index("session_user_id_idx").on(session.userId),
//   })
// );

// export const sessionsRelations = relations(sessions, ({ one }) => ({
//   user: one(users, { fields: [sessions.userId], references: [users.id] }),
// }));

// export const verificationTokens = createTable(
//   "verification_token",
//   {
//     identifier: varchar("identifier", { length: 255 }).notNull(),
//     token: varchar("token", { length: 255 }).notNull(),
//     expires: timestamp("expires", {
//       mode: "date",
//       withTimezone: true,
//     }).notNull(),
//   },
//   (vt) => ({
//     compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
//   })
// );
