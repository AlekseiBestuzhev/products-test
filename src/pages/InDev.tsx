import { GearIcon } from "@/shared/assets";
import { ROUTE_PATH } from "@/shared/constants";
import { Button } from "@/shared/ui";
import { Link } from "react-router-dom";

export const InDev = () => {
  return (
    <div className="flex flex-col gap-4">
      <GearIcon className="mx-auto fill-gray-500" />
      <h1 className="text-[40px] font-semibold leading-[110%] tracking-[-0.6px] text-center">
        Страница в разработке
      </h1>
      <h2 className="text-lg font-medium leading-[150%] text-center text-gray-400 mb-12">
        Регистрация временно недоступна
      </h2>
      <Button as={Link} to={ROUTE_PATH.LOGIN} size="lg">
        Вернуться к авторизации
      </Button>
    </div>
  );
};
