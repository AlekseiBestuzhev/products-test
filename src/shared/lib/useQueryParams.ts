import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";

interface SetOptions {
  replace?: boolean;
}

export function useQueryParams<T = Record<string, string>>() {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    const obj: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      obj[key] = value;
    });

    return obj as T;
  }, [searchParams]);

  const setParams = useCallback(
    (next: Partial<T>, options?: SetOptions) => {
      const merged = new URLSearchParams(searchParams);

      Object.entries(next).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          merged.delete(key);
        } else {
          merged.set(key, String(value));
        }
      });

      setSearchParams(merged, { replace: options?.replace });
    },
    [searchParams, setSearchParams],
  );

  return { params, setParams } as const;
}
