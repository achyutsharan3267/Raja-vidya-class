export const VENUE_OPTIONS = [
  "Auditorium",
  "Chhota Prasadam Hall",
  "Bada Prasadam Hall",
  "Mayapur Base",
  "Namahatta",
] as const;

export type Venue = (typeof VENUE_OPTIONS)[number];
