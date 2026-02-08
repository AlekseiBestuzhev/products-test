import type { ProductsQueryParams } from "@/shared/api";
import { SearchInput } from "@/widgets/SearchInput";
import { useQueryParams } from "@/shared/lib";
import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/Header";
import { useCallback } from "react";

export const MainLayout = () => {
  const { params, setParams } = useQueryParams<ProductsQueryParams>();
  const handleSearch = useCallback((q: string) => setParams({ q }), [setParams]);

  return (
    <div className="min-h-screen flex flex-col gap-8 p-5 max-w-490 m-auto ">
      <Header>
        <>
          <SearchInput
            defaultValue={params.q}
            onChange={handleSearch}
            wrapperClassName="w-full max-w-255"
            className="bg-gray-primary py-2.5 border-transparent"
          />
          <div className="h-14 w-px bg-gray-300" role="separator" />
        </>
      </Header>
      <main className="flex-1 bg-white rounded-xl p-7.5">
        <Outlet />
      </main>
    </div>
  );
};
