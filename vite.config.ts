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
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('plotly.js-gl2d-dist-min')) return 'plotly-gl2d'
          if (id.includes('plotly.js-gl3d-dist-min')) return 'plotly-gl3d'
          return undefined
        }
      }
    }
  },
  test: {
    environment: 'node',
    globals: true,
    setupFiles: './src/test/setup.ts'
  }
})
