-- =============================================
-- Stull Atlas: Init + Seed (run in Supabase SQL Editor)
-- =============================================

-- Stull Atlas Studio -- Supabase Schema
-- Run this in the Supabase SQL Editor after creating your project.

-- ============================================================
-- 1. Profiles table (extends Supabase auth.users)
-- ============================================================
DO $$ BEGIN
  CREATE TYPE public.tier AS ENUM ('free', 'solo', 'pro', 'edu_individual', 'edu_classroom');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

create table if not exists public.profiles (
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

drop trigger if exists on_auth_user_created on auth.users;
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

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- RLS: users can read/update their own profile
alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Fallback: if the trigger hasn't fired yet, allow the client to insert its own profile
drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ============================================================
-- 2. Trial codes table
-- ============================================================
DO $$ BEGIN
  CREATE TYPE public.code_status AS ENUM ('unused', 'redeemed', 'disabled');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

create table if not exists public.trial_codes (
  code          text primary key,
  batch_id      text not null,
  status        public.code_status not null default 'unused',
  issued_at     timestamptz not null default now(),
  redeemed_at   timestamptz,
  redeemed_by   uuid references public.profiles(id)
);

-- RLS: codes are readable (to validate) but only updatable by authenticated users
alter table public.trial_codes enable row level security;

drop policy if exists "Anyone can check if a code exists" on public.trial_codes;
create policy "Anyone can check if a code exists"
  on public.trial_codes for select
  using (true);

drop policy if exists "Authenticated users can redeem codes" on public.trial_codes;
create policy "Authenticated users can redeem codes"
  on public.trial_codes for update
  using (auth.role() = 'authenticated');

-- Index for code lookups
create index if not exists idx_trial_codes_status on public.trial_codes(status);

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


-- =============================================
-- SEED: 200 NCECA trial codes
-- =============================================

-- Insert NCECA 2026 trial codes (200 codes, 30-day Pro trial)
-- Run this in Supabase SQL Editor after the init migration

INSERT INTO public.trial_codes (code, batch_id, status) VALUES
  ('NCECA-SL1Z-77ML', 'nceca-2026', 'unused'),
  ('NCECA-PUGH-78QC', 'nceca-2026', 'unused'),
  ('NCECA-S4WO-T8V0', 'nceca-2026', 'unused'),
  ('NCECA-2IZS-TOXO', 'nceca-2026', 'unused'),
  ('NCECA-T1K5-MUED', 'nceca-2026', 'unused'),
  ('NCECA-657P-W9W6', 'nceca-2026', 'unused'),
  ('NCECA-MECD-ZX6N', 'nceca-2026', 'unused'),
  ('NCECA-KJAE-7TPV', 'nceca-2026', 'unused'),
  ('NCECA-E5UX-2I78', 'nceca-2026', 'unused'),
  ('NCECA-YBIG-89SD', 'nceca-2026', 'unused'),
  ('NCECA-NK4K-515I', 'nceca-2026', 'unused'),
  ('NCECA-WWPO-WVGL', 'nceca-2026', 'unused'),
  ('NCECA-REAL-2B9W', 'nceca-2026', 'unused'),
  ('NCECA-5LLN-EDQL', 'nceca-2026', 'unused'),
  ('NCECA-65CX-R6MP', 'nceca-2026', 'unused'),
  ('NCECA-SFY0-AO1F', 'nceca-2026', 'unused'),
  ('NCECA-EJA7-KKJE', 'nceca-2026', 'unused'),
  ('NCECA-BEQ8-4WNZ', 'nceca-2026', 'unused'),
  ('NCECA-WZDB-U5TU', 'nceca-2026', 'unused'),
  ('NCECA-MRO3-FEB0', 'nceca-2026', 'unused'),
  ('NCECA-ANMN-XA2V', 'nceca-2026', 'unused'),
  ('NCECA-ZNWK-8CYK', 'nceca-2026', 'unused'),
  ('NCECA-UCDN-HHTQ', 'nceca-2026', 'unused'),
  ('NCECA-ZIC0-6HKX', 'nceca-2026', 'unused'),
  ('NCECA-TV8Z-QYNO', 'nceca-2026', 'unused'),
  ('NCECA-6MCQ-MZIT', 'nceca-2026', 'unused'),
  ('NCECA-UHRF-EDWZ', 'nceca-2026', 'unused'),
  ('NCECA-FOSY-G03R', 'nceca-2026', 'unused'),
  ('NCECA-X9SM-MYW3', 'nceca-2026', 'unused'),
  ('NCECA-SECA-F6MB', 'nceca-2026', 'unused'),
  ('NCECA-OOUS-M3MR', 'nceca-2026', 'unused'),
  ('NCECA-CYGK-UEVP', 'nceca-2026', 'unused'),
  ('NCECA-BGKQ-VYUR', 'nceca-2026', 'unused'),
  ('NCECA-QOTO-XQSD', 'nceca-2026', 'unused'),
  ('NCECA-1ANH-FTOI', 'nceca-2026', 'unused'),
  ('NCECA-7UYD-WIO0', 'nceca-2026', 'unused'),
  ('NCECA-3P42-NZFQ', 'nceca-2026', 'unused'),
  ('NCECA-8Y2Y-CWIQ', 'nceca-2026', 'unused'),
  ('NCECA-B6V6-ELGR', 'nceca-2026', 'unused'),
  ('NCECA-JRHB-AMZB', 'nceca-2026', 'unused'),
  ('NCECA-CEQG-ODCA', 'nceca-2026', 'unused'),
  ('NCECA-IBJT-XFUF', 'nceca-2026', 'unused'),
  ('NCECA-RYP6-ZODS', 'nceca-2026', 'unused'),
  ('NCECA-G6LV-TQZL', 'nceca-2026', 'unused'),
  ('NCECA-8KAC-TD1Z', 'nceca-2026', 'unused'),
  ('NCECA-H24S-AUMF', 'nceca-2026', 'unused'),
  ('NCECA-HXVF-2MQU', 'nceca-2026', 'unused'),
  ('NCECA-BUFG-L9TZ', 'nceca-2026', 'unused'),
  ('NCECA-ODWQ-GBEY', 'nceca-2026', 'unused'),
  ('NCECA-CSMH-7C9A', 'nceca-2026', 'unused'),
  ('NCECA-VFRZ-HA5E', 'nceca-2026', 'unused'),
  ('NCECA-HRQT-OUUS', 'nceca-2026', 'unused'),
  ('NCECA-GZEK-UMAR', 'nceca-2026', 'unused'),
  ('NCECA-JISK-GBTN', 'nceca-2026', 'unused'),
  ('NCECA-Y0XW-QFGP', 'nceca-2026', 'unused'),
  ('NCECA-3VWR-R4JA', 'nceca-2026', 'unused'),
  ('NCECA-4NZE-2ASK', 'nceca-2026', 'unused'),
  ('NCECA-DZDH-S4UU', 'nceca-2026', 'unused'),
  ('NCECA-G4BD-GLCC', 'nceca-2026', 'unused'),
  ('NCECA-RVPM-JGKL', 'nceca-2026', 'unused'),
  ('NCECA-AB3E-7UMO', 'nceca-2026', 'unused'),
  ('NCECA-QJKQ-D9CJ', 'nceca-2026', 'unused'),
  ('NCECA-U4US-UVCJ', 'nceca-2026', 'unused'),
  ('NCECA-2NOR-YVGU', 'nceca-2026', 'unused'),
  ('NCECA-ZZVK-V7SK', 'nceca-2026', 'unused'),
  ('NCECA-HK6A-RKNQ', 'nceca-2026', 'unused'),
  ('NCECA-GWBE-I00N', 'nceca-2026', 'unused'),
  ('NCECA-M76Z-R3U8', 'nceca-2026', 'unused'),
  ('NCECA-0W8I-DZUJ', 'nceca-2026', 'unused'),
  ('NCECA-UVPR-SRAM', 'nceca-2026', 'unused'),
  ('NCECA-VSMN-GXNI', 'nceca-2026', 'unused'),
  ('NCECA-IS9I-AR2D', 'nceca-2026', 'unused'),
  ('NCECA-JTGB-YERT', 'nceca-2026', 'unused'),
  ('NCECA-1DHZ-GBLJ', 'nceca-2026', 'unused'),
  ('NCECA-AOUM-AIID', 'nceca-2026', 'unused'),
  ('NCECA-OU61-ZL1A', 'nceca-2026', 'unused'),
  ('NCECA-WBDP-6QFG', 'nceca-2026', 'unused'),
  ('NCECA-JNTO-IXI1', 'nceca-2026', 'unused'),
  ('NCECA-T8HV-7WXU', 'nceca-2026', 'unused'),
  ('NCECA-60MO-FTQW', 'nceca-2026', 'unused'),
  ('NCECA-LIWR-BRQG', 'nceca-2026', 'unused'),
  ('NCECA-UYGG-CGFP', 'nceca-2026', 'unused'),
  ('NCECA-AR66-ZLZC', 'nceca-2026', 'unused'),
  ('NCECA-ILHS-D5FI', 'nceca-2026', 'unused'),
  ('NCECA-PCLY-D1FI', 'nceca-2026', 'unused'),
  ('NCECA-QXNP-B45M', 'nceca-2026', 'unused'),
  ('NCECA-PSZX-2RJW', 'nceca-2026', 'unused'),
  ('NCECA-XRY6-BR6V', 'nceca-2026', 'unused'),
  ('NCECA-VFZN-XAII', 'nceca-2026', 'unused'),
  ('NCECA-QLNB-GFK0', 'nceca-2026', 'unused'),
  ('NCECA-TTSS-5TJU', 'nceca-2026', 'unused'),
  ('NCECA-BLLQ-CDQW', 'nceca-2026', 'unused'),
  ('NCECA-Y84L-OXIC', 'nceca-2026', 'unused'),
  ('NCECA-PYLN-TV2P', 'nceca-2026', 'unused'),
  ('NCECA-ILZD-QULL', 'nceca-2026', 'unused'),
  ('NCECA-TFC5-UIZY', 'nceca-2026', 'unused'),
  ('NCECA-AE2S-5LHN', 'nceca-2026', 'unused'),
  ('NCECA-2RBD-TMZC', 'nceca-2026', 'unused'),
  ('NCECA-7XXN-0PYJ', 'nceca-2026', 'unused'),
  ('NCECA-C4BS-WQ4F', 'nceca-2026', 'unused'),
  ('NCECA-ZWSI-FLQS', 'nceca-2026', 'unused'),
  ('NCECA-VH5U-UHQX', 'nceca-2026', 'unused'),
  ('NCECA-AIUD-QC5N', 'nceca-2026', 'unused'),
  ('NCECA-ODAD-YY9E', 'nceca-2026', 'unused'),
  ('NCECA-ENEU-WBFW', 'nceca-2026', 'unused'),
  ('NCECA-WW3Y-58FO', 'nceca-2026', 'unused'),
  ('NCECA-OCII-F9ZQ', 'nceca-2026', 'unused'),
  ('NCECA-AWEW-K2E1', 'nceca-2026', 'unused'),
  ('NCECA-19A9-PVKX', 'nceca-2026', 'unused'),
  ('NCECA-4G4Q-ST1D', 'nceca-2026', 'unused'),
  ('NCECA-EIBD-SW9O', 'nceca-2026', 'unused'),
  ('NCECA-UFPJ-62OK', 'nceca-2026', 'unused'),
  ('NCECA-YSPZ-ZICH', 'nceca-2026', 'unused'),
  ('NCECA-E4NE-H85E', 'nceca-2026', 'unused'),
  ('NCECA-XH8M-DQUG', 'nceca-2026', 'unused'),
  ('NCECA-BYII-N7DP', 'nceca-2026', 'unused'),
  ('NCECA-XIUC-WCQY', 'nceca-2026', 'unused'),
  ('NCECA-ZH87-PD9X', 'nceca-2026', 'unused'),
  ('NCECA-OK68-GJKS', 'nceca-2026', 'unused'),
  ('NCECA-VZRO-XVGW', 'nceca-2026', 'unused'),
  ('NCECA-ZIGF-DHC7', 'nceca-2026', 'unused'),
  ('NCECA-RPXR-8R1I', 'nceca-2026', 'unused'),
  ('NCECA-7BO4-5AWS', 'nceca-2026', 'unused'),
  ('NCECA-2XKC-GCLG', 'nceca-2026', 'unused'),
  ('NCECA-BW2O-NGYX', 'nceca-2026', 'unused'),
  ('NCECA-ABQJ-DZXW', 'nceca-2026', 'unused'),
  ('NCECA-ZBAQ-4E0Z', 'nceca-2026', 'unused'),
  ('NCECA-ZBVU-BMSF', 'nceca-2026', 'unused'),
  ('NCECA-ZRRE-GO8N', 'nceca-2026', 'unused'),
  ('NCECA-OJ3L-ICBM', 'nceca-2026', 'unused'),
  ('NCECA-N3QL-CRKE', 'nceca-2026', 'unused'),
  ('NCECA-AUSM-TU99', 'nceca-2026', 'unused'),
  ('NCECA-TTDA-V1ZW', 'nceca-2026', 'unused'),
  ('NCECA-IKRK-GEZG', 'nceca-2026', 'unused'),
  ('NCECA-N6CJ-5Z0Q', 'nceca-2026', 'unused'),
  ('NCECA-SA2G-XSKA', 'nceca-2026', 'unused'),
  ('NCECA-CNOA-GWAA', 'nceca-2026', 'unused'),
  ('NCECA-6WMR-16KY', 'nceca-2026', 'unused'),
  ('NCECA-PGB5-UDDE', 'nceca-2026', 'unused'),
  ('NCECA-YD2S-IABR', 'nceca-2026', 'unused'),
  ('NCECA-OZJL-TXGI', 'nceca-2026', 'unused'),
  ('NCECA-OZOR-OB1H', 'nceca-2026', 'unused'),
  ('NCECA-TWQW-25DP', 'nceca-2026', 'unused'),
  ('NCECA-3OJX-QSML', 'nceca-2026', 'unused'),
  ('NCECA-40W1-ULRV', 'nceca-2026', 'unused'),
  ('NCECA-NBJE-TEMA', 'nceca-2026', 'unused'),
  ('NCECA-FG1M-0RZK', 'nceca-2026', 'unused'),
  ('NCECA-AYP7-TYXU', 'nceca-2026', 'unused'),
  ('NCECA-MLPL-JLZJ', 'nceca-2026', 'unused'),
  ('NCECA-CAWE-KPGN', 'nceca-2026', 'unused'),
  ('NCECA-MKKZ-CMND', 'nceca-2026', 'unused'),
  ('NCECA-WD1R-KC7A', 'nceca-2026', 'unused'),
  ('NCECA-AVG2-MURD', 'nceca-2026', 'unused'),
  ('NCECA-8GMS-TZTQ', 'nceca-2026', 'unused'),
  ('NCECA-L0VC-6IU9', 'nceca-2026', 'unused'),
  ('NCECA-LZVB-S1UV', 'nceca-2026', 'unused'),
  ('NCECA-E2YR-FB2F', 'nceca-2026', 'unused'),
  ('NCECA-V2Q-VEHU', 'nceca-2026', 'unused'),
  ('NCECA-FONV-L5VP', 'nceca-2026', 'unused'),
  ('NCECA-KIAM-FGYZ', 'nceca-2026', 'unused'),
  ('NCECA-1UZN-A2II', 'nceca-2026', 'unused'),
  ('NCECA-AAHW-VQZR', 'nceca-2026', 'unused'),
  ('NCECA-UJCP-JYD9', 'nceca-2026', 'unused'),
  ('NCECA-KEJP-7GG7', 'nceca-2026', 'unused'),
  ('NCECA-GWC9-CB2R', 'nceca-2026', 'unused'),
  ('NCECA-TO0G-PK61', 'nceca-2026', 'unused'),
  ('NCECA-0B6W-Z93P', 'nceca-2026', 'unused'),
  ('NCECA-QFIH-UVP9', 'nceca-2026', 'unused'),
  ('NCECA-JUMO-FARR', 'nceca-2026', 'unused'),
  ('NCECA-VQFB-SKZR', 'nceca-2026', 'unused'),
  ('NCECA-LBM8-THZJ', 'nceca-2026', 'unused'),
  ('NCECA-CFGQ-5K7S', 'nceca-2026', 'unused'),
  ('NCECA-LH91-QI1T', 'nceca-2026', 'unused'),
  ('NCECA-EHYA-BP06', 'nceca-2026', 'unused'),
  ('NCECA-Y1CO-SCEF', 'nceca-2026', 'unused'),
  ('NCECA-INLB-WELY', 'nceca-2026', 'unused'),
  ('NCECA-KLY6-HVID', 'nceca-2026', 'unused'),
  ('NCECA-GZ5E-2JWL', 'nceca-2026', 'unused'),
  ('NCECA-VNJX-ON6I', 'nceca-2026', 'unused'),
  ('NCECA-1ZDC-O3DV', 'nceca-2026', 'unused'),
  ('NCECA-H9HX-GRLJ', 'nceca-2026', 'unused'),
  ('NCECA-LYJD-2F1H', 'nceca-2026', 'unused'),
  ('NCECA-KXDK-RQXE', 'nceca-2026', 'unused'),
  ('NCECA-VVLW-DDZF', 'nceca-2026', 'unused'),
  ('NCECA-PHHT-J3ZX', 'nceca-2026', 'unused'),
  ('NCECA-VTBX-S0NF', 'nceca-2026', 'unused'),
  ('NCECA-Q8ZT-OLL2', 'nceca-2026', 'unused'),
  ('NCECA-SW4T-1NR7', 'nceca-2026', 'unused'),
  ('NCECA-0JTZ-MQBC', 'nceca-2026', 'unused'),
  ('NCECA-NZIW-FTD0', 'nceca-2026', 'unused'),
  ('NCECA-L26V-B1NE', 'nceca-2026', 'unused'),
  ('NCECA-8SJS-CIDF', 'nceca-2026', 'unused'),
  ('NCECA-EQ9H-YB9B', 'nceca-2026', 'unused'),
  ('NCECA-BZTN-OARF', 'nceca-2026', 'unused'),
  ('NCECA-VHFV-G2NA', 'nceca-2026', 'unused'),
  ('NCECA-E8YP-AWIA', 'nceca-2026', 'unused'),
  ('NCECA-BZRP-PNGK', 'nceca-2026', 'unused'),
  ('NCECA-K6QA-CBKG', 'nceca-2026', 'unused'),
  ('NCECA-V6WJ-1LFU', 'nceca-2026', 'unused'),
  ('NCECA-9AGM-2PYQ', 'nceca-2026', 'unused')
ON CONFLICT (code) DO NOTHING;

-- Verify count
SELECT count(*) as total_codes FROM public.trial_codes WHERE batch_id = 'nceca-2026';

