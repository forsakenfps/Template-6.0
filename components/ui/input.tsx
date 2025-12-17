import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = "", ...props }: InputProps) {
  const combinedClass = `input ${className}`.trim();
  return React.createElement("input", {
    className: combinedClass,
    ...props,
  });
}

