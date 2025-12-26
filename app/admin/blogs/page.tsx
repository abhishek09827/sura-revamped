"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { CRUDTable } from "@/components/crud-table"
import { CRUDFormModal } from "@/components/crud-form-modal"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { createClient } from "@/lib/client"

interface Blog {
  id: number
  slug: string
  title: string
  excerpt: string
  content?: string
  author: string
  image?: string
  date: string
  read_time: string
  status: "Published" | "Draft"
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "Sura Fitness Team",
    image: "",
    read_time: "5 min read",
    status: "Draft" as const,
  })

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("date", { ascending: false })

      if (error) throw error
      setBlogs(data || [])
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleAdd = () => {
    setEditingId(null)
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "Sura Fitness Team",
      image: "",
      read_time: "5 min read",
      status: "Draft",
    })
    setIsModalOpen(true)
  }

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id)
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content || "",
      author: blog.author,
      image: blog.image || "",
      read_time: blog.read_time,
      status: blog.status,
    })
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    // Validate required fields
    if (!formData.title.trim() || !formData.slug.trim() || !formData.excerpt.trim() || !formData.author.trim()) {
      alert("Please fill in all required fields (Title, Slug, Excerpt, Author).")
      return
    }

    // Validate slug format
    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugPattern.test(formData.slug.trim())) {
      alert("Slug must contain only lowercase letters, numbers, and hyphens. It cannot start or end with a hyphen.")
      return
    }

    try {
      setSaving(true)
      const supabase = createClient()
      
      // Generate slug if not provided or if creating new blog
      const finalSlug = formData.slug.trim() || generateSlug(formData.title.trim())

      // Prepare data with proper types and trimming
      const blogData: any = {
        title: formData.title.trim(),
        slug: finalSlug,
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim() || null,
        author: formData.author.trim(),
        image: formData.image.trim() || null,
        read_time: formData.read_time.trim() || "5 min read",
        status: formData.status,
      }

      // Only set date for new blogs
      if (!editingId) {
        blogData.date = new Date().toISOString().split("T")[0]
      }

      if (editingId) {
        const { error } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", editingId)
        
        if (error) {
          console.error("Supabase error:", error)
          throw new Error(error.message || "Failed to update blog")
        }
      } else {
        const { error } = await supabase
          .from("blogs")
          .insert([blogData])
        
        if (error) {
          console.error("Supabase error:", error)
          // Check if it's a unique constraint violation
          if (error.code === "23505") {
            throw new Error("A blog with this slug already exists. Please use a different slug.")
          }
          throw new Error(error.message || "Failed to create blog")
        }
      }

      // Reset form and close modal
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "Sura Fitness Team",
        image: "",
        read_time: "5 min read",
        status: "Draft",
      })
      setEditingId(null)
      setIsModalOpen(false)
      
      // Refresh the list
      await fetchBlogs()
    } catch (error: any) {
      console.error("Error saving blog:", error)
      alert(`Failed to save blog: ${error.message || "Please try again."}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (blog: Blog) => {
    try {
      setDeleting(true)
      const supabase = createClient()
      
      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", blog.id)
      
      if (error) {
        console.error("Supabase error:", error)
        throw new Error(error.message || "Failed to delete blog")
      }

      setDeleteTarget(null)
      await fetchBlogs()
    } catch (error: any) {
      console.error("Error deleting blog:", error)
      alert(`Failed to delete blog: ${error.message || "Please try again."}`)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Manage Blogs"
        description="Create and edit blog posts"
        buttonLabel="+ Write Blog Post"
        onButtonClick={handleAdd}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading blogs...</div>
        ) : (
          <CRUDTable
            columns={[
              { key: "title", label: "Title" },
              { key: "author", label: "Author" },
              {
                key: "date",
                label: "Date",
                render: (value) => new Date(value).toLocaleDateString("en-IN"),
              },
              {
                key: "status",
                label: "Status",
                render: (value) => (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      value === "Published" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {value}
                  </span>
                ),
              },
              { key: "read_time", label: "Read Time" },
            ]}
            data={blogs}
            onEdit={handleEdit}
            onDelete={(blog) => setDeleteTarget(blog)}
          />
        )}
      </div>

      <CRUDFormModal
        isOpen={isModalOpen}
        title={editingId ? "Edit Blog Post" : "Write New Blog Post"}
        fields={[
          { name: "title", label: "Post Title", type: "text", required: true },
          { name: "slug", label: "URL Slug", type: "text", required: true },
          { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
          { name: "content", label: "Content (HTML)", type: "textarea", required: false },
          { name: "author", label: "Author", type: "text", required: true },
          { name: "image", label: "Image URL", type: "text", required: false },
          { name: "read_time", label: "Read Time", type: "text", required: true },
          {
            name: "status",
            label: "Status",
            type: "select",
            options: [
              { value: "Draft", label: "Draft" },
              { value: "Published", label: "Published" },
            ],
          },
        ]}
        formData={formData}
        onFormChange={(name, value) => {
          if (name === "title" && !editingId && !formData.slug) {
            // Auto-generate slug only if slug is empty and we're creating a new blog
            setFormData((prev) => ({ ...prev, [name]: value, slug: generateSlug(value) }))
          } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
          }
        }}
        onSubmit={handleSave}
        onCancel={() => {
          setIsModalOpen(false)
          setEditingId(null)
          setFormData({
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            author: "Sura Fitness Team",
            image: "",
            read_time: "5 min read",
            status: "Draft",
          })
        }}
        isLoading={saving}
        submitLabel={editingId ? "Update" : "Create"}
      />

      <DeleteConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleting}
      />
    </div>
  )
}
