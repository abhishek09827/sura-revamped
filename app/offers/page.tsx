import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { createClient } from "@/lib/server"

export default async function OffersPage() {
  const supabase = await createClient()
  const { data: offers } = await supabase
    .from("offers")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  const offerList = offers || []
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">Special Offers</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Limited time promotions to help you start or upgrade your fitness journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offerList.map((offer) => (
                <div
                  key={offer.id}
                  className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/30 transition flex flex-col"
                >
                  <div className="mb-6 flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{offer.title}</h3>
                    <p className="text-muted-foreground mb-4">{offer.description}</p>
                    {offer.details && (
                      <p className="text-lg font-semibold text-primary mb-4">{offer.details}</p>
                    )}
                  </div>
                  <div>
                    {offer.valid_till && (
                      <p className="text-sm text-muted-foreground mb-4">
                        Valid till: {new Date(offer.valid_till).toLocaleDateString("en-IN")}
                      </p>
                    )}
                    <a
                      href={`https://wa.me/918840723476?text=I%20am%20interested%20in%20the%20${encodeURIComponent(offer.title)}%20offer`}
                      className="inline-flex w-full items-center justify-center px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition"
                    >
                      {offer.cta || "Claim Offer"}
                    </a>
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
