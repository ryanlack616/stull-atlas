/**
 * React Hooks
 *
 * Bridge between domain services and React components.
 * Each hook encapsulates a single responsibility and never
 * imports from other hooks — avoiding dependency chains.
 *
 *   useGlazeLoader     – load Glazy dataset into store
 *   useImportExport    – file import/export with lazy splitting
 *   useSimilarity      – weighted similarity search against loaded glazes
 *   useMaterialLookup  – material database access (resolve, search)
 *   usePageTitle       – dynamic <title> tag per route
 *   useFilteredPoints  – apply filter store to GlazePlotPoint[]
 *   useOmniSearch      – Ctrl+K command palette search across all domains
 *   useOnlineStatus    – online/offline detection + SW update notifications
 */

export { useGlazeLoader } from './useGlazeLoader'
export { useImportExport } from './useImportExport'
export type { ImportResult } from './useImportExport'
export { useSimilarity } from './useSimilarity'
export { useMaterialLookup } from './useMaterialLookup'
export { usePageTitle } from './usePageTitle'
export { useFilteredPoints } from './useFilteredPoints'
export { useOmniSearch } from './useOmniSearch'
export type { OmniResult, ResultCategory } from './useOmniSearch'
export { useOnlineStatus } from './useOnlineStatus'
export type { OnlineStatus } from './useOnlineStatus'
export { useKioskMode } from './useKioskMode'
export type { KioskState } from './useKioskMode'
