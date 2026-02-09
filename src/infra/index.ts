/**
 * Infrastructure Layer
 *
 * Data access, persistence, and external resource loading.
 * Nothing in infra/ should depend on React, Zustand, or UI concerns.
 *
 *   infra/glazes       – load & serialise glaze data (JSON, CSV, XML)
 *   infra/materials    – MaterialDatabase singleton
 *   infra/supabase     – Supabase client, auth types, tier types
 */

export * from './glazes'
export * from './materials'
export * from './supabase'
