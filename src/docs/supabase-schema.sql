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
