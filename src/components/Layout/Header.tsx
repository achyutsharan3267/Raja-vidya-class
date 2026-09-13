import { BookOpen, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./Layout.css";

interface HeaderProps {
  onAddClick: () => void;
  onExportClick: () => void;
  exportDisabled: boolean;
}

export function Header({ onAddClick, onExportClick, exportDisabled }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <div className="app-header__logo" aria-hidden="true">
          <BookOpen size={22} />
        </div>
        <div>
          <h1 className="app-header__title">Class Management</h1>
          <p className="app-header__subtitle">ISKCON Bhagavad Gita Classes</p>
        </div>
      </div>
      <div className="app-header__actions">
        <Button type="button" variant="outline" onClick={onExportClick} disabled={exportDisabled}>
          <Download size={17} aria-hidden="true" />
          Export to Excel
        </Button>
        <Button type="button" onClick={onAddClick}>
          <Plus size={18} aria-hidden="true" />
          Add New Class
        </Button>
      </div>
    </header>
  );
}
