import { cn } from "@/shared/lib";
import { Link } from "react-router-dom";
import { Button, Input, Checkbox } from "@/shared/ui";
import { LockIcon, LogoIcon, MailIcon } from "@/shared/assets";

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
        <LogoIcon className="mx-auto mb-8 rounded-full shadow-xl/5" />
        <h1 className="text-[40px] font-semibold leading-[110%] tracking-[-0.6px] text-center mb-3">
          Добро пожаловать!
        </h1>
        <h2 className="text-lg font-medium leading-[150%] text-center text-gray-400 mb-8">
          Пожалуйста авторизуйтесь
        </h2>
        <form className="flex flex-col gap-5">
          <Input type="email" label="Почта" iconSlot={<MailIcon />} value={142234} />
          <Input type="password" label="Пароль" iconSlot={<LockIcon />} value={142234} />
          <Checkbox label="Запомнить данные" />
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
