import { type PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col gap-8 p-5">
      <header className="bg-white flex items-center justify-between py-5.5 px-7.5 rounded-xl">
        <h1 className="text-2xl font-bold">Товары</h1>
        <input
          type="search"
          className="py-3 px-5 bg-gray-primary rounded-xl text-gray-500"
          placeholder="Найти"
        />
        <div className="h-14 w-px bg-gray-200" role="separator" />
        <div className="h-6 w-50 bg-gray-200" />
      </header>
      <main className="flex-1 bg-white rounded-xl p-7.5">{children}</main>
    </div>
  );
};
