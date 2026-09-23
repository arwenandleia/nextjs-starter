# Better Auth with Drizzle ORM

This one is going to be a bit tedious. Especially since there are breaking changes between the previous and current (release candidate) version of drizzle.

- [NextJS Integration for Better Auth](https://better-auth.com/docs/integrations/next) says the first step is to install and configure a better-auth instance
- [Drizzle ORM Adapter for Better Auth](<>) - We will need to configure [Drizzle Relations V2](https://better-auth.com/docs/adapters/drizzle#drizzle-relations-v2)

```bash
npm install better-auth
npm install @better-auth/drizzle-adapter
touch lib/auth.ts lib/auth-client.ts proxy.ts
```

## Install Better Auth

- Start with [Installing Better Auth](https://better-auth.com/docs/installation)
- Set environment variables in `.env` for better-auth
- Switch to [Drizzle Adapter](https://better-auth.com/docs/adapters/drizzle) to configure the database

```
BETTER_AUTH_SECRET=random-32-character-string
BETTER_AUTH_URL=http://localhost:3000
```

## Use the Drizzle Adapter

- Start with `lib/auth.ts` as mentioned in the [docs](https://better-auth.com/docs/adapters/drizzle)

```ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/lib/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
});
```

- Generate your schema. This will be on `v1` drizzle, and will give you some errors. More on this later. There should be an `auth-schema.ts` file generated in the root of your project. Remove lines and blocks that are showing linting errors at this stage. This will include some `imports` and blocks with the `relations` functions.

```bash
npx auth@latest generate
mv auth-schema.ts lib/db/schemas
```

### Your New `auth.ts` should look something like below

- **NOTE** : The import should be from `v2`

```ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "@/lib/db";
import * as schema from "./db/schemas/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
});
```

- Regenerate your schema with the new drizzle adapter. Replace the old `lib/db/schemas/auth-schema.ts` with the newly generate schema

```bash
npx auth@latest generate
mv auth-schema.ts lib/db/schemas
```

## Update `lib/db/index.ts` to add `authRelations`

```ts
import { authRelations } from "@/lib/db/schemas/auth-schema";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(process.env.DATABASE_URL!, {
  relations: { ...authRelations },
});
```

- Generate and Migrate the new Schema. You can use the helper script `npm run db:dev` that we created earlier for this.
