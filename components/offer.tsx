import { createClient } from "@/lib/server"

export default async function Offer() {
  const supabase = await createClient()
  const { data: offers } = await supabase.from("offers").select("*").limit(1).single()

  const offer = offers || {
    title: "Limited Time Offer",
    description: "Get 30% off your first month - No hidden charges, cancel anytime",
  }

  return (
    <section className="py-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-y border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 animate-float-up">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0 animate-pulse-glow">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg text-foreground">{offer.title}</p>
              <p className="text-sm text-foreground/70">{offer.description}</p>
            </div>
          </div>
          <button className="text-primary font-bold hover:text-accent transition-colors duration-300 whitespace-nowrap flex items-center gap-2 group">
            Claim Offer
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
