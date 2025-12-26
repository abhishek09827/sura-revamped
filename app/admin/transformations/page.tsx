"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/client"

interface Transformation {
  id: number
  name: string
  stats: string
  before_image: string
  after_image: string
  duration: string
}

export default function TransformationsAdmin() {
  const [transformations, setTransformations] = useState<Transformation[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    stats: "",
    before_image: "",
    after_image: "",
    duration: "3 months",
  })

  useEffect(() => {
    fetchTransformations()
  }, [])

  const fetchTransformations = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from("transformations")
        .select("*")
        .order("id", { ascending: true })

      if (error) throw error
      setTransformations(data || [])
    } catch (error) {
      console.error("Error fetching transformations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const supabase = createClient()

      if (editingId) {
        const { error } = await supabase
          .from("transformations")
          .update(formData)
          .eq("id", editingId)

        if (error) throw error
        await fetchTransformations()
        setEditingId(null)
      } else if (isAdding) {
        const { error } = await supabase.from("transformations").insert([formData])

        if (error) throw error
        await fetchTransformations()
        setIsAdding(false)
      }
      resetForm()
    } catch (error) {
      console.error("Error saving transformation:", error)
      alert("Failed to save transformation. Please try again.")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this transformation?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("transformations").delete().eq("id", id)

      if (error) throw error
      await fetchTransformations()
    } catch (error) {
      console.error("Error deleting transformation:", error)
      alert("Failed to delete transformation. Please try again.")
    }
  }

  const handleEdit = (transformation: Transformation) => {
    setEditingId(transformation.id)
    setFormData({
      name: transformation.name,
      stats: transformation.stats,
      before_image: transformation.before_image || "",
      after_image: transformation.after_image || "",
      duration: transformation.duration,
    })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      stats: "",
      before_image: "",
      after_image: "",
      duration: "3 months",
    })
    setEditingId(null)
    setIsAdding(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4 block">
            ← Back to Admin
          </Link>
          <h1 className="text-3xl font-bold">Real Transformations</h1>
          <p className="text-primary-foreground/80">Manage client transformation stories</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <div className="bg-card border border-border rounded-2xl p-8 mb-8 animate-float-up">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {editingId ? "Edit Transformation" : "Add New Transformation"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Client Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                  placeholder="e.g., Priya"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Transformation Stats</label>
                <input
                  type="text"
                  value={formData.stats}
                  onChange={(e) => setFormData({ ...formData, stats: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                  placeholder="e.g., Lost 12kg"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Before Image URL</label>
                  <input
                    type="text"
                    value={formData.before_image}
                    onChange={(e) => setFormData({ ...formData, before_image: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                    placeholder="/person-before.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">After Image URL</label>
                  <input
                    type="text"
                    value={formData.after_image}
                    onChange={(e) => setFormData({ ...formData, after_image: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                    placeholder="/person-after.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Transformation Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                  placeholder="e.g., 3 months"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  {editingId ? "Update" : "Add"} Transformation
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="mb-8 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            + Add Transformation
          </button>
        )}

        {/* Transformations List */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading transformations...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformations.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all animate-float-up"
              >
                {/* Before/After Preview */}
                <div className="relative h-48 grid grid-cols-2">
                  <img
                    src={item.before_image || "/placeholder.svg?height=200&width=150&query=fitness-before"}
                    alt={`${item.name} before`}
                    className="w-full h-full object-cover"
                  />
                  <img
                    src={item.after_image || "/placeholder.svg?height=200&width=150&query=fitness-after"}
                    alt={`${item.name} after`}
                    className="w-full h-full object-cover"
                  />
                </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
                <p className="text-sm text-foreground/60 mb-2">{item.stats}</p>
                <p className="text-xs text-muted-foreground mb-4">{item.duration} transformation</p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 px-3 py-2 bg-red-500/10 text-red-500 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  )
}
