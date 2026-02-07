import { Button, ControlledInput, ControlledCheckbox } from "@/shared/ui";
import { loginSchema, type LoginFormData } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, UserIcon } from "@/shared/assets";
import { useForm } from "react-hook-form";

const defaultValues: LoginFormData = {
  username: "",
  password: "",
  rememberMe: false,
};

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { control, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        name="username"
        control={control}
        label="Имя пользователя"
        iconSlot={<UserIcon />}
      />

      <ControlledInput
        name="password"
        control={control}
        type="password"
        label="Пароль"
        iconSlot={<LockIcon />}
      />

      <ControlledCheckbox name="rememberMe" control={control} label="Запомнить данные" />

      <Button type="submit" size="lg" isLoading={formState.isSubmitting}>
        Войти
      </Button>
    </form>
  );
};
