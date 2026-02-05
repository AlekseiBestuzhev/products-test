import type { ComponentPropsWithoutRef, ElementRef, ElementType, ForwardedRef } from "react";
import { forwardRef } from "react";
import { cn } from "../lib";

type ButtonVariant = "filled" | "ghost";

const VARIANT = {
  filled: cn(
    "text-white bg-blue-primary border border-blue-secondary hover:bg-blue-secondary",
    "shadow-[inset_0px_-2px_0px_1px_rgba(0,0,0,0.08),0px_8px_8px_0px_rgba(54,122,255,0.03)]",
    "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_100%)]",
    "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_100%)]",
  ),
  ghost: "bg-transparent text-gray-500 hover:text-gray-600",
} satisfies Record<ButtonVariant, string>;

type ButtonSize = "sm" | "md" | "lg" | "unset";

const SIZE = {
  sm: "min-h-[27px] px-2 py-0.5 rounded-xl text-sm",
  md: "min-h-[42px] px-5 py-2 rounded-md text-base font-semibold",
  lg: "min-h-[54px] px-5 py-3 rounded-xl text-lg font-semibold leading-[120%] tracking-[-0.18px]",
  unset: "size-fit",
} satisfies Record<ButtonSize, string>;

export type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFullWidth?: boolean;
  isLoading?: boolean;
};

export type ButtonProps<T extends ElementType = "button"> = ButtonStyleProps & {
  as?: T;
} & ComponentPropsWithoutRef<T>;

const ButtonPolymorph = <T extends ElementType = "button">(
  props: ButtonProps<T>,
  ref: ForwardedRef<any>,
) => {
  const {
    variant = "filled",
    size = "md",
    className,
    as: Component = "button",
    isFullWidth,
    disabled,
    isLoading,
    ...rest
  } = props;

  return (
    <Component
      className={cn(
        "flex items-center justify-center gap-4 cursor-pointer select-none transition duration-300",
        VARIANT[variant],
        SIZE[size],
        disabled && "cursor-not-allowed opacity-50",
        isFullWidth && "w-full",
        isLoading && "cursor-wait opacity-50",
        className,
      )}
      disabled={isLoading || disabled}
      {...rest}
      ref={ref}
    />
  );
};

export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType = "button">(
  props: {
    ref?: ForwardedRef<ElementRef<T>>;
  } & ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
) => ReturnType<typeof ButtonPolymorph>;
