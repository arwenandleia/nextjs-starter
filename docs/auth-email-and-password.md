# Implement Email and Password with Better-Auth

## Prerequisites

- Install [Resend](https://resend.com/docs/introduction) for emails. Also take a look at the quickstart guide for [NodeJS](https://resend.com/docs/send-with-nodejs).
- Scaffold the protected `/dashboard` router and the `/login` route for our authentication related forms.
- Resend also has documentation for implementing the reset password and verify email functionality for [better-aut](https://resend.com/docs/send-with-better-auth)

## The `lib/auth.ts` file

- See next Section for a break down of various parts of the file

```ts
import { Resend } from "resend";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "./db";
import * as schema from "./db/schemas/auth-schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  advanced: {
    trustedProxyHeaders: true,
  },
  baseURL: {
    allowedHosts: [
      "loki.training",
      "www.loki.training",
      "localhost:3000",
      "*.vercel.app",
    ],
    protocol: process.env.NODE_ENV === "development" ? "http" : "https",
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      void resend.emails.send({
        from: "Reset Password <reset@loki.training>",
        to: user.email,
        subject: "Reset your password",
        html: `Click <a href="${url}">here</a> to reset your password.`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: "Verify <verify@loki.training>",
        to: user.email,
        subject: "Verify your email address",
        html: `Click <a href="${url}">here</a> to verify your email.`,
      });
    },
  },
  plugins: [
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        void resend.emails.send({
          from: "OTP <otp@loki.training>",
          to: email,
          subject:
            type === "sign-in" ? "Your sign-in code" : "Your verification code",
          html: `Your code is <strong>${otp}</strong>.`,
        });
      },
    }),
    nextCookies(), // make sure this is the last plugin in the array
  ],
});
```

## Auth File explained

### [Enable Email and password](https://better-auth.com/docs/authentication/email-password#enable-email-and-password)

- Verify email [Better-Auth docs](https://better-auth.com/docs/authentication/email-password#email-verification)
- Request password reset [Better-Auth docs](https://better-auth.com/docs/authentication/email-password#request-password-reset)
- Implement sending email verification and password reset using [resend](https://resend.com/docs/send-with-better-auth#send-password-reset-and-verification-emails)

```ts
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  /* Other Config Options Above */
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      void resend.emails.send({
        from: "Reset Password <reset@loki.training>",
        to: user.email,
        subject: "Reset your password",
        html: `Click <a href="${url}">here</a> to reset your password.`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: "Verify <verify@loki.training>",
        to: user.email,
        subject: "Verify your email address",
        html: `Click <a href="${url}">here</a> to verify your email.`,
      });
    },
  },
  /* Other Config Options Below */
});
```

### [Dynamic Base URL](https://better-auth.com/docs/guides/dynamic-base-url)

- We will use the deployment patter for [development + production](https://better-auth.com/docs/guides/dynamic-base-url#development--production)

```ts
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  /* Other Config Options Above */
  baseURL: {
    allowedHosts: [
      "loki.training",
      "www.loki.training",
      "localhost:3000",
      "*.vercel.app",
    ],
    protocol: process.env.NODE_ENV === "development" ? "http" : "https",
  },
  /* Other Config Options Below */
});
```

### Plugins

- [Next Plugin](https://better-auth.com/docs/integrations/next#server-action-cookies) for server action cookies
- Add additional [plugins](https://better-auth.com/docs/concepts/plugins) like the [EmailOTP Plugin](https://better-auth.com/docs/plugins/email-otp)
