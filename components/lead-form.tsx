"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/client"

export default function LeadForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)

    try {
      const supabase = createClient()
      
      const { error: insertError } = await supabase
        .from("leads")
        .insert([
          {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            message: formData.message.trim() || null,
            status: "New",
          },
        ])

      if (insertError) {
        console.error("Error saving lead:", insertError)
        throw new Error(insertError.message || "Failed to submit form. Please try again.")
      }

      setSubmitted(true)
      setFormData({ name: "", phone: "", message: "" })
      
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err: any) {
      console.error("Error submitting form:", err)
      setError(err.message || "Failed to submit form. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -mr-48" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground animate-float-up">
            Ready to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Transform</span>?
          </h2>
          <p className="text-lg text-muted-foreground animate-float-up" style={{ animationDelay: "0.1s" }}>
            Let's chat about your fitness goals. Fill out the form below and we'll reach out within 24 hours.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-16 animate-float-up">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Thank You!</h3>
            <p className="text-muted-foreground">We'll be in touch soon. Check your phone for our message.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 md:p-12 rounded-2xl border-2 border-primary/10 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 animate-float-up"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-foreground mb-3">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/40"
                placeholder="Priya or Rajesh"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-foreground mb-3">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/40"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-foreground mb-3">
                Tell us about your goals
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/40 resize-none"
                placeholder="E.g., I want to lose weight, build strength, manage stress..."
              />
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {submitting ? "Sending..." : "Send Enquiry"}
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Or reach us directly on{" "}
              <a
                href="https://wa.me/918840723476"
                className="text-primary font-bold hover:text-accent transition-colors"
              >
                WhatsApp
              </a>
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
