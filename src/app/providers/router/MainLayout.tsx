import { useLogout } from "@/features/auth";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const logout = useLogout();

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
        <div className="flex gap-1">
          <div className="h-6 w-50 bg-gray-200" />
          <button className="px-2 border border-gray-200 cursor-pointer" onClick={logout}>
            logout
          </button>
        </div>
      </header>
      <main className="flex-1 bg-white rounded-xl p-7.5">
        <Outlet />
      </main>
    </div>
  );
};
