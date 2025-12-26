"use client"

import type React from "react"

import { createClient } from "@/lib/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { Lock, Mail } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push("/admin/dashboard")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6 animate-float-up">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="relative w-20 h-20 rounded-full bg-primary/10 p-3 animate-pulse-glow">
              <Image src="/images/image.png" alt="Sura Fitness Logo" fill className="object-contain" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Sura Fitness Admin
            </h1>
            <p className="text-sm text-muted-foreground">Secure Portal Access</p>
          </div>

          <Card className="border-primary/20 shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@surafitness.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">{error}</div>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 transition-all hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login to Admin Panel"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground">
            Authorized personnel only. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  )
}
