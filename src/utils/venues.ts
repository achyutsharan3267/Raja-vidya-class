import { VENUE_OPTIONS } from "../constants/venues";

/** Keeps venue labels aligned with the shared option list while preserving legacy records. */
export function formatVenue(venue: string): string {
  return VENUE_OPTIONS.find((option) => option === venue) ?? venue;
}
