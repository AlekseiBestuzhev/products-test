export const LoadingSpinner = () => {
  return (
    <span
      className="w-10 h-10 border-4 border-t-blue-primary border-gray-300 rounded-full animate-spin"
      role="status"
    />
  );
};

export const TopLoader = () => {
  return (
    <>
      <style>{`
        @keyframes loading-bar {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="fixed top-0 left-0 right-0 h-1.5 bg-gray-200/70 dark:bg-gray-700/50 overflow-hidden z-[9999] pointer-events-none transition-opacity duration-400">
        <div className="h-full w-full bg-blue-600 animate-[loading-bar_1.2s_linear_infinite]" />
      </div>
    </>
  );
};
