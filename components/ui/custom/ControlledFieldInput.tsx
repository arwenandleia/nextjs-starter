import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { HTMLInputTypeAttribute } from "react";
import {
  ControllerRenderProps,
  ControllerFieldState,
  FieldValues,
} from "react-hook-form";

interface ControlledFieldInputProps<T extends FieldValues> {
  field: ControllerRenderProps<T>;
  fieldState: ControllerFieldState;
  customId: string;
  customLabel: string;
  type?: HTMLInputTypeAttribute;
}

const ControlledFieldInput = <T extends FieldValues>({
  field,
  fieldState,
  customId,
  customLabel,
  type = "text",
}: ControlledFieldInputProps<T>) => {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={customId}>{customLabel}</FieldLabel>
      <Input
        {...field}
        type={type}
        id={customId}
        aria-invalid={fieldState.invalid}
        placeholder={customLabel}
        autoComplete="off"
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};

export default ControlledFieldInput;
