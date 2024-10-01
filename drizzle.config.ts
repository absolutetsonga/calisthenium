import { type Config } from "drizzle-kit";

import { env } from "./src/env.js";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ["calisthenium_*"],
} satisfies Config;
