import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { createClient } from "@/lib/server"
import { notFound } from "next/navigation"

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "Published")
    .single()

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link href="/blog" className="text-primary font-semibold hover:underline mb-8 inline-flex">
            ← Back to Blog
          </Link>

          <div className="mb-8">
            <h1 className="text-5xl font-bold text-foreground mb-4">{post.title}</h1>
            <div className="flex gap-4 text-muted-foreground text-sm">
              <span>{post.author}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString("en-IN")}</span>
              <span>•</span>
              <span>{post.read_time}</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden mb-8 h-96 bg-muted">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div
            className="prose prose-lg max-w-none text-foreground [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-6 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Transform?</h3>
            <p className="text-muted-foreground mb-6">
              Get personalized fitness coaching to achieve your goals faster.
            </p>
            <a
              href="https://wa.me/919876543210?text=I%20want%20to%20know%20more%20about%20Sura%20Fitness%20coaching"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition"
            >
              Enquire Now on WhatsApp
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
