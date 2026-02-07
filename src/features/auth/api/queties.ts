import { tokenStorage, useInvalidateQueries } from "@/shared/lib";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS, ROUTE_PATH } from "@/shared/constants";
import { authAPI, type LoginPayload } from "@/shared/api";
import type { LoginFormData } from "../model/schema";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export const useCheckAuth = () => {
  const navigate = useNavigate();

  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: () =>
      authAPI.me().catch(error => {
        if (
          isAxiosError(error) &&
          error.response?.status === 401 &&
          window.location.pathname !== ROUTE_PATH.LOGIN
        ) {
          navigate(ROUTE_PATH.LOGIN);
          toast.error("Вы не авторизованы");
        }

        return Promise.reject(error);
      }),
  });
};

export const useLogin = () => {
  const invalidate = useInvalidateQueries();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginPayload & Pick<LoginFormData, "rememberMe">) =>
      authAPI.login({ password: data.password, username: data.username }),
    onSuccess: async (res, vars) => {
      tokenStorage.setRemember(vars.rememberMe);

      tokenStorage.set({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });

      await invalidate(QUERY_KEYS.USER);

      toast.success("Вы успешно авторизовались");
      navigate(ROUTE_PATH.HOME);
    },
    onError: err => {
      if (isAxiosError(err) && err.response?.status === 400) {
        toast.error("Неправильный логин или пароль");
      } else {
        toast.error("Что-то пошло не так");
      }
    },
  });
};

export const useLogout = () => {
  const invalidate = useInvalidateQueries();
  const navigate = useNavigate();

  return async () => {
    await navigate(ROUTE_PATH.LOGIN);
    tokenStorage.clear();
    toast.success("Вы успешно вышли из системы");
    invalidate(QUERY_KEYS.USER);
  };
};
