import { BellIcon, LogoutIcon, MailIcon, SettingsIcon, WebIcon } from "@/shared/assets";
import { useLogout } from "@/features/auth";
import type { ReactNode } from "react";

interface MenuItem {
  icon: ReactNode;
  title: string;
  count?: number;
  onClick?: () => void;
}

export const useMenu = (): Record<string, MenuItem> => {
  const logout = useLogout();

  return {
    LANGUAGE: {
      icon: <WebIcon />,
      title: "Язык",
    },
    NOTIFICATIONS: {
      icon: <BellIcon />,
      title: "Уведомления",
      count: 12,
    },
    MAIL: {
      icon: <MailIcon />,
      title: "Почта",
    },
    SETTINGS: {
      icon: <SettingsIcon />,
      title: "Настройки",
    },
    LOGOUT: {
      icon: <LogoutIcon />,
      title: "Выход",
      onClick: logout,
    },
  };
};
