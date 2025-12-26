"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"

interface Transformation {
  id: number
  name: string
  stats: string
  before_image: string
  after_image: string
  duration: string
}

export default function GalleryClient({ transformations }: { transformations: Transformation[] }) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }
    emblaApi.on("select", onSelect)
    onSelect()
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground animate-float-up">
            Real{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Transformations
            </span>
          </h2>
          <p className="text-lg text-muted-foreground animate-float-up" style={{ animationDelay: "0.1s" }}>
            See the incredible results our clients have achieved
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {transformations.map((item, idx) => (
                <div
                  key={item.id}
                  className="min-w-[280px] sm:min-w-[320px] lg:min-w-[360px] flex-1 space-y-4 animate-float-up group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative rounded-2xl overflow-hidden h-64 shadow-lg group-hover:shadow-2xl group-hover:shadow-primary/30 transition-all duration-300">
                    <div className="grid grid-cols-2 h-full gap-1 relative">
                      <div className="relative overflow-hidden group-hover:scale-110 transition-transform duration-500 origin-right">
                        <img
                          src={item.before_image || "/placeholder.svg"}
                          alt={`${item.name} before`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 flex items-end justify-center pb-2">
                          <span className="text-xs font-bold text-white/90">Before</span>
                        </div>
                      </div>
                      <div className="relative overflow-hidden group-hover:scale-110 transition-transform duration-500 origin-left">
                        <img
                          src={item.after_image || "/placeholder.svg"}
                          alt={`${item.name} after`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-green-900/20 group-hover:bg-green-900/0 transition-colors duration-300 flex items-end justify-center pb-2">
                          <span className="text-xs font-bold text-white/90">After</span>
                        </div>
                      </div>
                    </div>

                    {hoveredCard === item.id && (
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent flex flex-col items-center justify-end pb-6 animate-float-up">
                        <p className="text-white font-bold text-lg">{item.stats}</p>
                        <p className="text-white/80 text-sm">{item.duration} transformation</p>
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <p className="font-bold text-lg text-foreground">{item.name}'s Journey</p>
                    <p className="text-sm text-foreground/60">{item.stats}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="px-4 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="px-4 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
