"use client"

import Link from "next/link"

interface Section {
  id: number
  name: string
  description: string
  lastUpdated: string
  href: string
  count?: number
}

interface ContentSectionsGridProps {
  sections: Section[]
}

export function ContentSectionsGrid({ sections }: ContentSectionsGridProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {sections.map((section) => (
        <div key={section.id} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-1">{section.name}</h3>
              <p className="text-muted-foreground text-sm">{section.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-muted-foreground">
              Updated: {new Date(section.lastUpdated).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            {section.count !== undefined && (
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                {section.count} items
              </span>
            )}
          </div>
          <Link href={section.href}>
            <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition text-sm font-semibold">
              Edit Section
            </button>
          </Link>
        </div>
      ))}
    </div>
  )
}

