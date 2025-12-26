"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { CRUDCardGrid } from "@/components/crud-card-grid"
import { CRUDFormModal } from "@/components/crud-form-modal"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { createClient } from "@/lib/client"

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  avatar?: string
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: "5",
    avatar: "",
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setTestimonials(data || [])
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingId(null)
    setFormData({
      name: "",
      role: "",
      content: "",
      rating: "5",
      avatar: "",
    })
    setIsModalOpen(true)
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id)
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      rating: String(testimonial.rating || 5),
      avatar: testimonial.avatar || "",
    })
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    // Validate required fields
    if (!formData.name.trim() || !formData.role.trim() || !formData.content.trim()) {
      alert("Please fill in all required fields.")
      return
    }

    try {
      setSaving(true)
      const supabase = createClient()

      // Prepare data with proper types
      const testimonialData = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        content: formData.content.trim(),
        rating: parseInt(formData.rating, 10) || 5,
        avatar: formData.avatar.trim() || null,
      }

      if (editingId) {
        const { error } = await supabase
          .from("testimonials")
          .update(testimonialData)
          .eq("id", editingId)
        
        if (error) {
          console.error("Supabase error:", error)
          throw new Error(error.message || "Failed to update testimonial")
        }
      } else {
        const { error } = await supabase
          .from("testimonials")
          .insert([testimonialData])
        
        if (error) {
          console.error("Supabase error:", error)
          throw new Error(error.message || "Failed to create testimonial")
        }
      }

      // Reset form and close modal
      setFormData({
        name: "",
        role: "",
        content: "",
        rating: "5",
        avatar: "",
      })
      setEditingId(null)
      setIsModalOpen(false)
      
      // Refresh the list
      await fetchTestimonials()
    } catch (error: any) {
      console.error("Error saving testimonial:", error)
      alert(`Failed to save testimonial: ${error.message || "Please try again."}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (testimonial: Testimonial) => {
    try {
      setDeleting(true)
      const supabase = createClient()
      
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", testimonial.id)
      
      if (error) {
        console.error("Supabase error:", error)
        throw new Error(error.message || "Failed to delete testimonial")
      }

      setDeleteTarget(null)
      await fetchTestimonials()
    } catch (error: any) {
      console.error("Error deleting testimonial:", error)
      alert(`Failed to delete testimonial: ${error.message || "Please try again."}`)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Manage Testimonials"
        description="View and approve client reviews"
        buttonLabel="+ Add Testimonial"
        onButtonClick={handleAdd}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading testimonials...</div>
        ) : (
          <CRUDCardGrid
            items={testimonials}
            renderCard={(testimonial) => (
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{testimonial.name}</h3>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-foreground italic">"{testimonial.content}"</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition text-sm font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(testimonial)}
                    className="flex-1 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition text-sm font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
            columns={1}
          />
        )}
      </div>

      <CRUDFormModal
        isOpen={isModalOpen}
        title={editingId ? "Edit Testimonial" : "Add Testimonial"}
        fields={[
          { name: "name", label: "Client Name", type: "text", required: true },
          { name: "role", label: "Role/Title", type: "text", required: true },
          {
            name: "rating",
            label: "Rating",
            type: "select",
            options: [
              { value: "5", label: "5 Stars" },
              { value: "4", label: "4 Stars" },
              { value: "3", label: "3 Stars" },
            ],
          },
          { name: "content", label: "Review Text", type: "textarea", required: true },
          { name: "avatar", label: "Avatar (emoji or image URL)", type: "text", required: false },
        ]}
        formData={formData}
        onFormChange={(name, value) => setFormData({ ...formData, [name]: value })}
        onSubmit={handleSave}
        onCancel={() => {
          setIsModalOpen(false)
          setEditingId(null)
          setFormData({
            name: "",
            role: "",
            content: "",
            rating: "5",
            avatar: "",
          })
        }}
        isLoading={saving}
        submitLabel={editingId ? "Update" : "Add"}
      />

      <DeleteConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from ${deleteTarget?.name}? This action cannot be undone.`}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleting}
      />
    </div>
  )
}
