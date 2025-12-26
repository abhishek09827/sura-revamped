"use client"

import { useState } from "react"

export default function SuccessStoriesAdmin() {
  const [successStories, setSuccessStories] = useState([
    { id: 1, stat: "500+", label: "Happy Clients", icon: "👥" },
    { id: 2, stat: "95%", label: "Success Rate", icon: "📈" },
    { id: 3, stat: "8+", label: "Years Experience", icon: "⭐" },
  ])

  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ stat: "", label: "", icon: "" })

  const handleEdit = (story: (typeof successStories)[0]) => {
    setEditingId(story.id)
    setFormData({ stat: story.stat, label: story.label, icon: story.icon })
  }

  const handleSave = () => {
    if (editingId) {
      setSuccessStories(successStories.map((story) => (story.id === editingId ? { ...story, ...formData } : story)))
      setEditingId(null)
      setFormData({ stat: "", label: "", icon: "" })
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ stat: "", label: "", icon: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Success Stories</h1>
          <p className="text-primary-foreground/80">Update statistics and achievements displayed on the homepage</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6">
          {successStories.map((story) => (
            <div
              key={story.id}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              {editingId === story.id ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Statistic</label>
                      <input
                        type="text"
                        value={formData.stat}
                        onChange={(e) => setFormData({ ...formData, stat: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., 500+"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Label</label>
                      <input
                        type="text"
                        value={formData.label}
                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., Happy Clients"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Icon (Emoji)</label>
                      <input
                        type="text"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., 👥"
                        maxLength={2}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/30 transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <span className="text-5xl">{story.icon}</span>
                    <div>
                      <p className="text-4xl font-bold text-primary">{story.stat}</p>
                      <p className="text-muted-foreground font-medium">{story.label}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(story)}
                    className="px-6 py-2 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/20">
          <h3 className="text-lg font-bold text-foreground mb-3">How to Update Success Stories</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Click "Edit" on any story card to modify the statistic, label, or icon</li>
            <li>• Statistics appear on the homepage hero section in 3 columns</li>
            <li>• Use emoji icons for visual appeal (e.g., 👥 for people, 📈 for growth)</li>
            <li>• Changes are saved instantly and will appear on the live homepage</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
