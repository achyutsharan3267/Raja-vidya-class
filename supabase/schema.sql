-- Run this in Supabase Dashboard → SQL Editor.
create table if not exists public.class_records (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  venue text not null check (char_length(trim(venue)) > 0),
  shloka_from text not null check (char_length(trim(shloka_from)) > 0),
  shloka_to text not null check (char_length(trim(shloka_to)) > 0),
  album_link text not null default '',
  student_count integer check (student_count is null or student_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.class_records enable row level security;

-- This dashboard currently has no sign-in UI. These policies allow the browser
-- anon key to manage records. Replace `anon` with `authenticated` once auth is added.
create policy "Public can view class records"
  on public.class_records for select to anon using (true);
create policy "Public can create class records"
  on public.class_records for insert to anon with check (true);
create policy "Public can update class records"
  on public.class_records for update to anon using (true) with check (true);
create policy "Public can delete class records"
  on public.class_records for delete to anon using (true);
