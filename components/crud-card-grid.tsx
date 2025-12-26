"use client"

import type { ReactNode } from "react"

interface CRUDCardGridProps {
  items: any[]
  renderCard: (item: any, idx: number) => ReactNode
  columns?: number
}

export function CRUDCardGrid({ items, renderCard, columns = 3 }: CRUDCardGridProps) {
  const gridClass =
    {
      1: "grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-2 lg:grid-cols-3",
    }[columns] || "md:grid-cols-2 lg:grid-cols-3"

  return (
    <div className={`grid gap-6 ${gridClass}`}>
      {items.map((item, idx) => (
        <div key={item.id} className="animate-float-up" style={{ animationDelay: `${idx * 0.1}s` }}>
          {renderCard(item, idx)}
        </div>
      ))}
    </div>
  )
}
