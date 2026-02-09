import axios, { type AxiosResponse } from "axios";
import { tokenStorage } from "../lib";
import type {
  ProductsQueryParams,
  AddProductPayload,
  UpdateProductData,
  ProductsResponse,
  LoginPayload,
  MeResponse,
  Product,
} from "./types";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true,
  // при включеном флаге падают CORS ошибки для всех запросов /auth
  // https://github.com/Ovi/DummyJSON/issues/100 тут рекомендуют убрать флаг
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(config => {
  const tokens = tokenStorage.get();

  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }

  return config;
});

let isRefreshing = false;
let queue: (() => void)[] = [];

const resolveQueue = () => {
  queue.forEach(cb => cb());
  queue = [];
};

axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise(resolve => {
        queue.push(() => resolve(axiosInstance(original)));
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const tokens = tokenStorage.get();

      const { data } = await axios.post(
        "/auth/refresh",
        { refreshToken: tokens?.refreshToken ?? "" },
        { baseURL: import.meta.env.VITE_API_URL },
      );

      tokenStorage.set({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      resolveQueue();

      return axiosInstance(original);
    } catch (e) {
      tokenStorage.clear();
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  },
);

export const authAPI = {
  me: async (): Promise<AxiosResponse<MeResponse>> => {
    return await axiosInstance.get<MeResponse>("/auth/me");
  },
  login: async (payload: LoginPayload): Promise<AxiosResponse<MeResponse>> => {
    return await axiosInstance.post<MeResponse>("/auth/login", payload);
  },
};

export const productsAPI = {
  get: async (params?: ProductsQueryParams): Promise<AxiosResponse<ProductsResponse>> => {
    return await axiosInstance.get("/products/search", { params });
  },
  add: async (data: AddProductPayload): Promise<AxiosResponse<Product>> => {
    return await axiosInstance.post("/products/add", data);
  },
  update: async ({ id, data }: UpdateProductData): Promise<AxiosResponse<Product>> => {
    return await axiosInstance.patch(`/products/${id}`, data);
  },
};
