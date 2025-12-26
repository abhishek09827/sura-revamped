"use client"

import { createClient } from "@/lib/client"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export default function AdminHeader({ user }: { user: SupabaseUser }) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 font-semibold text-lg hover:text-primary transition-colors"
        >
          Admin Panel
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">{user.email}</span>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
