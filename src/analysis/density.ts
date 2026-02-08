/**
 * Density Analysis
 * 
 * Kernel density estimation and heatmap generation for glaze distributions
 */

import { GlazePlotPoint } from '@/types'
import { roundTo } from '@/calculator'

/**
 * 2D density map result
 */
export interface DensityMap {
  grid: number[][]
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number }
  resolution: number
  maxDensity: number
  totalPoints: number
}

/**
 * Configuration for density calculation
 */
export interface DensityConfig {
  resolution?: number    // Grid cells per dimension (default: 100)
  bandwidth?: number     // Kernel bandwidth (default: 0.1)
  padding?: number       // Padding around data bounds (default: 0.1)
}

/**
 * Gaussian kernel function
 */
function gaussian(distance: number, bandwidth: number): number {
  return Math.exp(-(distance * distance) / (2 * bandwidth * bandwidth))
}

/**
 * Calculate 2D kernel density estimation
 */
export function calculateDensity(
  points: GlazePlotPoint[],
  config: DensityConfig = {}
): DensityMap {
  const {
    resolution = 100,
    bandwidth = 0.1,
    padding = 0.1
  } = config
  
  // Filter valid points
  const validPoints = points.filter(p => 
    p.x != null && p.y != null && 
    !isNaN(p.x) && !isNaN(p.y) &&
    p.x > 0 && p.y > 0
  )
  
  if (validPoints.length === 0) {
    return {
      grid: [],
      bounds: { xMin: 0, xMax: 1, yMin: 0, yMax: 1 },
      resolution,
      maxDensity: 0,
      totalPoints: 0
    }
  }
  
  // Determine bounds with padding
  const xs = validPoints.map(p => p.x)
  const ys = validPoints.map(p => p.y)
  
  const xRange = Math.max(...xs) - Math.min(...xs)
  const yRange = Math.max(...ys) - Math.min(...ys)
  
  const bounds = {
    xMin: Math.min(...xs) - xRange * padding,
    xMax: Math.max(...xs) + xRange * padding,
    yMin: Math.min(...ys) - yRange * padding,
    yMax: Math.max(...ys) + yRange * padding
  }
  
  // Create grid
  const grid: number[][] = Array(resolution)
    .fill(null)
    .map(() => Array(resolution).fill(0))
  
  const xStep = (bounds.xMax - bounds.xMin) / resolution
  const yStep = (bounds.yMax - bounds.yMin) / resolution
  
  // Kernel radius in grid cells
  const kernelRadius = Math.ceil(bandwidth * 3 / Math.min(xStep, yStep))
  
  // Apply kernel for each point
  for (const point of validPoints) {
    const gridX = Math.floor((point.x - bounds.xMin) / xStep)
    const gridY = Math.floor((point.y - bounds.yMin) / yStep)
    
    // Apply Gaussian kernel to nearby cells
    for (let dx = -kernelRadius; dx <= kernelRadius; dx++) {
      for (let dy = -kernelRadius; dy <= kernelRadius; dy++) {
        const gx = gridX + dx
        const gy = gridY + dy
        
        if (gx >= 0 && gx < resolution && gy >= 0 && gy < resolution) {
          // Calculate actual distance
          const cellX = bounds.xMin + (gx + 0.5) * xStep
          const cellY = bounds.yMin + (gy + 0.5) * yStep
          const dist = Math.sqrt(
            Math.pow(cellX - point.x, 2) + 
            Math.pow(cellY - point.y, 2)
          )
          
          const weight = gaussian(dist, bandwidth)
          grid[gy][gx] += weight
        }
      }
    }
  }
  
  // Find max density
  let maxDensity = 0
  for (const row of grid) {
    for (const cell of row) {
      maxDensity = Math.max(maxDensity, cell)
    }
  }
  
  return {
    grid,
    bounds,
    resolution,
    maxDensity,
    totalPoints: validPoints.length
  }
}

/**
 * Convert density map to Plotly heatmap format
 */
export function densityToPlotlyHeatmap(density: DensityMap) {
  const { grid, bounds, resolution } = density
  
  // Generate x and y coordinates
  const xStep = (bounds.xMax - bounds.xMin) / resolution
  const yStep = (bounds.yMax - bounds.yMin) / resolution
  
  const x = Array.from({ length: resolution }, (_, i) => 
    roundTo(bounds.xMin + (i + 0.5) * xStep, 3)
  )
  const y = Array.from({ length: resolution }, (_, i) => 
    roundTo(bounds.yMin + (i + 0.5) * yStep, 3)
  )
  
  return {
    type: 'heatmap' as const,
    x,
    y,
    z: grid,
    colorscale: [
      [0, 'rgba(0,0,0,0)'],
      [0.1, 'rgba(68,1,84,0.3)'],
      [0.3, 'rgba(59,82,139,0.5)'],
      [0.5, 'rgba(33,145,140,0.6)'],
      [0.7, 'rgba(94,201,98,0.7)'],
      [1.0, 'rgba(253,231,37,0.8)']
    ],
    showscale: true,
    hoverinfo: 'none' as const
  }
}

/**
 * Find density peaks (local maxima)
 */
export function findDensityPeaks(
  density: DensityMap,
  threshold: number = 0.5  // Fraction of max density
): { x: number; y: number; density: number }[] {
  const { grid, bounds, resolution, maxDensity } = density
  const peaks: { x: number; y: number; density: number }[] = []
  
  const xStep = (bounds.xMax - bounds.xMin) / resolution
  const yStep = (bounds.yMax - bounds.yMin) / resolution
  const minDensity = maxDensity * threshold
  
  for (let y = 1; y < resolution - 1; y++) {
    for (let x = 1; x < resolution - 1; x++) {
      const value = grid[y][x]
      
      if (value < minDensity) continue
      
      // Check if local maximum (compare to 8 neighbors)
      let isMax = true
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue
          if (grid[y + dy][x + dx] > value) {
            isMax = false
            break
          }
        }
        if (!isMax) break
      }
      
      if (isMax) {
        peaks.push({
          x: bounds.xMin + (x + 0.5) * xStep,
          y: bounds.yMin + (y + 0.5) * yStep,
          density: value
        })
      }
    }
  }
  
  // Sort by density descending
  return peaks.sort((a, b) => b.density - a.density)
}

/**
 * Calculate density statistics
 */
export function getDensityStats(density: DensityMap) {
  const { grid, maxDensity, totalPoints } = density
  
  let sum = 0
  let nonZeroCount = 0
  
  for (const row of grid) {
    for (const cell of row) {
      sum += cell
      if (cell > 0) nonZeroCount++
    }
  }
  
  const mean = sum / (grid.length * grid[0].length)
  const coverage = nonZeroCount / (grid.length * grid[0].length)
  
  return {
    maxDensity,
    meanDensity: roundTo(mean, 4),
    coverage: roundTo(coverage, 4),
    totalPoints,
    nonZeroCells: nonZeroCount
  }
}
