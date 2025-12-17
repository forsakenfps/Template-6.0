import * as React from "react";

export interface ListViewTask {
  id: string;
  name: string;
  status: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
}

export interface ListViewStatus {
  id: string;
  name: string;
  color: string;
}

interface ListViewProps {
  tasks: ListViewTask[];
  statuses: ListViewStatus[];
  onTaskMove?: (taskId: string, newStatus: string) => void;
  onTaskClick?: (task: ListViewTask) => void;
}

export function ListView({
  tasks,
  statuses,
  onTaskMove,
  onTaskClick,
}: ListViewProps) {
  const [draggedTask, setDraggedTask] = React.useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent, statusId: string) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, statusId: string) => {
    e.preventDefault();
    if (draggedTask && onTaskMove) {
      onTaskMove(draggedTask, statusId);
      setDraggedTask(null);
    }
  };

  const getStatusColor = (statusId: string) => {
    const status = statuses.find((s) => s.id === statusId);
    return status?.color || "rgb(var(--border))";
  };

  return React.createElement(
    "div",
    { className: "list-view" },
    tasks.length === 0
      ? React.createElement(
          "div",
          { style: { textAlign: "center", padding: "40px", color: "rgb(var(--muted-foreground))" } },
          "No tasks"
        )
      : tasks.map((task) =>
          React.createElement(
            "div",
            {
              key: task.id,
              className: "list-item",
              draggable: true,
              onDragStart: () => handleDragStart(task.id),
              onClick: () => onTaskClick && onTaskClick(task),
            },
            React.createElement(
              "div",
              { className: "flex items-center gap-4" },
              React.createElement(
                "div",
                {
                  style: {
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: getStatusColor(task.status),
                    flexShrink: 0,
                  },
                }
              ),
              React.createElement(
                "div",
                { className: "flex flex-col gap-1", style: { flex: 1 } },
                React.createElement("p", { style: { margin: 0, fontWeight: 500, fontSize: "14px" } }, task.name),
                task.description &&
                  React.createElement("p", { style: { margin: 0, fontSize: "12px", color: "rgb(var(--muted-foreground))" } }, task.description),
                React.createElement(
                  "div",
                  { className: "flex items-center gap-2", style: { fontSize: "12px", color: "rgb(var(--muted-foreground))" } },
                  task.assignee && React.createElement("span", {}, task.assignee),
                  task.dueDate && React.createElement("span", {}, `Due: ${task.dueDate}`)
                )
              )
            )
          )
        )
  );
}

