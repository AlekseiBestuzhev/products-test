import { PlusCircleIcon, ReloadIcon, SortIcon } from "@/shared/assets";
import { QUERY_KEYS } from "@/shared/constants";
import { useInvalidateQueries } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { Products } from "@/widgets/Products";

export const Home = () => {
  const invalidate = useInvalidateQueries();

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
          <Button variant="outlined" className="px-2">
            <SortIcon />
          </Button>
          <Button>
            <PlusCircleIcon /> Добавить
          </Button>
        </div>
      </div>
      <Products />
    </section>
  );
};
