"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/client"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setIsAdmin(!!user)
    }
    checkAuth()
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-secondary border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-md bg-white/60 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/80">
              <Image src="/logo.png" alt="Sura Fitness" width={32} height={32} className="h-8 w-8 opacity-90" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary transition-colors duration-300 group-hover:text-primary/80">
                Sura Fitness
              </span>
              <span className="text-xs text-muted-foreground">Fitness Coaching</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/programs"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              Programs
            </Link>
            <Link
              href="/testimonials"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              Testimonials
            </Link>
            <Link
              href="/offers"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              Offers
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              Blog
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              Contact
            </Link>
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="text-sm px-5 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 hover:scale-110"
              >
                Admin
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-float-up">
            <Link
              href="/programs"
              className="block text-sm font-medium text-foreground/70 hover:text-primary transition-colors py-2"
            >
              Programs
            </Link>
            <Link
              href="/testimonials"
              className="block text-sm font-medium text-foreground/70 hover:text-primary transition-colors py-2"
            >
              Testimonials
            </Link>
            <Link
              href="/offers"
              className="block text-sm font-medium text-foreground/70 hover:text-primary transition-colors py-2"
            >
              Offers
            </Link>
            <Link
              href="/blog"
              className="block text-sm font-medium text-foreground/70 hover:text-primary transition-colors py-2"
            >
              Blog
            </Link>
            <Link
              href="/#contact"
              className="block text-sm font-medium text-foreground/70 hover:text-primary transition-colors py-2"
            >
              Contact
            </Link>
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="block text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg transition-all"
              >
                Admin
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
