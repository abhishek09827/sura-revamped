"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { CRUDCardGrid } from "@/components/crud-card-grid"
import { CRUDFormModal } from "@/components/crud-form-modal"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { createClient } from "@/lib/client"

interface Offer {
  id: number
  title: string
  description: string
  details?: string
  valid_till?: string
  cta?: string
  is_active: boolean
}

export default function AdminOffers() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Offer | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: "",
    valid_till: "",
    cta: "Claim Offer",
    is_active: "true",
  })

  useEffect(() => {
    fetchOffers()
  }, [])

  const fetchOffers = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from("offers")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setOffers(data || [])
    } catch (error) {
      console.error("Error fetching offers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingId(null)
    setFormData({
      title: "",
      description: "",
      details: "",
      valid_till: "",
      cta: "Claim Offer",
      is_active: "true",
    })
    setIsModalOpen(true)
  }

  const handleEdit = (offer: Offer) => {
    setEditingId(offer.id)
    setFormData({
      title: offer.title,
      description: offer.description,
      details: offer.details || "",
      valid_till: offer.valid_till || "",
      cta: offer.cta || "Claim Offer",
      is_active: String(offer.is_active),
    })
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    // Validate required fields
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill in all required fields (Title, Description).")
      return
    }

    // Validate date format if provided
    if (formData.valid_till && !/^\d{4}-\d{2}-\d{2}$/.test(formData.valid_till.trim())) {
      alert("Valid Until date must be in YYYY-MM-DD format.")
      return
    }

    try {
      setSaving(true)
      const supabase = createClient()

      // Prepare data with proper types
      const offerData: any = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        details: formData.details.trim() || null,
        valid_till: formData.valid_till.trim() || null,
        cta: formData.cta.trim() || "Claim Offer",
        is_active: formData.is_active === "true",
      }

      if (editingId) {
        const { error } = await supabase
          .from("offers")
          .update(offerData)
          .eq("id", editingId)
        
        if (error) {
          console.error("Supabase error:", error)
          throw new Error(error.message || "Failed to update offer")
        }
      } else {
        const { error } = await supabase
          .from("offers")
          .insert([offerData])
        
        if (error) {
          console.error("Supabase error:", error)
          throw new Error(error.message || "Failed to create offer")
        }
      }

      // Reset form and close modal
      setFormData({
        title: "",
        description: "",
        details: "",
        valid_till: "",
        cta: "Claim Offer",
        is_active: "true",
      })
      setEditingId(null)
      setIsModalOpen(false)
      
      // Refresh the list
      await fetchOffers()
    } catch (error: any) {
      console.error("Error saving offer:", error)
      alert(`Failed to save offer: ${error.message || "Please try again."}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (offer: Offer) => {
    try {
      setDeleting(true)
      const supabase = createClient()
      
      const { error } = await supabase
        .from("offers")
        .delete()
        .eq("id", offer.id)
      
      if (error) {
        console.error("Supabase error:", error)
        throw new Error(error.message || "Failed to delete offer")
      }

      setDeleteTarget(null)
      await fetchOffers()
    } catch (error: any) {
      console.error("Error deleting offer:", error)
      alert(`Failed to delete offer: ${error.message || "Please try again."}`)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Manage Offers"
        description="Create and manage promotional offers"
        buttonLabel="+ Create Offer"
        onButtonClick={handleAdd}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading offers...</div>
        ) : (
          <CRUDCardGrid
            items={offers}
            renderCard={(offer) => (
              <div className="p-6 rounded-2xl bg-card border border-primary/20 hover:border-primary/50 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{offer.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{offer.description}</p>
                    {offer.details && (
                      <p className="text-primary text-lg font-bold mt-2">{offer.details}</p>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      offer.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {offer.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                {offer.valid_till && (
                  <p className="text-sm text-muted-foreground mb-4">
                    Valid until: {new Date(offer.valid_till).toLocaleDateString("en-IN")}
                  </p>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(offer)}
                    className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition text-sm font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(offer)}
                    className="flex-1 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition text-sm font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
            columns={2}
          />
        )}
      </div>

      <CRUDFormModal
        isOpen={isModalOpen}
        title={editingId ? "Edit Offer" : "Create New Offer"}
        fields={[
          { name: "title", label: "Offer Title", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea", required: true },
          { name: "details", label: "Details (e.g., 30% off first month)", type: "text", required: false },
          { name: "valid_till", label: "Valid Until (YYYY-MM-DD)", type: "text", required: false },
          { name: "cta", label: "Call to Action Button Text", type: "text", required: false },
          {
            name: "is_active",
            label: "Status",
            type: "select",
            options: [
              { value: "true", label: "Active" },
              { value: "false", label: "Inactive" },
            ],
          },
        ]}
        formData={formData}
        onFormChange={(name, value) => {
          setFormData({
            ...formData,
            [name]: value,
          })
        }}
        onSubmit={handleSave}
        onCancel={() => {
          setIsModalOpen(false)
          setEditingId(null)
          setFormData({
            title: "",
            description: "",
            details: "",
            valid_till: "",
            cta: "Claim Offer",
            is_active: "true",
          })
        }}
        isLoading={saving}
        submitLabel={editingId ? "Update" : "Create"}
      />

      <DeleteConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Offer"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleting}
      />
    </div>
  )
}
