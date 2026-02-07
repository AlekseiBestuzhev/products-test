import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, NotFound, InDev } from "@/pages";
import { ROUTE_PATH } from "@/shared/constants";
import { ErrorBoundary } from "./ErrorBoundary";
import { AuthLayout } from "./LoginLayout";
import { MainLayout } from "./MainLayout";
import { AuthGuard } from "./AuthGuard";

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <AuthGuard />
      </ErrorBoundary>
    ),
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
        element: <MainLayout />,
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
