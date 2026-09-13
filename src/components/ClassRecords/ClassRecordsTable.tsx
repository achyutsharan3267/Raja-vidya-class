import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";
import type { ClassRecord, SortDirection, SortField } from "../../types/classRecord";
import { formatDisplayDate, formatShlokaRange } from "../../utils/formatDate";
import { formatVenue } from "../../utils/venues";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import "./ClassRecords.css";

interface ClassRecordsTableProps {
  records: ClassRecord[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onEdit: (record: ClassRecord) => void;
  onDelete: (record: ClassRecord) => void;
}

function SortIcon({
  field,
  sortField,
  sortDirection,
}: {
  field: SortField;
  sortField: SortField;
  sortDirection: SortDirection;
}) {
  if (sortField !== field) {
    return null;
  }
  return sortDirection === "desc" ? (
    <ArrowDown size={14} aria-hidden="true" />
  ) : (
    <ArrowUp size={14} aria-hidden="true" />
  );
}

export function ClassRecordsTable({
  records,
  sortField,
  sortDirection,
  onSort,
  onEdit,
  onDelete,
}: ClassRecordsTableProps) {
  return (
    <>
      <div className="records-table-wrapper" role="region" aria-label="Class records table">
        <Table className="records-table">
          <TableHeader>
            <TableRow>
              <TableHead scope="col">
                <button
                  type="button"
                  className="sort-btn"
                  onClick={() => onSort("date")}
                  aria-sort={
                    sortField === "date"
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  Date
                  <SortIcon
                    field="date"
                    sortField={sortField}
                    sortDirection={sortDirection}
                  />
                </button>
              </TableHead>
              <TableHead scope="col">Venue</TableHead>
              <TableHead scope="col">Shloka</TableHead>
              <TableHead scope="col">Album</TableHead>
              <TableHead scope="col">
                <button
                  type="button"
                  className="sort-btn"
                  onClick={() => onSort("studentCount")}
                  aria-sort={
                    sortField === "studentCount"
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  Students
                  <SortIcon
                    field="studentCount"
                    sortField={sortField}
                    sortDirection={sortDirection}
                  />
                </button>
              </TableHead>
              <TableHead scope="col">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell data-label="Date">{formatDisplayDate(record.date)}</TableCell>
                <TableCell data-label="Venue">
                  <span className="venue-cell">
                    <MapPin size={14} aria-hidden="true" />
                    {formatVenue(record.venue)}
                  </span>
                </TableCell>
                <TableCell data-label="Shloka">
                  {formatShlokaRange(record.shlokaFrom, record.shlokaTo)}
                </TableCell>
                <TableCell data-label="Album">
                  {record.albumLink ? (
                    <a
                      href={record.albumLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="album-link"
                    >
                      View Album
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="no-album">No Album</span>
                  )}
                </TableCell>
                <TableCell data-label="Students">{record.studentCount ?? "—"}</TableCell>
                <TableCell data-label="Actions">
                  <div className="actions-cell">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="btn-icon"
                      onClick={() => onEdit(record)}
                      aria-label={`Edit class on ${formatDisplayDate(record.date)}`}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="btn-icon btn-icon--danger"
                      onClick={() => onDelete(record)}
                      aria-label={`Delete class on ${formatDisplayDate(record.date)}`}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="records-cards" aria-label="Class records list">
        {records.map((record) => (
          <article key={record.id} className="record-card">
            <header className="record-card__header">
              <time dateTime={record.date}>
                {formatDisplayDate(record.date)}
              </time>
              <div className="actions-cell">
                <button
                  type="button"
                  className="btn-icon"
                  onClick={() => onEdit(record)}
                  aria-label={`Edit class on ${formatDisplayDate(record.date)}`}
                >
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  className="btn-icon btn-icon--danger"
                  onClick={() => onDelete(record)}
                  aria-label={`Delete class on ${formatDisplayDate(record.date)}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </header>
            <dl className="record-card__details">
              <div>
                <dt>Venue</dt>
                <dd>{formatVenue(record.venue)}</dd>
              </div>
              <div>
                <dt>Shloka</dt>
                <dd>
                  {formatShlokaRange(record.shlokaFrom, record.shlokaTo)}
                </dd>
              </div>
              <div>
                <dt>Album</dt>
                <dd>
                  {record.albumLink ? (
                    <a
                      href={record.albumLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="album-link"
                    >
                      View Album
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="no-album">No Album</span>
                  )}
                </dd>
              </div>
              <div>
                <dt>Students</dt>
                <dd>{record.studentCount ?? "—"}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </>
  );
}
