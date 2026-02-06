import { Button } from "@/shared/ui";
import { Component, type PropsWithChildren, type ErrorInfo } from "react";

type State = { hasError: boolean };

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col gap-12 items-center justify-center min-h-screen">
          <h1 className="text-[40px] font-semibold leading-[110%] tracking-[-0.6px] text-center mb-3 max-w-150">
            Произошла непредвиденная ошибка
          </h1>
          <Button
            onClick={() => window.location.reload()}
            size="lg"
            className="max-w-80"
            isFullWidth
          >
            Обновить
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
