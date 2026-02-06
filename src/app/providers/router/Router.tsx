import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { Products, Login, NotFound, InDev } from "@/pages";
import { ROUTE_PATH } from "@/shared/constants";
import { ErrorBoundary } from "./ErrorBoundary";
import { AuthLayout } from "./LoginLayout";
import { MainLayout } from "./MainLayout";

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    ),
    children: [
      {
        path: ROUTE_PATH.HOME,
        element: <Navigate to={ROUTE_PATH.PRODUCTS} replace />,
      },
      {
        path: ROUTE_PATH.LOGIN,
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: ROUTE_PATH.REGISTER,
        element: (
          <AuthLayout>
            <InDev />
          </AuthLayout>
        ),
      },
      {
        path: ROUTE_PATH.PRODUCTS,
        element: (
          <MainLayout>
            <Products />
          </MainLayout>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
