import type { ProductsQueryParams } from "@/shared/api";
import { useGetProducts } from "@/features/products";
import { ProductsTable } from "./ProductsTable";
import { useQueryParams } from "@/shared/lib";
import { LoadingSpinner } from "@/shared/ui";
import { useEffect } from "react";

export const Products = () => {
  const { params, setParams } = useQueryParams<ProductsQueryParams>();
  const { data, isLoading, isFetching } = useGetProducts(params);

  useEffect(() => {
    if (!Object.keys(params).length) {
      setParams({ skip: 0, limit: 10 });
    }
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center mt-10">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-10">
      <ProductsTable products={data?.data?.products || []} isFetching={isFetching} />
      {/* TODO pagination */}
    </div>
  );
};
