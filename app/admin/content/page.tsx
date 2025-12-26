"use client"

import Link from "next/link"
import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { CRUDCardGrid } from "@/components/crud-card-grid"

interface Section {
  id: number
  name: string
  description: string
  lastUpdated: string
  href: string
}

export default function AdminContent() {
  const [sections] = useState<Section[]>([
    {
      id: 1,
      name: "Hero Section",
      description: "Main banner with headline and CTA",
      lastUpdated: "2025-01-15",
      href: "/admin/hero-edit",
    },
    {
      id: 2,
      name: "Programs Section",
      description: "Fitness programs showcase",
      lastUpdated: "2025-01-14",
      href: "/admin/programs",
    },
    {
      id: 3,
      name: "Offer Banner",
      description: "Current promotional offer",
      lastUpdated: "2025-01-13",
      href: "/admin/offers",
    },
    {
      id: 4,
      name: "Gallery Section",
      description: "Transformation gallery",
      lastUpdated: "2025-01-12",
      href: "/admin/transformations",
    },
    {
      id: 5,
      name: "Testimonials Section",
      description: "Client success stories",
      lastUpdated: "2025-01-11",
      href: "/admin/testimonials",
    },
    {
      id: 6,
      name: "Why Choose Us",
      description: "Trust indicators and benefits",
      lastUpdated: "2025-01-10",
      href: "/admin/why-choose-us",
    },
  ])

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Homepage Content" description="Edit sections and content on your homepage" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CRUDCardGrid
          items={sections}
          renderCard={(section) => (
            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{section.name}</h3>
                  <p className="text-muted-foreground text-sm">{section.description}</p>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">
                  Updated: {new Date(section.lastUpdated).toLocaleDateString("en-IN")}
                </span>
              </div>
              <Link href={section.href}>
                <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition text-sm font-semibold">
                  Edit Section
                </button>
              </Link>
            </div>
          )}
          columns={2}
        />
      </div>
    </div>
  )
}
