import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-dom') || id.includes('react-router-dom') || id.includes('node_modules/react/')) return 'vendor-react'
          if (id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('lucide-react') || id.includes('react-icons')) return 'vendor-icons'
        },
      },
    },
  },
})
