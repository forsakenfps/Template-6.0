import * as React from "react";
import { NavigationBar } from "../components/NavigationBar";
import { ViewStoreProvider, useViewStore } from "../store/ViewStore";
import { DataTable, Column } from "../components/DataTable";
import {
  KanbanBoardWrapper,
  KanbanTaskItem,
  KanbanColumnItem,
} from "../components/KanbanBoardWrapper";
import { ListView, ListViewTask, ListViewStatus } from "../components/ListView";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Application } from "../types/Application";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectItem } from "../components/ui/select";
import { DetailPage } from "../components/DetailPage";
import {
  SubtypeOptions,
  TIMEOptions,
  BusinessCriticalityOptions,
  FunctionalFitOptions,
  TechnicalFitOptions,
  SingleSignOnOptions,
  HostingTypeOptions,
} from "../types/Application";

interface AppProps {
  store: any; // For backward compatibility
}

// Helper function to generate GUID
const generateGUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Initial sample Application data
const initialApplicationData: Application[] = [
  {
    ApplicationID: generateGUID(),
    Name: "Customer Portal",
    Release: "v2.5.1",
    ID: "APP-001",
    Alias: "CustPortal",
    Description: "Customer-facing web portal for account management and support tickets.",
    Subtype: "Web Application",
    TIME: "Tier 1",
    TIMEDescription: "Primary customer interaction platform requiring 99.9% uptime.",
    BusinessCriticality: "Critical",
    BusinessCriticalityDescription: "Directly impacts customer satisfaction and revenue.",
    FunctionalFit: "Excellent",
    FunctionalFitDescription: "Meets all business requirements with room for enhancement.",
    TechnicalFit: "Good",
    TechnicalFitDescription: "Modern tech stack with good scalability potential.",
    SingleSignOn: "Yes",
    SSOProvider: "Azure AD",
    HostingType: "Cloud",
    HostingTypeDescription: "Hosted on Azure with auto-scaling capabilities.",
    Plan: "2024-01-15",
    PhaseIn: "2024-03-01",
    Active: "2024-06-01",
    PhaseOut: "2026-12-31",
    EndOfLife: "2027-12-31",
  },
  {
    ApplicationID: generateGUID(),
    Name: "Inventory Management System",
    Release: "v1.8.3",
    ID: "APP-002",
    Alias: "InventoryMgmt",
    Description: "Internal system for tracking inventory levels and warehouse operations.",
    Subtype: "Web Application",
    TIME: "Tier 2",
    TIMEDescription: "Important for operations but not customer-facing.",
    BusinessCriticality: "High",
    BusinessCriticalityDescription: "Critical for supply chain operations.",
    FunctionalFit: "Good",
    FunctionalFitDescription: "Covers most requirements, some gaps in reporting.",
    TechnicalFit: "Fair",
    TechnicalFitDescription: "Legacy system with technical debt, needs modernization.",
    SingleSignOn: "No",
    SSOProvider: "",
    HostingType: "On-Premise",
    HostingTypeDescription: "Deployed on company servers with backup systems.",
    Plan: "2023-06-01",
    PhaseIn: "2023-09-01",
    Active: "2024-01-01",
    PhaseOut: "2027-01-31",
  },
];

function AppContent() {
  const store = useViewStore();
  const [applicationData, setApplicationData] = React.useState<Application[]>(initialApplicationData);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deletingRow, setDeletingRow] = React.useState<Application | null>(null);

  // Initialize store with user menu
  React.useEffect(() => {
    store.setUserMenu({
      name: "John Doe",
      email: "john.doe@example.com",
    });
  }, []);

  const handleDelete = (row: Application) => {
    setDeletingRow(row);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingRow) {
      setApplicationData((prev) => prev.filter((app) => app.ApplicationID !== deletingRow.ApplicationID));
      setDeleteDialogOpen(false);
      setDeletingRow(null);
    }
  };

  const handleSave = (row: Application, updatedData: Partial<Application>) => {
    setApplicationData((prev) =>
      prev.map((app) => (app.ApplicationID === row.ApplicationID ? { ...app, ...updatedData } : app))
    );
  };

  const handleAdd = () => {
    const newApp: Application = {
      ApplicationID: generateGUID(),
      Name: "New Application",
      Release: "v1.0.0",
      ID: `APP-${(applicationData.length + 1).toString().padStart(3, "0")}`,
      Alias: "",
      Description: "",
      Subtype: SubtypeOptions[0],
      TIME: TIMEOptions[0],
      TIMEDescription: "",
      BusinessCriticality: BusinessCriticalityOptions[0],
      BusinessCriticalityDescription: "",
      FunctionalFit: FunctionalFitOptions[2] || "Good",
      FunctionalFitDescription: "",
      TechnicalFit: TechnicalFitOptions[2] || "Good",
      TechnicalFitDescription: "",
      SingleSignOn: SingleSignOnOptions[2] || "Optional",
      SSOProvider: "",
      HostingType: HostingTypeOptions[0],
      HostingTypeDescription: "",
    };
    setApplicationData((prev) => [...prev, newApp]);
  };

  // Define columns for DataTable
  const columns: Column<Application>[] = [
    {
      id: "Name",
      header: "Name",
      accessorKey: "Name",
      editable: true,
    },
    {
      id: "ID",
      header: "ID",
      accessorKey: "ID",
      editable: true,
    },
    {
      id: "Subtype",
      header: "Subtype",
      accessorKey: "Subtype",
      editable: true,
      renderEdit: (value, onChange) =>
        React.createElement(
          Select,
          { value: String(value || ""), onValueChange: (val) => onChange(val) },
          SubtypeOptions.map((opt) =>
            React.createElement(SelectItem, { key: opt, value: opt }, opt)
          )
        ),
    },
    {
      id: "BusinessCriticality",
      header: "Business Criticality",
      accessorKey: "BusinessCriticality",
      editable: true,
      renderEdit: (value, onChange) =>
        React.createElement(
          Select,
          { value: String(value || ""), onValueChange: (val) => onChange(val) },
          BusinessCriticalityOptions.map((opt) =>
            React.createElement(SelectItem, { key: opt, value: opt }, opt)
          )
        ),
    },
  ];

  // Convert applications to Kanban format
  const kanbanColumns: KanbanColumnItem[] = [
    { id: "planning", name: "Planning", color: "#9333ea" },
    { id: "active", name: "Active", color: "#22c55e" },
    { id: "phaseout", name: "Phase Out", color: "#f59e0b" },
  ];

  const kanbanTasks: KanbanTaskItem[] = applicationData.map((app) => ({
    id: app.ApplicationID,
    name: app.Name,
    column: app.Active ? "active" : app.Plan ? "planning" : "phaseout",
    description: app.Description,
  }));

  // Convert applications to List format
  const listTasks: ListViewTask[] = applicationData.map((app) => ({
    id: app.ApplicationID,
    name: app.Name,
    status: app.BusinessCriticality.toLowerCase(),
    description: app.Description,
  }));

  const listStatuses: ListViewStatus[] = [
    { id: "critical", name: "Critical", color: "#ef4444" },
    { id: "high", name: "High", color: "#f59e0b" },
    { id: "medium", name: "Medium", color: "#3b82f6" },
    { id: "low", name: "Low", color: "#10b981" },
  ];

  const handleKanbanDataChange = (data: KanbanTaskItem[]) => {
    // Update application data based on kanban changes
    setApplicationData((prev) =>
      prev.map((app) => {
        const task = data.find((t) => t.id === app.ApplicationID);
        if (task) {
          return {
            ...app,
            Active: task.column === "active" ? app.Active || new Date().toISOString().split("T")[0] : undefined,
          };
        }
        return app;
      })
    );
  };

  const handleRowClick = (row: Application) => {
    store.setSelectedApplication(row.ApplicationID, row);
  };

  const handleTaskClick = (taskId: string) => {
    const application = applicationData.find((app) => app.ApplicationID === taskId);
    if (application) {
      store.setSelectedApplication(application.ApplicationID, application);
    }
  };

  const handleListViewTaskClick = (task: ListViewTask) => {
    const application = applicationData.find((app) => app.ApplicationID === task.id);
    if (application) {
      store.setSelectedApplication(application.ApplicationID, application);
    }
  };

  const handleBack = () => {
    store.goBack();
  };

  // Show detail page if an application is selected
  if (store.selectedApplication) {
    return React.createElement(
      "div",
      { className: "pcf-app-wrapper" },
      React.createElement(NavigationBar, {
        currentView: store.currentView,
        onViewChange: store.setCurrentView,
        navItems: store.navItems,
        userMenu: store.userMenu,
      }),
      React.createElement(
        "div",
        { style: { flex: 1, overflow: "auto" } },
        React.createElement(DetailPage, {
          application: store.selectedApplication,
          onBack: handleBack,
        })
      )
    );
  }

  const renderView = () => {
    switch (store.currentView) {
      case "grid":
        return React.createElement(DataTable, {
          data: applicationData,
          columns,
          onRowClick: handleRowClick,
          onSave: handleSave,
          onDelete: handleDelete,
          onAdd: handleAdd,
          keyExtractor: (row) => row.ApplicationID,
        });
      case "board":
        return React.createElement(KanbanBoardWrapper, {
          columns: kanbanColumns,
          tasks: kanbanTasks,
          onDataChange: handleKanbanDataChange,
          onTaskClick: handleTaskClick,
        });
      case "dashboard":
        return React.createElement("div", { className: "p-4" }, "Dashboard view coming soon");
      case "list":
        return React.createElement(ListView, {
          tasks: listTasks,
          statuses: listStatuses,
          onTaskClick: handleListViewTaskClick,
        });
      default:
        return React.createElement("div", { className: "p-4" }, "Dashboard view coming soon");
    }
  };

  return React.createElement(
    "div",
    { className: "pcf-app-wrapper" },
    React.createElement(NavigationBar, {
      currentView: store.currentView,
      onViewChange: store.setCurrentView,
      navItems: store.navItems,
      userMenu: store.userMenu,
    }),
    React.createElement(
      "div",
      { style: { flex: 1, overflow: "auto" } },
      renderView()
    ),
    React.createElement(
      Dialog,
      { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen },
      React.createElement(
        DialogContent,
        {},
        React.createElement(
          DialogHeader,
          {},
          React.createElement(DialogTitle, {}, "Delete Application"),
          React.createElement(
            DialogDescription,
            {},
            `Are you sure you want to delete "${deletingRow?.Name}"? This action cannot be undone.`
          )
        ),
        React.createElement(
          DialogFooter,
          {},
          React.createElement(
            Button,
            { variant: "outline", onClick: () => setDeleteDialogOpen(false) },
            "Cancel"
          ),
          React.createElement(
            Button,
            { variant: "destructive", onClick: confirmDelete },
            "Delete"
          )
        )
      )
    )
  );
}

export function App({ store }: AppProps) {
  return React.createElement(
    ViewStoreProvider,
    {},
    React.createElement(AppContent, {})
  );
}

