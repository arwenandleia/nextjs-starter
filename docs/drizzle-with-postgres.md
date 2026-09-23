# Drizzle ORM with Postgres

```bash
npm i drizzle-orm@rc pg
npm i -D drizzle-kit@rc tsx @types/pg
touch lib/db/index.ts drizzle.config.ts .env
```

- [Setup Drizzle with Postgres](https://orm.drizzle.team/docs/get-started/postgresql-new)
- Set `DATABASE_URL=` in your `.env` file pointing to the correct database. Remember to use ssl in production.

## `lib/db/index.ts`

- This is your main database export. You will run queries on it

```ts
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(process.env.DATABASE_URL!);
```

## `drizzle.config.ts`

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schemas/**/*.ts",
  out: "./lib/db/migrations/local",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

## Database Scripts

- Add the following scripts to `package.json` to help run migrations
- I will normally just run `npm run db:dev` to get my migrations up and running
- Remember to set the DATABASE_URL correctly for production Database. It may make sense to have [multiple drizzle config files](https://orm.drizzle.team/docs/drizzle-config-file#multiple-configuration-files) for this.

```json
"db:generate:dev": "drizzle-kit generate",
"db:migrate:dev": "drizzle-kit migrate",
"db:check:dev": "drizzle-kit check",
"db:dev": "npm run db:generate:dev && npm run db:migrate:dev && npm run db:check:dev",
```

## APPENDIX

### Add a drizzle config for production

```bash
touch drizzle.config.prod.ts
```

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schemas/**/*.ts",
  out: "./lib/db/migrations/prod",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: "require",
  },
});
```
