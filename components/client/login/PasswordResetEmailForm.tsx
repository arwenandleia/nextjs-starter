"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ControlledFieldInput from "@/components/ui/custom/ControlledFieldInput";
import { Field, FieldGroup } from "@/components/ui/field";
import { requestPasswordReset } from "@/lib/actions/login.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import * as z from "zod";

const passwordResetFormSchema = z.object({ email: z.email() });
type PasswordResetFormType = z.infer<typeof passwordResetFormSchema>;

const PasswordResetEmailForm = () => {
  const { handleSubmit, control, reset } = useForm<PasswordResetFormType>({
    resolver: zodResolver(passwordResetFormSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async ({ email }: PasswordResetFormType) => {
    const { success, message } = await requestPasswordReset(email);
    if (success) {
      toast.success(`Please check your email. ${message}`);
    } else {
      toast.error(`Something went wrong, ${message}`);
    }
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Please enter your email below to get an email to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="request-password-reset-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FieldGroup>
            {/* --- EMAIL --- */}
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <ControlledFieldInput
                  field={field}
                  fieldState={fieldState}
                  customId="request-password-reset-form-email"
                  customLabel="Email"
                  type="email"
                />
              )}
            />
            {/* --- EMAIL --- */}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="flex">
          <Button
            type="submit"
            form="request-password-reset-form"
            className="flex-1"
          >
            Send Password Reset Email
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default PasswordResetEmailForm;
