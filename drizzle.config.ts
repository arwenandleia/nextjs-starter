import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schemas/**/*.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
