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

type GetRightSlotArgs = {
  isPassword: boolean;
  hasValue: boolean;
  onClear: () => void;
  onToggle: () => void;
};

function getRightSlot({ isPassword, hasValue, onClear, onToggle }: GetRightSlotArgs) {
  if (isPassword) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="p-1 text-gray-400 cursor-pointer rounded-full absolute right-4 bottom-2.5"
      >
        <EyeIcon />
      </button>
    );
  }

  if (hasValue) {
    return (
      <button
        type="button"
        onClick={onClear}
        className="p-1 text-gray-400 cursor-pointer rounded-full absolute right-4 bottom-3.5"
      >
        <CrossIcon />
      </button>
    );
  }

  return null;
}

type Props = ComponentPropsWithoutRef<"input"> & {
  iconSlot?: ReactNode;
  label?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, iconSlot, type, onChange, value, label, ...restProps } = props;
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
  });

  return (
    <div className="relative flex flex-col gap-1">
      {iconSlot && <div className="absolute left-4 bottom-3.5 pointer-events-none">{iconSlot}</div>}
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
          iconSlot && "pl-12",
          rightSlot && "pr-12",
          className,
        )}
      />

      {rightSlot}
    </div>
  );
});

Input.displayName = "Input";
