/**
 * Materials Data (façade)
 *
 * Re-exports from infra/materials for backward compatibility.
 * New code should import from `@/domain/material` or `@/infra/materials`.
 *
 * @deprecated Import from `@/domain/material` instead
 */

export { materialDatabase } from '@/infra/materials'
export type { MaterialDatabase } from '@/infra/materials'
