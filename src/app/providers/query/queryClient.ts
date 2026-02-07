import { QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (isAxiosError(error) && (error.response?.status ?? 0) >= 500) {
          return failureCount < 3;
        }
        return false;
      },
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});
