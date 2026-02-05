import { cn } from "@/shared/lib";
import logo from "@/shared/assets/logo.svg";
import { Button } from "@/shared/ui";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div
      className={cn(
        "w-full max-w-131.5 p-px rounded-[34px] shadow",
        "bg-[linear-gradient(180deg,rgba(35,35,35,0.08)_0%,#ffffff_100%)]",
        "relative border-6 border-white",
      )}
    >
      <div className="w-full px-14.5 py-12 rounded-[29px] bg-[linear-gradient(180deg,#f6f6f6_0%,#ffffff_60%)]">
        <img src={logo} className="mx-auto" />
        <h1 className="text-[40px] font-semibold leading-[110%] tracking-[-0.6px] text-center mb-3">
          Добро пожаловать!
        </h1>
        <h2 className="text-lg font-medium leading-[150%] text-center text-gray-400 mb-8">
          Пожалуйста авторизуйтесь
        </h2>
        <form className="flex flex-col gap-5">
          <label className="flex flex-col gap-1">
            Почта
            <input type="text" className="p-3 border-2 border-gray-dark rounded-xl" />
          </label>
          <label className="flex flex-col gap-1">
            Пароль
            <input type="text" className="p-3 border-2 border-gray-dark rounded-xl" />
          </label>
          <label className="flex gap-2 text-gray-400">
            <input type="checkbox" className="p-3 border-2 border-gray-dark rounded-xl" />
            Запомнить данные
          </label>
          <Button type="submit" size="lg">
            Войти
          </Button>
        </form>
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
          <Link to="/register" className="underline text-blue-primary font-semibold">
            Создать
          </Link>
        </p>
      </div>
    </div>
  );
};
