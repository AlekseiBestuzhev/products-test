import { ROUTE_PATH } from "@/shared/constants";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12">
      <h1 className="text-3xl font-bold">404 - Страница не найдена</h1>
      <Button size="lg" as={Link} to={ROUTE_PATH.HOME} className="max-w-105" isFullWidth>
        Вернуться на главную
      </Button>
    </div>
  );
};
