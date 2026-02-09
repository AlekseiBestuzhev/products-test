import { LoadingSpinner, Pagination, TopLoader } from "@/shared/ui";
import { AddProductRow, useAddProduct, useGetProducts } from "@/features/products";
import { DEFAULT_QUERY_PARAMS } from "@/shared/constants";
import type { AddProductPayload, ProductsQueryParams } from "@/shared/api";
import { ProductsTable } from "./ProductsTable";
import { useQueryParams } from "@/shared/lib";
import { useEffect } from "react";

interface Props {
  setIsAdding: (value: boolean) => void;
  isAdding: boolean;
}

export const Products = ({ setIsAdding, isAdding }: Props) => {
  const { params, setParams } = useQueryParams<ProductsQueryParams>();
  const { data, isLoading, isFetching } = useGetProducts(params);
  const { mutateAsync, isPending: isAddingPending } = useAddProduct();

  const isDataExists = Boolean(data?.data?.products?.length);

  const addProductHandler = async (data: AddProductPayload) => {
    await mutateAsync(data);
    setIsAdding(false);
  };

  useEffect(() => {
    if (!Object.keys(params)?.length) {
      setParams(DEFAULT_QUERY_PARAMS);
    }
  }, []);

  if ((isFetching && !isDataExists) || isLoading)
    return (
      <div className="flex justify-center mt-10">
        <LoadingSpinner />
      </div>
    );

  if (!isDataExists) {
    return <h6 className="text-center text-gray-400 text-xl">Ничего не найдено</h6>;
  }

  return (
    <div className="flex flex-col gap-10">
      {(isAddingPending || isFetching) && !isLoading && <TopLoader />}

      <ProductsTable
        products={data?.data?.products}
        isFetching={isFetching}
        sortBy={params?.sortBy}
        sortOrder={params?.order}
        setParams={setParams}
      >
        {isAdding && (
          <AddProductRow onCancel={() => setIsAdding(false)} onCreate={addProductHandler} />
        )}
      </ProductsTable>

      <Pagination
        total={data?.data?.total}
        limit={data?.data?.limit}
        skip={params?.skip}
        onChange={skip => setParams({ skip })}
      />
    </div>
  );
};
