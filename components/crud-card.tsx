"use client"

import type { ReactNode } from "react"

interface CRUDCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hoverBorder?: boolean
}

export function CRUDCard({ children, className = "", onClick, hoverBorder = true }: CRUDCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-2xl bg-card border border-border ${
        hoverBorder ? "hover:border-primary/30" : ""
      } transition-all duration-300 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  )
}
