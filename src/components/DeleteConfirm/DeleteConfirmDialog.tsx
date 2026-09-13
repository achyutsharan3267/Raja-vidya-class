import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./DeleteConfirmDialog.css";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  deleting?: boolean;
}

export function DeleteConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  deleting = false,
}: DeleteConfirmDialogProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onCancel} role="presentation">
      <div
        className="delete-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="delete-dialog__close"
          onClick={onCancel}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="delete-dialog__icon" aria-hidden="true">
          <AlertTriangle size={24} />
        </div>

        <h2 id="delete-dialog-title" className="delete-dialog__title">
          Delete Class Record
        </h2>
        <p id="delete-dialog-desc" className="delete-dialog__message">
          Are you sure you want to delete this class record?
        </p>

        <footer className="delete-dialog__actions">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </footer>
      </div>
    </div>
  );
}
