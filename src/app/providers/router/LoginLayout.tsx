import { type PropsWithChildren } from "react";
import { cn } from "@/shared/lib";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div
        className={cn(
          "w-full max-w-131.5 p-px rounded-[34px] shadow",
          "bg-[linear-gradient(180deg,rgba(35,35,35,0.08)_0%,#ffffff_100%)]",
          "relative border-6 border-white",
        )}
      >
        <section className="w-full px-14.5 py-12 rounded-[29px] bg-[linear-gradient(180deg,#f6f6f6_0%,#ffffff_60%)]">
          {children}
        </section>
      </div>
    </div>
  );
};
