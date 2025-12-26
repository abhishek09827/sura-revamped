"use client"

import type { ReactNode } from "react"

interface FormField {
  name: string
  label: string
  type: "text" | "textarea" | "select" | "email" | "number"
  placeholder?: string
  options?: { value: string; label: string }[]
  required?: boolean
}

interface CRUDFormModalProps {
  isOpen: boolean
  title: string
  fields: FormField[]
  formData: Record<string, any>
  onFormChange: (name: string, value: any) => void
  onSubmit: () => void
  onCancel: () => void
  isLoading?: boolean
  submitLabel?: string
  children?: ReactNode
}

export function CRUDFormModal({
  isOpen,
  title,
  fields,
  formData,
  onFormChange,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = "Save",
  children,
}: CRUDFormModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-card rounded-2xl p-8 max-w-2xl w-full border border-border my-8 animate-float-up">
        <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>

        <div className="space-y-4 mb-6">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-foreground mb-2">
                {field.label}
                {field.required && <span className="text-destructive">*</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  value={formData[field.name] || ""}
                  onChange={(e) => onFormChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={4}
                />
              ) : field.type === "select" ? (
                <select
                  value={formData[field.name] || ""}
                  onChange={(e) => onFormChange(field.name, e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select {field.label.toLowerCase()}</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) => onFormChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}
            </div>
          ))}
          {children}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/30 transition disabled:opacity-50"
          >
            {isLoading ? "Saving..." : submitLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
