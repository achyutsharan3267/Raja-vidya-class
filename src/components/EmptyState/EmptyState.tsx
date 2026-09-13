import { BookOpen, Plus } from "lucide-react";
import "./EmptyState.css";

interface EmptyStateProps {
  onAddClick: () => void;
  filtered?: boolean;
}

export function EmptyState({ onAddClick, filtered = false }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">
        <BookOpen size={32} />
      </div>
      <h3 className="empty-state__title">
        {filtered ? "No matching records" : "No class records yet"}
      </h3>
      <p className="empty-state__message">
        {filtered
          ? "Try adjusting your search or filters."
          : "Add your first class record to get started."}
      </p>
      {!filtered && (
        <button type="button" className="btn btn--primary" onClick={onAddClick}>
          <Plus size={18} aria-hidden="true" />
          Add Class
        </button>
      )}
    </div>
  );
}
