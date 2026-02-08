import { useGetProducts } from "@/features/products";
import { ProductsTable } from "./ProductsTable";
import { LoadingSpinner } from "@/shared/ui";

export const Products = () => {
  const { data, isLoading, isFetching } = useGetProducts();

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
