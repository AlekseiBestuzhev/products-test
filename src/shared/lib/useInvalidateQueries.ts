import { useQueryClient } from "@tanstack/react-query";
import type { QueryKey } from "../constants";

/**
 * Хук для инвалидации запросов TanStack Query по ключам приложения.
 *
 * Принимает один ключ или массив ключей из QUERY_KEYS
 * и помечает соответствующие запросы как устаревшие и выполняется повторный запрос.
 *
 * Примеры:
 * invalidate(QUERY_KEYS.USER)
 * invalidate([QUERY_KEYS.USER, QUERY_KEYS.PRODUCTS])
 *
 * @returns {(keys: QueryKey | QueryKey[]) => Promise<void[]>}
 */

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  return (keys: QueryKey | QueryKey[]) => {
    const list = Array.isArray(keys) ? keys : [keys];

    return Promise.all(list.map(key => queryClient.invalidateQueries({ queryKey: [key] })));
  };
};
