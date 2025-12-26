import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { createClient } from "@/lib/server"

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "Published")
    .order("date", { ascending: false })

  const blogList = blogs || []
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">Fitness Blog</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expert insights, tips, and inspiration for your fitness journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogList.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-lg hover:border-primary/30 transition flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex gap-2 text-sm text-muted-foreground mb-3">
                      <span>{new Date(blog.date).toLocaleDateString("en-IN")}</span>
                      <span>•</span>
                      <span>{blog.read_time}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{blog.excerpt}</p>
                    <div className="mt-4 inline-flex text-primary font-semibold group-hover:text-primary/80 transition">
                      Read More →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
