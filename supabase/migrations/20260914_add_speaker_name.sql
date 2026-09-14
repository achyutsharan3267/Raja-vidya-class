-- Run this once for existing Supabase projects.
alter table public.class_records
  add column if not exists speaker_name text;
