"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { CRUDTable } from "@/components/crud-table"
import { createClient } from "@/lib/client"

interface Lead {
  id: number
  name: string
  phone: string
  message?: string
  status: "New" | "Contacted" | "Enrolled"
  created_at: string
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setLeads(data || [])
    } catch (error) {
      console.error("Error fetching leads:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Manage Leads" description="View and manage form submissions" buttonLabel="Export Leads" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No leads yet. Form submissions will appear here.</div>
        ) : (
          <CRUDTable
            columns={[
              { key: "name", label: "Name" },
              { key: "phone", label: "Phone" },
              {
                key: "message",
                label: "Message",
                render: (value) => (
                  <span className="max-w-xs truncate block" title={value || ""}>
                    {value || "—"}
                  </span>
                ),
              },
              {
                key: "created_at",
                label: "Date",
                render: (value) => new Date(value).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
              {
                key: "status",
                label: "Status",
                render: (value) => (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      value === "New"
                        ? "bg-primary/10 text-primary"
                        : value === "Contacted"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {value}
                  </span>
                ),
              },
            ]}
            data={leads}
            onEdit={() => {}}
            onDelete={() => {}}
            showActions={false}
          />
        )}
      </div>
    </div>
  )
}
