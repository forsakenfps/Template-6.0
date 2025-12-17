import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ViewSwitcher, type ViewType } from "./ViewSwitcher";

export interface NavItem {
  title: string;
  href?: string;
  onClick?: () => void;
}

export interface UserMenuProps {
  name: string;
  email: string;
  avatar?: string;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onBillingClick?: () => void;
  onLogoutClick?: () => void;
}

interface NavigationBarProps {
  currentView: ViewType;
  onViewChange?: (view: ViewType) => void;
  navItems?: NavItem[];
  userMenu?: UserMenuProps | null;
  className?: string;
  rightActions?: React.ReactNode;
}

export function NavigationBar({
  currentView,
  onViewChange,
  navItems = [],
  userMenu,
  className = "",
  rightActions,
}: NavigationBarProps) {
  return React.createElement(
    "nav",
    { className: `nav-bar ${className}`.trim() },
    React.createElement(
      "div",
      { className: "nav-left" },
      React.createElement(
        "div",
        { className: "nav-brand" },
        React.createElement("span", { className: "nav-brand-icon" }, "📱"),
        React.createElement(
          "div",
          { className: "nav-brand-text" },
          React.createElement("h1", { className: "nav-brand-title" }, "Inventory"),
          React.createElement("div", { className: "nav-brand-badge" }, "Application")
        )
      ),
      React.createElement(ViewSwitcher, {
        currentView,
        onViewChange,
      }),
      navItems.length > 0 &&
        React.createElement(
          "div",
          { className: "flex items-center gap-2" },
          navItems.map((item, index) =>
            item.onClick
              ? React.createElement(
                  Button,
                  {
                    key: index,
                    variant: "ghost",
                    onClick: item.onClick,
                  },
                  item.title
                )
              : React.createElement(
                  "a",
                  {
                    key: index,
                    href: item.href,
                    className: "btn btn-ghost",
                  },
                  item.title
                )
          )
        )
    ),
    React.createElement(
      "div",
      { className: "nav-right" },
      rightActions,
      userMenu &&
        React.createElement(
          DropdownMenu,
          {},
          React.createElement(
            DropdownMenuTrigger,
            { asChild: true },
            React.createElement(
              Button,
              { variant: "ghost", className: "btn-icon" },
              React.createElement(
                Avatar,
                { className: "avatar" },
                userMenu.avatar ? (
                  React.createElement(AvatarImage, { src: userMenu.avatar, alt: userMenu.name })
                ) : (
                  React.createElement(
                    AvatarFallback,
                    {},
                    userMenu.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  )
                )
              )
            )
          ),
          React.createElement(
            DropdownMenuContent,
            { align: "end" },
            React.createElement(
              DropdownMenuLabel,
              {},
              React.createElement(
                "div",
                { className: "flex flex-col gap-1" },
                React.createElement("p", { className: "text-sm font-medium" }, userMenu.name),
                React.createElement("p", { className: "text-xs" }, userMenu.email)
              )
            ),
            React.createElement(DropdownMenuSeparator, {}),
            React.createElement(
              DropdownMenuItem,
              { onClick: userMenu.onProfileClick },
              React.createElement("span", {}, "👤"),
              React.createElement("span", {}, "Profile")
            ),
            React.createElement(
              DropdownMenuItem,
              { onClick: userMenu.onBillingClick },
              React.createElement("span", {}, "💳"),
              React.createElement("span", {}, "Billing")
            ),
            React.createElement(
              DropdownMenuItem,
              { onClick: userMenu.onSettingsClick },
              React.createElement("span", {}, "⚙️"),
              React.createElement("span", {}, "Settings")
            ),
            React.createElement(DropdownMenuSeparator, {}),
            React.createElement(
              DropdownMenuItem,
              { onClick: userMenu.onLogoutClick, className: "destructive" },
              React.createElement("span", {}, "🚪"),
              React.createElement("span", {}, "Log out")
            )
          )
        )
    )
  );
}

