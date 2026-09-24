"use client";

import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import ControlledFieldInput from "@/components/ui/custom/ControlledFieldInput";
import { signUpUser } from "@/lib/actions/login.actions";

const signupFormSchema = z
  .object({
    fullName: z
      .string()
      .min(4, "Name must be atleast 4 letters")
      .max(32, "Name can be a maximum of 32 characters"),
    email: z.email(),
    password: z
      .string()
      .min(8, "Password should be atleast 8 characters")
      .max(32, "Password can be a maximum of 32 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password should be atleast 8 characters")
      .max(32, "Password can be a maximum of 32 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormType = z.infer<typeof signupFormSchema>;

const SignupForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isSubmitted, isValid },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({
    fullName,
    email,
    password,
    confirmPassword,
  }: SignupFormType) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      reset();
    }
    const { success, message } = await signUpUser({
      fullName,
      email,
      password,
    });
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>
          Enter your information below to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="root-signup-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* --- FULL NAME --- */}
            <Controller
              control={control}
              name="fullName"
              render={({ field, fieldState }) => (
                <ControlledFieldInput
                  field={field}
                  fieldState={fieldState}
                  customId="root-signup-form-full-name"
                  customLabel="Full Name"
                  type="text"
                />
              )}
            />
            {/* --- FULL NAME --- */}

            {/* --- EMAIL --- */}
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <ControlledFieldInput
                  field={field}
                  fieldState={fieldState}
                  customId="root-signup-form-email"
                  customLabel="Email"
                  type="email"
                />
              )}
            />
            {/* --- EMAIL --- */}

            {/* --- PASSWORD --- */}
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <ControlledFieldInput
                  field={field}
                  fieldState={fieldState}
                  customId="root-signup-form-password"
                  customLabel="Password"
                  type="password"
                />
              )}
            />
            {/* --- PASSWORD --- */}

            {/* --- CONFIRM PASSWORD --- */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <ControlledFieldInput
                  field={field}
                  fieldState={fieldState}
                  customId="root-signup-form-confirm-password"
                  customLabel="Confirm Password"
                  type="password"
                />
              )}
            />
            {/* --- CONFIRM PASSWORD --- */}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="flex">
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            className="flex-1"
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="root-signup-form"
            disabled={isSubmitting || (!isValid && isSubmitted)}

            className="flex-1"
          >
            {isSubmitting ? "Signing Up.." : "Sign Up"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
