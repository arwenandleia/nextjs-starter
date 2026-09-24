import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
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
]);

export default eslintConfig;
