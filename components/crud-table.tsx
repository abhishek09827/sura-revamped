"use client"

import type { ReactNode } from "react"

interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => ReactNode
}

interface CRUDTableProps {
  columns: Column[]
  data: any[]
  onEdit: (item: any) => void
  onDelete: (item: any) => void
  showActions?: boolean
}

export function CRUDTable({ columns, data, onEdit, onDelete, showActions = true }: CRUDTableProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted border-b border-border">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                {col.label}
              </th>
            ))}
            {showActions && <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-border hover:bg-muted/50 transition">
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-foreground">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {showActions && (
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => onEdit(row)} className="text-primary hover:underline font-semibold text-sm">
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(row)}
                    className="text-destructive hover:underline font-semibold text-sm"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
