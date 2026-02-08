import { ProductsTableRow } from "./ProductsTableRow";
import type { Product } from "@/shared/api";
import { cn } from "@/shared/lib";
import { Checkbox } from "@/shared/ui/Checkbox";
import { useState } from "react";

const COMMON_CLASSES = "px-3 py-6 border-b border-b-gray-300";

interface ProductsTableProps {
  products: Product[];
  isFetching?: boolean;
}

export const ProductsTable = ({ products, isFetching }: ProductsTableProps) => {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    setSelected(prev => (prev.length === products.length ? [] : products.map(x => x.id)));
  };

  return (
    <div
      className={cn(
        "bg-white overflow-hidden",
        isFetching && "cursor-wait opacity-50 pointer-events-none",
      )}
    >
      <table className="w-full text-left text-sm">
        <thead className="text-gray-400 text-base">
          <tr>
            <th className="px-3 py-6 pl-3.5 border-b border-b-gray-300">
              <Checkbox checked={selected.length === products.length} onChange={toggleSelectAll} />
            </th>
            <th className="px-3 py-6 border-b border-b-gray-300">Наименование</th>
            <th align="center" className={COMMON_CLASSES}>
              Вендор
            </th>
            <th align="center" className={COMMON_CLASSES}>
              Артикул
            </th>
            <th align="center" className={COMMON_CLASSES}>
              Оценка
            </th>
            <th align="center" className={COMMON_CLASSES}>
              Цена, ₽
            </th>
            <th align="center" className={COMMON_CLASSES}>
              Количество
            </th>
            <th className={COMMON_CLASSES} />
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <ProductsTableRow
              key={p.id}
              product={p}
              selected={selected.includes(p.id)}
              onSelect={toggleSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
