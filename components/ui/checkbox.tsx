import * as React from "react";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({
  checked = false,
  onCheckedChange,
  className = "",
  ...props
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckedChange) {
      onCheckedChange(e.target.checked);
    }
  };

  return React.createElement(
    "label",
    { className: `checkbox ${className}`.trim() },
    React.createElement("input", {
      type: "checkbox",
      checked: checked,
      onChange: handleChange,
      ...props,
    }),
    React.createElement("span", { className: "checkbox-indicator" }, "✓")
  );
}

