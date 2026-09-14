export interface ClassRecord {
  id: string;
  date: string;
  venue: string;
  speakerName: string;
  shlokaFrom: string;
  shlokaTo: string;
  albumLink: string;
  studentCount: number | null;
}

export interface CreateClassRecordInput {
  date: string;
  venue: string;
  speakerName: string;
  shlokaFrom: string;
  shlokaTo: string;
  albumLink: string;
  studentCount: number | null;
}

export type UpdateClassRecordInput = CreateClassRecordInput;

export interface ClassRecordService {
  getClassRecords(): Promise<ClassRecord[]>;
  createClassRecord(input: CreateClassRecordInput): Promise<ClassRecord>;
  updateClassRecord(
    id: string,
    input: UpdateClassRecordInput,
  ): Promise<ClassRecord>;
  deleteClassRecord(id: string): Promise<void>;
}

export type SortField = "date" | "studentCount";
export type SortDirection = "asc" | "desc";

export interface ClassRecordFilters {
  search: string;
  date: string;
  venue: string;
  shloka: string;
}
