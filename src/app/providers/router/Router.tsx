import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, NotFound, InDev } from "@/pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { ROUTE_PATH } from "@/shared/constants";
import { ErrorBoundary } from "./ErrorBoundary";
import { AuthLayout } from "./LoginLayout";
import { MainLayout } from "./MainLayout";

const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTE_PATH.LOGIN,
            element: <Login />,
          },
          {
            path: ROUTE_PATH.REGISTER,
            element: <InDev />,
          },
        ],
      },
      {
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: ROUTE_PATH.HOME,
            element: <Home />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
