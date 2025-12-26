import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-5xl font-bold text-foreground mb-8">Policies & Terms</h1>

          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Sura Fitness, we are committed to protecting your privacy. This policy explains how we collect, use,
                and safeguard your information.
              </p>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Information We Collect:</strong> We collect personal information such as name, phone number,
                  email, and fitness goals when you enquire about our services.
                </p>
                <p>
                  <strong>How We Use It:</strong> We use your information to provide personalized fitness coaching, send
                  updates about programs, and improve our services.
                </p>
                <p>
                  <strong>Security:</strong> Your data is protected with industry-standard security measures. We never
                  share your information with third parties without consent.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Terms of Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By using Sura Fitness services, you agree to these terms:
              </p>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Health Disclaimer:</strong> Consult with a healthcare provider before starting any fitness
                  program. Sura Fitness is not responsible for injuries resulting from improper form or undisclosed
                  health conditions.
                </p>
                <p>
                  <strong>Cancellation Policy:</strong> You can cancel your membership anytime without penalties or
                  long-term contracts.
                </p>
                <p>
                  <strong>Payment Terms:</strong> All fees must be paid upfront. Refunds are available within 7 days of
                  purchase if you haven't started the program.
                </p>
                <p>
                  <strong>User Conduct:</strong> Respect our coaches and community members. Harassment or abusive
                  behavior will result in immediate program termination.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Refund Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We offer a 7-day money-back guarantee if you're not satisfied with our services. To request a refund,
                contact us within 7 days of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these policies, reach out to us at{" "}
                <a href="mailto:hello@surafitness.com" className="text-primary font-semibold hover:underline">
                  hello@surafitness.com
                </a>{" "}
                or{" "}
                <a href="https://wa.me/919876543210" className="text-primary font-semibold hover:underline">
                  WhatsApp
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
