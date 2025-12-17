import * as React from "react";

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState;
  public props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    return { hasError: true, error: errorObj };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      let errorMessage = "Unknown error occurred";
      try {
        if (this.state.error) {
          if (typeof this.state.error === "string") {
            errorMessage = this.state.error;
          } else if (this.state.error instanceof Error) {
            errorMessage = this.state.error.message || this.state.error.toString();
          } else {
            errorMessage = String(this.state.error);
          }
        }
      } catch (e) {
        errorMessage = "Error formatting error message";
      }

      const safeErrorMessage = String(errorMessage);

      return React.createElement(
        "div",
        {
          className: "error-boundary",
          style: {
            padding: "20px",
            color: "red",
            backgroundColor: "#ffe0e0",
            border: "1px solid #ff0000",
            borderRadius: "4px",
            margin: "10px",
          },
        },
        React.createElement("h2", { style: { margin: "0 0 10px 0", fontSize: "18px" } }, "Error"),
        React.createElement("p", { style: { margin: 0, fontSize: "14px" } }, safeErrorMessage)
      );
    }

    try {
      return this.props.children;
    } catch (error) {
      return React.createElement(
        "div",
        { style: { padding: "20px", color: "red" } },
        "Error rendering children"
      );
    }
  }
}

