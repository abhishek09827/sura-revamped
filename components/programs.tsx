import { createClient } from "@/lib/server"
import ProgramsClient from "./programs-client"

export default async function Programs() {
  const supabase = await createClient()
  const { data: programs } = await supabase.from("programs").select("*").order("id", { ascending: true })

  const programList = programs || [
    {
      id: 1,
      icon: "💪",
      title: "Personalized Training",
      description: "Custom workout plans designed for your body, goals, and lifestyle. No cookie-cutter routines.",
      color_gradient: "from-primary to-accent",
    },
    {
      id: 2,
      icon: "🥗",
      title: "Nutrition Coaching",
      description: "Sustainable eating habits tailored to Indian cuisine preferences. Realistic, not restrictive.",
      color_gradient: "from-accent to-primary",
    },
    {
      id: 3,
      icon: "🧘",
      title: "Wellness Mentoring",
      description: "Holistic approach covering stress management, sleep, and mental health alongside fitness.",
      color_gradient: "from-primary via-accent to-primary",
    },
    {
      id: 4,
      icon: "📱",
      title: "Digital Support",
      description: "Track progress, get guidance, and stay connected with your coach anytime, anywhere.",
      color_gradient: "from-accent to-primary",
    },
  ]

  return <ProgramsClient programs={programList} />
}
