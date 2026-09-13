import { Filter, Search } from "lucide-react";
import type { ClassRecordFilters as Filters } from "../../types/classRecord";
import { VENUE_OPTIONS } from "@/constants/venues";
import "./ClassRecords.css";

interface ClassRecordFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClear: () => void;
}

export function ClassRecordFilters({
  filters,
  onChange,
  onClear,
}: ClassRecordFiltersProps) {
  const hasActiveFilters =
    filters.search || filters.date || filters.venue || filters.shloka;

  const update = (partial: Partial<Filters>) => {
    onChange({ ...filters, ...partial });
  };

  return (
    <div className="records-toolbar">
      <div className="search-box">
        <Search size={18} className="search-box__icon" aria-hidden="true" />
        <input
          type="search"
          className="search-box__input"
          placeholder="Search classes..."
          value={filters.search}
          onChange={(event) => update({ search: event.target.value })}
          aria-label="Search classes"
        />
      </div>

      <div className="filters">
        <div className="filters__label">
          <Filter size={16} aria-hidden="true" />
          <span>Filters</span>
        </div>

        <div className="filters__group">
          <label htmlFor="filter-date" className="sr-only">
            Filter by date
          </label>
          <input
            id="filter-date"
            type="date"
            className="filters__input"
            value={filters.date}
            onChange={(event) => update({ date: event.target.value })}
            aria-label="Filter by date"
          />

          <label htmlFor="filter-venue" className="sr-only">
            Filter by venue
          </label>
          <select
            id="filter-venue"
            className="filters__select"
            value={filters.venue}
            onChange={(event) => update({ venue: event.target.value })}
            aria-label="Filter by venue"
          >
            <option value="">All Venues</option>
            {VENUE_OPTIONS.map((venue) => (
              <option key={venue} value={venue}>
                {venue}
              </option>
            ))}
          </select>

          <label htmlFor="filter-shloka" className="sr-only">
            Filter by shloka
          </label>
          <input
            id="filter-shloka"
            type="text"
            className="filters__input"
            placeholder="Shloka..."
            value={filters.shloka}
            onChange={(event) => update({ shloka: event.target.value })}
            aria-label="Filter by shloka"
          />

          {hasActiveFilters && (
            <button
              type="button"
              className="btn btn--ghost"
              onClick={onClear}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
