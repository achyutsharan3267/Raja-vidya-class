import type { ClassRecord } from "../types/classRecord";
import { formatDisplayDate, formatShlokaRange } from "./formatDate";
import { formatVenue } from "./venues";

const HEADERS = ["Date", "Venue", "Speaker Name", "Shloka", "Album Link", "Student Count"];

/** Exports the complete stored class-record collection, not just filtered rows. */
export async function exportClassRecords(records: ClassRecord[]) {
  const XLSX = await import("xlsx");
  const rows = records.map((record) => ({
    Date: formatDisplayDate(record.date),
    Venue: formatVenue(record.venue),
    "Speaker Name": record.speakerName,
    Shloka: formatShlokaRange(record.shlokaFrom, record.shlokaTo),
    "Album Link": record.albumLink,
    "Student Count": record.studentCount ?? undefined,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows, { header: HEADERS });

  records.forEach((record, index) => {
    if (record.albumLink) {
      const cell = worksheet[`E${index + 2}`];
      if (cell) cell.l = { Target: record.albumLink };
    }
  });

  worksheet["!cols"] = [
    { wch: 15 },
    { wch: 25 },
    { wch: 24 },
    { wch: 16 },
    { wch: 48 },
    { wch: 16 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Class Records");
  XLSX.writeFile(workbook, "iskcon-class-records.xlsx");
}
