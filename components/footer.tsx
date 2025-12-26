"use client"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-foreground to-primary/95 text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -mr-48 -mt-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12 pt-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Sura Fitness" width={32} height={32} className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-white to-accent/80 bg-clip-text text-transparent">
                Sura Fitness
              </span>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Premium wellness coaching for Indian families and working professionals. Transform your health with
              personalized guidance.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-accent/30 transition-all duration-300 flex items-center justify-center text-lg hover:scale-110"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-accent/30 transition-all duration-300 flex items-center justify-center text-lg hover:scale-110"
                aria-label="Instagram"
              >
                📷
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-accent/30 transition-all duration-300 flex items-center justify-center text-lg hover:scale-110"
                aria-label="YouTube"
              >
                🎬
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/#programs"
                  className="text-primary-foreground/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Programs
                </a>
              </li>
              <li>
                <a
                  href="/#testimonials"
                  className="text-primary-foreground/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-primary-foreground/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-primary-foreground/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+918840723476"
                  className="text-primary-foreground/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="text-lg">📱</span>
                  <span>+91 9876543210</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@surafitness.com"
                  className="text-primary-foreground/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="text-lg">✉️</span>
                  <span>hello@surafitness.com</span>
                </a>
              </li>
              <li className="text-primary-foreground/80 flex items-center gap-2">
                <span className="text-lg">📍</span>
                Mumbai, India
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/918840723476"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-primary rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:shadow-lg"
                >
                  <span>💬</span>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Get fitness tips and offers delivered to your inbox.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-accent text-primary font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-primary-foreground/70">© 2025 Sura Fitness. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="/policy" className="text-primary-foreground/70 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/policy" className="text-primary-foreground/70 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
