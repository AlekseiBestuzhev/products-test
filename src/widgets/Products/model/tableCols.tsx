import { createColumnHelper } from "@tanstack/react-table";
import { PlusIcon, ExtraIcon } from "@/shared/assets";
import { getCategoryLabel } from "./categories";
import { Checkbox, Button } from "@/shared/ui";
import type { Product } from "@/shared/api";
import { cn } from "@/shared/lib";

const columnHelper = createColumnHelper<Product>();

export const productsTableColumns = [
  columnHelper.display({
    id: "select",
    size: 44,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
        containerClassName="ml-1"
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
    ),
  }),

  columnHelper.accessor("title", {
    header: "Наименование",
    size: 270,
    cell: ({ row }) => {
      const p = row.original;

      return (
        <div className="flex items-center gap-3">
          <img src={p.images[0]} className="size-12 rounded bg-gray-200 object-cover shrink-0" />

          <div>
            <h6 className="font-bold">{p.title}</h6>
            <p className="text-sm text-gray-400">{getCategoryLabel(p.category)}</p>
          </div>
        </div>
      );
    },
  }),

  columnHelper.accessor("brand", {
    header: "Вендор",
    cell: info => <span className="font-bold">{info.getValue()}</span>,
  }),

  columnHelper.accessor("sku", {
    header: "Артикул",
  }),

  columnHelper.accessor("rating", {
    header: "Оценка",
    cell: info => {
      const r = info.getValue();
      return (
        <p>
          <span className={cn(r < 4 && "text-red-600")}>
            {(Math.floor(r * 10) / 10).toFixed(1)}
          </span>
          /5
        </p>
      );
    },
  }),

  columnHelper.accessor("price", {
    header: "Цена, ₽",
    cell: info => {
      const [int, frac = "00"] = info
        .getValue()
        .toLocaleString("ru-RU", { minimumFractionDigits: 2 })
        .split(",");

      return (
        <span>
          {int}
          <span className="text-gray-400">,{frac}</span>
        </span>
      );
    },
  }),

  columnHelper.accessor("stock", {
    header: "Количество",
    cell: info => {
      const stock = info.getValue();
      return (
        <div className="w-fit flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "w-1.5 h-4 rounded",
                i < Math.min(3, Math.ceil(stock / 10)) ? "bg-gray-400" : "bg-gray-200",
              )}
            />
          ))}
        </div>
      );
    },
  }),

  columnHelper.display({
    id: "actions",
    header: "",
    size: 106,
    cell: () => (
      <div className="flex gap-6 items-center w-fit">
        <Button size="sm" className="px-3 py-0">
          <PlusIcon />
        </Button>
        <Button variant="ghost" size="unset">
          <ExtraIcon />
        </Button>
      </div>
    ),
  }),
];
