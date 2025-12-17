import * as React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export function Label({ className = "", children, ...props }: LabelProps) {
  const combinedClass = `label ${className}`.trim();
  return React.createElement("label", {
    className: combinedClass,
    ...props,
  }, children);
}

