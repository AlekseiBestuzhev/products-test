import { useRef, useEffect } from "react";

interface UseClickOutsideArgs {
  cb: () => void;
  isEnabled: boolean;
}

export const useClickOutside = ({ cb, isEnabled }: UseClickOutsideArgs) => {
  const wrapperRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (!isEnabled) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Node && !wrapperRef.current?.contains(e.target)) {
        cb();
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isEnabled]);

  return wrapperRef;
};
