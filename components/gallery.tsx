import { createClient } from "@/lib/server"
import GalleryClient from "./gallery-client"

export default async function Gallery() {
  const supabase = await createClient()
  const { data: transformations } = await supabase
    .from("transformations")
    .select("*")
    .order("id", { ascending: true })

  const transformationList = transformations || [
    {
      id: 1,
      name: "Priya",
      stats: "Lost 12kg",
      before_image: "/person-before-fitness-transformation.jpg",
      after_image: "/person-after-fitness-transformation.jpg",
      duration: "3 months",
    },
    {
      id: 2,
      name: "Rajesh",
      stats: "Gained Muscle Mass",
      before_image: "/man-before-fitness-journey.jpg",
      after_image: "/man-after-fitness-results.jpg",
      duration: "4 months",
    },
    {
      id: 3,
      name: "Anjali",
      stats: "Improved Stamina",
      before_image: "/woman-before-health-transformation.jpg",
      after_image: "/woman-after-health-improvement.jpg",
      duration: "3 months",
    },
  ]

  return <GalleryClient transformations={transformationList} />
}
