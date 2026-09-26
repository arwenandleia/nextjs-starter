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
import { resetUserPassword } from "@/lib/actions/login.actions";

const changePasswordFormSchema = z
  .object({
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

export type ChangePasswordFormType = z.infer<typeof changePasswordFormSchema>;

const ChangePasswordForm = ({ token }: { token: string }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isSubmitted, isValid },
  } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({
    password,
    confirmPassword,
  }: ChangePasswordFormType) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      reset();
    }
    const { success, message } = await resetUserPassword(password, token);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Passowrd</CardTitle>
        <CardDescription>Please Change/Reset your password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="change-password-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* --- PASSWORD --- */}
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <ControlledFieldInput
                  field={field}
                  fieldState={fieldState}
                  customId="change-password-form-password"
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
                  customId="change-password-form-confirm-password"
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
            form="change-password-form"
            disabled={isSubmitting || (!isValid && isSubmitted)}

            className="flex-1"
          >
            {isSubmitting ? "Please wait..." : "Change Password"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default ChangePasswordForm;
