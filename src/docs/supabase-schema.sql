-- ============================================================================
-- Stull Atlas — Supabase Schema
-- ============================================================================
-- Run this in the Supabase SQL Editor after creating your project.
-- Project setup: https://supabase.com → New Project → Settings → API
--
-- After running, copy your project URL and anon key to .env.local:
--   VITE_SUPABASE_URL=https://your-project.supabase.co
--   VITE_SUPABASE_ANON_KEY=eyJ...
-- ============================================================================

-- ── Enum types ─────────────────────────────────────────────────────
CREATE TYPE public.tier AS ENUM ('free', 'solo', 'pro', 'atlas_3d', 'edu_individual', 'edu_classroom');
CREATE TYPE public.code_status AS ENUM ('unused', 'redeemed', 'disabled');

-- ── Profiles table ─────────────────────────────────────────────────
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL DEFAULT '',
  display_name text,
  tier public.tier NOT NULL DEFAULT 'free',
  trial_start timestamptz,
  trial_end timestamptz,
  stripe_customer_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- RLS: users can read/update their own profile
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ── Trial codes table ──────────────────────────────────────────────
CREATE TABLE public.trial_codes (
  code text PRIMARY KEY,
  batch_id text NOT NULL DEFAULT 'nceca-2026',
  status public.code_status NOT NULL DEFAULT 'unused',
  issued_at timestamptz NOT NULL DEFAULT now(),
  redeemed_at timestamptz,
  redeemed_by uuid REFERENCES auth.users(id)
);

ALTER TABLE public.trial_codes ENABLE ROW LEVEL SECURITY;

-- Anyone can read codes (to check validity), but only auth'd users can update
CREATE POLICY "Anyone can look up codes"
  ON public.trial_codes FOR SELECT
  USING (true);

CREATE POLICY "Auth users can redeem codes"
  ON public.trial_codes FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- ── Saved recipes table ────────────────────────────────────────────
-- Cloud storage for user recipes — syncs with localStorage
CREATE TABLE public.saved_recipes (
  id text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  source text NOT NULL DEFAULT 'user',
  recipe_data jsonb NOT NULL,  -- Full GlazeRecipe as JSON
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id, user_id)
);

CREATE TRIGGER saved_recipes_updated_at
  BEFORE UPDATE ON public.saved_recipes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.saved_recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own recipes"
  ON public.saved_recipes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own recipes"
  ON public.saved_recipes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own recipes"
  ON public.saved_recipes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own recipes"
  ON public.saved_recipes FOR DELETE
  USING (auth.uid() = user_id);

-- Index for fast user recipe lookups
CREATE INDEX idx_saved_recipes_user ON public.saved_recipes(user_id);

-- ── Collections table ──────────────────────────────────────────────
-- Named groups of glazes (and future: snapshots, journal entries).
-- Manual collections are user-curated; smart collections store a saved query.
CREATE TABLE public.collections (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        text NOT NULL,
  description text,
  color       text,                -- hex color for UI pill/badge
  icon        text,                -- emoji or icon name
  item_type   text NOT NULL DEFAULT 'recipe',  -- 'recipe' | 'snapshot' | 'journal' | 'mixed'
  item_ids    text[] NOT NULL DEFAULT '{}',     -- ordered list of item IDs
  is_smart    boolean NOT NULL DEFAULT false,
  smart_query jsonb,               -- saved filter (cone, surface, tags, property ranges)
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER collections_updated_at
  BEFORE UPDATE ON public.collections
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own collections"
  ON public.collections FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own collections"
  ON public.collections FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own collections"
  ON public.collections FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own collections"
  ON public.collections FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_collections_user ON public.collections(user_id);

-- ── What-If Snapshots table ────────────────────────────────────────
-- Frozen state of the What-If Machine at a moment in time.
-- The core unit of saved exploration — journals and cards reference these.
CREATE TABLE public.snapshots (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name            text,
  parent_recipe_id text,           -- recipe this exploration started from (if any)
  umf_state       jsonb NOT NULL,  -- full oxide values { SiO2: 3.2, Al2O3: 0.4, ... }
  properties      jsonb NOT NULL,  -- computed: { coe, melt_temp, viscosity, nbo_t, ... }
  stull_position  jsonb,           -- { x, y, z } chart coordinates
  surface         text,            -- predicted: matte | satin | gloss
  forecast        jsonb,           -- weather-card data: { surface, color, fit, risk, feel }
  mode            text DEFAULT 'science',  -- 'studio' | 'science' (which lens was active)
  tags            text[] DEFAULT '{}',
  is_favorite     boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own snapshots"
  ON public.snapshots FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own snapshots"
  ON public.snapshots FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own snapshots"
  ON public.snapshots FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own snapshots"
  ON public.snapshots FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_snapshots_user ON public.snapshots(user_id);
CREATE INDEX idx_snapshots_recipe ON public.snapshots(parent_recipe_id);

-- ── Journal Entries table ──────────────────────────────────────────
-- Annotated exploration records — the potter's chemistry notebook.
-- Each entry wraps a snapshot with narration, notes, and context.
CREATE TABLE public.journal_entries (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  snapshot_id   uuid REFERENCES public.snapshots(id) ON DELETE SET NULL,
  narration     text,              -- auto-generated plain English narrative
  notes         text,              -- user's own notes
  tags          text[] DEFAULT '{}',
  forecast      jsonb,             -- denormalized forecast card at time of save
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own journal"
  ON public.journal_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own journal"
  ON public.journal_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own journal"
  ON public.journal_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own journal"
  ON public.journal_entries FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_journal_user ON public.journal_entries(user_id);
CREATE INDEX idx_journal_snapshot ON public.journal_entries(snapshot_id);

-- ── Recipe Cards table ─────────────────────────────────────────────
-- Generated printable cards — the physical studio artifact.
CREATE TABLE public.recipe_cards (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  snapshot_id   uuid REFERENCES public.snapshots(id) ON DELETE SET NULL,
  recipe_id     text,              -- links to saved_recipes.id
  card_data     jsonb NOT NULL,    -- full rendered card content
  photo_url     text,              -- user's test tile photo (Supabase Storage URL)
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.recipe_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cards"
  ON public.recipe_cards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cards"
  ON public.recipe_cards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cards"
  ON public.recipe_cards FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cards"
  ON public.recipe_cards FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_cards_user ON public.recipe_cards(user_id);

-- ── Firing Schedules table ─────────────────────────────────────────
-- Multi-segment kiln firing programs.
CREATE TABLE public.firing_schedules (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name          text NOT NULL,
  cone          text,              -- target cone (text to support "6", "06", "10")
  atmosphere    text,              -- oxidation | reduction | neutral | wood | salt | soda
  segments      jsonb NOT NULL,    -- [{ rate_per_hr, target_temp, hold_minutes }]
  total_hours   numeric,           -- computed convenience field
  notes         text,
  tags          text[] DEFAULT '{}',
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER firing_schedules_updated_at
  BEFORE UPDATE ON public.firing_schedules
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.firing_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own firings"
  ON public.firing_schedules FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own firings"
  ON public.firing_schedules FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own firings"
  ON public.firing_schedules FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own firings"
  ON public.firing_schedules FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_firings_user ON public.firing_schedules(user_id);

-- ── Test Tiles table ───────────────────────────────────────────────
-- Physical test records — the lab notebook of the studio.
-- Photos stored in Supabase Storage bucket 'test-tile-photos'.
CREATE TABLE public.test_tiles (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id         text,                    -- links to saved_recipes.id
  firing_schedule_id uuid REFERENCES public.firing_schedules(id) ON DELETE SET NULL,
  clay_body         text,                    -- name or description of clay body used
  cone_actual       text,                    -- actual cone reached
  surface_result    text,                    -- observed: matte | satin | gloss | other
  color_result      text,                    -- observed color description
  photo_urls        text[] DEFAULT '{}',     -- Supabase Storage URLs
  notes             text,
  tags              text[] DEFAULT '{}',
  fired_date        date,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER test_tiles_updated_at
  BEFORE UPDATE ON public.test_tiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.test_tiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tiles"
  ON public.test_tiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tiles"
  ON public.test_tiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tiles"
  ON public.test_tiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tiles"
  ON public.test_tiles FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_tiles_user ON public.test_tiles(user_id);
CREATE INDEX idx_tiles_recipe ON public.test_tiles(recipe_id);

-- ── Region Annotations table ───────────────────────────────────────
-- User-drawn regions on the Stull chart.
CREATE TABLE public.annotations (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        text NOT NULL,
  color       text,                -- hex color for polygon fill
  polygon     jsonb NOT NULL,      -- [{ x, y }] vertices in SiO2/Al2O3 space
  notes       text,
  visible     boolean NOT NULL DEFAULT true,
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER annotations_updated_at
  BEFORE UPDATE ON public.annotations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.annotations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own annotations"
  ON public.annotations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own annotations"
  ON public.annotations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own annotations"
  ON public.annotations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own annotations"
  ON public.annotations FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_annotations_user ON public.annotations(user_id);

-- ── User Preferences table ─────────────────────────────────────────
-- Roaming settings that follow the user across devices.
-- One row per user. JSONB prefs column holds all settings.
CREATE TABLE public.user_prefs (
  user_id     uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  theme       text DEFAULT 'system',       -- 'light' | 'dark' | 'system'
  mode        text DEFAULT 'science',      -- 'studio' | 'science' (What-If default)
  default_cone text DEFAULT '6',
  default_atmosphere text DEFAULT 'oxidation',
  prefs       jsonb DEFAULT '{}'::jsonb,   -- extensible: { dashboardLayout, units, ... }
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER user_prefs_updated_at
  BEFORE UPDATE ON public.user_prefs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.user_prefs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own prefs"
  ON public.user_prefs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert own prefs"
  ON public.user_prefs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own prefs"
  ON public.user_prefs FOR UPDATE USING (auth.uid() = user_id);

-- ── Exploration Stats table ────────────────────────────────────────
-- Aggregated exploration patterns for blindspot analysis.
-- Updated periodically from journal/snapshot data — not real-time.
CREATE TABLE public.exploration_stats (
  user_id         uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_sessions  integer NOT NULL DEFAULT 0,
  total_snapshots integer NOT NULL DEFAULT 0,
  oxide_heatmap   jsonb DEFAULT '{}'::jsonb,   -- { SiO2: [histogram buckets], Al2O3: [...] }
  region_visits   jsonb DEFAULT '{}'::jsonb,   -- { "high-SiO2-low-Al2O3": 42, ... }
  blindspots      jsonb DEFAULT '[]'::jsonb,   -- computed: ["Al2O3 rarely adjusted", ...]
  last_session_at timestamptz,
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER exploration_stats_updated_at
  BEFORE UPDATE ON public.exploration_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.exploration_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own stats"
  ON public.exploration_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert own stats"
  ON public.exploration_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own stats"
  ON public.exploration_stats FOR UPDATE USING (auth.uid() = user_id);

-- ── Blend Results table ────────────────────────────────────────────
-- Persisted triaxial/biaxial/line blend calculations.
-- Currently ephemeral in recipeStore — this makes them survive navigation.
CREATE TABLE public.blend_results (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        text,
  blend_type  text NOT NULL,       -- 'simplex' | 'grid' | 'space_filling' | 'line'
  config      jsonb NOT NULL,      -- the blend config that generated these points
  points      jsonb NOT NULL,      -- array of computed blend points
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.blend_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own blends"
  ON public.blend_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own blends"
  ON public.blend_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own blends"
  ON public.blend_results FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_blends_user ON public.blend_results(user_id);

-- ════════════════════════════════════════════════════════════════════
-- PHASE 2 — Studio, Laboratory, Kiln, Bench, Map, Community tables
-- "Room for everything we could ever want" + extensibility escape hatch
-- ════════════════════════════════════════════════════════════════════

-- ── Materials table ────────────────────────────────────────────────
-- User's custom / annotated material library.
-- Base materials ship with the app (data/materials/); this table holds
-- user overrides, custom materials, and per-lot COA data.
CREATE TABLE public.materials (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name            text NOT NULL,
  alternate_names text[] DEFAULT '{}',      -- "Custer", "Custer Feldspar", "G-200"
  category        text,                     -- 'feldspar' | 'clay' | 'frit' | 'oxide' | 'colorant' | 'flux' | 'other'
  oxide_analysis  jsonb NOT NULL DEFAULT '{}'::jsonb,  -- { SiO2: 68.7, Al2O3: 18.2, K2O: 12.0, ... } wt%
  loi             numeric,                  -- Loss on Ignition %
  formula_weight  numeric,                  -- g/mol
  specific_gravity numeric,                 -- for volume calculations
  mesh_size       text,                     -- "200", "325", etc.
  supplier        text,
  cost_per_unit   numeric,                  -- cost per lb/kg
  cost_unit       text DEFAULT 'lb',        -- 'lb' | 'kg'
  lot_number      text,                     -- per-batch tracking (COA)
  is_custom       boolean NOT NULL DEFAULT true,  -- false = override of a base material
  base_material_id text,                    -- references the app's built-in material key
  notes           text,
  tags            text[] DEFAULT '{}',
  detail          jsonb DEFAULT '{}'::jsonb, -- extensible: { particle_size_dist, color, hazards, ... }
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER materials_updated_at
  BEFORE UPDATE ON public.materials
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own materials"
  ON public.materials FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own materials"
  ON public.materials FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own materials"
  ON public.materials FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own materials"
  ON public.materials FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_materials_user ON public.materials(user_id);
CREATE INDEX idx_materials_category ON public.materials(user_id, category);

-- ── Clay Bodies table ──────────────────────────────────────────────
-- Clay body recipes — same math as glaze, different focus
-- (shrinkage, absorption, thermal shock, plasticity).
CREATE TABLE public.clay_bodies (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name            text NOT NULL,
  cone            text,
  firing_range    text,                     -- "cone 6-10"
  ingredients     jsonb NOT NULL DEFAULT '[]'::jsonb,  -- [{ material, percent }]
  oxide_analysis  jsonb DEFAULT '{}'::jsonb, -- computed UMF or wt% oxides
  coe_estimate    numeric,                  -- computed COE for glaze-body fit
  absorption      numeric,                  -- % at target cone
  shrinkage_wet_to_dry  numeric,            -- %
  shrinkage_dry_to_fired numeric,           -- %
  shrinkage_total numeric,                  -- %
  plasticity_notes text,
  color_oxidation text,                     -- fired color in ox
  color_reduction text,                     -- fired color in red
  notes           text,
  tags            text[] DEFAULT '{}',
  is_favorite     boolean NOT NULL DEFAULT false,
  detail          jsonb DEFAULT '{}'::jsonb, -- extensible: { particle_size, mineral_ratios, ... }
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER clay_bodies_updated_at
  BEFORE UPDATE ON public.clay_bodies
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.clay_bodies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own clay bodies"
  ON public.clay_bodies FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own clay bodies"
  ON public.clay_bodies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own clay bodies"
  ON public.clay_bodies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own clay bodies"
  ON public.clay_bodies FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_clay_bodies_user ON public.clay_bodies(user_id);

-- ── Kiln Profiles table ────────────────────────────────────────────
-- User's kilns — electric, gas, wood, soda, salt.
-- Firing schedules link here; firing logs record actual events per kiln.
CREATE TABLE public.kiln_profiles (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name            text NOT NULL,
  kiln_type       text,                     -- 'electric' | 'gas' | 'wood' | 'soda' | 'salt' | 'raku' | 'other'
  max_temp_c      integer,                  -- max rated temperature
  max_cone        text,
  interior_dims   jsonb,                    -- { width_in, depth_in, height_in } or cm
  cubic_feet      numeric,
  element_count   integer,                  -- electric kilns
  element_age_firings integer,              -- firings since last element replacement
  thermocouple_count integer,
  controller      text,                     -- "Bartlett V6-CF", "manual", etc.
  power_kw        numeric,                  -- for cost estimation
  fuel_type       text,                     -- 'electricity' | 'natural_gas' | 'propane' | 'wood'
  location        text,                     -- "studio", "shared space", etc.
  notes           text,
  detail          jsonb DEFAULT '{}'::jsonb, -- extensible: { maintenance_log, photos, ... }
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER kiln_profiles_updated_at
  BEFORE UPDATE ON public.kiln_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.kiln_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own kilns"
  ON public.kiln_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own kilns"
  ON public.kiln_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own kilns"
  ON public.kiln_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own kilns"
  ON public.kiln_profiles FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_kilns_user ON public.kiln_profiles(user_id);

-- ── Firing Logs table ──────────────────────────────────────────────
-- Actual kiln firings — the event record that ties schedule + kiln + tiles.
-- Distinct from firing_schedules (the plan) — this is what actually happened.
CREATE TABLE public.firing_logs (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kiln_id             uuid REFERENCES public.kiln_profiles(id) ON DELETE SET NULL,
  schedule_id         uuid REFERENCES public.firing_schedules(id) ON DELETE SET NULL,
  name                text,                     -- "Tuesday cone 6 ox", "Wood fire #14"
  fired_date          date,
  started_at          timestamptz,
  finished_at         timestamptz,
  cone_target         text,
  cone_actual         text,                     -- what actually happened
  atmosphere          text,                     -- what actually happened
  heat_work_actual    numeric,                  -- computed cone-equivalent from actual curve
  thermocouple_data   jsonb,                    -- [{ time_min, temp_c }] imported or manual
  tile_ids            text[] DEFAULT '{}',      -- test tiles loaded in this firing
  kiln_load_notes     text,                     -- "bottom shelf: celadon tiles, top: tenmoku"
  kiln_map            jsonb,                    -- optional spatial map { shelves: [{ tiles: [...] }] }
  fuel_used           numeric,                  -- kWh, gallons, cords, etc.
  fuel_unit           text,                     -- 'kWh' | 'gallons' | 'cords' | 'lbs'
  cost_estimate       numeric,                  -- calculated from fuel + rates
  notes               text,
  tags                text[] DEFAULT '{}',
  detail              jsonb DEFAULT '{}'::jsonb, -- extensible: { weather, witnesses, photos, ... }
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER firing_logs_updated_at
  BEFORE UPDATE ON public.firing_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.firing_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own firing logs"
  ON public.firing_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own firing logs"
  ON public.firing_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own firing logs"
  ON public.firing_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own firing logs"
  ON public.firing_logs FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_firing_logs_user ON public.firing_logs(user_id);
CREATE INDEX idx_firing_logs_kiln ON public.firing_logs(kiln_id);
CREATE INDEX idx_firing_logs_date ON public.firing_logs(user_id, fired_date);

-- ── Material Inventory table ───────────────────────────────────────
-- What's on the shelf right now. Links to materials table.
-- Tracks quantity, cost, lot numbers, reorder alerts.
CREATE TABLE public.material_inventory (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  material_id     uuid REFERENCES public.materials(id) ON DELETE SET NULL,
  material_name   text NOT NULL,             -- denormalized for display even if material deleted
  quantity        numeric NOT NULL DEFAULT 0,
  unit            text NOT NULL DEFAULT 'lb', -- 'lb' | 'kg' | 'oz' | 'g'
  reorder_at      numeric,                   -- alert threshold
  cost_per_unit   numeric,
  supplier        text,
  lot_number      text,
  purchase_date   date,
  expiry_date     date,                      -- some materials degrade
  location        text,                      -- "shelf 3", "dry storage", etc.
  notes           text,
  detail          jsonb DEFAULT '{}'::jsonb,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER material_inventory_updated_at
  BEFORE UPDATE ON public.material_inventory
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.material_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own inventory"
  ON public.material_inventory FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own inventory"
  ON public.material_inventory FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own inventory"
  ON public.material_inventory FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own inventory"
  ON public.material_inventory FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_inventory_user ON public.material_inventory(user_id);

-- ── Batch Logs table ───────────────────────────────────────────────
-- Production mixing records — "mixed 5 gallons of Celadon #3 on Jan 12."
-- Links recipe to actual physical batch in the studio.
CREATE TABLE public.batch_logs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id       text,                      -- links to saved_recipes.id
  recipe_name     text,                      -- denormalized
  batch_size      numeric NOT NULL,
  batch_unit      text NOT NULL DEFAULT 'g', -- 'g' | 'kg' | 'lb' | 'oz'
  multiplier      numeric DEFAULT 1,         -- how many batches
  target_sg       numeric,                   -- specific gravity target
  water_added     numeric,                   -- weight of water
  deflocculant    text,                      -- "Darvan 7", "sodium silicate"
  deflocculant_amount numeric,
  actual_sg       numeric,                   -- measured after mixing
  material_weights jsonb,                    -- [{ material, weight, unit }] actual weighed amounts
  mixed_date      date,
  mixed_by        text,                      -- who mixed it (multi-person studio)
  status          text DEFAULT 'active',     -- 'active' | 'depleted' | 'discarded'
  notes           text,
  tags            text[] DEFAULT '{}',
  detail          jsonb DEFAULT '{}'::jsonb, -- extensible: { sieve_mesh, aging_days, ... }
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER batch_logs_updated_at
  BEFORE UPDATE ON public.batch_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.batch_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own batches"
  ON public.batch_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own batches"
  ON public.batch_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own batches"
  ON public.batch_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own batches"
  ON public.batch_logs FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_batch_logs_user ON public.batch_logs(user_id);
CREATE INDEX idx_batch_logs_recipe ON public.batch_logs(recipe_id);

-- ── Recipe Versions table ──────────────────────────────────────────
-- Git-for-recipes: every tweak creates a version entry.
-- This IS Lack Lineage's brand — the history of how a recipe evolved.
CREATE TABLE public.recipe_versions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id       text NOT NULL,             -- links to saved_recipes.id
  version_number  integer NOT NULL DEFAULT 1,
  parent_version_id uuid,                    -- previous version in the chain
  fork_source_id  uuid,                      -- if forked from another user's recipe
  recipe_data     jsonb NOT NULL,            -- full recipe snapshot at this version
  umf_snapshot    jsonb,                     -- UMF at this version (for quick comparison)
  change_summary  text,                      -- "Increased silica 2%, swapped Custer for Minspar"
  change_diff     jsonb,                     -- machine-readable diff: [{ field, old, new }]
  notes           text,
  tags            text[] DEFAULT '{}',
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.recipe_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own versions"
  ON public.recipe_versions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own versions"
  ON public.recipe_versions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own versions"
  ON public.recipe_versions FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_recipe_versions_user ON public.recipe_versions(user_id);
CREATE INDEX idx_recipe_versions_recipe ON public.recipe_versions(recipe_id, version_number);

-- ── Limit Presets table ────────────────────────────────────────────
-- User-defined UMF envelopes / target ranges.
-- "My cone 6 matte sweet spot" as a saved constraint set.
CREATE TABLE public.limit_presets (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name            text NOT NULL,
  cone            text,
  surface_target  text,                      -- 'matte' | 'satin' | 'gloss' | 'any'
  oxide_ranges    jsonb NOT NULL,            -- { SiO2: [2.5, 4.5], Al2O3: [0.2, 0.6], ... }
  property_ranges jsonb DEFAULT '{}'::jsonb, -- { coe: [55, 70], viscosity: [4, 8], ... }
  notes           text,
  is_default      boolean NOT NULL DEFAULT false, -- user's go-to envelope
  detail          jsonb DEFAULT '{}'::jsonb,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER limit_presets_updated_at
  BEFORE UPDATE ON public.limit_presets
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.limit_presets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own limits"
  ON public.limit_presets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own limits"
  ON public.limit_presets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own limits"
  ON public.limit_presets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own limits"
  ON public.limit_presets FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_limit_presets_user ON public.limit_presets(user_id);

-- ── Layer Experiments table ────────────────────────────────────────
-- Glaze-over-glaze layering records.
-- "What happens when I put celadon over tenmoku?"
CREATE TABLE public.layer_experiments (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name            text,
  inner_recipe_id text,                      -- bottom / first glaze
  outer_recipe_id text,                      -- top / second glaze
  inner_name      text,                      -- denormalized
  outer_name      text,                      -- denormalized
  clay_body_id    uuid REFERENCES public.clay_bodies(id) ON DELETE SET NULL,
  firing_log_id   uuid REFERENCES public.firing_logs(id) ON DELETE SET NULL,
  cone            text,
  atmosphere      text,
  application_method text,                   -- 'dip/dip' | 'dip/spray' | 'pour/brush' | etc.
  inner_thickness text,                      -- 'thin' | 'medium' | 'thick'
  outer_thickness text,
  estimated_combined_umf jsonb,              -- computed interface chemistry
  surface_result  text,
  color_result    text,
  interaction_notes text,                    -- "chrome-tin pink formed at overlap"
  photo_urls      text[] DEFAULT '{}',
  risk_flags      text[] DEFAULT '{}',       -- ['coe_mismatch', 'crawling', 'running']
  rating          integer,                   -- 1-5 user satisfaction
  notes           text,
  tags            text[] DEFAULT '{}',
  detail          jsonb DEFAULT '{}'::jsonb,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER layer_experiments_updated_at
  BEFORE UPDATE ON public.layer_experiments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.layer_experiments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own layers"
  ON public.layer_experiments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own layers"
  ON public.layer_experiments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own layers"
  ON public.layer_experiments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own layers"
  ON public.layer_experiments FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_layers_user ON public.layer_experiments(user_id);

-- ════════════════════════════════════════════════════════════════════
-- EXTENSIBILITY LAYER — "if we add something strange, we can adapt"
-- ════════════════════════════════════════════════════════════════════

-- ── User Entities table (universal escape hatch) ───────────────────
-- Store ANY new type of user data without a schema migration.
-- New features start here; if a type grows important enough, promote
-- it to a dedicated table later.
--
-- Examples: exploration_paths, comparisons, exercises, submissions,
-- workshop_templates, shared_links, import_jobs, custom_calculators,
-- wish_lists, supplier_contacts, safety_data_sheets, glaze_families,
-- photo_albums, color_targets, student_progress, anything.
CREATE TABLE public.user_entities (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type     text NOT NULL,             -- discriminator: 'comparison', 'exploration_path', etc.
  parent_id       uuid,                      -- self-ref for hierarchy (version chains, threads, folders)
  name            text,
  data            jsonb NOT NULL DEFAULT '{}'::jsonb,  -- the actual payload — shape varies by type
  tags            text[] DEFAULT '{}',
  is_archived     boolean NOT NULL DEFAULT false,
  sort_order      integer DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER user_entities_updated_at
  BEFORE UPDATE ON public.user_entities
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.user_entities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own entities"
  ON public.user_entities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own entities"
  ON public.user_entities FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own entities"
  ON public.user_entities FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own entities"
  ON public.user_entities FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_entities_user_type ON public.user_entities(user_id, entity_type);
CREATE INDEX idx_entities_parent ON public.user_entities(parent_id);
CREATE INDEX idx_entities_type ON public.user_entities(entity_type);

-- ── Reference Data table (system constants) ────────────────────────
-- Physics constants, lookup tables, published coefficients.
-- NOT user-specific — shared across all users, read-only in production.
--
-- Examples:
--   'appen_refractive'     → { SiO2: 1.458, Al2O3: 1.52, Na2O: 1.59, ... }
--   'appen_molar_volumes'  → { SiO2: 25.7, Al2O3: 34.1, Na2O: 19.5, ... }
--   'orton_cone_chart'     → { "06": 998, "6": 1222, "10": 1285, ... } (°C)
--   'grd_coefficients'     → { A: ..., B_terms: [...], C_terms: [...] }
--   'priven_tg_factors'    → { SiO2: 1480, Al2O3: 1170, Na2O: 550, ... }
--   'flux_effectiveness'   → { Li2O: 3.0, B2O3: 2.5, Na2O: 2.0, ... }
--   'volatilization_temps' → { Na2O: 1200, B2O3: 1100, PbO: 800, ... }
--   'bond_energies'        → { SiO2: 443, Al2O3: 378, ... } (kJ/mol)
--   'ionic_radii'          → { Si4: 0.26, Al3: 0.39, Na1: 1.02, ... } (Å)
--   'limit_formulas_cone6' → { SiO2: [2.5,4.5], Al2O3: [0.25,0.55], ... }
CREATE TABLE public.reference_data (
  key             text PRIMARY KEY,          -- unique identifier
  category        text NOT NULL,             -- 'physical_constants' | 'cone_charts' | 'coefficients' | 'limit_formulas' | 'historical_glazes'
  label           text,                      -- human-readable name: "Appen Refractive Index Factors"
  data            jsonb NOT NULL,            -- the payload
  source          text,                      -- citation: "Appen (1961)", "Orton Foundation"
  version         integer NOT NULL DEFAULT 1,
  notes           text,
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- reference_data is read-only for normal users, writable only by service_role
ALTER TABLE public.reference_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reference data"
  ON public.reference_data FOR SELECT
  USING (true);

CREATE INDEX idx_reference_category ON public.reference_data(category);

-- ── Computed Cache table ───────────────────────────────────────────
-- Expensive calculation results cached per user.
-- Viscosity curves, phase lookups, property suites, prediction models.
-- Input-hashed so identical inputs hit cache; optional TTL for expiry.
CREATE TABLE public.computed_cache (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cache_type      text NOT NULL,             -- 'property_suite' | 'viscosity_curve' | 'phase_lookup' | 'color_prediction' | 'perturbation_cloud'
  input_hash      text NOT NULL,             -- deterministic hash of inputs
  result          jsonb NOT NULL,            -- the computed output
  computation_ms  integer,                   -- how long it took (for profiling)
  computed_at     timestamptz NOT NULL DEFAULT now(),
  expires_at      timestamptz                -- optional TTL; null = forever
);

ALTER TABLE public.computed_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cache"
  ON public.computed_cache FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cache"
  ON public.computed_cache FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own cache"
  ON public.computed_cache FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_cache_lookup ON public.computed_cache(user_id, cache_type, input_hash);
CREATE INDEX idx_cache_expiry ON public.computed_cache(expires_at) WHERE expires_at IS NOT NULL;

-- ════════════════════════════════════════════════════════════════════
-- PHASE 3 — Column additions on existing tables
-- ════════════════════════════════════════════════════════════════════

-- ── profiles: community identity + onboarding ──────────────────────
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS avatar_url          text,
  ADD COLUMN IF NOT EXISTS bio                 text,
  ADD COLUMN IF NOT EXISTS studio_name         text,
  ADD COLUMN IF NOT EXISTS website             text,
  ADD COLUMN IF NOT EXISTS location            text,
  ADD COLUMN IF NOT EXISTS is_public           boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS social_links        jsonb DEFAULT '{}'::jsonb,   -- { instagram, youtube, etsy, ... }
  ADD COLUMN IF NOT EXISTS onboarding_completed boolean NOT NULL DEFAULT false;

-- ── saved_recipes: denormalized query columns + sharing ────────────
ALTER TABLE public.saved_recipes
  ADD COLUMN IF NOT EXISTS cone                text,              -- denormalized from recipe_data for SQL filtering
  ADD COLUMN IF NOT EXISTS atmosphere          text,              -- oxidation | reduction | neutral | wood | salt | soda
  ADD COLUMN IF NOT EXISTS surface_type        text,              -- matte | satin | gloss | other
  ADD COLUMN IF NOT EXISTS status              text DEFAULT 'active',  -- 'active' | 'archived' | 'testing'
  ADD COLUMN IF NOT EXISTS is_public           boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS share_token         text,              -- unique token for link-only sharing
  ADD COLUMN IF NOT EXISTS forked_from_id      text,              -- original recipe id (if forked)
  ADD COLUMN IF NOT EXISTS forked_from_user_id uuid,              -- original author
  ADD COLUMN IF NOT EXISTS base_type           text DEFAULT 'glaze';  -- 'glaze' | 'slip' | 'engobe' | 'wash' | 'underglaze'

CREATE INDEX IF NOT EXISTS idx_recipes_cone ON public.saved_recipes(user_id, cone);
CREATE INDEX IF NOT EXISTS idx_recipes_atmosphere ON public.saved_recipes(user_id, atmosphere);
CREATE INDEX IF NOT EXISTS idx_recipes_public ON public.saved_recipes(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_recipes_share_token ON public.saved_recipes(share_token) WHERE share_token IS NOT NULL;

-- ── test_tiles: FK links to clay_bodies, firing_logs, batch_logs ───
ALTER TABLE public.test_tiles
  ADD COLUMN IF NOT EXISTS clay_body_id        uuid REFERENCES public.clay_bodies(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS firing_log_id       uuid REFERENCES public.firing_logs(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS batch_id            uuid REFERENCES public.batch_logs(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS defects             text[] DEFAULT '{}',  -- ['crawling', 'pinholing', 'crazing']
  ADD COLUMN IF NOT EXISTS layer_experiment_id uuid REFERENCES public.layer_experiments(id) ON DELETE SET NULL;

-- ── snapshots: perturbation + inverse constraints ──────────────────
ALTER TABLE public.snapshots
  ADD COLUMN IF NOT EXISTS perturbation_data   jsonb,   -- What-If perturbation cloud data
  ADD COLUMN IF NOT EXISTS inverse_constraints jsonb;   -- inverse-design locked constraints

-- ── blend_results: source recipe tracking ──────────────────────────
ALTER TABLE public.blend_results
  ADD COLUMN IF NOT EXISTS source_recipe_ids   text[] DEFAULT '{}';   -- recipe IDs used as blend corners

-- ── firing_schedules: link to kiln ─────────────────────────────────
ALTER TABLE public.firing_schedules
  ADD COLUMN IF NOT EXISTS kiln_id             uuid REFERENCES public.kiln_profiles(id) ON DELETE SET NULL;

-- ── batch_logs: link to firing ─────────────────────────────────────
ALTER TABLE public.batch_logs
  ADD COLUMN IF NOT EXISTS firing_log_id       uuid REFERENCES public.firing_logs(id) ON DELETE SET NULL;

-- ════════════════════════════════════════════════════════════════════
-- PHASE 3 — New tables: Community, Classroom, Physical, Infrastructure
-- ════════════════════════════════════════════════════════════════════

-- ── Follows table ──────────────────────────────────────────────────
-- User-to-user follow graph for the /atlas/ community page.
CREATE TABLE public.follows (
  follower_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at      timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (follower_id, following_id),
  CHECK (follower_id != following_id)
);

ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view follows involving them"
  ON public.follows FOR SELECT
  USING (auth.uid() = follower_id OR auth.uid() = following_id);
CREATE POLICY "Users can follow others"
  ON public.follows FOR INSERT
  WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow"
  ON public.follows FOR DELETE
  USING (auth.uid() = follower_id);

CREATE INDEX idx_follows_follower ON public.follows(follower_id);
CREATE INDEX idx_follows_following ON public.follows(following_id);

-- ── Shared Items table ─────────────────────────────────────────────
-- Items shared to the community — recipes, test tiles, experiments.
-- Visibility: 'private' → 'link_only' → 'public'.
CREATE TABLE public.shared_items (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type       text NOT NULL,             -- 'recipe' | 'test_tile' | 'layer_experiment' | 'blend' | 'piece'
  item_id         text NOT NULL,             -- FK to the source table (text for saved_recipes, uuid::text for others)
  title           text NOT NULL,
  description     text,
  photo_url       text,
  visibility      text NOT NULL DEFAULT 'public',  -- 'public' | 'link_only'
  share_token     text UNIQUE,               -- for link_only sharing
  license         text DEFAULT 'cc-by-sa',   -- 'cc-by-sa' | 'cc-by-nc' | 'all-rights-reserved'
  is_featured     boolean NOT NULL DEFAULT false,
  is_pinned       boolean NOT NULL DEFAULT false,
  fork_count      integer NOT NULL DEFAULT 0,
  view_count      integer NOT NULL DEFAULT 0,
  tags            text[] DEFAULT '{}',
  detail          jsonb DEFAULT '{}'::jsonb,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER shared_items_updated_at
  BEFORE UPDATE ON public.shared_items
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.shared_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public shares"
  ON public.shared_items FOR SELECT
  USING (visibility = 'public' OR auth.uid() = user_id);
CREATE POLICY "Users can share own items"
  ON public.shared_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own shares"
  ON public.shared_items FOR UPDATE
  USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own shares"
  ON public.shared_items FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_shared_items_user ON public.shared_items(user_id);
CREATE INDEX idx_shared_items_type ON public.shared_items(item_type);
CREATE INDEX idx_shared_items_public ON public.shared_items(created_at DESC) WHERE visibility = 'public';
CREATE INDEX idx_shared_items_token ON public.shared_items(share_token) WHERE share_token IS NOT NULL;

-- ── Comments table ─────────────────────────────────────────────────
-- Threaded comments on shared items.
CREATE TABLE public.comments (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  shared_item_id  uuid NOT NULL REFERENCES public.shared_items(id) ON DELETE CASCADE,
  parent_id       uuid REFERENCES public.comments(id) ON DELETE CASCADE,  -- null = top-level; set = reply
  body            text NOT NULL,
  is_edited       boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments on public items"
  ON public.comments FOR SELECT
  USING (true);  -- visibility filtered by shared_items join
CREATE POLICY "Auth users can comment"
  ON public.comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can edit own comments"
  ON public.comments FOR UPDATE
  USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments"
  ON public.comments FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_comments_item ON public.comments(shared_item_id, created_at);
CREATE INDEX idx_comments_user ON public.comments(user_id);

-- ── Reactions table ────────────────────────────────────────────────
-- Likes, "tried it", bookmarks on shared items.
CREATE TABLE public.reactions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  shared_item_id  uuid NOT NULL REFERENCES public.shared_items(id) ON DELETE CASCADE,
  reaction_type   text NOT NULL,             -- 'like' | 'tried_it' | 'bookmark' | 'helpful'
  notes           text,                      -- optional: "tried it on Standard 266, came out great"
  photo_url       text,                      -- "tried it" photo proof
  created_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, shared_item_id, reaction_type)
);

ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reactions"
  ON public.reactions FOR SELECT
  USING (true);
CREATE POLICY "Auth users can react"
  ON public.reactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove own reactions"
  ON public.reactions FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_reactions_item ON public.reactions(shared_item_id);
CREATE INDEX idx_reactions_user ON public.reactions(user_id);

-- ── Community Feed table ───────────────────────────────────────────
-- Materialized recent community activity for fast feed rendering.
-- Populated by triggers or periodic refresh — not directly written by users.
CREATE TABLE public.community_feed (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id        uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type      text NOT NULL,             -- 'shared' | 'commented' | 'reacted' | 'forked' | 'tried_it'
  shared_item_id  uuid REFERENCES public.shared_items(id) ON DELETE CASCADE,
  target_user_id  uuid,                      -- who was affected (for notifications)
  summary         text,                      -- "Jane shared Celadon #7"
  detail          jsonb DEFAULT '{}'::jsonb,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.community_feed ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view feed"
  ON public.community_feed FOR SELECT
  USING (true);
-- Insert/delete managed by server functions, not direct user writes.

CREATE INDEX idx_feed_time ON public.community_feed(created_at DESC);
CREATE INDEX idx_feed_actor ON public.community_feed(actor_id);

-- ── Pieces table ───────────────────────────────────────────────────
-- The actual physical pottery piece — the missing center that connects
-- clay body + glaze(s) + firing + everything.
CREATE TABLE public.pieces (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name            text,                      -- "Blue celadon bowl", "NCECA mug #3"
  form            text,                      -- 'bowl' | 'mug' | 'vase' | 'plate' | 'sculpture' | 'tile' | 'other'
  clay_body_id    uuid REFERENCES public.clay_bodies(id) ON DELETE SET NULL,
  clay_body_name  text,                      -- denormalized
  glaze_recipe_ids text[] DEFAULT '{}',      -- one or more glazes applied
  glaze_names     text[] DEFAULT '{}',       -- denormalized
  firing_log_id   uuid REFERENCES public.firing_logs(id) ON DELETE SET NULL,
  firing_schedule_id uuid REFERENCES public.firing_schedules(id) ON DELETE SET NULL,
  cone            text,
  atmosphere      text,
  bisque_cone     text,                      -- bisque firing cone
  shelf_position  text,                      -- "bottom-2", "A3"
  application_notes text,                    -- "dipped 5 sec, wax resist on foot"
  surface_result  text,                      -- observed: matte | satin | gloss | other
  color_result    text,                      -- observed color
  photo_urls      text[] DEFAULT '{}',
  dimensions      jsonb,                     -- { height_in, width_in, weight_oz }
  status          text DEFAULT 'in_progress', -- 'greenware' | 'bisqued' | 'glazed' | 'fired' | 'finished' | 'sold' | 'gifted' | 'broken'
  rating          integer,                   -- 1-5 user satisfaction
  notes           text,
  tags            text[] DEFAULT '{}',
  is_favorite     boolean NOT NULL DEFAULT false,
  detail          jsonb DEFAULT '{}'::jsonb, -- extensible: { price, buyer, exhibition, ... }
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER pieces_updated_at
  BEFORE UPDATE ON public.pieces
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.pieces ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pieces"
  ON public.pieces FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own pieces"
  ON public.pieces FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pieces"
  ON public.pieces FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own pieces"
  ON public.pieces FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_pieces_user ON public.pieces(user_id);
CREATE INDEX idx_pieces_clay ON public.pieces(clay_body_id);
CREATE INDEX idx_pieces_firing ON public.pieces(firing_log_id);
CREATE INDEX idx_pieces_status ON public.pieces(user_id, status);

-- ── Glaze-Body Pairings table ──────────────────────────────────────
-- Compatibility matrix: how a specific glaze behaves on a specific clay body.
-- Not boolean — rich per-pairing results.
CREATE TABLE public.glaze_body_pairings (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id       text,                      -- saved_recipes.id
  recipe_name     text,                      -- denormalized
  clay_body_id    uuid REFERENCES public.clay_bodies(id) ON DELETE SET NULL,
  clay_body_name  text,                      -- denormalized
  cone            text,
  atmosphere      text,
  fit_rating      integer,                   -- 1-5 (1=crazing, 5=perfect)
  surface_result  text,
  color_result    text,
  coe_glaze       numeric,                   -- computed COE of glaze
  coe_body        numeric,                   -- computed COE of body
  coe_diff        numeric,                   -- difference (+ = crazing risk, - = shivering risk)
  defects         text[] DEFAULT '{}',       -- ['crazing', 'crawling', 'pinholing', 'shivering']
  photo_urls      text[] DEFAULT '{}',
  notes           text,
  tags            text[] DEFAULT '{}',
  detail          jsonb DEFAULT '{}'::jsonb,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER glaze_body_pairings_updated_at
  BEFORE UPDATE ON public.glaze_body_pairings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.glaze_body_pairings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pairings"
  ON public.glaze_body_pairings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own pairings"
  ON public.glaze_body_pairings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pairings"
  ON public.glaze_body_pairings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own pairings"
  ON public.glaze_body_pairings FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_pairings_user ON public.glaze_body_pairings(user_id);
CREATE INDEX idx_pairings_recipe ON public.glaze_body_pairings(recipe_id);
CREATE INDEX idx_pairings_body ON public.glaze_body_pairings(clay_body_id);

-- ── Courses table ──────────────────────────────────────────────────
-- Classroom v4.2 — teacher-created courses.
CREATE TABLE public.courses (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title           text NOT NULL,
  description     text,
  course_code     text UNIQUE,               -- "CERM-301-F26" — students use this to enroll
  max_students    integer DEFAULT 30,
  status          text NOT NULL DEFAULT 'active',  -- 'draft' | 'active' | 'archived'
  settings        jsonb DEFAULT '{}'::jsonb,  -- { allow_peer_view, require_approval, ... }
  tags            text[] DEFAULT '{}',
  detail          jsonb DEFAULT '{}'::jsonb,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers can view own courses"
  ON public.courses FOR SELECT
  USING (auth.uid() = teacher_id);
CREATE POLICY "Enrolled students can view course"
  ON public.courses FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.enrollments e
    WHERE e.course_id = courses.id AND e.user_id = auth.uid()
  ));
CREATE POLICY "Teachers can create courses"
  ON public.courses FOR INSERT
  WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "Teachers can update own courses"
  ON public.courses FOR UPDATE
  USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can delete own courses"
  ON public.courses FOR DELETE
  USING (auth.uid() = teacher_id);

CREATE INDEX idx_courses_teacher ON public.courses(teacher_id);
CREATE INDEX idx_courses_code ON public.courses(course_code);

-- ── Enrollments table ──────────────────────────────────────────────
-- Student enrollment in courses.
CREATE TABLE public.enrollments (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id       uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role            text NOT NULL DEFAULT 'student',  -- 'student' | 'ta' | 'auditor'
  status          text NOT NULL DEFAULT 'active',   -- 'pending' | 'active' | 'dropped' | 'completed'
  enrolled_at     timestamptz NOT NULL DEFAULT now(),
  completed_at    timestamptz,
  detail          jsonb DEFAULT '{}'::jsonb,
  UNIQUE (course_id, user_id)
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers can view course enrollments"
  ON public.enrollments FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.courses c
    WHERE c.id = enrollments.course_id AND c.teacher_id = auth.uid()
  ));
CREATE POLICY "Students can view own enrollment"
  ON public.enrollments FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Students can enroll themselves"
  ON public.enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Teachers can manage enrollments"
  ON public.enrollments FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.courses c
    WHERE c.id = enrollments.course_id AND c.teacher_id = auth.uid()
  ));
CREATE POLICY "Students can drop themselves"
  ON public.enrollments FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_enrollments_course ON public.enrollments(course_id);
CREATE INDEX idx_enrollments_user ON public.enrollments(user_id);

-- ── Exercises table ────────────────────────────────────────────────
-- Course assignments / exercises.
CREATE TABLE public.exercises (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id       uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  teacher_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title           text NOT NULL,
  description     text,
  exercise_type   text DEFAULT 'open',       -- 'recipe_match' | 'limit_challenge' | 'blend_design' | 'open'
  target_data     jsonb,                     -- exercise-specific: { target_umf, constraints, ... }
  due_date        timestamptz,
  sort_order      integer DEFAULT 0,
  is_published    boolean NOT NULL DEFAULT false,
  settings        jsonb DEFAULT '{}'::jsonb, -- { allow_resubmit, show_leaderboard, max_attempts, ... }
  detail          jsonb DEFAULT '{}'::jsonb,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER exercises_updated_at
  BEFORE UPDATE ON public.exercises
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers can view own exercises"
  ON public.exercises FOR SELECT
  USING (auth.uid() = teacher_id);
CREATE POLICY "Enrolled students can view published exercises"
  ON public.exercises FOR SELECT
  USING (is_published AND EXISTS (
    SELECT 1 FROM public.enrollments e
    WHERE e.course_id = exercises.course_id AND e.user_id = auth.uid()
  ));
CREATE POLICY "Teachers can create exercises"
  ON public.exercises FOR INSERT
  WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "Teachers can update own exercises"
  ON public.exercises FOR UPDATE
  USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can delete own exercises"
  ON public.exercises FOR DELETE
  USING (auth.uid() = teacher_id);

CREATE INDEX idx_exercises_course ON public.exercises(course_id);

-- ── Submissions table ──────────────────────────────────────────────
-- Student exercise submissions — recipe + snapshot + notes.
CREATE TABLE public.submissions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_id     uuid NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id       text,                      -- submitted recipe
  snapshot_id     uuid REFERENCES public.snapshots(id) ON DELETE SET NULL,
  submission_data jsonb DEFAULT '{}'::jsonb,  -- flexible: { recipe_data, umf, notes, ... }
  score           numeric,                   -- teacher-assigned score
  feedback        text,                      -- teacher comments
  status          text NOT NULL DEFAULT 'submitted',  -- 'draft' | 'submitted' | 'graded' | 'returned'
  attempt_number  integer NOT NULL DEFAULT 1,
  submitted_at    timestamptz NOT NULL DEFAULT now(),
  graded_at       timestamptz,
  detail          jsonb DEFAULT '{}'::jsonb,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER submissions_updated_at
  BEFORE UPDATE ON public.submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own submissions"
  ON public.submissions FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Teachers can view course submissions"
  ON public.submissions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.exercises ex
    JOIN public.courses c ON c.id = ex.course_id
    WHERE ex.id = submissions.exercise_id AND c.teacher_id = auth.uid()
  ));
CREATE POLICY "Students can submit"
  ON public.submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students can update own draft"
  ON public.submissions FOR UPDATE
  USING (auth.uid() = user_id AND status = 'draft');
CREATE POLICY "Teachers can grade"
  ON public.submissions FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.exercises ex
    JOIN public.courses c ON c.id = ex.course_id
    WHERE ex.id = submissions.exercise_id AND c.teacher_id = auth.uid()
  ));

CREATE INDEX idx_submissions_exercise ON public.submissions(exercise_id);
CREATE INDEX idx_submissions_user ON public.submissions(user_id);

-- ── Notifications table ────────────────────────────────────────────
-- In-app notifications for community activity, classroom events, etc.
CREATE TABLE public.notifications (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type            text NOT NULL,             -- 'comment' | 'reaction' | 'follow' | 'fork' | 'grade' | 'assignment' | 'system'
  title           text NOT NULL,
  body            text,
  source_user_id  uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  link            text,                      -- deep link: '/community/shared/abc123'
  ref_id          text,                      -- generic reference to source object
  is_read         boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own notifications"
  ON public.notifications FOR DELETE USING (auth.uid() = user_id);
-- Insert managed by server functions / triggers.

CREATE INDEX idx_notifications_user ON public.notifications(user_id, is_read, created_at DESC);

-- ── Import Jobs table ──────────────────────────────────────────────
-- v4.3 Bridge provenance — tracks where imported data came from.
CREATE TABLE public.import_jobs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source          text NOT NULL,             -- 'glazy' | 'digitalfire' | 'csv' | 'json' | 'hyperglaze' | 'matrix'
  source_url      text,                      -- original URL if web import
  file_name       text,                      -- original filename
  status          text NOT NULL DEFAULT 'pending',  -- 'pending' | 'processing' | 'completed' | 'failed'
  items_total     integer DEFAULT 0,
  items_imported  integer DEFAULT 0,
  items_skipped   integer DEFAULT 0,
  items_failed    integer DEFAULT 0,
  imported_ids    text[] DEFAULT '{}',       -- IDs of created saved_recipes / materials
  error_log       jsonb DEFAULT '[]'::jsonb,  -- [{ row, field, error }]
  options         jsonb DEFAULT '{}'::jsonb,  -- { merge_duplicates, default_cone, ... }
  detail          jsonb DEFAULT '{}'::jsonb,
  started_at      timestamptz,
  completed_at    timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.import_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own imports"
  ON public.import_jobs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create imports"
  ON public.import_jobs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own imports"
  ON public.import_jobs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own imports"
  ON public.import_jobs FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_imports_user ON public.import_jobs(user_id);

-- ── Activity Log table ─────────────────────────────────────────────
-- Append-only user activity timeline — "what did I do this month?"
-- Never updated, never deleted by user (admin purge only).
CREATE TABLE public.activity_log (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action          text NOT NULL,             -- 'created_recipe' | 'ran_blend' | 'saved_snapshot' | 'fired_kiln' | 'mixed_batch' | 'shared' | 'imported'
  entity_type     text,                      -- 'recipe' | 'snapshot' | 'blend' | 'firing_log' | 'piece' | etc.
  entity_id       text,                      -- ID of the affected entity
  summary         text,                      -- "Created Celadon #7 v2"
  detail          jsonb DEFAULT '{}'::jsonb,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activity"
  ON public.activity_log FOR SELECT USING (auth.uid() = user_id);
-- Insert managed by application code or triggers.
CREATE POLICY "System can insert activity"
  ON public.activity_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_activity_user_time ON public.activity_log(user_id, created_at DESC);
CREATE INDEX idx_activity_entity ON public.activity_log(entity_type, entity_id);

-- ── Storage bucket for photos ──────────────────────────────────────
-- Run these in Supabase Dashboard → Storage (not SQL editor):
--
--   1. Create bucket: 'user-photos' (private)
--   2. RLS policy: users can upload/read/delete in their own folder
--      Path convention: {user_id}/test-tiles/{tile_id}/{filename}
--                       {user_id}/recipe-cards/{card_id}/{filename}
--
-- Supabase Storage handles resizing via image transformations.

-- ── Batch generate trial codes (helper function) ───────────────────
CREATE OR REPLACE FUNCTION public.generate_trial_codes(
  p_batch_id text,
  p_count integer DEFAULT 50
)
RETURNS TABLE(code text) AS $$
DECLARE
  i integer;
  new_code text;
BEGIN
  FOR i IN 1..p_count LOOP
    -- Generate a 6-char alphanumeric code
    new_code := upper(substring(md5(random()::text || now()::text || i::text) from 1 for 6));
    INSERT INTO public.trial_codes (code, batch_id)
    VALUES (new_code, p_batch_id)
    ON CONFLICT DO NOTHING;
    RETURN QUERY SELECT new_code;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Generate NCECA batch:
-- SELECT * FROM generate_trial_codes('nceca-2026', 100);
