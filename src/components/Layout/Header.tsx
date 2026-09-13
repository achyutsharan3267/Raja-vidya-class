import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./Layout.css";

interface HeaderProps {
  onAddClick: () => void;
}

export function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <div className="app-header__logo" aria-hidden="true">
          <BookOpen size={22} />
        </div>
        <div>
          <h1 className="app-header__title">Gita Class Records</h1>
          <p className="app-header__subtitle">ISKCON Bhagavad Gita Classes</p>
        </div>
      </div>
      <Button type="button" onClick={onAddClick}>
        <Plus size={18} aria-hidden="true" />
        Add Class
      </Button>
    </header>
  );
}
