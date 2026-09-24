"use server";

import { auth } from "../auth";
import { isAPIError } from "better-auth/api";
import { LoginFormType } from "@/components/client/login/LoginForm";
import { SignupFormType } from "@/components/client/login/SignupForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
      revalidatePath("/");
    } else {
      return { success: false, message: "Unable to signup user" };
    }
  } catch (error) {
    if (isAPIError(error)) {
      return { success: false, message: error.message };
    }

    return { success: false, message: "unknown error" };
  }
  redirect("/dashboard");
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
      revalidatePath("/");
    } else {
      return { success: false, message: "Unable to login user" };
    }
  } catch (error) {
    if (isAPIError(error)) {
      if (
        error.statusCode === 403 &&
        error.body?.code === "EMAIL_NOT_VERIFIED"
      ) {
        const verifyEmailResponse = await resendVerificationEmail(email);
        if (verifyEmailResponse.success) {
          return { success: false, message: verifyEmailResponse.message };
        }
        return { success: false, message: "EMAIL_NOT_VERIFIED" };
      }
      return { success: false, message: error.message };
    }
    return { success: false, message: "unknown error" };
  }

  redirect("/dashboard");
}

export async function logoutUser(): Promise<LoginActionResonseType> {
  try {
    const response = await auth.api.signOut({ headers: await headers() });
    if (response.success) {
      revalidatePath("/");
    } else {
      return { success: false, message: "Unable to logout user" };
    }
  } catch (error) {
    if (isAPIError(error)) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "unknown error" };
  }
  redirect("/");
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
