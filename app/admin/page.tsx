"use client"

import Link from "next/link"
import Image from "next/image"

const adminMenuItems = [
  {
    title: "Dashboard",
    description: "Overview and quick actions",
    href: "/admin/dashboard",
    icon: "📊",
  },
  {
    title: "Homepage Content",
    description: "Edit hero, programs, and sections",
    href: "/admin/content",
    icon: "🏠",
  },
  {
    title: "Testimonials",
    description: "Manage client success stories",
    href: "/admin/testimonials",
    icon: "⭐",
  },
  {
    title: "Blogs",
    description: "Create and edit blog posts",
    href: "/admin/blogs",
    icon: "📝",
  },
  {
    title: "Offers",
    description: "Manage promotional offers",
    href: "/admin/offers",
    icon: "🎁",
  },
  {
    title: "Leads",
    description: "View form submissions",
    href: "/admin/leads",
    icon: "📋",
  },
  {
    title: "Real Transformations",
    description: "Manage client transformation stories",
    href: "/admin/transformations",
    icon: "💪",
  },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Image src="/logo.png" alt="Sura Fitness" width={40} height={40} />
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
          <p className="text-primary-foreground/80">Manage your Sura Fitness website</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/30 transition"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
