import * as React from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export interface Column<T = any> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (value: any, row: T) => React.ReactNode;
  editable?: boolean;
  renderEdit?: (value: any, onChange: (value: any) => void) => React.ReactNode;
}

interface DataTableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  onRowSelect?: (selectedRows: T[]) => void;
  onRowClick?: (row: T) => void;
  onEdit?: (row: T) => void;
  onSave?: (row: T, updatedData: Partial<T>) => void;
  onDelete?: (row: T) => void;
  onAdd?: () => void;
  keyExtractor: (row: T) => string | number;
}

export function DataTable<T = any>({
  data,
  columns,
  onRowSelect,
  onRowClick,
  onEdit,
  onSave,
  onDelete,
  onAdd,
  keyExtractor,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = React.useState<Set<string | number>>(new Set());
  const [editingRow, setEditingRow] = React.useState<string | number | null>(null);
  const [editData, setEditData] = React.useState<Partial<T>>({});

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allKeys = new Set(data.map(keyExtractor));
      setSelectedRows(allKeys);
      if (onRowSelect) {
        onRowSelect(data);
      }
    } else {
      setSelectedRows(new Set());
      if (onRowSelect) {
        onRowSelect([]);
      }
    }
  };

  const handleSelectRow = (row: T, checked: boolean) => {
    const key = keyExtractor(row);
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(key);
    } else {
      newSelected.delete(key);
    }
    setSelectedRows(newSelected);
    if (onRowSelect) {
      const selected = data.filter((r) => newSelected.has(keyExtractor(r)));
      onRowSelect(selected);
    }
  };

  const isAllSelected = data.length > 0 && selectedRows.size === data.length;
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < data.length;

  const startEdit = (row: T) => {
    const key = keyExtractor(row);
    setEditingRow(key);
    setEditData({ ...row });
    if (onEdit) {
      onEdit(row);
    }
  };

  const saveEdit = (row: T) => {
    if (onSave) {
      onSave(row, editData);
    }
    setEditingRow(null);
    setEditData({});
  };

  const cancelEdit = () => {
    setEditingRow(null);
    setEditData({});
  };

  const handleDelete = (row: T) => {
    if (onDelete) {
      onDelete(row);
    }
  };

  return React.createElement(
    "div",
    { className: "data-table-wrapper" },
    React.createElement(
      "table",
      { className: "data-table" },
      React.createElement(
        "thead",
        {},
        React.createElement(
          "tr",
          {},
          React.createElement(
            "th",
            { style: { width: "40px" } },
            React.createElement(Checkbox, {
              checked: isAllSelected,
              onCheckedChange: handleSelectAll,
            })
          ),
          columns.map((col) =>
            React.createElement("th", { key: col.id }, col.header)
          ),
          React.createElement("th", { style: { width: "100px" } }, "Actions")
        )
      ),
      React.createElement(
        "tbody",
        {},
        data.map((row) => {
          const key = keyExtractor(row);
          const isEditing = editingRow === key;
          const isSelected = selectedRows.has(key);

          return React.createElement(
            "tr",
            {
              key: key,
              className: isSelected ? "selected" : "",
              onClick: () => !isEditing && onRowClick && onRowClick(row),
            },
            React.createElement(
              "td",
              {},
              React.createElement(Checkbox, {
                checked: isSelected,
                onCheckedChange: (checked) => handleSelectRow(row, checked),
                onClick: (e: React.MouseEvent) => e.stopPropagation(),
              })
            ),
            columns.map((col) => {
              const value = row[col.accessorKey];
              return React.createElement(
                "td",
                { key: col.id },
                isEditing && col.editable
                  ? col.renderEdit
                    ? col.renderEdit(value, (newValue) =>
                        setEditData({ ...editData, [col.accessorKey]: newValue })
                      )
                    : React.createElement(Input, {
                        value: String(value || ""),
                        onChange: (e) =>
                          setEditData({
                            ...editData,
                            [col.accessorKey]: e.target.value,
                          }),
                        onClick: (e: React.MouseEvent) => e.stopPropagation(),
                      })
                  : col.cell
                  ? col.cell(value, row)
                  : String(value || "")
              );
            }),
            React.createElement(
              "td",
              {},
              isEditing
                ? React.createElement(
                    "div",
                    { className: "flex gap-2", onClick: (e: React.MouseEvent) => e.stopPropagation() },
                    React.createElement(
                      Button,
                      {
                        size: "sm",
                        variant: "primary",
                        onClick: () => saveEdit(row),
                      },
                      "Save"
                    ),
                    React.createElement(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        onClick: cancelEdit,
                      },
                      "Cancel"
                    )
                  )
                : React.createElement(
                    "div",
                    { className: "flex gap-2", onClick: (e: React.MouseEvent) => e.stopPropagation() },
                    React.createElement(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        onClick: () => startEdit(row),
                      },
                      "Edit"
                    ),
                    onDelete &&
                      React.createElement(
                        Button,
                        {
                          size: "sm",
                          variant: "destructive",
                          onClick: () => handleDelete(row),
                        },
                        "Delete"
                      )
                  )
            )
          );
        }),
        onAdd &&
          React.createElement(
            "tr",
            {},
            React.createElement(
              "td",
              { colSpan: columns.length + 2, style: { padding: "12px", textAlign: "center" } },
              React.createElement(
                Button,
                {
                  variant: "outline",
                  onClick: onAdd,
                },
                "+ Add Row"
              )
            )
          )
      )
    )
  );
}

