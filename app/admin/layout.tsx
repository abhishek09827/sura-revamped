import type React from "react"
import { createClient } from "@/lib/server"
import AdminHeader from "@/components/admin-header"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-background">
      {user && <AdminHeader user={user} />}
      <main>{children}</main>
    </div>
  )
}
