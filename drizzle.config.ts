import { defineConfig} from "drizzle-kit";

import { env } from "~/env";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  out:"./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["my-blog-app_*"],
})
