"use client"

import { useEffect, useState } from "react"

const reasons = [
  {
    icon: "🏆",
    title: "Certified Professionals",
    description: "International certifications and continuous learning ensure expert guidance.",
    color: "from-primary to-primary/50",
  },
  {
    icon: "🌟",
    title: "Holistic Approach",
    description: "We care about your overall wellness, not just physical appearance.",
    color: "from-accent to-accent/50",
  },
  {
    icon: "🇮🇳",
    title: "Indian-Friendly Plans",
    description: "Nutrition and fitness recommendations respect your culture and food preferences.",
    color: "from-primary to-accent",
  },
  {
    icon: "📱",
    title: "24/7 Digital Access",
    description: "Connect with your coach anytime for quick answers and adjustments.",
    color: "from-accent to-primary",
  },
  {
    icon: "🔓",
    title: "No Contracts, Pure Trust",
    description: "Cancel anytime. We keep you because you see real results, not lock-ins.",
    color: "from-primary to-primary/50",
  },
  {
    icon: "👥",
    title: "Community Support",
    description: "Join a supportive community of like-minded individuals on the same journey.",
    color: "from-accent to-accent/50",
  },
]

export default function WhyChooseUs() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  useEffect(() => {
    reasons.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, idx])
      }, idx * 100)
    })
  }, [])

  return (
    <section className="py-24 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden">
      <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground animate-float-up">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sura Fitness</span>
          </h2>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto animate-float-up"
            style={{ animationDelay: "0.1s" }}
          >
            We're not just another gym. We're your trusted partner in sustainable wellness.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className={`group relative p-8 rounded-2xl bg-white border-2 border-primary/10 hover:border-primary/40 shadow-sm hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                visibleCards.includes(idx) ? "animate-float-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
              />

              <div className="relative z-10 space-y-4">
                <div className="text-5xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 inline-block">
                  {reason.icon}
                </div>
                <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed text-sm">{reason.description}</p>
                <div className="pt-4 border-t border-primary/10 group-hover:border-primary/30 transition-colors">
                  <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                    ✓ Verified
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
