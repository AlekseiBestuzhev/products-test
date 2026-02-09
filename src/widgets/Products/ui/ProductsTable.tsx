import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { SORT_ORDER, type SortField, type SortOrder } from "@/shared/constants";
import type { Product, ProductsQueryParams } from "@/shared/api";
import { productsTableColumns } from "../model/tableCols";
import { cn } from "@/shared/lib";

const toggleSortOrder = (current?: SortOrder): SortOrder => {
  return current === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC;
};

interface Props {
  products?: Product[];
  isFetching?: boolean;
  sortBy?: SortField;
  sortOrder?: SortOrder;
  setParams: (params: ProductsQueryParams) => void;
}

export const ProductsTable = ({ products, isFetching, sortBy, sortOrder, setParams }: Props) => {
  const handleSort = (field: SortField) => {
    setParams({
      sortBy: field,
      order: sortBy === field ? toggleSortOrder(sortOrder) : SORT_ORDER.ASC,
    } as ProductsQueryParams);
  };

  const table = useReactTable({
    data: products ?? [],
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
              {hg.headers.map(header => {
                const field = header.column.id as SortField;
                const isSortable = header.column.getCanSort();
                const isSorted = sortBy === field;
                const columnTitle = flexRender(header.column.columnDef.header, header.getContext());

                return (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    align={header.id === "title" ? "left" : "center"}
                    className="px-3 py-6 border-b border-gray-300 relative text-gray-400"
                  >
                    {isSortable ? (
                      <button
                        onClick={() => handleSort(field)}
                        className={cn(isSortable && "cursor-pointer")}
                      >
                        {columnTitle}
                      </button>
                    ) : (
                      columnTitle
                    )}

                    {isSorted && (
                      <span className="text-xs pl-2">
                        {sortOrder === SORT_ORDER.ASC ? "↑" : "↓"}
                      </span>
                    )}

                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        className="absolute right-0 top-0 h-full w-1 cursor-col-resize"
                      />
                    )}
                  </th>
                );
              })}
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
