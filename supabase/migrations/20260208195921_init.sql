-- Stull Atlas Studio — Supabase Schema
-- Run this in the Supabase SQL Editor after creating your project.

-- ============================================================
-- 1. Profiles table (extends Supabase auth.users)
-- ============================================================
create type public.tier as enum ('free', 'solo', 'pro', 'edu_individual', 'edu_classroom');

create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text not null,
  display_name  text,
  tier          public.tier not null default 'free',
  trial_start   timestamptz,
  trial_end     timestamptz,
  stripe_customer_id text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- RLS: users can read/update their own profile
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Fallback: if the trigger hasn't fired yet, allow the client to insert its own profile
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ============================================================
-- 2. Trial codes table
-- ============================================================
create type public.code_status as enum ('unused', 'redeemed', 'disabled');

create table public.trial_codes (
  code          text primary key,
  batch_id      text not null,
  status        public.code_status not null default 'unused',
  issued_at     timestamptz not null default now(),
  redeemed_at   timestamptz,
  redeemed_by   uuid references public.profiles(id)
);

-- RLS: codes are readable (to validate) but only updatable by authenticated users
alter table public.trial_codes enable row level security;

create policy "Anyone can check if a code exists"
  on public.trial_codes for select
  using (true);

create policy "Authenticated users can redeem codes"
  on public.trial_codes for update
  using (auth.role() = 'authenticated');

-- Index for code lookups
create index idx_trial_codes_status on public.trial_codes(status);

-- ============================================================
-- 3. Helper: Generate a batch of trial codes
-- ============================================================
-- Usage: select * from generate_trial_codes('NCECA_2026_A', 500);
create or replace function public.generate_trial_codes(
  p_batch_id text,
  p_count int default 100
)
returns setof public.trial_codes as $$
declare
  i int;
  new_code text;
begin
  for i in 1..p_count loop
    -- Format: NCECA-XXXX-XXXX (alphanumeric, no ambiguous chars)
    new_code := 'NCECA-' ||
      substr(replace(replace(replace(
        encode(gen_random_bytes(4), 'base64'),
        '/', ''), '+', ''), '=', ''),
      1, 4) || '-' ||
      substr(replace(replace(replace(
        encode(gen_random_bytes(4), 'base64'),
        '/', ''), '+', ''), '=', ''),
      1, 4);
    new_code := upper(new_code);

    insert into public.trial_codes (code, batch_id)
    values (new_code, p_batch_id);

    return query select * from public.trial_codes where code = new_code;
  end loop;
end;
$$ language plpgsql security definer;
