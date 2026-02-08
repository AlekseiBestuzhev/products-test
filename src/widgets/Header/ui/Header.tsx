import type { PropsWithChildren } from "react";
import { useMenu } from "../model/useMenu";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib";

export const Header = ({ children }: PropsWithChildren) => {
  const menuItems = useMenu();

  return (
    <header className="bg-white flex items-center gap-6 justify-between py-5.5 px-7.5 rounded-xl">
      <h1 className="text-2xl font-bold">Товары</h1>
      {children}
      <ul className="flex gap-3.5 items-center">
        {Object.entries(menuItems).map(([key, value]) => {
          return (
            <li key={key} className="relative">
              {value?.count && (
                <p
                  className={cn(
                    "absolute top-0 right-0 size-5.5 rounded-full flex items-center justify-center",
                    "text-sm bg-blue-secondary text-white outline-3 outline-white",
                  )}
                >
                  {value.count}
                </p>
              )}
              <Button
                variant="ghost"
                size="unset"
                onClick={value.onClick}
                title={value.title}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {value.icon}
              </Button>
            </li>
          );
        })}
      </ul>
    </header>
  );
};
