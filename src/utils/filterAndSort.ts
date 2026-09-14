import type {
  ClassRecord,
  ClassRecordFilters,
  SortDirection,
  SortField,
} from "../types/classRecord";
import { formatDisplayDate, formatShlokaRange } from "./formatDate";

export function filterClassRecords(
  records: ClassRecord[],
  filters: ClassRecordFilters,
): ClassRecord[] {
  const search = filters.search.trim().toLowerCase();
  const shlokaFilter = filters.shloka.trim().toLowerCase();

  return records.filter((record) => {
    if (filters.date && record.date !== filters.date) {
      return false;
    }

    if (filters.venue && record.venue !== filters.venue) {
      return false;
    }

    if (shlokaFilter) {
      const shlokaText = formatShlokaRange(
        record.shlokaFrom,
        record.shlokaTo,
      ).toLowerCase();
      if (!shlokaText.includes(shlokaFilter)) {
        return false;
      }
    }

    if (search) {
      const searchable = [
        record.venue,
        record.speakerName,
        formatShlokaRange(record.shlokaFrom, record.shlokaTo),
        formatDisplayDate(record.date),
        record.date,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchable.includes(search)) {
        return false;
      }
    }

    return true;
  });
}

export function sortClassRecords(
  records: ClassRecord[],
  sortField: SortField,
  sortDirection: SortDirection,
): ClassRecord[] {
  const sorted = [...records].sort((a, b) => {
    if (sortField === "date") {
      return a.date.localeCompare(b.date);
    }
    return (a.studentCount ?? -1) - (b.studentCount ?? -1);
  });

  return sortDirection === "desc" ? sorted.reverse() : sorted;
}
