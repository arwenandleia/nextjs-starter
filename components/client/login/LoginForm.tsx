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
import { loginUser } from "@/lib/actions/login.actions";
import Link from "next/link";

const loginFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password should be atleast 8 characters")
    .max(32, "Password can be a maximum of 32 characters"),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isSubmitted, isValid },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: LoginFormType) => {
    const { success, message } = await loginUser({
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
        <CardTitle>Login to your Account</CardTitle>
        <CardDescription>
          Forgot Password?
          <Link href="/login/password/request-reset" className="ms-2">
            Click Here
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="root-login-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* --- EMAIL --- */}
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <ControlledFieldInput
                  field={field}
                  fieldState={fieldState}
                  customId="root-login-form-email"
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
                  customId="root-login-form-password"
                  customLabel="Password"
                  type="password"
                />
              )}
            />
            {/* --- PASSWORD --- */}
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
            form="root-login-form"
            disabled={isSubmitting || (!isValid && isSubmitted)}
            className="flex-1"
          >
            {isSubmitting ? "Submitting.." : "Login"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
