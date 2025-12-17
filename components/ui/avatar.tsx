import * as React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Avatar({ src, alt, children, className = "" }: AvatarProps) {
  return React.createElement(
    "div",
    { className: `avatar ${className}`.trim() },
    src ? React.createElement("img", { src, alt }) : children
  );
}

export function AvatarImage({ src, alt }: { src?: string; alt?: string }) {
  return src ? React.createElement("img", { src, alt, style: { width: "100%", height: "100%", objectFit: "cover" } }) : null;
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return React.createElement("div", {}, children);
}

