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

const BASE_URL = process.env.RESEND_EMAIL_DOMAIN!;

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
        message: "Signup Successful. Please Check and Verify your Email",
      };
    } else {
      return { success: false, message: "Unable to signup user" };
    }
  } catch (error) {
    if (isAPIError(error)) {
      return { success: false, message: error.message };
    }

    return { success: false, message: "unknown error" };
  }
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
      return { success: true, message: "User Logged In" };
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
}

export async function logoutUser(): Promise<LoginActionResonseType> {
  try {
    const response = await auth.api.signOut({ headers: await headers() });
    if (response.success) {
      revalidatePath("/");
      return { success: true, message: "User Logged Out" };
    } else {
      return { success: false, message: "Unable to logout user" };
    }
  } catch (error) {
    if (isAPIError(error)) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "unknown error" };
  }
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

export async function requestPasswordReset(
  email: string,
): Promise<LoginActionResonseType> {
  try {
    const response = await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: `https://${BASE_URL}/password/reset`,
      },
      headers: await headers(),
    });
    return { success: response.status, message: response.message };
  } catch (error) {
    if (isAPIError(error)) {
      return { success: false, message: error.message };
    }

    return { success: false, message: "unknown error" };
  }
}

export async function resetUserPassword(
  newPassword: string,
  token: string,
): Promise<LoginActionResonseType> {
  try {
    const { status } = await auth.api.resetPassword({
      body: { newPassword, token },
      headers: await headers(),
    });
    if (status) {
      return { success: true, message: "Password Reset. Please login" };
    } else {
      return { success: false, message: "Unable to reset password" };
    }
  } catch (error) {
    if (isAPIError(error)) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "unknown error" };
  }
}
