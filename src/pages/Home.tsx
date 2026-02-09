import { PlusCircleIcon, ReloadIcon } from "@/shared/assets";
import { useInvalidateQueries } from "@/shared/lib";
import { QUERY_KEYS } from "@/shared/constants";
import { SortSelect } from "@/widgets/SortSelect";
import { Products } from "@/widgets/Products";
import { Button } from "@/shared/ui";
import { useState } from "react";

export const Home = () => {
  const invalidate = useInvalidateQueries();
  const [isAdding, setIsAdding] = useState(false);

  return (
    <section className="flex flex-col gap-10">
      <div className="flex items-center gap-10 justify-between">
        <h2 className="text-xl font-bold">Все позиции</h2>
        <div className="flex items-center gap-4">
          <Button
            variant="outlined"
            className="px-2"
            onClick={() => invalidate(QUERY_KEYS.PRODUCTS)}
          >
            <ReloadIcon />
          </Button>
          <SortSelect />
          <Button onClick={() => setIsAdding(true)}>
            <PlusCircleIcon /> Добавить
          </Button>
        </div>
      </div>
      <Products isAdding={isAdding} setIsAdding={setIsAdding} />
    </section>
  );
};
