import { Component, type PropsWithChildren, type ErrorInfo } from "react";

type State = { hasError: boolean };

export default class ErrorBoundary extends Component<PropsWithChildren, State> {
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
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold text-red-600">Произошла непредвиденная ошибка</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
