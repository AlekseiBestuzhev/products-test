import { useState, type PropsWithChildren } from "react";
import { updateProductSchema } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ControlledInput } from "@/shared/ui";
import type { AddProductPayload } from "@/shared/api";
import { cn, useClickOutside } from "@/shared/lib";
import { useUpdateProduct } from "../api/queries";
import { useForm } from "react-hook-form";

interface Props extends PropsWithChildren {
  defaultValue: string | number;
  colName: keyof AddProductPayload;
  buttonClassName?: string;
  id: number;
}

export const EditableValue = ({ defaultValue, children, id, colName, buttonClassName }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const wrapperRef = useClickOutside({ cb: closeHandler, isEnabled: isEditing });
  const { mutateAsync } = useUpdateProduct();

  const { control, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(updateProductSchema),
    defaultValues: { value: String(defaultValue) },
  });

  const submit = async (data: { value: string }) => {
    await mutateAsync({ id, data: { [colName]: data.value } });
    closeHandler();
  };

  function closeHandler() {
    setIsEditing(false);
    reset();
  }

  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          setIsEditing(true);
        }}
        className={cn(
          "cursor-pointer rounded outline-offset-3 :focus-visible:outline-blue-primary",
          buttonClassName,
        )}
      >
        {children ?? defaultValue}
      </button>
    );
  }

  return (
    <form ref={wrapperRef} onSubmit={handleSubmit(submit)} className="flex items-center gap-1">
      <ControlledInput
        name="value"
        control={control}
        type={typeof defaultValue === "number" ? "number" : "text"}
        className="min-w-30"
        isClearable={false}
      />

      <Button
        type="submit"
        size="unset"
        disabled={formState.isSubmitting}
        className="text-sm px-1 rounded"
      >
        ✓
      </Button>

      <Button
        type="button"
        size="unset"
        variant="outlined"
        onClick={closeHandler}
        className="text-sm px-1 rounded"
      >
        ✕
      </Button>
    </form>
  );
};
