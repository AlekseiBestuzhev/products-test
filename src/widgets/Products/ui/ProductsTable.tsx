import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { productsTableColumns } from "../model/tableCols";
import type { Product } from "@/shared/api";
import { cn } from "@/shared/lib";

interface Props {
  products: Product[];
  isFetching?: boolean;
}

export const ProductsTable = ({ products, isFetching }: Props) => {
  const table = useReactTable({
    data: products,
    columns: productsTableColumns,
    enableRowSelection: true,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className={cn(
        "bg-white overflow-hidden",
        isFetching && "cursor-wait opacity-50 pointer-events-none",
      )}
    >
      <table className="w-full table-fixed text-sm">
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(header => (
                <th
                  key={header.id}
                  style={{ width: header.getSize() }}
                  align={header.id === "title" ? "left" : "center"}
                  className="px-3 py-6 border-b border-gray-300 relative text-gray-400"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      className="absolute right-0 top-0 h-full w-1 cursor-col-resize"
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className={cn(
                "border-b border-gray-300 hover:bg-gray-50 transition",
                "border-l-6 border-l-transparent hover:bg-gray-50 hover:border-l-blue-primary",
              )}
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="p-3"
                  align={cell.column.id === "title" ? "left" : "center"}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
