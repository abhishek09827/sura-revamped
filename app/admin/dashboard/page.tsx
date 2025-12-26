"use client"

import Link from "next/link"

export default function AdminDashboard() {
  const stats = [
    { label: "Total Leads", value: "24", icon: "📋" },
    { label: "Active Clients", value: "156", icon: "👥" },
    { label: "Blog Posts", value: "12", icon: "📝" },
    { label: "Testimonials", value: "48", icon: "⭐" },
  ]

  const recentLeads = [
    { name: "Priya Kumar", phone: "+91 9876543210", date: "2025-01-15", status: "New" },
    { name: "Amit Singh", phone: "+91 8765432109", date: "2025-01-14", status: "Contacted" },
    { name: "Deepika Verma", phone: "+91 7654321098", date: "2025-01-13", status: "New" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-primary-foreground/80">Welcome back! Here's your overview.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl bg-card border border-border">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/admin/testimonials"
              className="p-4 rounded-lg bg-card border border-border hover:bg-muted transition text-center"
            >
              <p className="text-lg font-semibold text-foreground">Add Testimonial</p>
            </Link>
            <Link
              href="/admin/blogs"
              className="p-4 rounded-lg bg-card border border-border hover:bg-muted transition text-center"
            >
              <p className="text-lg font-semibold text-foreground">Write Blog Post</p>
            </Link>
            <Link
              href="/admin/offers"
              className="p-4 rounded-lg bg-card border border-border hover:bg-muted transition text-center"
            >
              <p className="text-lg font-semibold text-foreground">Create Offer</p>
            </Link>
          </div>
        </div>

        {/* Recent Leads */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Leads</h2>
            <Link href="/admin/leads" className="text-primary font-semibold hover:underline">
              View All →
            </Link>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="px-6 py-4 text-foreground">{lead.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{lead.phone}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(lead.date).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          lead.status === "New" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
