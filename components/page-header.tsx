"use client"

import Link from "next/link"

interface PageHeaderProps {
  title: string
  description: string
  buttonLabel?: string
  onButtonClick?: () => void
  backHref?: string
}

export function PageHeader({ title, description, buttonLabel, onButtonClick, backHref = "/admin" }: PageHeaderProps) {
  return (
    <div className="bg-primary text-primary-foreground py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-4">
          <Link href={backHref} className="text-primary-foreground/70 hover:text-primary-foreground">
            ← Back
          </Link>
          {buttonLabel && (
            <button
              onClick={onButtonClick}
              className="px-4 py-2 rounded-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition text-sm font-semibold"
            >
              {buttonLabel}
            </button>
          )}
        </div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-primary-foreground/80">{description}</p>
      </div>
    </div>
  )
}
