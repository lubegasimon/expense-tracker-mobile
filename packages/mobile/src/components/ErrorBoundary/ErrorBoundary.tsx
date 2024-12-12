import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Text } from "react-native";

interface ChildrenProp {
  children: React.JSX.Element;
}

function ErrorBoundary_({ children }: ChildrenProp) {
  return (
    <ErrorBoundary
      fallback={
        <Text
          style={{
            color: "red",
          }}
        >
          Something went wrong
        </Text>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundary_;
