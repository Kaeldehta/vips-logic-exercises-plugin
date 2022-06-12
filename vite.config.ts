import { defineConfig } from 'vite'
import solidPlugin from "vite-plugin-solid";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    rollupOptions: {
      input: "src/main.tsx"
    },
    manifest: true,
  },
})
