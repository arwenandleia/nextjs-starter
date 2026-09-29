import { Resend } from "resend";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin, emailOTP } from "better-auth/plugins";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "./db";
import * as schema from "./db/schemas/auth-schema";

const BASE_URL = process.env.RESEND_EMAIL_DOMAIN!;
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
      `${BASE_URL}`,
      `www.${BASE_URL}`,
      "localhost:3000",
      "*.vercel.app",
    ],
    protocol: process.env.NODE_ENV === "development" ? "http" : "https",
  },
  trustedOrigins: ["http:localhost:3000", `${BASE_URL}`, `www.${BASE_URL}`],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      void resend.emails.send({
        from: `Reset Password <reset@${BASE_URL}>`,
        to: user.email,
        subject: "Reset your password",
        html: `Click <a href="${url}">here</a> to reset your password.`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: `Verify <verify@${BASE_URL}>`,
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
          from: `OTP <otp@${BASE_URL}>`,
          to: email,
          subject:
            type === "sign-in" ? "Your sign-in code" : "Your verification code",
          html: `Your code is <strong>${otp}</strong>.`,
        });
      },
    }),
    admin(),
    nextCookies(), // make sure this is the last plugin in the array
  ],
});
