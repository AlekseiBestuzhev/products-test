import {
  useId,
  useState,
  forwardRef,
  type ReactNode,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
} from "react";
import { cn } from "../lib";
import { CrossIcon, EyeIcon } from "../assets";
import { Controller, type FieldValues } from "react-hook-form";
import type { ControlledFieldProps } from "../types";

type GetRightSlotArgs = {
  isPassword: boolean;
  hasValue: boolean;
  onClear: () => void;
  onToggle: () => void;
  withLabel?: boolean;
};

function getRightSlot({ isPassword, hasValue, onClear, onToggle, withLabel }: GetRightSlotArgs) {
  if (!isPassword && !hasValue) return null;

  return (
    <button
      type="button"
      onClick={isPassword ? onToggle : onClear}
      className={cn(
        "p-1 text-gray-400 cursor-pointer rounded-full absolute right-4",
        withLabel ? "top-11" : "top-3",
      )}
    >
      {isPassword ? <EyeIcon /> : <CrossIcon />}
    </button>
  );
}

type Props = ComponentPropsWithoutRef<"input"> & {
  iconSlot?: ReactNode;
  label?: string;
  error?: string;
  wrapperClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    className,
    iconSlot,
    type,
    onChange,
    value,
    label,
    error,
    wrapperClassName,
    ...restProps
  } = props;
  const [visible, setVisible] = useState(false);
  const id = useId();

  const isPassword = type === "password";

  const actualType = isPassword && visible ? "text" : type;

  const clear = () => {
    onChange?.({
      target: { value: "" },
    } as ChangeEvent<HTMLInputElement>);
  };

  const rightSlot = getRightSlot({
    isPassword,
    hasValue: Boolean(value),
    onClear: clear,
    onToggle: () => setVisible(v => !v),
    withLabel: Boolean(label),
  });

  return (
    <div className={cn("relative flex flex-col gap-1", wrapperClassName)}>
      {iconSlot && (
        <div className={cn("absolute left-4 pointer-events-none", label ? "top-11.5" : "top-3")}>
          {iconSlot}
        </div>
      )}

      {label && (
        <label htmlFor={id} className="text-lg font-medium text-gray-600">
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={id}
        type={actualType}
        value={value}
        onChange={onChange}
        {...restProps}
        className={cn(
          "w-full rounded-xl border-2 border-gray-dark text-gray-700 bg-transparent p-3",
          "focus:border-blue-primary focus:outline-none",
          iconSlot && "pl-12",
          rightSlot && "pr-12",
          className,
        )}
      />

      {rightSlot}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export const ControlledInput = <T extends FieldValues>(props: ControlledFieldProps<T, Props>) => {
  const { name, control, ...restProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input {...restProps} {...field} error={error?.message} />
      )}
    />
  );
};
