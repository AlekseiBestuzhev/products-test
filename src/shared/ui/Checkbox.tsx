import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "../lib";

type Props = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  label?: ReactNode;
  containerClassName?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ className, containerClassName, label, ...props }, ref) => {
    return (
      <label
        className={cn(
          "flex items-center gap-2 text-gray-400 cursor-pointer select-none",
          containerClassName,
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          {...props}
          className={cn(
            "appearance-none grid place-content-center",
            "size-4.5 rounded border-2 border-gray-dark bg-white",
            "checked:bg-blue-primary checked:border-blue-primary checked:before:scale-100",
            "before:content-[''] before:w-2.5 before:h-2.5 before:scale-0",
            "before:[clip-path:polygon(14%_44%,0_65%,50%_100%,100%_16%,80%_0,43%_62%)] before:bg-white",
            className,
          )}
        />

        {label}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
