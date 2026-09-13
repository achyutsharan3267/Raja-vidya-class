import { getSupabaseClient } from "../lib/supabase";
import type {
  ClassRecord,
  ClassRecordService,
  CreateClassRecordInput,
  UpdateClassRecordInput,
} from "../types/classRecord";

type ClassRecordRow = {
  id: string;
  date: string;
  venue: string;
  shloka_from: string;
  shloka_to: string;
  album_link: string;
  student_count: number;
};

function toRecord(row: ClassRecordRow): ClassRecord {
  return {
    id: row.id,
    date: row.date,
    venue: row.venue,
    shlokaFrom: row.shloka_from,
    shlokaTo: row.shloka_to,
    albumLink: row.album_link,
    studentCount: row.student_count,
  };
}

function toRow(input: CreateClassRecordInput) {
  return {
    date: input.date,
    venue: input.venue,
    shloka_from: input.shlokaFrom,
    shloka_to: input.shlokaTo,
    album_link: input.albumLink,
    student_count: input.studentCount,
  };
}

function throwIfError(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

export const supabaseClassRecordService: ClassRecordService = {
  async getClassRecords() {
    const { data, error } = await getSupabaseClient()
      .from("class_records")
      .select("id, date, venue, shloka_from, shloka_to, album_link, student_count")
      .order("date", { ascending: false });
    throwIfError(error);
    return (data as ClassRecordRow[]).map(toRecord);
  },

  async createClassRecord(input) {
    const { data, error } = await getSupabaseClient()
      .from("class_records")
      .insert(toRow(input))
      .select("id, date, venue, shloka_from, shloka_to, album_link, student_count")
      .single();
    throwIfError(error);
    return toRecord(data as ClassRecordRow);
  },

  async updateClassRecord(id: string, input: UpdateClassRecordInput) {
    const { data, error } = await getSupabaseClient()
      .from("class_records")
      .update(toRow(input))
      .eq("id", id)
      .select("id, date, venue, shloka_from, shloka_to, album_link, student_count")
      .single();
    throwIfError(error);
    return toRecord(data as ClassRecordRow);
  },

  async deleteClassRecord(id: string) {
    const { error } = await getSupabaseClient()
      .from("class_records")
      .delete()
      .eq("id", id);
    throwIfError(error);
  },
};
