import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useInvalidateQueries } from "@/shared/lib";
import { QUERY_KEYS } from "@/shared/constants";
import { toast } from "react-toastify";
import {
  type ProductsQueryParams,
  type AddProductPayload,
  type UpdateProductData,
  productsAPI,
} from "@/shared/api";

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

export const useUpdateProduct = () => {
  const invalidate = useInvalidateQueries();

  return useMutation({
    mutationFn: (payload: UpdateProductData) => productsAPI.update(payload),
    onSuccess: () => {
      toast.success("Продукт успешно обновлен");
      invalidate(QUERY_KEYS.PRODUCTS);
    },
    onError: () => toast.error("Что-то пошло не так, не удалось обновить продукт"),
  });
};
