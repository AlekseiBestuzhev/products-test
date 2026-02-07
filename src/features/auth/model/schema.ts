import { REQUIRED_FIELD } from "@/shared/constants";
import z from "zod";

export const loginSchema = z.object({
  // email: z.email("Некорректный адрес электронной почты"),
  // в макете почта, но апи требует имя пользователя
  username: z.string().min(1, REQUIRED_FIELD),
  password: z.string().min(1, REQUIRED_FIELD),
  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
