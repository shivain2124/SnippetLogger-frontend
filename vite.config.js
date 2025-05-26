import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      external: ['axios'],
      output: {
        manualChunks: undefined,
        globals: {
          axios: 'axios'
        }
      }
    }
  },
  optimizeDeps: {
    include: ['axios']
  }
})
