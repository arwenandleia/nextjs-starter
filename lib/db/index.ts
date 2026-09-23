import { authRelations } from "@/lib/db/schemas/auth-schema";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(process.env.DATABASE_URL!, {
  relations: { ...authRelations },
});
