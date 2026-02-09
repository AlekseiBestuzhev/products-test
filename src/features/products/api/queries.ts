import { productsAPI, type AddProductPayload, type ProductsQueryParams } from "@/shared/api";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants";
import { useInvalidateQueries } from "@/shared/lib";
import { toast } from "react-toastify";

export const useGetProducts = (params: ProductsQueryParams) => {
  return useQuery({
    queryKey: [
      QUERY_KEYS.PRODUCTS,
      ...Object.entries(params).map(([key, value]) => `${key}=${value}`),
    ],
    queryFn: () => productsAPI.get(params),
    enabled: Object.keys(params).length > 0,
    placeholderData: keepPreviousData,
  });
};

export const useAddProduct = () => {
  const invalidate = useInvalidateQueries();

  return useMutation({
    mutationFn: (data: AddProductPayload) => productsAPI.add(data),
    onSuccess: () => {
      toast.success("Продукт успешно добавлен");
      invalidate(QUERY_KEYS.PRODUCTS);
    },
    onError: () => toast.error("Что-то пошло не так, не удалось добавить продукт"),
  });
};
