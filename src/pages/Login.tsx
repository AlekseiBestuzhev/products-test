import { cn } from "@/shared/lib";
import { Link } from "react-router-dom";
import { LogoIcon } from "@/shared/assets";
import { LoginForm } from "@/features/login";
import { ROUTE_PATH } from "@/shared/constants";

export const Login = () => {
  return (
    <>
      <LogoIcon className="mx-auto mb-8 rounded-full shadow-xl/5" />
      <h1 className="text-[40px] font-semibold leading-[110%] tracking-[-0.6px] text-center mb-3">
        Добро пожаловать!
      </h1>
      <h2 className="text-lg font-medium leading-[150%] text-center text-gray-400 mb-8">
        Пожалуйста авторизуйтесь
      </h2>
      <LoginForm />
      <p
        className={cn(
          "text-sm text-center text-gray-400 mt-4 mb-10 flex gap-4 items-center",
          "before:content-[''] before:inline-block before:w-full before:h-px before:bg-gray-200 before:mr-2 before:align-middle",
          "after:content-[''] after:inline-block after:w-full after:h-px after:bg-gray-200 after:ml-2 after:align-middle",
        )}
      >
        или
      </p>
      <p className="text-center text-gray-400">
        Нет аккаунта?{" "}
        <Link to={ROUTE_PATH.REGISTER} className="underline text-blue-primary font-semibold">
          Создать
        </Link>
      </p>
    </>
  );
};
