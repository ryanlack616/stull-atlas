/**
 * Domain / Material
 *
 * Thin facade over the infra MaterialDatabase.
 * Keeps component code from reaching into infra/ directly.
 */

export { materialDatabase, getAllMaterials } from './materialService'
