import { useMemo, useState } from "react";
import { ClassFormModal } from "../components/ClassForm/ClassFormModal";
import { ClassRecordFilters } from "../components/ClassRecords/ClassRecordFilters";
import { ClassRecordsTable } from "../components/ClassRecords/ClassRecordsTable";
import { DeleteConfirmDialog } from "../components/DeleteConfirm/DeleteConfirmDialog";
import { EmptyState } from "../components/EmptyState/EmptyState";
import { Header } from "../components/Layout/Header";
import { useNotification } from "../components/Notification/NotificationContext";
import { useClassRecords } from "../hooks/useClassRecords";
import type {
  ClassRecord,
  ClassRecordFilters as Filters,
  SortDirection,
  SortField,
} from "../types/classRecord";
import {
  filterClassRecords,
  sortClassRecords,
} from "../utils/filterAndSort";
import { exportClassRecords } from "../utils/exportClassRecords";
import type { ClassFormValues } from "../utils/validation";

const defaultFilters: Filters = {
  search: "",
  date: "",
  venue: "",
  shloka: "",
};

function formValuesToInput(values: ClassFormValues) {
  return {
    date: values.date,
    venue: values.venue.trim(),
    shlokaFrom: values.shlokaFrom.trim(),
    shlokaTo: values.shlokaTo.trim(),
    albumLink: values.albumLink.trim(),
    studentCount: values.studentCount.trim() ? Number(values.studentCount) : null,
  };
}

export function HomePage() {
  const { records, loading, error, createRecord, updateRecord, deleteRecord } =
    useClassRecords();
  const { showNotification } = useNotification();

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const [formOpen, setFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ClassRecord | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<ClassRecord | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filteredRecords = useMemo(() => {
    const filtered = filterClassRecords(records, filters);
    return sortClassRecords(filtered, sortField, sortDirection);
  }, [records, filters, sortField, sortDirection]);

  const openAddForm = () => {
    setEditingRecord(null);
    setFormOpen(true);
  };

  const openEditForm = (record: ClassRecord) => {
    setEditingRecord(record);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingRecord(null);
  };

  const handleSave = async (values: ClassFormValues) => {
    const input = formValuesToInput(values);

    try {
      if (editingRecord) {
        await updateRecord(editingRecord.id, input);
        showNotification("Class record updated successfully");
      } else {
        await createRecord(input);
        showNotification("Class record saved successfully");
      }
    } catch {
      showNotification("Could not save class record. Check the Supabase setup.", "error");
      throw new Error("Could not save class record");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      await deleteRecord(deleteTarget.id);
      showNotification("Class record deleted successfully");
      setDeleteTarget(null);
    } catch {
      showNotification("Failed to delete class record", "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((current) => (current === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortDirection(field === "date" ? "desc" : "desc");
    }
  };

  const handleExport = async () => {
    if (records.length === 0) return;
    try {
      await exportClassRecords(records);
      showNotification("Class records exported to Excel");
    } catch {
      showNotification("Could not export class records", "error");
    }
  };

  return (
    <div className="page">
      <Header
        onAddClick={openAddForm}
        onExportClick={handleExport}
        exportDisabled={records.length === 0}
      />

      <section className="records-section" aria-label="Class records">
        <div className="records-section__header">
          <h2 className="records-section__title">Class Records</h2>
        </div>

        <ClassRecordFilters
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters(defaultFilters)}
        />

        {loading && <div className="loading-state">Loading class records...</div>}

        {error && !loading && (
          <div className="loading-state" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && records.length === 0 && (
          <EmptyState onAddClick={openAddForm} />
        )}

        {!loading && !error && records.length > 0 && filteredRecords.length === 0 && (
          <EmptyState onAddClick={openAddForm} filtered />
        )}

        {!loading && !error && filteredRecords.length > 0 && (
          <ClassRecordsTable
            records={filteredRecords}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            onEdit={openEditForm}
            onDelete={setDeleteTarget}
          />
        )}
      </section>

      <ClassFormModal
        isOpen={formOpen}
        record={editingRecord}
        onClose={closeForm}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        deleting={deleting}
      />
    </div>
  );
}
