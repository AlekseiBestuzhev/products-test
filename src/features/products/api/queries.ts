import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants";
import { productsAPI } from "@/shared/api";

export const useGetProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: () => productsAPI.get(),
  });
};
