import { BookOpen, Calendar, Users } from "lucide-react";
import { computeDashboardStats } from "../../utils/dashboardStats";
import type { ClassRecord } from "../../types/classRecord";
import { StatCard } from "./StatCard";
import "./Dashboard.css";

interface DashboardProps {
  records: ClassRecord[];
}

export function Dashboard({ records }: DashboardProps) {
  const stats = computeDashboardStats(records);

  return (
    <section className="dashboard" aria-label="Dashboard summary">
      <StatCard
        label="Total Classes"
        value={stats.totalClasses}
        icon={BookOpen}
      />
      <StatCard
        label="Total Students"
        value={stats.totalStudents}
        icon={Users}
      />
      <StatCard
        label="Average Students"
        value={stats.averageStudents}
        icon={Users}
      />
      <StatCard
        label="Latest Class"
        value={stats.latestClassDate ?? "—"}
        icon={Calendar}
      />
    </section>
  );
}
