import type { SortField, SortOrder } from "../constants/params";

export interface MeResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface Product {
  id: number;
  title: string;
  category: string;
  brand: string;
  sku: string;
  rating: number;
  price: number;
  stock: number;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductsQueryParams {
  q?: string;
  skip: number;
  limit: number;
  sortBy?: SortField;
  order?: SortOrder;
}

export type AddProductPayload = Pick<Product, "title" | "price" | "brand" | "sku">;

export interface UpdateProductData {
  id: number;
  data: Partial<AddProductPayload>;
}
