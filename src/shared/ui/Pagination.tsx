import { useMemo, useCallback } from "react";
import { Button } from "./Button";
import { cn } from "../lib";

type PaginationProps = {
  total?: number;
  limit?: number;
  buttonCount?: number;
  skip: number;
  onChange: (skip: number) => void;
};

export const Pagination = (props: PaginationProps) => {
  const { total = 0, limit = 10, buttonCount = 5, skip, onChange } = props;
  const pages = useMemo(() => Math.ceil(total / limit), [total, limit]);
  const current = useMemo(() => Math.floor(skip / limit), [skip, limit]);

  const goTo = useCallback(
    (page: number) => {
      if (page < 0 || page >= pages) return;
      onChange(page * limit);
    },
    [pages, limit, onChange],
  );

  const visible = useMemo(() => {
    const half = Math.floor(buttonCount / 2);

    let start = current - half;
    let end = current + half + 1;

    if (start < 0) {
      end += -start;
      start = 0;
    }

    if (end > pages) {
      start -= end - pages;
      end = pages;
    }

    start = Math.max(0, start);

    return Array.from({ length: end - start }, (_, i) => start + i);
  }, [current, pages, buttonCount]);

  const { from, to } = useMemo(() => {
    const from = total === 0 ? 0 : Number(skip) + 1;
    const to = Math.min(skip + limit, total);
    return { from, to };
  }, [skip, limit, total]);

  if (pages <= 1) return null;

  return (
    <div className="w-full flex items-center gap-6 justify-between">
      <div className="text-sm text-gray-400">
        Показано{" "}
        <span className="text-black">
          {from}-{to}
        </span>{" "}
        из <span className="text-black">{total}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="unset"
          variant="ghost"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
        >
          {"<"}
        </Button>

        {visible.map(page => {
          const isCurrent = page === current;

          return (
            <Button
              key={page}
              size="unset"
              variant={isCurrent ? "filled" : "outlined"}
              className={cn(
                "size-7.5 p-1 text-sm rounded",
                isCurrent && "bg-[#797FEA] border-[#797FEA]",
              )}
              onClick={() => goTo(page)}
            >
              {page + 1}
            </Button>
          );
        })}

        <Button
          size="unset"
          variant="ghost"
          onClick={() => goTo(current + 1)}
          disabled={current === pages - 1}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
};
