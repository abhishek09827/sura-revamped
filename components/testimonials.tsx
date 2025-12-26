import { createClient } from "@/lib/server"
import TestimonialsClient from "./testimonials-client"

export default async function Testimonials() {
  const supabase = await createClient()
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })

  const testimonialList = testimonials?.map((t) => ({
    ...t,
    text: t.content,
  })) || [
    {
      id: 1,
      name: "Meera Sharma",
      role: "Working Mom",
      text: "I finally found a coach who understands busy life. The programs are flexible and the nutrition advice respects my culture. Life-changing!",
      rating: 5,
      avatar: "👩‍💼",
    },
    {
      id: 2,
      name: "Amit Patel",
      role: "IT Professional",
      text: "After years of gym memberships, this personalized approach actually works. No judgment, just support. Highly recommend.",
      rating: 5,
      avatar: "👨‍💻",
    },
    {
      id: 3,
      name: "Deepika Verma",
      role: "Entrepreneur",
      text: "The wellness mentoring helped me manage stress alongside fitness. This holistic approach is rare and exactly what I needed.",
      rating: 5,
      avatar: "👩‍🔬",
    },
    {
      id: 4,
      name: "Rohit Kumar",
      role: "Corporate Executive",
      text: "Digital support is seamless. Tracked progress, got real feedback, and stayed motivated throughout. Worth every rupee.",
      rating: 5,
      avatar: "👨‍💼",
    },
  ]

  return <TestimonialsClient testimonials={testimonialList} />
}
