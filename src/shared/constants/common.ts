import type { ProductsQueryParams } from "../api";
import { SORT_FIELDS, SORT_ORDER } from "./params";

export const REQUIRED_FIELD = "Обязательное поле";

export const DEFAULT_QUERY_PARAMS: ProductsQueryParams = {
  skip: 0,
  limit: 10,
  sortBy: SORT_FIELDS.TITLE,
  order: SORT_ORDER.ASC,
};
