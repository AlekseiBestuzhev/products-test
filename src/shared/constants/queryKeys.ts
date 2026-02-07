export const QUERY_KEYS = {
  USER: "user",
  PRODUCTS: "products",
} as const;

export type QueryKey = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
