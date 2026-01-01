import { PageHeader } from "@/components/page-header"
import { ContentSectionsGrid } from "@/components/content-sections-grid"
import { createClient } from "@/lib/server"

interface Section {
  id: number
  name: string
  description: string
  lastUpdated: string
  href: string
  count?: number
}

export default async function AdminContent() {
  const supabase = await createClient()

  // Fetch data for all sections in parallel
  const [
    offersResult,
    transformationsResult,
    testimonialsResult,
    blogsResult,
    successStoriesResult,
  ] = await Promise.all([
    supabase
      .from("offers")
      .select("created_at")
      .order("created_at", { ascending: false })
      .limit(1),
    supabase
      .from("transformations")
      .select("created_at")
      .order("created_at", { ascending: false })
      .limit(1),
    supabase
      .from("testimonials")
      .select("created_at")
      .order("created_at", { ascending: false })
      .limit(1),
    supabase
      .from("blogs")
      .select("created_at")
      .order("created_at", { ascending: false })
      .limit(1),
    supabase
      .from("success_stories")
      .select("created_at")
      .order("created_at", { ascending: false })
      .limit(1),
  ])

  // Get counts
  const [
    offersCount,
    transformationsCount,
    testimonialsCount,
    blogsCount,
    successStoriesCount,
  ] = await Promise.all([
    supabase.from("offers").select("id", { count: "exact", head: true }),
    supabase.from("transformations").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("blogs").select("id", { count: "exact", head: true }),
    supabase.from("success_stories").select("id", { count: "exact", head: true }),
  ])

  // Helper function to get last updated date
  const getLastUpdated = (data: any[] | null) => {
    if (!data || data.length === 0) return new Date().toISOString()
    const item = data[0]
    return item.created_at || new Date().toISOString()
  }

  const sections: Section[] = [
    {
      id: 1,
      name: "Offer Banner",
      description: `Current promotional offers (${offersCount.count || 0} offers)`,
      lastUpdated: getLastUpdated(offersResult.data),
      href: "/admin/offers",
      count: offersCount.count || 0,
    },
    {
      id: 2,
      name: "Gallery Section",
      description: `Transformation gallery (${transformationsCount.count || 0} transformations)`,
      lastUpdated: getLastUpdated(transformationsResult.data),
      href: "/admin/transformations",
      count: transformationsCount.count || 0,
    },
    {
      id: 3,
      name: "Testimonials Section",
      description: `Client success stories (${testimonialsCount.count || 0} testimonials)`,
      lastUpdated: getLastUpdated(testimonialsResult.data),
      href: "/admin/testimonials",
      count: testimonialsCount.count || 0,
    },
    {
      id: 4,
      name: "Blog Posts",
      description: `Blog articles and content (${blogsCount.count || 0} posts)`,
      lastUpdated: getLastUpdated(blogsResult.data),
      href: "/admin/blogs",
      count: blogsCount.count || 0,
    },
    {
      id: 5,
      name: "Success Stories",
      description: `Trust indicators and statistics (${successStoriesCount.count || 0} stories)`,
      lastUpdated: getLastUpdated(successStoriesResult.data),
      href: "/admin/success-stories",
      count: successStoriesCount.count || 0,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Homepage Content" description="Edit sections and content on your homepage" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ContentSectionsGrid sections={sections} />
      </div>
    </div>
  )
}
