import { type AddProductForm, addProductSchema } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ControlledInput } from "@/shared/ui";
import { useForm } from "react-hook-form";
import { useId } from "react";
import { cn } from "@/shared/lib";

const defaultValues: AddProductForm = {
  title: "",
  price: 0,
  brand: "",
  sku: "",
};

interface Props {
  onCancel: () => void;
  onCreate: (data: AddProductForm) => Promise<void>;
}

export const AddProductRow = ({ onCancel, onCreate }: Props) => {
  const id = useId();
  const { control, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues,
  });

  const cancelHandler = () => {
    reset(defaultValues);
    onCancel();
  };

  return (
    <tr
      className={cn(
        "bg-blue-50 border-b border-gray-300",
        formState.isSubmitting && "opacity-50 pointer-events-none",
      )}
    >
      <td>
        <form id={id} onSubmit={handleSubmit(onCreate)} />
      </td>

      <td className="p-2 pb-10" valign="top">
        <ControlledInput
          name="title"
          control={control}
          placeholder="Название"
          isClearable={false}
          className="bg-white"
          autoFocus
        />
      </td>

      <td className="p-2 pb-10" valign="top">
        <ControlledInput
          name="brand"
          control={control}
          placeholder="Вендор"
          isClearable={false}
          className="bg-white"
        />
      </td>

      <td className="p-2 pb-10" valign="top">
        <ControlledInput
          name="sku"
          control={control}
          placeholder="Артикул"
          isClearable={false}
          className="bg-white"
        />
      </td>

      <td />

      <td className="p-2 pb-10" valign="top">
        <ControlledInput
          name="price"
          control={control}
          type="number"
          step="0.01"
          placeholder="Цена"
          isClearable={false}
          className="bg-white"
        />
      </td>

      <td colSpan={2} className="p-2 pb-10" valign="top">
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={cancelHandler}>
            Отмена
          </Button>

          <Button type="submit" form={id} disabled={formState.isSubmitting}>
            Добавить
          </Button>
        </div>
      </td>
    </tr>
  );
};
