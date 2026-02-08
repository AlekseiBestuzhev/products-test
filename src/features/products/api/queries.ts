import { productsAPI, type ProductsQueryParams } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants";

export const useGetProducts = (params: ProductsQueryParams) => {
  return useQuery({
    queryKey: [
      QUERY_KEYS.PRODUCTS,
      ...Object.entries(params).map(([key, value]) => `${key}=${value}`),
    ],
    queryFn: () => productsAPI.get(params),
    enabled: Object.keys(params).length > 0,
  });
};
