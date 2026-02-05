import { type PropsWithChildren } from "react";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return <div className="flex items-center justify-center min-h-screen bg-gray-50">{children}</div>;
};
