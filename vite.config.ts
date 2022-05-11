import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as fg from "fast-glob"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: fg.sync("src/**/main.tsx")
    }
  }
})
