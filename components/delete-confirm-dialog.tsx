"use client"

interface DeleteConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function DeleteConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl p-6 max-w-sm w-full border border-border animate-float-up">
        <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-semibold hover:bg-destructive/90 transition disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}
