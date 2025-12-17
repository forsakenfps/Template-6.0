import * as React from "react";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogHeaderProps {
  children: React.ReactNode;
}

interface DialogTitleProps {
  children: React.ReactNode;
}

interface DialogDescriptionProps {
  children: React.ReactNode;
}

interface DialogFooterProps {
  children: React.ReactNode;
}

export function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  const [isOpen, setIsOpen] = React.useState(open);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  if (!isOpen) return null;

  return React.createElement(
    "div",
    {
      className: "dialog-overlay",
      onClick: handleClose,
    },
    React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { onClose: handleClose } as any);
      }
      return child;
    })
  );
}

export function DialogContent({ children, className = "", ...props }: DialogContentProps & React.HTMLAttributes<HTMLDivElement>) {
  return React.createElement(
    "div",
    {
      className: `dialog-content ${className}`.trim(),
      onClick: (e: React.MouseEvent) => e.stopPropagation(),
      ...props,
    },
    children
  );
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return React.createElement("div", { className: "dialog-header" }, children);
}

export function DialogTitle({ children }: DialogTitleProps) {
  return React.createElement("div", { className: "dialog-title" }, children);
}

export function DialogDescription({ children }: DialogDescriptionProps) {
  return React.createElement("div", { className: "dialog-description" }, children);
}

export function DialogFooter({ children }: DialogFooterProps) {
  return React.createElement("div", { className: "dialog-footer" }, children);
}

