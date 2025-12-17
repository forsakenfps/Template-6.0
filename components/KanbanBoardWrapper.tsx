import * as React from "react";

export interface KanbanTaskItem extends Record<string, unknown> {
  id: string;
  name: string;
  column: string;
  description?: string;
  assignee?: string;
  assigneeInitials?: string;
}

export interface KanbanColumnItem extends Record<string, unknown> {
  id: string;
  name: string;
  color?: string;
}

interface KanbanBoardWrapperProps {
  columns: KanbanColumnItem[];
  tasks: KanbanTaskItem[];
  onDataChange: (data: KanbanTaskItem[]) => void;
  onTaskClick?: (taskId: string) => void;
}

export function KanbanBoardWrapper({
  columns,
  tasks,
  onDataChange,
  onTaskClick,
}: KanbanBoardWrapperProps) {
  const [draggedTask, setDraggedTask] = React.useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    if (draggedTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === draggedTask ? { ...task, column: columnId } : task
      );
      onDataChange(updatedTasks);
      setDraggedTask(null);
    }
  };

  return React.createElement(
    "div",
    { className: "kanban-board" },
    columns.map((column) => {
      const columnTasks = tasks.filter((task) => task.column === column.id);
      return React.createElement(
        "div",
        {
          key: column.id,
          className: "kanban-column",
          onDragOver: (e: React.DragEvent) => handleDragOver(e, column.id),
          onDrop: (e: React.DragEvent) => handleDrop(e, column.id),
        },
        React.createElement(
          "div",
          { className: "kanban-column-header" },
          column.color &&
            React.createElement("span", {
              style: {
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: column.color as string,
                marginRight: "8px",
              },
            }),
          column.name
        ),
        columnTasks.map((task) =>
          React.createElement(
            "div",
            {
              key: task.id,
              className: "kanban-task",
              draggable: true,
              onDragStart: () => handleDragStart(task.id),
              onClick: () => onTaskClick && onTaskClick(task.id),
            },
            React.createElement("div", { className: "flex flex-col gap-2" },
              React.createElement("p", { style: { margin: 0, fontWeight: 500, fontSize: "14px" } }, task.name),
              task.description &&
                React.createElement("p", { style: { margin: 0, fontSize: "12px", color: "rgb(var(--muted-foreground))" } }, task.description)
            )
          )
        )
      );
    })
  );
}

