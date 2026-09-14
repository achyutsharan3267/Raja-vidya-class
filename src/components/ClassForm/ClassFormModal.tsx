import { useEffect, useId, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VENUE_OPTIONS } from "@/constants/venues";
import type { ClassRecord } from "../../types/classRecord";
import {
  hasFormErrors,
  validateClassForm,
  type ClassFormValues,
} from "../../utils/validation";
import "./ClassFormModal.css";

interface ClassFormModalProps {
  isOpen: boolean;
  record?: ClassRecord | null;
  onClose: () => void;
  onSave: (values: ClassFormValues) => Promise<void>;
}

const emptyValues: ClassFormValues = {
  date: "",
  venue: "",
  speakerName: "",
  shlokaFrom: "",
  shlokaTo: "",
  albumLink: "",
  studentCount: "",
};

function recordToFormValues(record: ClassRecord): ClassFormValues {
  return {
    date: record.date,
    venue: record.venue,
    speakerName: record.speakerName,
    shlokaFrom: record.shlokaFrom,
    shlokaTo: record.shlokaTo,
    albumLink: record.albumLink,
    studentCount: record.studentCount === null ? "" : String(record.studentCount),
  };
}

export function ClassFormModal({
  isOpen,
  record,
  onClose,
  onSave,
}: ClassFormModalProps) {
  const formId = useId();
  const [values, setValues] = useState<ClassFormValues>(emptyValues);
  const [errors, setErrors] = useState<Partial<ClassFormValues>>({});
  const [submitting, setSubmitting] = useState(false);

  const isEditing = Boolean(record);

  useEffect(() => {
    if (isOpen) {
      setValues(record ? recordToFormValues(record) : emptyValues);
      setErrors({});
    }
  }, [isOpen, record]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (field: keyof ClassFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateClassForm(values);
    if (hasFormErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await onSave(values);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${formId}-title`}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal__header">
          <h2 id={`${formId}-title`} className="modal__title">
            {isEditing ? "Edit Class Record" : "Add Class Record"}
          </h2>
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </header>

        <form className="class-form" onSubmit={handleSubmit} noValidate>
          <div className="class-form__grid">
            <div className="form-field">
              <Label htmlFor={`${formId}-date`}>Date</Label>
              <Input
                id={`${formId}-date`}
                type="date"
                value={values.date}
                onChange={(event) => handleChange("date", event.target.value)}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? `${formId}-date-error` : undefined}
              />
              {errors.date && (
                <span id={`${formId}-date-error`} className="form-field__error">
                  {errors.date}
                </span>
              )}
            </div>

            <div className="form-field">
              <Label htmlFor={`${formId}-speaker-name`}>Speaker Name</Label>
              <Input
                id={`${formId}-speaker-name`}
                type="text"
                placeholder="Enter speaker's name"
                value={values.speakerName}
                onChange={(event) => handleChange("speakerName", event.target.value)}
                aria-invalid={Boolean(errors.speakerName)}
                aria-describedby={errors.speakerName ? `${formId}-speaker-name-error` : undefined}
              />
              {errors.speakerName && (
                <span id={`${formId}-speaker-name-error`} className="form-field__error">
                  {errors.speakerName}
                </span>
              )}
            </div>

            <div className="form-field form-field--full">
              <Label htmlFor={`${formId}-venue`}>Venue</Label>
              <select
                id={`${formId}-venue`}
                value={values.venue}
                onChange={(event) => handleChange("venue", event.target.value)}
                aria-invalid={Boolean(errors.venue)}
                aria-describedby={
                  errors.venue ? `${formId}-venue-error` : undefined
                }
              >
                <option value="">Select a venue</option>
                {VENUE_OPTIONS.map((venue) => (
                  <option key={venue} value={venue}>
                    {venue}
                  </option>
                ))}
              </select>
              {errors.venue && (
                <span
                  id={`${formId}-venue-error`}
                  className="form-field__error"
                >
                  {errors.venue}
                </span>
              )}
            </div>

            <div className="form-field">
              <Label htmlFor={`${formId}-shloka-from`}>Shloka From</Label>
              <Input
                id={`${formId}-shloka-from`}
                type="text"
                placeholder="2.2"
                value={values.shlokaFrom}
                onChange={(event) =>
                  handleChange("shlokaFrom", event.target.value)
                }
                aria-invalid={Boolean(errors.shlokaFrom)}
                aria-describedby={
                  errors.shlokaFrom ? `${formId}-shloka-from-error` : undefined
                }
              />
              {errors.shlokaFrom && (
                <span
                  id={`${formId}-shloka-from-error`}
                  className="form-field__error"
                >
                  {errors.shlokaFrom}
                </span>
              )}
            </div>

            <div className="form-field">
              <Label htmlFor={`${formId}-shloka-to`}>Shloka To</Label>
              <Input
                id={`${formId}-shloka-to`}
                type="text"
                placeholder="2.5"
                value={values.shlokaTo}
                onChange={(event) =>
                  handleChange("shlokaTo", event.target.value)
                }
                aria-invalid={Boolean(errors.shlokaTo)}
                aria-describedby={
                  errors.shlokaTo ? `${formId}-shloka-to-error` : undefined
                }
              />
              {errors.shlokaTo && (
                <span
                  id={`${formId}-shloka-to-error`}
                  className="form-field__error"
                >
                  {errors.shlokaTo}
                </span>
              )}
            </div>

            <div className="form-field form-field--full">
              <Label htmlFor={`${formId}-album`}>Album Link</Label>
              <Input
                id={`${formId}-album`}
                type="url"
                placeholder="https://photos.google.com/..."
                value={values.albumLink}
                onChange={(event) =>
                  handleChange("albumLink", event.target.value)
                }
                aria-invalid={Boolean(errors.albumLink)}
                aria-describedby={
                  errors.albumLink ? `${formId}-album-error` : undefined
                }
              />
              {errors.albumLink && (
                <span id={`${formId}-album-error`} className="form-field__error">
                  {errors.albumLink}
                </span>
              )}
            </div>

            <div className="form-field">
              <Label htmlFor={`${formId}-students`}>Student Count</Label>
              <Input
                id={`${formId}-students`}
                type="number"
                min="0"
                placeholder="25"
                value={values.studentCount}
                onChange={(event) =>
                  handleChange("studentCount", event.target.value)
                }
                aria-invalid={Boolean(errors.studentCount)}
                aria-describedby={
                  errors.studentCount ? `${formId}-students-error` : undefined
                }
              />
              {errors.studentCount && (
                <span
                  id={`${formId}-students-error`}
                  className="form-field__error"
                >
                  {errors.studentCount}
                </span>
              )}
            </div>
          </div>

          <footer className="modal__footer">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save Class"}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
}
