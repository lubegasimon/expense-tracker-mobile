import React from "react";
import { ErrorBoundary } from "react-error-boundary";

interface ChildrenProp {
  children: React.JSX.Element;
}

function fallbackRender({ error }: { error: { [key: string]: string } }) {
  console.error("Error caught by error boundary: ", error);
  return (
    <div role="alert">
      <p>Something went wrong</p>
    </div>
  );
}
function ErrorBoundary_({ children }: ChildrenProp) {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>{children}</ErrorBoundary>
  );
}

export default ErrorBoundary_;
