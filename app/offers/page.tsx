import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function OffersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Special Promotional Hero Section */}
        <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-b from-primary/10 to-background border-b border-border/10">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-4 mb-16 animate-in slide-in-from-bottom-8 duration-700">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary font-bold text-sm mb-4 animate-bounce-slow">
                Limited Time Fitness Offer 💪
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
                Kickstart Your Fitness Journey
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Exclusive discounted plans at Sura Fitness. Perfect for individuals and couples looking to stay consistent and healthy.
              </p>
            </div>

            {/* Premium Pricing Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">

              {/* Tier 1 */}
              <div className="relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all shadow-sm hover:shadow-xl flex flex-col group animate-in slide-in-from-bottom-12 duration-700 delay-100 fill-mode-both">
                <div className="mb-8 text-center">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">12 Weeks</h3>
                  <p className="text-muted-foreground text-sm">Perfect for individuals starting out</p>
                </div>
                <div className="space-y-6 mb-8 flex-1">
                  <div className="flex justify-between items-center pb-4 border-b border-border/50">
                    <span className="text-foreground/80 font-medium">Single</span>
                    <span className="text-2xl font-bold">₹10,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/80 font-medium">Couple</span>
                    <span className="text-2xl font-bold text-primary">₹16,000</span>
                  </div>
                </div>
                <a
                  href="https://forms.monday.com/forms/2fff2c14a6304a8b4a3c66ee315665eb?r=use1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold transition text-center"
                >
                  Claim Offer
                </a>
              </div>

              {/* Tier 2 (Highlighted) */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-b from-primary/10 to-transparent border-2 border-primary shadow-2xl flex flex-col transform md:-translate-y-6 md:scale-105 group animate-in slide-in-from-bottom-12 duration-700 delay-200 fill-mode-both">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg whitespace-nowrap">
                  Most Popular ✨
                </div>
                <div className="mb-8 text-center mt-2">
                  <h3 className="text-3xl font-extrabold mb-2 text-foreground">25 + 4 Weeks</h3>
                  <p className="text-primary font-bold text-sm bg-primary/10 inline-block px-3 py-1 rounded-full border border-primary/20">Bonus 4 weeks included!</p>
                </div>
                <div className="space-y-6 mb-8 flex-1">
                  <div className="flex justify-between items-center pb-4 border-b border-primary/20">
                    <span className="text-foreground/80 font-medium text-lg">Single</span>
                    <span className="text-3xl font-bold">₹16,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/80 font-medium text-lg">Couple</span>
                    <span className="text-3xl font-bold text-primary">₹30,000</span>
                  </div>
                </div>
                <a
                  href="https://forms.monday.com/forms/2fff2c14a6304a8b4a3c66ee315665eb?r=use1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-lg hover:-translate-y-1 transition text-center text-lg"
                >
                  Claim Best Value
                </a>
              </div>

              {/* Tier 3 */}
              <div className="relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all shadow-sm hover:shadow-xl flex flex-col group animate-in slide-in-from-bottom-12 duration-700 delay-300 fill-mode-both">
                <div className="mb-8 text-center">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">48 + 8 Weeks</h3>
                  <p className="text-muted-foreground font-semibold text-sm">Bonus 8 weeks included! ✨</p>
                </div>
                <div className="space-y-6 mb-8 flex-1">
                  <div className="flex justify-between items-center pb-4 border-b border-border/50">
                    <span className="text-foreground/80 font-medium">Single</span>
                    <span className="text-2xl font-bold">₹28,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/80 font-medium">Couple</span>
                    <span className="text-2xl font-bold text-primary">₹55,000</span>
                  </div>
                </div>
                <a
                  href="https://forms.monday.com/forms/2fff2c14a6304a8b4a3c66ee315665eb?r=use1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold transition text-center"
                >
                  Claim Offer
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
