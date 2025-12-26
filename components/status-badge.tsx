"use client"

type StatusType =
  | "active"
  | "inactive"
  | "published"
  | "draft"
  | "pending"
  | "new"
  | "contacted"
  | "enrolled"
  | "ending-soon"

interface StatusBadgeProps {
  status: StatusType | string
  label?: string
}

const statusStyles: Record<string, string> = {
  active: "bg-primary/10 text-primary",
  inactive: "bg-muted text-muted-foreground",
  published: "bg-primary/10 text-primary",
  draft: "bg-muted text-muted-foreground",
  pending: "bg-yellow-100 text-yellow-700",
  new: "bg-primary/10 text-primary",
  contacted: "bg-yellow-100 text-yellow-700",
  enrolled: "bg-green-100 text-green-700",
  "ending-soon": "bg-yellow-100 text-yellow-700",
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1)
  const styles = statusStyles[status.toLowerCase()] || "bg-muted text-muted-foreground"

  return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles}`}>{displayLabel}</span>
}
