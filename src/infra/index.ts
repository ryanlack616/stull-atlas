/**
 * Infrastructure Layer
 *
 * Data access, persistence, and external resource loading.
 * Nothing in infra/ should depend on React, Zustand, or UI concerns.
 *
 *   infra/glazes       – load & serialise glaze data
 *   infra/materials    – MaterialDatabase singleton
 *   infra/persistence  – localStorage helpers
 */

export * from './glazes'
export * from './materials'
