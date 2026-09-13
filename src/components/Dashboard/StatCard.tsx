import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import "./Dashboard.css";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <Card className="stat-card">
      <div className="stat-card__icon" aria-hidden="true">
        <Icon size={20} />
      </div>
      <div className="stat-card__content">
        <p className="stat-card__label">{label}</p>
        <p className="stat-card__value">{value}</p>
      </div>
    </Card>
  );
}
