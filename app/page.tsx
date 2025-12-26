import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Offer from "@/components/offer"
import Programs from "@/components/programs"
import Gallery from "@/components/gallery"
import Testimonials from "@/components/testimonials"
import WhyChooseUs from "@/components/why-choose-us"
import LeadForm from "@/components/lead-form"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Offer />
      <Programs />
      <Gallery />
      <Testimonials />
      <WhyChooseUs />
      <LeadForm />
      <Footer />
    </main>
  )
}
