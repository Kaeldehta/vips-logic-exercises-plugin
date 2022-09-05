import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: "src/main.tsx",
    },
    target: "esnext",
    manifest: true,
  },
  experimental: {
    renderBuiltUrl: (filename: string) => ({
      runtime: `window.__toCompleteUrl(${filename})`,
    }),
  },
});
