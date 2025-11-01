import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'  // Node path for alias

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // @/ = src/ – Shadcn standard
    },
  },
})