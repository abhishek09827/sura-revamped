import Link from "next/link"
import { createClient } from "@/lib/server"

interface Lead {
  id: number
  name: string
  phone: string
  status: "New" | "Contacted" | "Enrolled"
  created_at: string
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch stats in parallel
  const [
    dashboardStatsResult,
    leadsResult,
    activeClientsResult,
    blogsResult,
    testimonialsResult,
    recentLeadsResult,
  ] = await Promise.all([
    supabase.from("dashboard_stats").select("*").eq("id", 1).single(),
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "Enrolled"),
    supabase.from("blogs").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("id, name, phone, status, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
  ])

  const dashboardStats = dashboardStatsResult.data
  const actualTotalLeads = leadsResult.count || 0
  const actualActiveClients = activeClientsResult.count || 0
  const actualBlogPosts = blogsResult.count || 0
  const actualTestimonials = testimonialsResult.count || 0

  // Use override values if set, otherwise use actual counts
  const totalLeads = dashboardStats?.total_leads ?? actualTotalLeads
  const activeClients = dashboardStats?.active_clients ?? actualActiveClients
  const blogPosts = dashboardStats?.blog_posts ?? actualBlogPosts
  const testimonials = dashboardStats?.testimonials ?? actualTestimonials

  const recentLeads = (recentLeadsResult.data || []) as Lead[]

  const stats = [
    { label: "Total Leads", value: totalLeads.toString(), icon: "📋" },
    { label: "Active Clients", value: activeClients.toString(), icon: "👥" },
    { label: "Blog Posts", value: blogPosts.toString(), icon: "📝" },
    { label: "Testimonials", value: testimonials.toString(), icon: "⭐" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-primary-foreground/80">Welcome back! Here's your overview.</p>
            </div>
            <Link
              href="/admin/dashboard-stats"
              className="px-4 py-2 rounded-lg bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition text-sm font-semibold"
            >
              Edit Stats
            </Link>
          </div>
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
            {recentLeads.length === 0 ? (
              <div className="px-6 py-12 text-center text-muted-foreground">
                No leads yet. Form submissions will appear here.
              </div>
            ) : (
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
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border hover:bg-muted/50 transition">
                      <td className="px-6 py-4 text-foreground">{lead.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{lead.phone}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            lead.status === "New"
                              ? "bg-primary/10 text-primary"
                              : lead.status === "Contacted"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
