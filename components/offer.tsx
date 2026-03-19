import { createClient } from "@/lib/server"

export default function Offer() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary via-primary/90 to-accent relative overflow-hidden shadow-2xl z-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 right-0 w-96 h-96 bg-black/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <div className="flex-1 text-center lg:text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold tracking-wide uppercase shadow-sm animate-in fade-in slide-in-from-left-4 duration-700">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Special Promotion
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-md leading-tight">
              Limited Time <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                Fitness Offer 💪
              </span>
            </h2>
            
            <p className="text-white/95 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed drop-shadow-sm">
              Join individuals and couples achieving their goals with our exclusive discounted plans. Up to <strong className="text-yellow-300 font-bold">8 bonus weeks</strong> included!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0 animate-in fade-in slide-in-from-right-8 duration-700 delay-150">
            <a 
              href="/offers"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all duration-300 border border-white/30 text-center text-lg shadow-lg hover:shadow-xl"
            >
              See Pricing Plans
            </a>
            <a 
              href="https://forms.monday.com/forms/2fff2c14a6304a8b4a3c66ee315665eb?r=use1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 bg-white text-primary hover:bg-gray-50 font-black rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group text-lg"
            >
              Claim Offer Now
              <svg
                className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          
        </div>
      </div>
    </section>
  )
}
