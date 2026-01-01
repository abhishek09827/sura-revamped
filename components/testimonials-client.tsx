"use client"

import { useEffect, useState } from "react"

interface Testimonial {
  id: number
  name: string
  role: string
  text: string
  rating: number
  avatar: string
}

export default function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  useEffect(() => {
    testimonials.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, idx])
      }, idx * 100)
    })
  }, [testimonials])

  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48 -mt-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground animate-float-up">
            What Our Clients{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Say</span>
          </h2>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto animate-float-up"
            style={{ animationDelay: "0.1s" }}
          >
            Real stories from real people who transformed their lives
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className={`group relative p-8 rounded-2xl bg-white border-2 border-primary/10 hover:border-primary/40 shadow-sm hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105 ${
                visibleCards.includes(idx) ? "animate-float-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-primary group-hover:text-accent transition-colors"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3 pt-6 border-t border-primary/10">
                <img
  src={testimonial.avatar}
  alt={testimonial.name}
  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary transition"
/>
                  <div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-foreground/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
