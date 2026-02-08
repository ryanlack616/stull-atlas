/**
 * Void Detection
 * 
 * Find empty regions in glaze space - potential unexplored territory
 */

import { GlazePlotPoint } from '@/types'
import { DensityMap, calculateDensity } from './density'
import { roundTo } from '@/calculator'

/**
 * A detected void in glaze space
 */
export interface Void {
  id: string
  center: { x: number; y: number }
  radius: number
  area: number
  nearestGlazes: string[]  // IDs of closest glazes
  significance: 'low' | 'medium' | 'high'
}

/**
 * Configuration for void detection
 */
export interface VoidConfig {
  densityThreshold?: number  // Fraction of max density below which is "void" (default: 0.1)
  minVoidSize?: number       // Minimum cells to count as a void (default: 10)
  maxVoids?: number          // Maximum voids to return (default: 20)
}

/**
 * Find voids in glaze distribution
 */
export function findVoids(
  points: GlazePlotPoint[],
  config: VoidConfig = {}
): Void[] {
  const {
    densityThreshold = 0.1,
    minVoidSize = 10,
    maxVoids = 20
  } = config
  
  // Calculate density map
  const density = calculateDensity(points, { resolution: 80 })
  const { grid, bounds, resolution, maxDensity } = density
  
  if (maxDensity === 0) return []
  
  const xStep = (bounds.xMax - bounds.xMin) / resolution
  const yStep = (bounds.yMax - bounds.yMin) / resolution
  const threshold = maxDensity * densityThreshold
  
  // Track visited cells
  const visited: boolean[][] = Array(resolution)
    .fill(null)
    .map(() => Array(resolution).fill(false))
  
  const voids: Void[] = []
  let voidId = 0
  
  // Flood fill to find connected void regions
  for (let startY = 0; startY < resolution; startY++) {
    for (let startX = 0; startX < resolution; startX++) {
      if (visited[startY][startX]) continue
      if (grid[startY][startX] >= threshold) {
        visited[startY][startX] = true
        continue
      }
      
      // Found a void cell - flood fill to find region
      const region: { x: number; y: number }[] = []
      const queue: { x: number; y: number }[] = [{ x: startX, y: startY }]
      
      while (queue.length > 0) {
        const cell = queue.shift()!
        
        if (visited[cell.y][cell.x]) continue
        if (grid[cell.y][cell.x] >= threshold) continue
        
        visited[cell.y][cell.x] = true
        region.push(cell)
        
        // Add neighbors (4-connected)
        const neighbors = [
          { x: cell.x + 1, y: cell.y },
          { x: cell.x - 1, y: cell.y },
          { x: cell.x, y: cell.y + 1 },
          { x: cell.x, y: cell.y - 1 }
        ]
        
        for (const n of neighbors) {
          if (n.x >= 0 && n.x < resolution && n.y >= 0 && n.y < resolution) {
            if (!visited[n.y][n.x]) {
              queue.push(n)
            }
          }
        }
      }
      
      // Check if region is large enough
      if (region.length >= minVoidSize) {
        // Calculate centroid
        const centerCell = {
          x: region.reduce((s, c) => s + c.x, 0) / region.length,
          y: region.reduce((s, c) => s + c.y, 0) / region.length
        }
        
        const center = {
          x: roundTo(bounds.xMin + centerCell.x * xStep, 3),
          y: roundTo(bounds.yMin + centerCell.y * yStep, 3)
        }
        
        // Estimate radius (as if circular)
        const area = region.length * xStep * yStep
        const radius = roundTo(Math.sqrt(area / Math.PI), 3)
        
        // Find nearest glazes
        const nearestGlazes = findNearestGlazes(points, center, 5)
        
        // Determine significance
        let significance: 'low' | 'medium' | 'high' = 'low'
        if (region.length > minVoidSize * 5) significance = 'high'
        else if (region.length > minVoidSize * 2) significance = 'medium'
        
        voids.push({
          id: `void_${voidId++}`,
          center,
          radius,
          area: roundTo(area, 4),
          nearestGlazes,
          significance
        })
      }
    }
  }
  
  // Sort by area descending and limit
  return voids
    .sort((a, b) => b.area - a.area)
    .slice(0, maxVoids)
}

/**
 * Find the n nearest glazes to a point
 */
function findNearestGlazes(
  points: GlazePlotPoint[],
  center: { x: number; y: number },
  n: number
): string[] {
  const distances = points
    .filter(p => p.x != null && p.y != null)
    .map(p => ({
      id: p.id,
      distance: Math.sqrt(
        Math.pow(p.x - center.x, 2) + 
        Math.pow(p.y - center.y, 2)
      )
    }))
    .sort((a, b) => a.distance - b.distance)
  
  return distances.slice(0, n).map(d => d.id)
}

/**
 * Check if a point is in a void
 */
export function isPointInVoid(
  point: { x: number; y: number },
  voids: Void[]
): Void | null {
  for (const v of voids) {
    const distance = Math.sqrt(
      Math.pow(point.x - v.center.x, 2) +
      Math.pow(point.y - v.center.y, 2)
    )
    
    if (distance <= v.radius) {
      return v
    }
  }
  return null
}

/**
 * Generate Plotly shapes for void visualization
 */
export function voidsToPlotlyShapes(voids: Void[]) {
  return voids.map(v => ({
    type: 'circle' as const,
    xref: 'x' as const,
    yref: 'y' as const,
    x0: v.center.x - v.radius,
    y0: v.center.y - v.radius,
    x1: v.center.x + v.radius,
    y1: v.center.y + v.radius,
    fillcolor: v.significance === 'high' 
      ? 'rgba(244, 67, 54, 0.1)'
      : v.significance === 'medium'
        ? 'rgba(255, 152, 0, 0.1)'
        : 'rgba(158, 158, 158, 0.1)',
    line: {
      color: v.significance === 'high'
        ? 'rgba(244, 67, 54, 0.5)'
        : v.significance === 'medium'
          ? 'rgba(255, 152, 0, 0.5)'
          : 'rgba(158, 158, 158, 0.5)',
      width: 1,
      dash: 'dot' as const
    }
  }))
}

/**
 * Get void summary statistics
 */
export function getVoidStats(voids: Void[]) {
  if (voids.length === 0) {
    return {
      count: 0,
      totalArea: 0,
      avgArea: 0,
      highSignificance: 0,
      mediumSignificance: 0,
      lowSignificance: 0
    }
  }
  
  const totalArea = voids.reduce((sum, v) => sum + v.area, 0)
  
  return {
    count: voids.length,
    totalArea: roundTo(totalArea, 4),
    avgArea: roundTo(totalArea / voids.length, 4),
    highSignificance: voids.filter(v => v.significance === 'high').length,
    mediumSignificance: voids.filter(v => v.significance === 'medium').length,
    lowSignificance: voids.filter(v => v.significance === 'low').length
  }
}
