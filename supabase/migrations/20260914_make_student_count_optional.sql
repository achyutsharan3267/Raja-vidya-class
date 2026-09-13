-- Run this once for existing Supabase projects created with the original schema.
alter table public.class_records
  alter column student_count drop not null;
