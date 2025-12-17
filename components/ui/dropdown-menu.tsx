import * as React from "react";

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  align?: "start" | "end";
  className?: string;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface DropdownMenuLabelProps {
  children: React.ReactNode;
}

interface DropdownMenuSeparatorProps {}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
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
    { className: "dropdown", ref: triggerRef },
    React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === DropdownMenuTrigger) {
          return React.cloneElement(child, { onClick: () => setOpen(!open), isOpen: open } as any);
        }
        if (child.type === DropdownMenuContent && open) {
          return child;
        }
      }
      return null;
    })
  );
}

export function DropdownMenuTrigger({ asChild, children, onClick, isOpen }: DropdownMenuTriggerProps & { onClick?: () => void; isOpen?: boolean }) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick } as any);
  }
  return React.createElement("div", { onClick }, children);
}

export function DropdownMenuContent({ children, align = "end", className = "" }: DropdownMenuContentProps) {
  return React.createElement(
    "div",
    {
      className: `dropdown-content ${align === "end" ? "dropdown-content-end" : ""} ${className}`.trim(),
    },
    children
  );
}

export function DropdownMenuItem({ children, onClick, className = "" }: DropdownMenuItemProps) {
  return React.createElement(
    "div",
    {
      className: `dropdown-item ${className}`.trim(),
      onClick,
    },
    children
  );
}

export function DropdownMenuLabel({ children }: DropdownMenuLabelProps) {
  return React.createElement("div", { className: "dropdown-label" }, children);
}

export function DropdownMenuSeparator({}: DropdownMenuSeparatorProps) {
  return React.createElement("div", { className: "dropdown-separator" });
}

