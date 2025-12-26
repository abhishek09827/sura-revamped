"use client"

import { useEffect, useState } from "react"

interface Program {
  id: number
  icon: string
  title: string
  description: string
  color_gradient: string
}

export default function ProgramsClient({ programs }: { programs: Program[] }) {
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  useEffect(() => {
    programs.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, idx])
      }, idx * 150)
    })
  }, [programs])

  return (
    <section id="programs" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground animate-float-up">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Programs</span>
          </h2>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto animate-float-up"
            style={{ animationDelay: "0.1s" }}
          >
            No pressure. No judgment. Just comprehensive programs that fit your life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, idx) => (
            <div
              key={program.id}
              className={`group relative p-8 rounded-2xl bg-gradient-to-br from-white to-secondary border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 cursor-pointer transform hover:scale-105 ${
                visibleCards.includes(idx) ? "animate-float-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${program.color_gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div className="text-5xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 inline-block">
                  {program.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">{program.description}</p>
                <div className="mt-6 pt-6 border-t border-primary/10 group-hover:border-primary/30 transition-colors">
                  <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                    Learn more →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
