import { SORT_FIELDS, FIELDS_RUS, SORT_ORDER } from "@/shared/constants";
import type { ProductsQueryParams } from "@/shared/api";
import * as Select from "@radix-ui/react-select";
import { useQueryParams } from "@/shared/lib";
import { SortIcon } from "@/shared/assets";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib";

type Option = {
  label: string;
  value: string;
};

const OPTIONS = Object.values(SORT_FIELDS).reduce((acc, field) => {
  acc.push(
    { label: `${FIELDS_RUS[field]} ↑`, value: `${field}:${SORT_ORDER.ASC}` },
    { label: `${FIELDS_RUS[field]} ↓`, value: `${field}:${SORT_ORDER.DESC}` },
  );
  return acc;
}, [] as Option[]);

export const SortSelect = () => {
  const { params, setParams } = useQueryParams<ProductsQueryParams>();
  const value = `${params.sortBy ?? ""}:${params.order ?? ""}`;

  return (
    <Select.Root
      value={value}
      onValueChange={v => {
        const [sortBy, order] = v.split(":");
        setParams({ sortBy, order } as ProductsQueryParams);
      }}
    >
      <Select.Trigger asChild>
        <Button variant="outlined" className="px-2">
          <SortIcon />
        </Button>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          onCloseAutoFocus={e => e.preventDefault()}
          className="p-2 bg-white shadow-lg rounded z-999"
          position="popper"
          align="end"
        >
          <Select.Viewport>
            {OPTIONS.map(({ value, label }) => (
              <Select.Item
                key={value}
                value={value}
                tabIndex={-1}
                className={cn(
                  "cursor-pointer px-2 py-1 rounded hover:bg-gray-100 outline-none",
                  "data-[state=checked]:font-semibold data-[state=checked]:text-blue-primary",
                )}
              >
                {label}
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
