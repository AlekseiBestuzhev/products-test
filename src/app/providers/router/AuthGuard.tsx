import { useCheckAuth } from "@/features/auth";
import { LoadingSpinner } from "@/shared/ui";
import { Outlet } from "react-router-dom";

export const AuthGuard = () => {
  const { isLoading } = useCheckAuth();

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  return <Outlet />;
};
