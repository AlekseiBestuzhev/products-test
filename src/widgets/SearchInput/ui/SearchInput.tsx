import { memo, useEffect, useState, type ComponentPropsWithoutRef } from "react";
import { SearchIcon } from "@/shared/assets";
import { useDebounce } from "@/shared/lib";
import { Input } from "@/shared/ui/Input";

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "onChange" | "value" | "type">;

type SearchInputProps = InputProps & {
  onChange: (value: string) => void;
  defaultValue?: string;
  wrapperClassName?: string;
  delay?: number;
};

export const SearchInput = memo((props: SearchInputProps) => {
  const {
    placeholder = "Найти",
    defaultValue = "",
    wrapperClassName,
    delay = 1500,
    onChange,
    ...restProps
  } = props;
  const [value, setValue] = useState(defaultValue);
  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <Input
      type="search"
      value={value}
      onChange={e => setValue(e.target.value)}
      iconSlot={<SearchIcon />}
      wrapperClassName={wrapperClassName}
      placeholder={placeholder}
      {...restProps}
    />
  );
});

SearchInput.displayName = "SearchInput";
