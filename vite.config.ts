import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  base: '/stullv2/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    chunkSizeWarningLimit: 2200, // Plotly GL bundles are ~2MB, expected
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Plotly GL bundles — huge, loaded on demand
          if (id.includes('plotly.js-gl2d-dist-min')) return 'plotly-gl2d'
          if (id.includes('plotly.js-gl3d-dist-min')) return 'plotly-gl3d'
          // Vendor chunk — React, router, zustand — changes rarely, caches well
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'vendor-react'
          if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run')) return 'vendor-router'
          if (id.includes('node_modules/zustand') || id.includes('node_modules/immer')) return 'vendor-state'
          // Analysis libraries — only loaded when analysis tab is opened
          if (id.includes('node_modules/density-clustering')) return 'vendor-analysis'
          if (id.includes('node_modules/decimal.js')) return 'vendor-math'
          return undefined
        }
      }
    }
  },
  test: {
    environment: 'node',
    globals: true,
    setupFiles: './src/test/setup.ts',
    exclude: ['e2e/**', 'node_modules/**']
  }
})
