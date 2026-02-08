import type { Product } from "@/shared/api";
import { ExtraIcon, PlusIcon } from "@/shared/assets";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { Checkbox } from "@/shared/ui/Checkbox";

interface ProductsTableRowProps {
  product: Product;
  selected?: boolean;
  onSelect?: (id: number) => void;
}

export const ProductsTableRow = ({ product, selected, onSelect }: ProductsTableRowProps) => {
  const lowRating = product.rating < 4;

  return (
    <tr
      className={cn(
        "border-b border-b-gray-300 transition border-l-6 border-l-transparent",
        "hover:bg-gray-50 hover:border-l-blue-primary",
      )}
    >
      <td className="px-3 py-3 max-w-5 w-5">
        <Checkbox checked={selected} onChange={() => onSelect?.(product.id)} />
      </td>

      <td className="px-3 py-3 max-w-62">
        <div className="flex items-center gap-3">
          <img
            src={product.images[0]}
            alt="product image"
            className="size-12 rounded bg-gray-200 object-cover"
          />

          <div className="flex flex-col gap-1">
            <h6 className="font-bold">{product.title}</h6>
            <p className="text-sm text-gray-400">{product.category}</p>
          </div>
        </div>
      </td>

      <td align="center" className="px-3 font-bold">
        {product.brand}
      </td>

      <td align="center" className="px-3 text-black">
        {product.sku}
      </td>

      <td align="center" className="px-3">
        <span className={cn(lowRating && "text-red-600")}>{product.rating.toFixed(1)}</span>/5
      </td>

      <td align="center" className="px-3">
        {product.price.toLocaleString("ru-RU")} ₽
      </td>

      <td align="center" className="px-3">
        <div className="w-fit flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "w-1.5 h-4 rounded",
                i < Math.min(3, Math.ceil(product.stock / 10)) ? "bg-gray-400" : "bg-gray-200",
              )}
            />
          ))}
        </div>
      </td>

      <td align="right" className="px-3">
        <div className="w-fit flex items-center gap-8">
          <Button size="sm" className="px-3">
            <PlusIcon />
          </Button>

          <Button size="unset" variant="ghost">
            <ExtraIcon />
          </Button>
        </div>
      </td>
    </tr>
  );
};
