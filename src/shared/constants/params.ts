export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

export const SORT_FIELDS = {
  TITLE: "title",
  BRAND: "brand",
  RATING: "rating",
  PRICE: "price",
  STOCK: "stock",
} as const;

export type SortField = (typeof SORT_FIELDS)[keyof typeof SORT_FIELDS];

const REST_FIELDS = {
  SELECT: "select",
  ACTIONS: "actions",
  SKU: "sku",
} as const;

export const FIELDS_COLS = {
  ...SORT_FIELDS,
  ...REST_FIELDS,
} as const;

export const FIELDS_RUS = {
  [SORT_FIELDS.TITLE]: "Наименование",
  [SORT_FIELDS.BRAND]: "Вендор",
  [SORT_FIELDS.RATING]: "Оценка",
  [SORT_FIELDS.PRICE]: "Цена, ₽",
  [SORT_FIELDS.STOCK]: "Количество",
  [REST_FIELDS.SKU]: "Артикул",
  [REST_FIELDS.SELECT]: "",
  [REST_FIELDS.ACTIONS]: "",
} as const;
