import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { createClient } from "@/lib/server"

export default async function TestimonialsPage() {
  const supabase = await createClient()
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })

  const testimonialList = testimonials || []
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">Success Stories</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real transformations from real people who changed their lives with Sura Fitness
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonialList.map((testimonial) => (
                <div key={testimonial.id} className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-muted flex items-center justify-center text-2xl">
                      {testimonial.avatar ? (
                        testimonial.avatar.startsWith("/") || testimonial.avatar.startsWith("http") ? (
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>{testimonial.avatar}</span>
                        )
                      ) : (
                        <span>👤</span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
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
