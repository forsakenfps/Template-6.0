import * as React from "react";

interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface PopoverTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

export function Popover({ open: controlledOpen, onOpenChange, children }: PopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  return React.createElement(
    "div",
    { className: "popover" },
    React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === PopoverTrigger) {
          return React.cloneElement(child, { onClick: () => handleOpenChange(!open) } as any);
        }
        if (child.type === PopoverContent && open) {
          return child;
        }
      }
      return child;
    })
  );
}

export function PopoverTrigger({ asChild, children, onClick }: PopoverTriggerProps & { onClick?: () => void }) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick } as any);
  }
  return React.createElement("div", { onClick }, children);
}

export function PopoverContent({ children, className = "" }: PopoverContentProps) {
  return React.createElement(
    "div",
    {
      className: `popover-content ${className}`.trim(),
      onClick: (e: React.MouseEvent) => e.stopPropagation(),
    },
    children
  );
}

