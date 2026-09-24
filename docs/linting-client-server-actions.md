# Linting Rules for Client and Server Components, and Server Actions

## Expected Directory Structure

- `app/` : NextJS App router. Use this for routing only, while individual components go in the `components` folder.
- `components/client` : Client components only. All `.tsx` files in this directory should begin with the `use client;` directive.
- `components/server` : Server Components only. All `.ts` files should begin with the `import "server-only"` line. We have already installed [server-only](https://www.npmjs.com/package/server-only) as outline [here](https://nextjs.org/docs/app/getting-started/server-and-client-components#preventing-environment-poisoning).
- `lib/actions` : [Server Functions](https://nextjs.org/docs/app/getting-started/mutating-data#what-are-server-functions) or [Server Actions](https://nextjs.org/docs/app/guides/server-actions) go here. All exported functions are `async` and we will ensure that all `.ts` files begin with the `"use server";` line.
- `lib/db/schemas` : A place for all the schemas. You can organise them in folders as needed. But for now we will be keeping all schemas and tables global as it will be easier to perform migrations from the `drizzle.config.ts` file.
- `components/ui` : Default directory for shadcn components. You can add custom components here as well.

## Adding Independant Features

- Independant features should be added to the `features` directory in the root of the project. We would like to keep the same directory structure as above for features.
- `features/<feature-name>/components/client` - Client components, needs `"use client";`
- `features/<feature-name>/components/server` - Server components, needs `import "server-only";`
- `features/<feature-name>/lib/actions` - Server Functions/Actions, needs `"use server";`
- If the feature is a standalone components or something like a `SPA`, then a single component should be exported from,say, `features/<feature-name>/<FeatureName.tsx>`
- Work on the feature should ideally be conducted only in that respective branch. For example using `git switch -c features/<feature-name>`
- A nice video guide from [Web Dev Simplified](https://www.youtube.com/watch?v=xyxrB2Aa7KE)

## Linting Rules for `eslint.config.mjs`

```mjs
{
    files: ["lib/actions/**/*.ts", "features/*/lib/actions/**/*.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            'Program:not(:has(> ExpressionStatement[directive="use server"]))',
          message: 'This file must have a "use server" directive.',
        },
      ],
    },
},
{
    files: [
      "components/client/**/*.tsx",
      "features/*/components/client/**/*.tsx",
    ],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            'Program:not(:has(> ExpressionStatement[directive="use client"]))',
          message: 'This file must have a "use client" directive.',
        },
      ],
    },
},
{
    files: [
      "components/server/**/*.tsx",
      "features/*/components/server/**/*.tsx",
    ],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          // Triggers an error if the first node under Program is NOT an ImportDeclaration for "server-only"
          selector:
            'Program > :first-child:not(ImportDeclaration[source.value="server-only"])',
          message: 'This file must start with: import "server-only";',
        },
      ],
    },
},

```

## EXAMPLE: Tic Tac Toe

```bash
git switch -c features/tic-tac-toe
mkdir -p features/tic-tac-toe
touch features/tic-tac-toe/TicTacToe.tsx
mkdir -p features/tic-tac-toe/components/client
mkdir -p features/tic-tac-toe/components/server
mkdir -p features/tic-tac-toe/lib/actions
```
