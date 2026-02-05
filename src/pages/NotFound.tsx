import { ROUTE_PATH } from "@/shared/constants";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center gap-5 mt-20">
      <h1 className="text-3xl font-bold">404 - Страница не найдена</h1>
      <Button size="lg" as={Link} to={ROUTE_PATH.PRODUCTS}>
        Вернуться к продуктам
      </Button>
    </div>
  );
};
