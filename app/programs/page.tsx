import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const programs = [
  {
    icon: "🏃",
    title: "Personalized Training",
    description:
      "Custom workout plans designed for your body, goals, and lifestyle. Progressive programming that adapts as you improve.",
  },
  {
    icon: "🥗",
    title: "Nutrition Coaching",
    description:
      "Sustainable eating habits tailored to Indian cuisine preferences. No restrictive diets, just smart choices.",
  },
  {
    icon: "🧘",
    title: "Wellness Mentoring",
    description: "Holistic approach covering stress management, sleep, and mental health alongside fitness.",
  },
  {
    icon: "📱",
    title: "Digital Support",
    description: "Track progress, get guidance, and stay connected with your coach anytime, anywhere.",
  },
  {
    icon: "👥",
    title: "Group Classes",
    description: "Community-based fitness sessions for motivation and accountability with like-minded individuals.",
  },
  {
    icon: "📊",
    title: "Progress Tracking",
    description: "Detailed analytics and visual progress reports to keep you motivated and informed.",
  },
]

export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">Our Programs</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive fitness solutions designed for every goal and lifestyle
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/30 transition group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition">{program.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{program.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{program.description}</p>
                  <a
                    href="https://wa.me/919876543210?text=I%20want%20to%20know%20more%20about%20the%20{program.title}%20program"
                    className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition"
                  >
                    Enquire Now →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
