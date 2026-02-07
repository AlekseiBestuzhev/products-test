import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./providers/query";
import { Router } from "./providers/router";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ToastContainer
        limit={5}
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnFocusLoss
        pauseOnHover
      />
    </QueryClientProvider>
  );
};
