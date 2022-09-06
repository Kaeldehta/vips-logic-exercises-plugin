import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  base: mode === "production" ? "./" : "/",
  build: {
    rollupOptions: {
      input: "src/main.tsx",
    },
    target: "esnext",
    manifest: true,
  },
}));
