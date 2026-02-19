/**
 * Feature Flags
 *
 * Controls which features are visible/enabled per deploy target.
 * Set VITE_DEPLOY_TARGET in your .env file:
 *
 *   .env.prod   → VITE_DEPLOY_TARGET=prod     (stullatlas.app — public)
 *   .env.dev    → VITE_DEPLOY_TARGET=dev       (stullatlas.app/dev — dev preview)
 *   .env.rje    → VITE_DEPLOY_TARGET=rje       (stullatlas.app/rje/dev — internal)
 *
 * Build with:  npm run build:prod | build:dev | build:rje
 *
 * All flags default to the PROD (most conservative) profile.
 * Dev and RJE progressively unlock more features.
 */

export type DeployTarget = 'prod' | 'dev' | 'rje'

const target = (import.meta.env.VITE_DEPLOY_TARGET ?? 'prod') as DeployTarget

/** Version string shown in About / Updates pages */
export const appVersion: string = import.meta.env.VITE_APP_VERSION ?? '3.5.0'

export interface FeatureFlags {
  /** Molar weight set picker in sidebar */
  molarWeights: boolean
  /** Analysis set picker in sidebar */
  analysisSetPicker: boolean
  /** Atmosphere / surface / cone filter panel */
  filterPanel: boolean
  /** "Knowledge" tab + Digitalfire panel */
  knowledgeTab: boolean
  /** Temperature contour lines & labels on 2D and 3D plots */
  tempContours: boolean
  /** "Temperature Contours" explainer section on About page */
  tempContoursAbout: boolean
  /** "Standing on Shoulders" appreciation section on About page */
  standingOnShoulders: boolean
}

const PROD_FLAGS: FeatureFlags = {
  molarWeights: false,
  analysisSetPicker: false,
  filterPanel: false,
  knowledgeTab: false,
  tempContours: false,
  tempContoursAbout: false,
  standingOnShoulders: false,
}

const DEV_FLAGS: FeatureFlags = {
  ...PROD_FLAGS,
  filterPanel: true,
  tempContours: true,
  tempContoursAbout: true,
}

const RJE_FLAGS: FeatureFlags = {
  molarWeights: true,
  analysisSetPicker: true,
  filterPanel: true,
  knowledgeTab: true,
  tempContours: true,
  tempContoursAbout: true,
  standingOnShoulders: true,
}

const FLAG_MAP: Record<DeployTarget, FeatureFlags> = {
  prod: PROD_FLAGS,
  dev: DEV_FLAGS,
  rje: RJE_FLAGS,
}

/** The active feature flags for this build */
export const features: FeatureFlags = FLAG_MAP[target] ?? PROD_FLAGS

/** The active deploy target */
export const deployTarget: DeployTarget = target
