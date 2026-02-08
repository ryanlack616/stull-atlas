/**
 * Clustering Analysis
 * 
 * DBSCAN and hierarchical clustering for glaze distribution analysis
 */

import { GlazePlotPoint, EpistemicState } from '@/types'
import { roundTo } from '@/calculator'

/**
 * A detected cluster of glazes
 */
export interface Cluster {
  id: number
  pointIds: string[]
  centroid: { x: number; y: number }
  bounds: {
    xMin: number
    xMax: number
    yMin: number
    yMax: number
  }
  stats: {
    count: number
    avgCone: number | null
    dominantSurface: string
    dominantSource: string
    cohesion: number  // average distance from centroid
  }
}

/**
 * DBSCAN configuration
 */
export interface DBSCANConfig {
  epsilon: number     // neighborhood radius
  minPoints: number   // minimum points to form cluster
}

/**
 * DBSCAN clustering result
 */
export interface ClusteringResult {
  clusters: Cluster[]
  noise: string[]  // point IDs not in any cluster
  stats: {
    totalPoints: number
    clusteredPoints: number
    noisePoints: number
    clusterCount: number
  }
}

/**
 * DBSCAN clustering algorithm
 */
export function dbscan(
  points: GlazePlotPoint[],
  config: DBSCANConfig = { epsilon: 0.15, minPoints: 5 }
): ClusteringResult {
  const { epsilon, minPoints } = config
  
  // Filter valid points
  const validPoints = points.filter(p => 
    p.x != null && p.y != null && !isNaN(p.x) && !isNaN(p.y)
  )
  
  const n = validPoints.length
  const labels: number[] = new Array(n).fill(-1)  // -1 = unvisited, 0 = noise
  let clusterId = 0
  
  // Get neighbors within epsilon
  function regionQuery(pointIndex: number): number[] {
    const neighbors: number[] = []
    const p = validPoints[pointIndex]
    
    for (let i = 0; i < n; i++) {
      if (i === pointIndex) continue
      const q = validPoints[i]
      const dist = Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2))
      if (dist <= epsilon) {
        neighbors.push(i)
      }
    }
    
    return neighbors
  }
  
  // Expand cluster from seed point
  function expandCluster(pointIndex: number, neighbors: number[], cluster: number): void {
    labels[pointIndex] = cluster
    
    const queue = [...neighbors]
    
    while (queue.length > 0) {
      const current = queue.shift()!
      
      if (labels[current] === -1) {
        // Unvisited point
        labels[current] = cluster
        const currentNeighbors = regionQuery(current)
        
        if (currentNeighbors.length >= minPoints) {
          // Core point - add its neighbors to queue
          for (const neighbor of currentNeighbors) {
            if (labels[neighbor] === -1 || labels[neighbor] === 0) {
              queue.push(neighbor)
            }
          }
        }
      } else if (labels[current] === 0) {
        // Was noise, now assigned to cluster
        labels[current] = cluster
      }
    }
  }
  
  // Main DBSCAN loop
  for (let i = 0; i < n; i++) {
    if (labels[i] !== -1) continue
    
    const neighbors = regionQuery(i)
    
    if (neighbors.length < minPoints) {
      labels[i] = 0  // Mark as noise
    } else {
      clusterId++
      expandCluster(i, neighbors, clusterId)
    }
  }
  
  // Build cluster objects
  const clusterMap = new Map<number, GlazePlotPoint[]>()
  const noise: string[] = []
  
  for (let i = 0; i < n; i++) {
    const label = labels[i]
    if (label === 0) {
      noise.push(validPoints[i].id)
    } else {
      if (!clusterMap.has(label)) {
        clusterMap.set(label, [])
      }
      clusterMap.get(label)!.push(validPoints[i])
    }
  }
  
  const clusters: Cluster[] = []
  
  for (const [id, clusterPoints] of clusterMap) {
    const cluster = buildCluster(id, clusterPoints)
    clusters.push(cluster)
  }
  
  // Sort by size descending
  clusters.sort((a, b) => b.stats.count - a.stats.count)
  
  return {
    clusters,
    noise,
    stats: {
      totalPoints: n,
      clusteredPoints: n - noise.length,
      noisePoints: noise.length,
      clusterCount: clusters.length
    }
  }
}

/**
 * Build cluster object from points
 */
function buildCluster(id: number, points: GlazePlotPoint[]): Cluster {
  const xs = points.map(p => p.x)
  const ys = points.map(p => p.y)
  
  const centroid = {
    x: roundTo(xs.reduce((a, b) => a + b, 0) / points.length, 3),
    y: roundTo(ys.reduce((a, b) => a + b, 0) / points.length, 3)
  }
  
  const bounds = {
    xMin: Math.min(...xs),
    xMax: Math.max(...xs),
    yMin: Math.min(...ys),
    yMax: Math.max(...ys)
  }
  
  // Calculate cohesion (average distance from centroid)
  const distances = points.map(p => 
    Math.sqrt(Math.pow(p.x - centroid.x, 2) + Math.pow(p.y - centroid.y, 2))
  )
  const cohesion = distances.reduce((a, b) => a + b, 0) / points.length
  
  // Dominant properties
  const cones = points.filter(p => p.cone != null).map(p => p.cone!)
  const avgCone = cones.length > 0 
    ? roundTo(cones.reduce((a, b) => a + b, 0) / cones.length, 1)
    : null
  
  const surfaceCounts = new Map<string, number>()
  const sourceCounts = new Map<string, number>()
  
  for (const p of points) {
    surfaceCounts.set(p.surfaceType, (surfaceCounts.get(p.surfaceType) || 0) + 1)
    sourceCounts.set(p.source, (sourceCounts.get(p.source) || 0) + 1)
  }
  
  const dominantSurface = [...surfaceCounts.entries()]
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'unknown'
  
  const dominantSource = [...sourceCounts.entries()]
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'unknown'
  
  return {
    id,
    pointIds: points.map(p => p.id),
    centroid,
    bounds,
    stats: {
      count: points.length,
      avgCone,
      dominantSurface,
      dominantSource,
      cohesion: roundTo(cohesion, 4)
    }
  }
}

/**
 * Find optimal epsilon using k-distance graph
 */
export function findOptimalEpsilon(
  points: GlazePlotPoint[],
  k: number = 4
): number[] {
  const validPoints = points.filter(p => 
    p.x != null && p.y != null && !isNaN(p.x) && !isNaN(p.y)
  )
  
  // For each point, find distance to k-th nearest neighbor
  const kDistances: number[] = []
  
  for (const p of validPoints) {
    const distances = validPoints
      .filter(q => q.id !== p.id)
      .map(q => Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2)))
      .sort((a, b) => a - b)
    
    if (distances.length >= k) {
      kDistances.push(distances[k - 1])
    }
  }
  
  // Sort and return (for plotting k-distance graph)
  return kDistances.sort((a, b) => a - b)
}

/**
 * Generate Plotly shapes for cluster visualization
 */
export function clustersToPlotlyShapes(clusters: Cluster[]) {
  const colors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(199, 199, 199, 0.2)',
    'rgba(83, 102, 255, 0.2)',
    'rgba(255, 99, 255, 0.2)',
    'rgba(99, 255, 132, 0.2)'
  ]
  
  const borderColors = colors.map(c => c.replace('0.2)', '0.8)'))
  
  return clusters.map((cluster, i) => {
    const colorIndex = i % colors.length
    const padding = 0.02
    
    return {
      type: 'rect' as const,
      xref: 'x' as const,
      yref: 'y' as const,
      x0: cluster.bounds.xMin - padding,
      y0: cluster.bounds.yMin - padding,
      x1: cluster.bounds.xMax + padding,
      y1: cluster.bounds.yMax + padding,
      fillcolor: colors[colorIndex],
      line: {
        color: borderColors[colorIndex],
        width: 1
      }
    }
  })
}

/**
 * Get cluster summary statistics
 */
export function getClusterStats(result: ClusteringResult) {
  const { clusters, stats } = result
  
  if (clusters.length === 0) {
    return {
      ...stats,
      avgClusterSize: 0,
      maxClusterSize: 0,
      minClusterSize: 0,
      avgCohesion: 0
    }
  }
  
  const sizes = clusters.map(c => c.stats.count)
  const cohesions = clusters.map(c => c.stats.cohesion)
  
  return {
    ...stats,
    avgClusterSize: roundTo(sizes.reduce((a, b) => a + b, 0) / sizes.length, 1),
    maxClusterSize: Math.max(...sizes),
    minClusterSize: Math.min(...sizes),
    avgCohesion: roundTo(cohesions.reduce((a, b) => a + b, 0) / cohesions.length, 4)
  }
}
