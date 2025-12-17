import * as React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className = "", ...props }: TextareaProps) {
  const combinedClass = `textarea ${className}`.trim();
  return React.createElement("textarea", {
    className: combinedClass,
    ...props,
  });
}

