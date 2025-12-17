import * as React from "react";

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  placeholder?: string;
  className?: string;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function Select({
  value,
  onValueChange,
  children,
  placeholder = "Select...",
  className = "",
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value || "");
  const selectRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleSelect = (newValue: string) => {
    setSelectedValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
    setOpen(false);
  };

  const selectedLabel = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.props.value === selectedValue
  );

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (open && selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return React.createElement(
    "div",
    { className: `select ${className}`.trim(), ref: selectRef },
    React.createElement(
      "button",
      {
        type: "button",
        className: "select-trigger",
        onClick: () => setOpen(!open),
      },
      React.createElement("span", {}, selectedLabel && React.isValidElement(selectedLabel) ? selectedLabel.props.children : placeholder),
      React.createElement("span", {}, "▼")
    ),
    open &&
      React.createElement(
        "div",
        {
          className: "select-content",
          onClick: (e: React.MouseEvent) => e.stopPropagation(),
        },
        React.Children.map(children, (child) => {
          if (React.isValidElement<SelectItemProps>(child)) {
            return React.createElement(
              "div",
              {
                key: child.props.value,
                className: `select-item ${child.props.value === selectedValue ? "selected" : ""}`,
                onClick: () => handleSelect(child.props.value),
              },
              child.props.children
            );
          }
          return null;
        })
      )
  );
}

export function SelectTrigger({ children, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return React.createElement("button", { ...props }, children);
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return React.createElement("span", {}, placeholder || "Select...");
}

export function SelectContent({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return React.createElement("div", { className: "select-content", ...props }, children);
}

export function SelectItem({ value, children, ...props }: SelectItemProps & React.HTMLAttributes<HTMLDivElement>) {
  return React.createElement("div", { ...props }, children);
}

