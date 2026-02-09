import { ROUTE_PATH } from "@/shared/constants";
import { useCheckAuth } from "@/features/auth";
import type { PropsWithChildren } from "react";
import { LoadingSpinner } from "@/shared/ui";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isLoading, isError } = useCheckAuth();

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (isError) {
    return <Navigate to={ROUTE_PATH.LOGIN} />;
  }

  return children;
};
