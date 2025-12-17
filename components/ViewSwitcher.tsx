import * as React from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export type ViewType = "list" | "grid" | "board" | "dashboard";

export interface View {
  id: ViewType;
  label: string;
  icon: string; // Using simple text icons instead of lucide-react
}

const views: View[] = [
  { id: "list", label: "List", icon: "☰" },
  { id: "grid", label: "Grid", icon: "⊞" },
  { id: "board", label: "Board", icon: "▦" },
  { id: "dashboard", label: "Dashboard", icon: "▣" },
];

interface ViewSwitcherProps {
  currentView: ViewType;
  onViewChange?: (view: ViewType) => void;
  className?: string;
}

export function ViewSwitcher({
  currentView,
  onViewChange,
  className = "",
}: ViewSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const currentViewData = views.find(v => v.id === currentView) || views[0];

  const handleSelect = (view: ViewType) => {
    onViewChange?.(view);
    setOpen(false);
  };

  return React.createElement(
    Popover,
    { open, onOpenChange: setOpen },
    React.createElement(
      PopoverTrigger,
      { asChild: true },
      React.createElement(
        Button,
        {
          variant: "outline",
          className: `view-switcher-btn ${className}`.trim(),
        },
        React.createElement("div", { className: "flex items-center gap-2" },
          React.createElement("span", {}, currentViewData.icon),
          React.createElement("span", {}, currentViewData.label)
        ),
        React.createElement("span", { className: "icon" }, "▼")
      )
    ),
    React.createElement(
      PopoverContent,
      { className: "view-switcher-content" },
      views.map((view) =>
        React.createElement(
          "div",
          {
            key: view.id,
            className: `view-switcher-item ${currentView === view.id ? "active" : ""}`,
            onClick: () => handleSelect(view.id),
          },
          React.createElement("span", {}, view.icon),
          React.createElement("span", {}, view.label),
          currentView === view.id && React.createElement("span", {}, "✓")
        )
      )
    )
  );
}

