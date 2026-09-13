import type { ClassRecord } from "../types/classRecord";
import { formatDisplayDate } from "./formatDate";

export interface DashboardStats {
  totalClasses: number;
  totalStudents: number;
  averageStudents: number;
  latestClassDate: string | null;
}

export function computeDashboardStats(
  records: ClassRecord[],
): DashboardStats {
  if (records.length === 0) {
    return {
      totalClasses: 0,
      totalStudents: 0,
      averageStudents: 0,
      latestClassDate: null,
    };
  }

  const totalStudents = records.reduce(
    (sum, record) => sum + record.studentCount,
    0,
  );

  const sortedByDate = [...records].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return {
    totalClasses: records.length,
    totalStudents,
    averageStudents: Math.round(totalStudents / records.length),
    latestClassDate: formatDisplayDate(sortedByDate[0].date),
  };
}
