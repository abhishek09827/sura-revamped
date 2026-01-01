"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { createClient } from "@/lib/client"

interface DashboardStats {
  id: number
  total_leads: number | null
  active_clients: number | null
  blog_posts: number | null
  testimonials: number | null
}

interface ActualCounts {
  total_leads: number
  active_clients: number
  blog_posts: number
  testimonials: number
}

export default function DashboardStatsAdmin() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [actualCounts, setActualCounts] = useState<ActualCounts | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    total_leads: "",
    active_clients: "",
    blog_posts: "",
    testimonials: "",
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      
      // Fetch dashboard stats and actual counts in parallel
      const [statsResult, actualCountsResult] = await Promise.all([
        supabase.from("dashboard_stats").select("*").eq("id", 1).single(),
        Promise.all([
          supabase.from("leads").select("id", { count: "exact", head: true }),
          supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "Enrolled"),
          supabase.from("blogs").select("id", { count: "exact", head: true }),
          supabase.from("testimonials").select("id", { count: "exact", head: true }),
        ]),
      ])

      const [leadsCount, enrolledCount, blogsCount, testimonialsCount] = actualCountsResult

      // Store actual counts for display
      const counts: ActualCounts = {
        total_leads: leadsCount.count || 0,
        active_clients: enrolledCount.count || 0,
        blog_posts: blogsCount.count || 0,
        testimonials: testimonialsCount.count || 0,
      }
      setActualCounts(counts)

      // Handle dashboard stats
      if (statsResult.data) {
        setStats(statsResult.data)
        setFormData({
          total_leads: statsResult.data.total_leads?.toString() || "",
          active_clients: statsResult.data.active_clients?.toString() || "",
          blog_posts: statsResult.data.blog_posts?.toString() || "",
          testimonials: statsResult.data.testimonials?.toString() || "",
        })
      } else if (statsResult.error && statsResult.error.code === "PGRST116") {
        // Row doesn't exist - initialize with empty values
        setStats(null)
        setFormData({
          total_leads: "",
          active_clients: "",
          blog_posts: "",
          testimonials: "",
        })
      } else if (statsResult.error) {
        throw statsResult.error
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
      alert("Failed to load dashboard stats. Please refresh the page.")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const supabase = createClient()

      const updateData = {
        total_leads: formData.total_leads && formData.total_leads.trim() !== "" 
          ? parseInt(formData.total_leads) 
          : null,
        active_clients: formData.active_clients && formData.active_clients.trim() !== "" 
          ? parseInt(formData.active_clients) 
          : null,
        blog_posts: formData.blog_posts && formData.blog_posts.trim() !== "" 
          ? parseInt(formData.blog_posts) 
          : null,
        testimonials: formData.testimonials && formData.testimonials.trim() !== "" 
          ? parseInt(formData.testimonials) 
          : null,
        updated_at: new Date().toISOString(),
      }

      // Try to update first, if row doesn't exist, insert
      const { error: updateError } = await supabase
        .from("dashboard_stats")
        .update(updateData)
        .eq("id", 1)

      if (updateError) {
        // If update fails because row doesn't exist, insert
        if (updateError.code === "PGRST116" || updateError.message.includes("No rows")) {
          const { error: insertError } = await supabase
            .from("dashboard_stats")
            .insert([{ id: 1, ...updateData }])
          
          if (insertError) throw insertError
        } else {
          throw updateError
        }
      }

      await fetchStats()
      alert("Dashboard stats updated successfully!")
    } catch (error: any) {
      console.error("Error saving dashboard stats:", error)
      alert(`Failed to save dashboard stats: ${error.message || "Please try again."}`)
    } finally {
      setSaving(false)
    }
  }

  const handleReset = async () => {
    if (confirm("Reset all stats to use actual counts from database?")) {
      try {
        setSaving(true)
        const supabase = createClient()

        const resetData = {
          total_leads: null,
          active_clients: null,
          blog_posts: null,
          testimonials: null,
          updated_at: new Date().toISOString(),
        }

        const { error: updateError } = await supabase
          .from("dashboard_stats")
          .update(resetData)
          .eq("id", 1)

        if (updateError) {
          // If row doesn't exist, insert it
          if (updateError.code === "PGRST116" || updateError.message.includes("No rows")) {
            const { error: insertError } = await supabase
              .from("dashboard_stats")
              .insert([{ id: 1, ...resetData }])
            
            if (insertError) throw insertError
          } else {
            throw updateError
          }
        }

        setFormData({
          total_leads: "",
          active_clients: "",
          blog_posts: "",
          testimonials: "",
        })

        await fetchStats()
        alert("Stats reset to use actual counts!")
      } catch (error: any) {
        console.error("Error resetting dashboard stats:", error)
        alert(`Failed to reset stats: ${error.message || "Please try again."}`)
      } finally {
        setSaving(false)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="Dashboard Statistics" description="Manage dashboard statistics" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Dashboard Statistics" description="Override dashboard statistics or leave empty to use actual counts" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {actualCounts && (
          <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Current Database Counts:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total Leads:</span>
                <span className="ml-2 font-semibold text-foreground">{actualCounts.total_leads}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Active Clients:</span>
                <span className="ml-2 font-semibold text-foreground">{actualCounts.active_clients}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Blog Posts:</span>
                <span className="ml-2 font-semibold text-foreground">{actualCounts.blog_posts}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Testimonials:</span>
                <span className="ml-2 font-semibold text-foreground">{actualCounts.testimonials}</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Total Leads <span className="text-muted-foreground text-xs">(leave empty for actual count: {actualCounts?.total_leads || 0})</span>
              </label>
              <input
                type="number"
                value={formData.total_leads}
                onChange={(e) => setFormData({ ...formData, total_leads: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={`Current: ${actualCounts?.total_leads || 0}`}
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Active Clients <span className="text-muted-foreground text-xs">(leave empty for actual count: {actualCounts?.active_clients || 0})</span>
              </label>
              <input
                type="number"
                value={formData.active_clients}
                onChange={(e) => setFormData({ ...formData, active_clients: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={`Current: ${actualCounts?.active_clients || 0}`}
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Blog Posts <span className="text-muted-foreground text-xs">(leave empty for actual count: {actualCounts?.blog_posts || 0})</span>
              </label>
              <input
                type="number"
                value={formData.blog_posts}
                onChange={(e) => setFormData({ ...formData, blog_posts: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={`Current: ${actualCounts?.blog_posts || 0}`}
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Testimonials <span className="text-muted-foreground text-xs">(leave empty for actual count: {actualCounts?.testimonials || 0})</span>
              </label>
              <input
                type="number"
                value={formData.testimonials}
                onChange={(e) => setFormData({ ...formData, testimonials: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={`Current: ${actualCounts?.testimonials || 0}`}
                min="0"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/30 transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleReset}
                disabled={saving}
                className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition disabled:opacity-50"
              >
                Reset to Actual
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Leave fields empty to use actual counts from the database. Set values to override
              and display custom numbers on the dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

