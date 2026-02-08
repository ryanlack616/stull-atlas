/**
 * Calculators Index Page
 * 
 * Landing page showing all available glaze calculators.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks/usePageTitle'
import { calcStyles } from './calc-styles'

const calculators = [
  {
    path: '/calc/umf',
    icon: '⚗',
    name: 'UMF Calculator',
    description: 'Enter a recipe, see its Unity Molecular Formula. Validation, surface prediction, cone limits.',
    meta: '1 recipe → full UMF analysis',
  },
  {
    path: '/calc/line-blend',
    icon: '━━━',
    name: 'Line Blend',
    description: 'Blend two glazes along a line. The classic 10-step test.',
    meta: '2 recipes → n points',
  },
  {
    path: '/calc/triaxial',
    icon: '△',
    name: 'Triaxial Blend',
    description: 'Three-corner simplex blend. Map the space between three glazes or materials.',
    meta: '3 recipes → triangular grid',
  },
  {
    path: '/calc/quadaxial',
    icon: '◇',
    name: 'Quadaxial Blend',
    description: 'Four-corner simplex. Systematic exploration of four-component space.',
    meta: '4 recipes → tetrahedral grid',
  },
  {
    path: '/calc/biaxial',
    icon: '▦',
    name: 'Biaxial Grid',
    description: 'Add two materials independently to a base recipe. Creates a 2D grid of test tiles.',
    meta: 'base + 2 additions → grid',
  },
  {
    path: '/calc/radial',
    icon: '*',
    name: 'Radial Blend',
    description: 'Center recipe with spokes outward to multiple additions.',
    meta: 'center + additions → spokes',
  },
  {
    path: '/calc/space-filling',
    icon: '⊞',
    name: 'Space-Filling Sampler',
    description: 'LHS, Sobol, or Halton sequences across UMF space. Computational exploration.',
    meta: 'bounds → n quasi-random samples',
  },
]

export function CalculatorsPage() {
  usePageTitle('Calculators')
  return (
    <div className="calc-page" style={{ overflow: 'auto' }}>
      <div className="calc-index">
        <h2>Glaze Calculators</h2>
        <p className="intro">
          Systematic blend tests — line blends, triaxials, quadaxials. 
          Enter recipes, set divisions, see every point in UMF space.
        </p>

        <div className="calc-grid">
          {calculators.map(calc => (
            <Link key={calc.path} to={calc.path} className="calc-card">
              <div className="card-icon">{calc.icon}</div>
              <h3>{calc.name}</h3>
              <p>{calc.description}</p>
              <div className="card-meta">{calc.meta}</div>
            </Link>
          ))}
        </div>
      </div>

      <style>{calcStyles}</style>
    </div>
  )
}

export default CalculatorsPage
