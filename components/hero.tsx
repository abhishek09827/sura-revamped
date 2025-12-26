import { createClient } from "@/lib/server"

interface SuccessStory {
  id: number
  stat: string
  label: string
  icon: string
}

export default async function Hero() {
  const supabase = await createClient()
  const { data: successStories } = await supabase
    .from("success_stories")
    .select("*")
    .order("id", { ascending: true })

  const stories: SuccessStory[] = successStories || [
    { id: 1, stat: "500+", label: "Happy Clients", icon: "👥" },
    { id: 2, stat: "95%", label: "Success Rate", icon: "📈" },
    { id: 3, stat: "8+", label: "Years Experience", icon: "⭐" },
  ]

  return (
    <section className="relative pt-24 pb-36 overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse" />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -ml-48 -mb-48 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance text-foreground">
                Transform Your Health,{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Elevate Your Life
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Premium fitness coaching tailored for busy professionals and families. Build sustainable habits without
                the aggression—just results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/918840723476?text=I%20want%20to%20know%20more%20about%20Sura%20Fitness%20coaching"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:animate-bounce-slow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378l-.361.214-3.741-.982.998 3.645-.235.374a9.861 9.861 0 001.51 5.694c.5.765 1.086 1.504 1.748 2.135l.42.383h.004c1.565 1.379 3.677 2.236 6.01 2.236 5.514 0 10-4.486 10-10S17.926 2.5 12.412 2.5c-2.33 0-4.441.857-6.007 2.23l-.42.384h.003z" />
                </svg>
                Enquire on WhatsApp
              </a>
              <button className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-accent/20 transition-all duration-300 border-2 border-primary/20 hover:border-primary/50">
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="space-y-2 p-4 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300 group cursor-pointer"
                >
                  <p className="text-3xl mb-2">{story.icon}</p>
                  <p className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
                    {story.stat}
                  </p>
                  <p className="text-sm font-medium text-foreground/70">{story.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block animate-slide-in-right">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/images/attachments-gen-images-v0-image-2.png"
                alt="Fitness coaching"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
