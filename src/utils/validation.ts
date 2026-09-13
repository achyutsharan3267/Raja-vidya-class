export interface ClassFormValues {
  date: string;
  venue: string;
  shlokaFrom: string;
  shlokaTo: string;
  albumLink: string;
  studentCount: string;
}

export type ClassFormErrors = Partial<Record<keyof ClassFormValues, string>>;

export function validateClassForm(values: ClassFormValues): ClassFormErrors {
  const errors: ClassFormErrors = {};

  if (!values.date.trim()) {
    errors.date = "Date is required";
  }

  if (!values.venue.trim()) {
    errors.venue = "Venue is required";
  }

  if (!values.shlokaFrom.trim()) {
    errors.shlokaFrom = "Shloka from is required";
  }

  if (!values.shlokaTo.trim()) {
    errors.shlokaTo = "Shloka to is required";
  }

  if (!values.studentCount.trim()) {
    errors.studentCount = "Student count is required";
  } else {
    const count = Number(values.studentCount);
    if (Number.isNaN(count) || count < 0) {
      errors.studentCount = "Student count must be 0 or greater";
    }
  }

  if (values.albumLink.trim()) {
    try {
      new URL(values.albumLink.trim());
    } catch {
      errors.albumLink = "Please enter a valid URL";
    }
  }

  return errors;
}

export function hasFormErrors(errors: ClassFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
