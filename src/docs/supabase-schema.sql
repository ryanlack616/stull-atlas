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
CREATE TYPE public.tier AS ENUM ('free', 'solo', 'pro', 'edu_individual', 'edu_classroom');
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
