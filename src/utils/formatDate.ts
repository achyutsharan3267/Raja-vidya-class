export function formatDisplayDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatShlokaRange(from: string, to: string): string {
  return `${from} – ${to}`;
}
