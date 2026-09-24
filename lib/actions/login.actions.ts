"use server";

import { auth } from "../auth";
import { isAPIError } from "better-auth/api";
import { LoginFormType } from "@/components/client/login/LoginForm";
import { SignupFormType } from "@/components/client/login/SignupForm";
import { headers } from "next/headers";

export type LoginActionResonseType = {
  success: boolean;
  message: string;
};

export async function signUpUser({
  fullName,
  email,
  password,
}: Omit<SignupFormType, "confirmPassword">): Promise<LoginActionResonseType> {
  try {
    const response = await auth.api.signUpEmail({
      body: { name: fullName, email, password },
      headers: await headers(),
    });
    if (response.user.email === email) {
      return {
        success: true,
        message: `User ${fullName} with email ${email} succesfully created`,
      };
    }
  } catch (error) {
    if (isAPIError(error)) {
      return { success: false, message: error.message };
    }
  }
  return { success: false, message: "unknown error" };
}

export async function loginUser({
  email,
  password,
}: LoginFormType): Promise<LoginActionResonseType> {
  try {
    const response = await auth.api.signInEmail({
      body: { email, password, rememberMe: true },
      headers: await headers(),
    });
    if (response.user.email === email) {
      return {
        success: true,
        message: `User with email ${email} succesfully logged in`,
      };
    }
  } catch (error) {
    if (isAPIError(error)) {
      if (
        error.statusCode === 403 &&
        error.body?.code === "EMAIL_NOT_VERIFIED"
      ) {
        return { success: false, message: "EMAIL_NOT_VERIFIED" };
      }
      return { success: false, message: error.message };
    }
  }
  return { success: false, message: "unknown error" };
}

export async function logoutUser(): Promise<LoginActionResonseType> {
  try {
    const response = await auth.api.signOut({ headers: await headers() });
    if (response.success) {
      return { success: true, message: "User Logged Out" };
    }
  } catch (error) {
    if (isAPIError(error)) {
      return { success: false, message: error.message };
    }
  }
  return { success: false, message: "unknown error" };
}

export async function resendVerificationEmail(
  email: string,
): Promise<LoginActionResonseType> {
  try {
    const response = await auth.api.sendVerificationEmail({
      body: { email: email, callbackURL: "/login" },
      headers: await headers(),
    });
    if (response) {
      return { success: true, message: "Please Check and Verify your email" };
    }
  } catch (error) {
    if (isAPIError(error)) {
      return { success: false, message: error.message };
    }
  }
  return { success: false, message: "unknown error" };
}
