import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

export function Button({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClass = "btn";
  const variantClass = variant === "default" ? "btn-primary" : `btn-${variant}`;
  const sizeClass = size === "default" ? "" : `btn-${size}`;
  const combinedClass = `${baseClass} ${variantClass} ${sizeClass} ${className}`.trim();

  return React.createElement(
    "button",
    {
      className: combinedClass,
      ...props,
    },
    children
  );
}

