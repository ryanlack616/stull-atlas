/**
 * Domain Layer
 *
 * Pure business-logic services.
 * Depends on infra/ + calculator/, never on React or stores.
 *
 *   domain/glaze      – load, import/export, UMF, similarity
 *   domain/material   – material lookup & analysis
 *   domain/suggestion – AI-assisted recipe suggestions
 */

export * from './glaze'
export * from './material'
export * from './suggestion'
