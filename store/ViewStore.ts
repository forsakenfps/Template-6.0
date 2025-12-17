import * as React from "react";
import { ViewType } from "../components/ViewSwitcher";
import { NavItem, UserMenuProps } from "../components/NavigationBar";

interface ViewStoreContextType {
  currentView: ViewType;
  selectedApplicationId: string | null;
  selectedApplication: any | null;
  navItems: NavItem[];
  userMenu: UserMenuProps | null;
  setCurrentView: (view: ViewType) => void;
  setSelectedApplication: (applicationId: string | null, application?: any) => void;
  goBack: () => void;
  setNavItems: (items: NavItem[]) => void;
  setUserMenu: (userMenu: UserMenuProps) => void;
}

const ViewStoreContext = React.createContext<ViewStoreContextType | null>(null);

export function ViewStoreProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentViewState] = React.useState<ViewType>("grid");
  const [selectedApplicationId, setSelectedApplicationId] = React.useState<string | null>(null);
  const [selectedApplication, setSelectedApplicationState] = React.useState<any | null>(null);
  const [navItems, setNavItemsState] = React.useState<NavItem[]>([]);
  const [userMenu, setUserMenuState] = React.useState<UserMenuProps | null>(null);

  const setCurrentView = React.useCallback((view: ViewType) => {
    setCurrentViewState(view);
    setSelectedApplicationId(null);
    setSelectedApplicationState(null);
  }, []);

  const setSelectedApplication = React.useCallback((applicationId: string | null, application?: any) => {
    setSelectedApplicationId(applicationId);
    setSelectedApplicationState(application || null);
  }, []);

  const goBack = React.useCallback(() => {
    setSelectedApplicationId(null);
    setSelectedApplicationState(null);
  }, []);

  const setNavItems = React.useCallback((items: NavItem[]) => {
    setNavItemsState(items);
  }, []);

  const setUserMenu = React.useCallback((menu: UserMenuProps) => {
    setUserMenuState(menu);
  }, []);

  const value: ViewStoreContextType = React.useMemo(() => ({
    currentView,
    selectedApplicationId,
    selectedApplication,
    navItems,
    userMenu,
    setCurrentView,
    setSelectedApplication,
    goBack,
    setNavItems,
    setUserMenu,
  }), [currentView, selectedApplicationId, selectedApplication, navItems, userMenu, setCurrentView, setSelectedApplication, goBack, setNavItems, setUserMenu]);

  return (
    <ViewStoreContext.Provider value={value}>
      {children}
    </ViewStoreContext.Provider>
  );
}

export function useViewStore(): ViewStoreContextType {
  const context = React.useContext(ViewStoreContext);
  if (!context) {
    throw new Error("useViewStore must be used within ViewStoreProvider");
  }
  return context;
}

// For backward compatibility with class-based store
export class ViewStore {
  private context: ViewStoreContextType | null = null;

  constructor() {
    // This will be set when used in App component
  }

  setContext(context: ViewStoreContextType) {
    this.context = context;
  }

  get currentView(): ViewType {
    return this.context?.currentView || "grid";
  }

  get selectedApplicationId(): string | null {
    return this.context?.selectedApplicationId || null;
  }

  get selectedApplication(): any | null {
    return this.context?.selectedApplication || null;
  }

  get navItems(): NavItem[] {
    return this.context?.navItems || [];
  }

  get userMenu(): UserMenuProps | null {
    return this.context?.userMenu || null;
  }

  setCurrentView(view: ViewType) {
    this.context?.setCurrentView(view);
  }

  setSelectedApplication(applicationId: string | null, application?: any) {
    this.context?.setSelectedApplication(applicationId, application);
  }

  goBack() {
    this.context?.goBack();
  }

  setNavItems(items: NavItem[]) {
    this.context?.setNavItems(items);
  }

  setUserMenu(userMenu: UserMenuProps) {
    this.context?.setUserMenu(userMenu);
  }
}

